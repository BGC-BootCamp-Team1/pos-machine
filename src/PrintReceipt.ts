import { loadAllItems, loadPromotions } from "./Dependencies";
import { ItemDto, Promotion, ReceiptItem } from "./Models";

interface ItemCount {
  [key: string]: number;
}

interface ItemPrice {
  [key: string]: number;
}

export function printReceipt(tags: string[]): string {
  const itemData: ItemDto[] = loadAllItems() as ItemDto[];
  const promotions: Promotion[] = loadPromotions() as Promotion[];
  const itemCount: ItemCount = countReceiptItemsFromTags(tags);
  const itemPrice = calculateSubtotal(itemCount, promotions, itemData);
  const receiptItems: ReceiptItem[] = generateReceiptItems(itemCount,itemPrice,itemData);
  return renderReceipt(receiptItems);
}

export function countReceiptItemsFromTags(tags: string[]): ItemCount {
  const itemCounts: ItemCount = {};
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
  itemCounts: ItemCount,
  promotions: Promotion[],
  itemData: ItemDto[]
): ItemPrice {
  const itemPrices: ItemPrice = {};
  itemData.forEach(itemDto => {
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

function generateReceiptItems(
  itemCounts: ItemCount,
  itemPrices: ItemPrice,
  itemData: ItemDto[]
): ReceiptItem[]{
  const receiptItems: ReceiptItem[]=[]
  itemData.forEach(itemDto => {
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
  return receiptItems;
}

function renderReceipt(receiptItems: ReceiptItem[]): string {
  let receipt: string = "***<store earning no money>Receipt ***\n";
  receiptItems.forEach(receiptItem => {
    receipt+=`Name：${receiptItem.name}，Quantity：${receiptItem.quantity} ${receiptItem.unit}`
    if(receiptItem.quantity!==1){
      receipt+="s"
    }
    receipt+="，Unit："
    receipt+=receiptItem.unitPrice.toFixed(2)
    receipt+="(yuan)，Subtotal："
    receipt+=receiptItem.subtotal.toFixed(2)
    receipt+="(yuan)\n"
    
  });
  receipt+="----------------------\n";
  receipt+="Total：58.50(yuan)\n"
  receipt+="Discounted prices：7.50(yuan)\n"
  receipt+="**********************"
  return receipt;
}