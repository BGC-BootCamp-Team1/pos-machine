
export interface Item
{
  barcode: string;
  name: string;
  unit: string;
  price: number
}
export interface ReceiptItem
{
  name:string;
  quantity:number;
  unitName: string;
  unitMoney: number;
  subtotal: number
}
export interface Promotion
{
  type: string,
  barcodes: string[]
}