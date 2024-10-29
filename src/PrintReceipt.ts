import { loadAllItems, loadPromotions } from "./Dependencies";
import { ItemDto, Promotion, ReceiptItem } from "./Models";

export function printReceipt(tags: string[]): string {
  const itemData: ItemDto[] = loadAllItems() as ItemDto[];
  let receiptItems: ReceiptItem[] = readReceiptItemsFromTags(tags, itemData);
  const promotions: Promotion[] = loadPromotions() as Promotion[];
  receiptItems = calculateSubtotal(receiptItems, promotions)
  const receipt: string = renderReceipt(receiptItems);
  return receipt;
}

function readReceiptItemsFromTags(
  tags: string[],
  itemData: ItemDto[]
): ReceiptItem[] {
  return [];
}

function renderReceipt(receiptItems: ReceiptItem[]): string {
  return "";
}

function calculateSubtotal(receiptItems: ReceiptItem[], promotions: Promotion[]):ReceiptItem[] {
  return [];
}