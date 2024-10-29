export interface ItemDto{
    barcode: string,
    name: string,
    unit: string,
    price: number
}
export interface ReceiptItem{
    name: string,
    quantity: string,
    unit: string,
    subtotal: number
}