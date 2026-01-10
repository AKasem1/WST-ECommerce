import * as fs from 'fs';
import * as path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { config } from 'dotenv';
import ExcelJS from 'exceljs';

// Load environment variables
config();

console.log('🚀 Script started...');
console.log('📍 Current directory:', process.cwd());
console.log('📝 Arguments:', process.argv.slice(2));

const imgUpload = async (imageBuffer: Buffer, imageName: string): Promise<string | undefined> => {
    const key = process.env.NEXT_PUBLIC_IMG_UPLOAD_KEY;
    
    console.log('🔑 API Key present:', !!key);
    
    if (!key) {
        throw new Error('Image upload key is not configured');
    }
    
    const formData = new FormData();
    formData.append('image', imageBuffer.toString('base64'));
    formData.append('key', key);
    formData.append('name', imageName);
  
    try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData,
        });
  
        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }
  
        const data: any = await response.json();
        console.log(`✓ Uploaded: ${imageName}`);
  
        return data?.data?.url;
    } catch (error) {
        console.error('Error during image upload:', error);
        throw error;
    }
};

// Helper function to convert cell value to string
const cellToString = (cell: any): string => {
    if (!cell || cell.value === null || cell.value === undefined) return '';
    
    // Handle rich text
    if (cell.value && typeof cell.value === 'object' && cell.value.richText) {
        return cell.value.richText.map((rt: any) => rt.text).join('');
    }
    
    // Handle formulas
    if (cell.value && typeof cell.value === 'object' && cell.value.result !== undefined) {
        return String(cell.value.result);
    }
    
    return String(cell.value);
};

// Helper to find column index by header name (supports English and Arabic)
const findColumnIndex = (headerRow: any, searchTerms: string[]): number => {
    let colIndex = -1;
    headerRow.eachCell((cell: any, colNumber: number) => {
        const cellText = cellToString(cell).toLowerCase();
        if (searchTerms.some(term => cellText.includes(term.toLowerCase()))) {
            colIndex = colNumber;
        }
    });
    return colIndex;
};

// Find the row that contains the actual headers
const findHeaderRow = (worksheet: any): any => {
    for (let rowNumber = 1; rowNumber <= Math.min(worksheet.rowCount, 20); rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        let hasModelNumber = false;
        let hasProductImage = false;
        
        row.eachCell((cell: any) => {
            const cellText = cellToString(cell).toLowerCase();
            if (cellText.includes('model number') || cellText.includes('رقم الموديل')) {
                hasModelNumber = true;
            }
            if (cellText.includes('product image') || cellText.includes('صورة المنتج') || cellText.includes('صورة')) {
                hasProductImage = true;
            }
        });
        
        if (hasModelNumber || hasProductImage) {
            console.log(`  ✓ Found header row at row: ${rowNumber}`);
            return row;
        }
    }
    
    return null;
};

