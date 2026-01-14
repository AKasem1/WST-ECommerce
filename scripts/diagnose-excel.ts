import * as fs from 'fs';
import { config } from 'dotenv';
import ExcelJS from 'exceljs';

config();

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
            console.log(`Found header row at: ${rowNumber}`);
            return row;
        }
    }
    return null;
};

const diagnoseExcel = async (filePath: string) => {
    console.log('🔍 DIAGNOSING EXCEL FILE...\n');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];
    console.log(`Sheet: ${worksheet.name}`);
    console.log(`Total rows: ${worksheet.rowCount}\n`);

    const headerRow = findHeaderRow(worksheet);
    if (!headerRow) {
        console.log('❌ No header row found');
        return;
    }

    const headerRowNumber = headerRow.number;
    const modelNumberCol = findColumnIndex(headerRow, ['Model Number', 'رقم الموديل']);
    const imageCol = findColumnIndex(headerRow, ['Product Image', 'صورة المنتج', 'صورة']);

    console.log(`Header row: ${headerRowNumber}`);
    console.log(`Model Number column: ${modelNumberCol}`);
    console.log(`Image column: ${imageCol}\n`);

    // Get all images
    const images = worksheet.getImages();
    console.log(`📷 TOTAL IMAGES IN SHEET: ${images.length}\n`);

    // Map images with full details
    const imageDetails: any[] = [];

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        try {
            const imageId = img.imageId;
            const imageIdNumber = Number(imageId);
            const imageData = workbook.getImage(imageIdNumber);
            const range = img.range;

            if (range && range.tl && imageData.buffer) {
                const rowNumber = Math.floor(range.tl.row) + 1;
                const colNumber = Math.floor(range.tl.col) + 1;
                const imageBuffer = Buffer.from(imageData.buffer);
                const hash = imageBuffer.toString('base64').substring(0, 30);

                imageDetails.push({
                    index: i + 1,
                    rowNumber,
                    colNumber,
                    size: imageBuffer.length,
                    hash,
                    inImageColumn: imageCol !== -1 && Math.abs(colNumber - imageCol) <= 1
                });
            }
        } catch (error) {
            console.log(`⚠️ Could not process image ${i + 1}`);
        }
    }

    // Print all images
    console.log('IMAGE DETAILS:');
    console.log('─'.repeat(100));
    imageDetails.forEach(img => {
        console.log(`Image ${img.index}: Row ${img.rowNumber}, Col ${img.colNumber}, Size: ${img.size} bytes, Hash: ${img.hash}...`);
        console.log(`  In image column: ${img.inImageColumn ? '✓ YES' : '✗ NO'}`);
    });
    console.log('─'.repeat(100));

    // Check for duplicate hashes
    const hashMap = new Map<string, number[]>();
    imageDetails.forEach(img => {
        if (!hashMap.has(img.hash)) {
            hashMap.set(img.hash, []);
        }
        hashMap.get(img.hash)!.push(img.rowNumber);
    });

    console.log(`\n🔍 UNIQUE IMAGE HASHES: ${hashMap.size}`);
    hashMap.forEach((rows, hash) => {
        if (rows.length > 1) {
            console.log(`⚠️ DUPLICATE IMAGE (hash: ${hash}...) found at rows: ${rows.join(', ')}`);
        }
    });

    // Get product rows
    console.log('\n📦 PRODUCTS:');
    console.log('─'.repeat(100));

    const productRows: any[] = [];
    for (let rowNumber = headerRowNumber + 1; rowNumber <= Math.min(headerRowNumber + 20, worksheet.rowCount); rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        const modelNumber = cellToString(row.getCell(modelNumberCol)).trim();

        if (modelNumber) {
            const hasImage = imageDetails.some(img => img.rowNumber === rowNumber && img.inImageColumn);
            const imageInfo = imageDetails.find(img => img.rowNumber === rowNumber && img.inImageColumn);

            productRows.push({ rowNumber, modelNumber, hasImage, imageHash: imageInfo?.hash });

            console.log(`Row ${rowNumber}: ${modelNumber}`);
            console.log(`  Has image: ${hasImage ? '✓ YES' : '✗ NO'}${imageInfo ? ` (hash: ${imageInfo.hash}...)` : ''}`);
        }
    }
    console.log('─'.repeat(100));

    // Summary
    console.log('\n📊 SUMMARY:');
    console.log(`Total images in Excel: ${images.length}`);
    console.log(`Images in correct column: ${imageDetails.filter(img => img.inImageColumn).length}`);
    console.log(`Unique image hashes: ${hashMap.size}`);
    console.log(`Products found: ${productRows.length}`);
    console.log(`Products with images: ${productRows.filter(p => p.hasImage).length}`);

    if (hashMap.size === 1 && images.length > 1) {
        console.log('\n⚠️ WARNING: ALL IMAGES ARE IDENTICAL! The Excel file has the same image repeated multiple times.');
    }
};

const main = async () => {
    const filePath = process.argv[2] || 'input.xlsx';

    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
    }

    await diagnoseExcel(filePath);
};

main().catch(console.error);
