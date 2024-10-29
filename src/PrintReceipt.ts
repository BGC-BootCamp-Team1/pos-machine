import {loadAllItems, loadPromotions} from './Dependencies'
import { Item, Promotion, ReceiptItem } from './Model'

export function printReceipt(tags: string[]): string {
  let allItems:Item[] = loadAllItems();
  let allPromotions:Promotion[] =loadPromotions();
  let allReceipts:ReceiptItem[] = genAllReceipt(allItems,allPromotions);
  let renderedReceipts:string = render(allReceipts);
  return `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`
}
export function genAllReceipt(allItems:Item[], allPromotions:Promotion[]): ReceiptItem[]{
  
  return []
} 

function render(allReceipts: ReceiptItem[]): string {

  return ''
}