const processExcelWithImages = async (filePath: string, outputPath: string) => {
    console.log('📦 Loading ExcelJS...');
    
    try {
        console.log(`📄 Reading Excel file: ${filePath}`);
        
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        
        console.log('✓ Workbook loaded successfully');
        
        const allData: any[] = [];
        console.log(`📊 Found ${workbook.worksheets.length} sheet(s)`);
        
        // Only process the first sheet
        const worksheet = workbook.worksheets[0];
        const sheetName = worksheet.name;
        console.log(`\n📋 Processing sheet: ${sheetName}`);
        console.log(`  Total rows: ${worksheet.rowCount}`);
        
        // Find the header row
        const headerRow = findHeaderRow(worksheet);
        
        if (!headerRow) {
            console.log('  ❌ Could not find header row');
            return allData;
        }
        
        const headerRowNumber = headerRow.number;
        
        // Find column indices for the 4 fields we need
        const modelNumberCol = findColumnIndex(headerRow, ['Model Number', 'رقم الموديل']);
        const imageCol = findColumnIndex(headerRow, ['Product Image', 'صورة المنتج', 'صورة']);
        const descriptionCol = findColumnIndex(headerRow, ['Product Description', 'وصف المنتج', 'Description']);
        const priceCol = findColumnIndex(headerRow, ['MSRP PRICE', 'السعر', 'MSRP', 'PRICE']);
        
        console.log(`  Column indices:`);
        console.log(`    - Model Number: ${modelNumberCol}`);
        console.log(`    - Product Image: ${imageCol}`);
        console.log(`    - Product Description: ${descriptionCol}`);
        console.log(`    - MSRP Price: ${priceCol}`);
        
        if (modelNumberCol === -1) {
            console.log('  ❌ Model Number column not found');
            return allData;
        }
        
        // Get all images from the worksheet
        const images = worksheet.getImages();
        console.log(`  📷 Found ${images.length} images in sheet`);
        
        // Create a map of row numbers to images
        const imageMap = new Map<number, Buffer>();
        
        for (const img of images) {
            try {
                const imageId = (img as any).imageId;
                const imageData = workbook.getImage(imageId);
                
                // Get the image position
                const range = (img as any).range;
                if (range && range.tl) {
                    const rowNumber = range.tl.nativeRow + 1; // Convert to 1-based
                    const colNumber = range.tl.nativeCol + 1;
                    
                    // Check if image is in the image column (with tolerance)
                    if (imageCol !== -1 && Math.abs(colNumber - imageCol) <= 1 && imageData.buffer) {
                        imageMap.set(rowNumber, Buffer.from(imageData.buffer));
                        console.log(`    Image found at row ${rowNumber}, col ${colNumber}`);
                    }
                }
            } catch (error) {
                console.log(`    ⚠️ Could not process image:`, error);
            }
        }
        
        console.log(`  📸 Mapped ${imageMap.size} images to rows`);
        
        // Process rows starting from the row after headers
        for (let rowNumber = headerRowNumber + 1; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            
            // Get model number first to check if this is a valid product row
            const modelNumberCell = row.getCell(modelNumberCol);
            const modelNumber = cellToString(modelNumberCell).trim();
            
            // Skip empty rows, category headers, or rows without model numbers
            if (!modelNumber || modelNumber === '') {
                continue;
            }
            
            console.log(`  Processing row ${rowNumber}: ${modelNumber}`);
            
            // Get other fields
            const description = descriptionCol !== -1 ? cellToString(row.getCell(descriptionCol)).trim() : '';
            const price = priceCol !== -1 ? cellToString(row.getCell(priceCol)).trim() : '';
            
            // Create product object with only the 4 fields
            const product: any = {
                modelNumber: modelNumber,
                productImage: null,
                productDescription: description,
                msrpPrice: price,
                _sheetName: sheetName,
                _rowNumber: rowNumber
            };
            
            // Check if there's an image for this row
            if (imageMap.has(rowNumber)) {
                console.log(`    ✓ Found image for ${modelNumber}`);
                const imageBuffer = imageMap.get(rowNumber)!;
                const imageName = `${String(modelNumber).replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;
                
                try {
                    const imageUrl = await imgUpload(imageBuffer, imageName);
                    product.productImage = imageUrl;
                    console.log(`    ✓ Image uploaded: ${imageUrl}`);
                    
                    // Rate limiting
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error: any) {
                    console.error(`    ✗ Failed to upload image:`, error?.message);
                    product.productImage = null;
                }
            } else {
                console.log(`    ℹ️ No image found for ${modelNumber}`);
            }
            
            allData.push(product);
        }
        
        console.log(`\n💾 Writing output to: ${outputPath}`);
        fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2), 'utf-8');
        
        console.log(`✅ Successfully processed ${allData.length} products`);
        console.log(`📦 Output saved to: ${outputPath}`);
        
        return allData;
        
    } catch (error) {
        console.error('❌ Error processing Excel file:', error);
        throw error;
    }
};

const main = async () => {
    try {
        console.log('🎯 Main function started');
        
        const args = process.argv.slice(2);
        console.log('Arguments received:', args);
        
        if (args.length < 1) {
            console.log('Usage: npm run process-excel <input-file.xlsx> [output-file.json]');
            process.exit(1);
        }
        
        const inputFile = args[0];
        const outputFile = args[1] || 'output.json';
        
        console.log(`Input file: ${inputFile}`);
        console.log(`Output file: ${outputFile}`);
        
        if (!fs.existsSync(inputFile)) {
            console.error(`❌ Error: File not found: ${inputFile}`);
            console.log('Current directory contents:');
            console.log(fs.readdirSync('.').filter(f => f.endsWith('.xlsx')));
            process.exit(1);
        }
        
        await processExcelWithImages(inputFile, outputFile);
        
        console.log('✅ Script completed successfully!');
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
};

// Run the script
console.log('🏁 Starting main...');
main().catch((error) => {
    console.error('💥 Unhandled error:', error);
    process.exit(1);
});

export { processExcelWithImages };
