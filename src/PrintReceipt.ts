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
  const receiptItems = generateReceiptItems(itemCount, promotions, itemData);
  const receipt: string = renderReceipt(receiptItems);
  return receipt;
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
  itemCount: ItemCount,
  promotions: Promotion[],
  itemData: ItemDto[]
) {
  return [];
}

function renderReceipt(receiptItems: ReceiptItem[]): string {
  return "";
}
