import * as fs from 'fs';
import { config } from 'dotenv';
import ExcelJS from 'exceljs';
import { v2 as cloudinary } from 'cloudinary';

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const imgUpload = async (imageBuffer: Buffer, imageName: string): Promise<string | undefined> => {
    try {
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'products',
            public_id: imageName,
            overwrite: true,
            resource_type: 'auto'
        });
        console.log(`✓ Uploaded: ${imageName}`);
        return result.secure_url;
    } catch (error) {
        console.error('Error during image upload:', error);
        throw error;
    }
};

const cellToString = (cell: any): string => {
    if (!cell || cell.value === null || cell.value === undefined) return '';
    if (cell.value && typeof cell.value === 'object' && cell.value.richText) {
        return cell.value.richText.map((rt: any) => rt.text).join('');
    }
    if (cell.value && typeof cell.value === 'object' && cell.value.result !== undefined) {
        return String(cell.value.result);
    }
    return String(cell.value);
};

const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^\d.]/g, '').trim();
    return parseFloat(cleaned) || 0;
};

const findColumnIndex = (headerRow: any, searchTerms: string[]): number => {
    let colIndex = -1;
    headerRow.eachCell({ includeEmpty: true }, (cell: any, colNumber: number) => {
        const cellText = cellToString(cell).toLowerCase();
        if (searchTerms.some(term => cellText.includes(term.toLowerCase()))) {
            colIndex = colNumber;
        }
    });
    return colIndex;
};

const findHeaderRow = (worksheet: any): any => {
    for (let rowNumber = 1; rowNumber <= Math.min(worksheet.rowCount, 20); rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        let hasModelNumber = false;
        row.eachCell({ includeEmpty: true }, (cell: any) => {
            const cellText = cellToString(cell).toLowerCase();
            if (cellText.includes('model number') || cellText.includes('رقم الموديل')) hasModelNumber = true;
        });
        if (hasModelNumber) {
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
        if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        console.log('✓ Workbook loaded successfully');

        const allData: any[] = [];
        console.log(`📊 Found ${workbook.worksheets.length} sheet(s)`);

        const worksheet = workbook.worksheets[0];
        const sheetName = worksheet.name;
        console.log(`\n📋 Processing sheet: ${sheetName}`);
        console.log(`  Total rows: ${worksheet.rowCount}`);

        const headerRow = findHeaderRow(worksheet);
        if (!headerRow) {
            console.log('  ❌ Could not find header row');
            return allData;
        }

        const headerRowNumber = headerRow.number;
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

        // Map images with hash
        const imageMap = new Map<number, { buffer: Buffer, hash: string }>();
        const uploadedHashes = new Map<string, string>(); // hash -> cloudinary URL

        const images = worksheet.getImages();
        console.log(`  📷 Found ${images.length} images using getImages()`);

        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            try {
                const imageId = img.imageId;
                const imageNumber = Number(imageId);
                const imageData = workbook.getImage(imageNumber);
                if (imageData && imageData.buffer) {
                    const range = img.range;
                    if (range && range.tl) {
                        const rowNumber = Math.floor(range.tl.row) + 1;
                        const colNumber = Math.floor(range.tl.col) + 1;

                        const imageBuffer = Buffer.from(imageData.buffer);
                        const hash = imageBuffer.toString('base64').substring(0, 50);

                        if (imageCol !== -1 && Math.abs(colNumber - imageCol) <= 1) {
                            imageMap.set(rowNumber, { buffer: imageBuffer, hash });
                        }
                    }
                }
            } catch (error) {
                console.log(`    ⚠️ Could not process image ${i + 1}`);
            }
        }

        console.log(`  📸 Mapped ${imageMap.size} images to rows`);

        for (let rowNumber = headerRowNumber + 1; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            const modelNumberCell = row.getCell(modelNumberCol);
            const modelNumber = cellToString(modelNumberCell).trim();

            if (!modelNumber || modelNumber === '') continue;

            console.log(`  Processing row ${rowNumber}: ${modelNumber}`);

            const description = descriptionCol !== -1 ? cellToString(row.getCell(descriptionCol)).trim() : '';
            const priceStr = priceCol !== -1 ? cellToString(row.getCell(priceCol)).trim() : '0';
            const price = parsePrice(priceStr);

            const product: any = {
                modelNumber: modelNumber,
                productImage: null,
                productDescription: description,
                msrpPrice: price,
                quantity: 50,
                categoryId: "69619d8259e41d162dcf9438",
                _sheetName: sheetName,
                _rowNumber: rowNumber
            };

            if (imageMap.has(rowNumber)) {
                const imageData = imageMap.get(rowNumber)!;
                const hash = imageData.hash;

                // Check if we already uploaded this exact image
                if (uploadedHashes.has(hash)) {
                    // Reuse the same URL for duplicate images
                    product.productImage = uploadedHashes.get(hash);
                    console.log(`    ♻️ Reusing uploaded image for ${modelNumber} (duplicate detected)`);
                } else {
                    // Upload new unique image
                    console.log(`    ✓ Found unique image for ${modelNumber}`);
                    const imageName = `${String(modelNumber).replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;
                    try {
                        const imageUrl = await imgUpload(imageData.buffer, imageName);
                        product.productImage = imageUrl;
                        uploadedHashes.set(hash, imageUrl!);
                        console.log(`    ✓ Image uploaded: ${imageUrl}`);
                        await new Promise(resolve => setTimeout(resolve, 500));
                    } catch (error: any) {
                        console.error(`    ✗ Failed to upload image:`, error?.message);
                        product.productImage = null;
                    }
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
        console.log(`🎯 Uploaded ${uploadedHashes.size} unique images (avoided ${imageMap.size - uploadedHashes.size} duplicates)`);
        return allData;
    } catch (error) {
        console.error('❌ Error processing Excel file:', error);
        throw error;
    }
};

const main = async () => {
    try {
        const args = process.argv.slice(2);
        if (args.length < 1) {
            console.log('Usage: npm run process-excel <input-file.xlsx> [output-file.json]');
            process.exit(1);
        }
        const inputFile = args[0];
        const outputFile = args[1] || 'output.json';
        if (!fs.existsSync(inputFile)) {
            console.error(`❌ Error: File not found: ${inputFile}`);
            process.exit(1);
        }
        await processExcelWithImages(inputFile, outputFile);
        console.log('✅ Script completed successfully!');
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
};

main().catch(console.error);

export { processExcelWithImages };
