
export interface Item
{
  barcode: string;
  name: string;
  unit: string;
  price: number
}
export interface ReceiptItem
{
    Name:string;
    Quantity:number;
    UnitName: string;
    Unit: number;
    Subtotal: number
}
export interface Promotion
{
  type: string,
  barcodes: string[]
}