import {loadAllItems, loadPromotions} from './Dependencies'
import { Item, Promotion, ReceiptItem } from './Model'

export function printReceipt(tags: string[]): string {
  let allItems: Item[] = loadAllItems();
  let allPromotions: Promotion[] = loadPromotions();
  let allReceipts = genAllReceipt(allItems, tags)
  let discountedReceipts: ReceiptItem[] = checkPromotion(allReceipts, allPromotions);
  let renderedReceipts: string = render(discountedReceipts);
  return `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`
}
export function genAllReceipt(allItems: Item[], tags: string[]): Map<string, ReceiptItem> {
  const itemMap = new Map<string, ReceiptItem>();
  return itemMap
}

function checkPromotion(itemMap: Map<string, ReceiptItem>, allPromotions: Promotion[]): ReceiptItem[] {
  return []
}

function render(allReceipts: ReceiptItem[]): string {
  return ''
}
