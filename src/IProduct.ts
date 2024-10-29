export interface IProduct {
  barcode: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface ICount{
    barcode: string;
    quantity: number;
}