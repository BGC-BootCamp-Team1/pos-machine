import { loadAllItems, loadPromotions } from "./Dependencies";
import { ItemDto, Promotion, Receipt, ReceiptItem } from "./Models";

interface ItemCountDictionary {
  [barcode: string]: number;
}

interface ItemPriceDictionary {
  [barcode: string]: number;
}

export function printReceipt(tags: string[]): string {
  const itemDtos: ItemDto[] = loadAllItems() as ItemDto[];
  const promotions: Promotion[] = loadPromotions() as Promotion[];
  const itemCounts: ItemCountDictionary = countReceiptItemsFromTags(tags);
  const itemPrices: ItemPriceDictionary = calculateSubtotal(itemCounts, promotions, itemDtos);
  const receipt: Receipt = generateReceipt(itemCounts,itemPrices,itemDtos);
  return renderReceipt(receipt);
}

export function countReceiptItemsFromTags(tags: string[]): ItemCountDictionary {
  const itemCounts: ItemCountDictionary = {};
  tags.forEach((item) => {
    let [barcode, quantityStr] = item.split("-");
    let quantity = quantityStr ? parseFloat(quantityStr) : 1;

    if (itemCounts[barcode]) {
      itemCounts[barcode] += quantity;
    } else {
      itemCounts[barcode] = quantity;
    }
  });
  return itemCounts;
}
export function calculateSubtotal(
  itemCounts: ItemCountDictionary,
  promotions: Promotion[],
  itemDtos: ItemDto[]
): ItemPriceDictionary {
  const itemPrices: ItemPriceDictionary = {};
  itemDtos.forEach(itemDto => {
    const barcode = itemDto.barcode;
    if (itemCounts.hasOwnProperty(barcode)) {
      let quantity = itemCounts[barcode];
      let price = itemDto.price;
      if (promotions[0].type === 'BUY_TWO_GET_ONE_FREE' && 
        promotions[0].barcodes.includes(barcode)) {
        const freeItems = Math.floor(quantity / 3);
        quantity -= freeItems;
      }
      itemPrices[barcode] = quantity * price;
    }
  });

  return itemPrices;
}

export function generateReceipt(
  itemCounts: ItemCountDictionary,
  itemPrices: ItemPriceDictionary,
  itemDtos: ItemDto[]
): Receipt{
  const receiptItems: ReceiptItem[]=[]
  itemDtos.forEach(itemDto => {
    const barcode = itemDto.barcode;
    if (itemCounts.hasOwnProperty(barcode) && itemPrices.hasOwnProperty(barcode)) {
      receiptItems.push({
          name: itemDto.name,
          quantity: itemCounts[barcode],
          unitPrice: itemDto.price,
          unit: itemDto.unit,
          subtotal: itemPrices[barcode]
      })
    }
  });
  const total = calculateTotalAfterDiscount(receiptItems);
  const discountedPrice = calculateTotalBeforeDiscount(receiptItems)-total;
  const receipt: Receipt={
    receiptItems: receiptItems,
    total: total,
    discountedPrice: discountedPrice
  }
  return receipt;
}

export function renderReceipt(receipt: Receipt): string {
  let receiptString: string = "***<store earning no money>Receipt ***\n";
  receipt.receiptItems.forEach(receiptItem => {
    receiptString+=`Name：${receiptItem.name}，Quantity：${receiptItem.quantity} ${receiptItem.unit}`
    if(receiptItem.quantity!==1){
      receiptString+="s"
    }
    receiptString+=`，Unit：${receiptItem.unitPrice.toFixed(2)}(yuan)，Subtotal：${receiptItem.subtotal.toFixed(2)}(yuan)\n`
  });
  receiptString += `----------------------
Total：${receipt.total.toFixed(2)}(yuan)
Discounted prices：${receipt.discountedPrice.toFixed(2)}(yuan)
**********************`
  return receiptString;
}

function calculateTotalAfterDiscount(receiptItems: ReceiptItem[]): number{
  let total: number = 0.00;
  receiptItems.forEach(receiptItem => {
    total+= receiptItem.subtotal;
  });
  return total;
}

function calculateTotalBeforeDiscount(receiptItems: ReceiptItem[]): number{
  let total: number = 0.00;
  receiptItems.forEach(receiptItem => {
    total+= receiptItem.unitPrice*receiptItem.quantity;
  });
  return total;
}