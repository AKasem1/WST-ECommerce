declare module 'xlsx-populate' {
    interface Cell {
        value(): any;
        value(value: any): Cell;
    }

    interface Row {
        cell(columnNumber: number): Cell;
    }

    interface ImageAnchor {
        from: {
            row: number;
            col: number;
        };
        to?: {
            row: number;
            col: number;
        };
    }

    interface Image {
        anchor(): ImageAnchor;
        data(): Buffer;
    }

    interface Range {
        value(): any[][];
    }

    interface Sheet {
        name(): string;
        usedRange(): Range | undefined;
        row(rowNumber: number): Row;
        cell(address: string): Cell;
        cell(rowNumber: number, columnNumber: number): Cell;
        images(): Image[];
    }

    interface Workbook {
        sheets(): Sheet[];
        sheet(name: string): Sheet | undefined;
        sheet(index: number): Sheet | undefined;
    }

    function fromFileAsync(path: string): Promise<Workbook>;
    function fromDataAsync(data: Buffer | ArrayBuffer): Promise<Workbook>;
    function fromBlankAsync(): Promise<Workbook>;

    export = {
        fromFileAsync,
        fromDataAsync,
        fromBlankAsync
    };
}
