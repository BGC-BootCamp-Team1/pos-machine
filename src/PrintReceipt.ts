import { loadAllItems, loadPromotions } from "./Dependencies";
import { ItemDto, ReceiptItem } from "./Models";

export function printReceipt(tags: string[]): string {
  const itemData: ItemDto[] = loadAllItems() as ItemDto[];
  const receiptItems: ReceiptItem[] = generateReceiptItems(tags, itemData);
  const receipt: string = renderReceipt(receiptItems);
  return `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`;
}

function generateReceiptItems(
  tags: string[],
  itemData: ItemDto[]
): ReceiptItem[] {
  return [];
}

function renderReceipt(receiptItems: ReceiptItem[]): string {
  return "";
}
