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
    Name: string;
    Quantity: Decimal;
    Unit:number;
    unit:string;
    Subtotal:Decimal;
}