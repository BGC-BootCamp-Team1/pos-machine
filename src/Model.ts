import {Decimal} from "decimal.js";

export interface Item {
    barcode: string;
    name: string;
    unit: string;
    price: number;
}


export interface MetaData{
    items:ItemMetaData[]
    Total:Decimal;
    DiscountedPrices:Decimal;
}

export interface ItemMetaData{
    name: string;
    quantity: Decimal;
    unitNumber:number;
    unitName:string;
    subtotal:Decimal;
}

export interface Promotion
{
    type: string;
    barcodes: string[]
}