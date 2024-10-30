export interface ItemDto{
    barcode: string,
    name: string,
    unit: string,
    price: number
}
export interface ReceiptItem{
    name: string,
    quantity: number,
    unit: string,
    unitPrice: number,
    subtotal: number
}

export interface Promotion{
    type: string,
    barcodes: string[];
}

export interface Receipt{
    receiptItems: ReceiptItem[],
    total: number,
    discountedPrice: number
}