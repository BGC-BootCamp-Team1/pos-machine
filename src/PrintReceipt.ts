import {loadAllItems, loadPromotions} from './Dependencies'
import { Item, Promotion, ReceiptItem } from './Model'

export function printReceipt(tags: string[]): string {
  let allItems: Item[] = loadAllItems();
  let allPromotions: Promotion[] = loadPromotions();
  let allReceipts = genAllReceipt(allItems, tags);
  let discountedReceipts: ReceiptItem[] = checkPromotion(allReceipts, allPromotions);
  let renderedReceipts: string = render(discountedReceipts);
  return renderedReceipts
}
export function genAllReceipt(allItems: Item[], tags: string[]): Map<string, ReceiptItem> {

  const itemMap = new Map<string, ReceiptItem>();

  tags.forEach(tag => {
    const [barcode, quantityStr] = tag.split('-');
    const quantity = quantityStr ? parseFloat(quantityStr) : 1;

    if (itemMap.has(barcode)) {
      const receiptItem = itemMap.get(barcode)!;
      receiptItem.quantity += quantity;
      receiptItem.subtotal = receiptItem.quantity * receiptItem.unitMoney; 
    } 
    else {
      const item = allItems.find(item => item.barcode === barcode);
      if (item) {
        const newReceiptItem: ReceiptItem = {
          name: item.name,
          quantity: quantity,
          unitName: item.unit,
          unitMoney: item.price,
          subtotal: quantity * item.price 
        };
        itemMap.set(barcode, newReceiptItem);
      }
    }
  });

  return itemMap

}

export function checkPromotion(itemMap: Map<string, ReceiptItem>, allPromotions: Promotion[]): ReceiptItem[] {
  for (const promotion of allPromotions) {
    if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      promotion.barcodes.forEach(barcode => {
        if (itemMap.has(barcode)) {
          const receiptItem = itemMap.get(barcode)!;
          const freeItems = Math.floor(receiptItem.quantity / 3);
          receiptItem.subtotal = (receiptItem.quantity - freeItems) * receiptItem.unitMoney;
        }
      });
    }
  }
  return Array.from(itemMap.values());
}

export function render(allReceipts: ReceiptItem[]): string {
  let total = 0;
  let discountedTotal = 0;
  const lines = [];

  lines.push('***<store earning no money>Receipt ***');

  allReceipts.forEach(receipt => {
    const line = `Name：${receipt.name}，Quantity：${receipt.quantity} ${receipt.unitName}s，Unit：${receipt.unitMoney.toFixed(2)}(yuan)，Subtotal：${receipt.subtotal.toFixed(2)}(yuan)`;
    lines.push(line);
    total += receipt.subtotal;
    discountedTotal += receipt.quantity * receipt.unitMoney;
  });

  lines.push('----------------------');

  lines.push(`Total：${total.toFixed(2)}(yuan)`);
  lines.push(`Discounted prices：${(discountedTotal - total).toFixed(2)}(yuan)`);

  lines.push('**********************');

  return lines.join('\n');
}
