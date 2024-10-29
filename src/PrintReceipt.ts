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

function renderReceipt(receiptItems: ReceiptItem[]): string {
  return "";
}

function calculateSubtotal(
  itemCount: ItemCount,
  promotions: Promotion[],
  itemData: ItemDto[]
): ItemPrice {
  throw new Error("Function not implemented.");
}
function generateReceiptItems(
  itemCount: ItemCount,
  promotions: Promotion[],
  itemData: ItemDto[]
) {
  return [];
}
