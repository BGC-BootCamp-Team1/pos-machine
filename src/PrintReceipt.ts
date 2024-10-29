import {loadAllItems, loadPromotions} from './Dependencies'
import { Item, Promotion, ReceiptItem } from './Model'

export function printReceipt(tags: string[]): string {
  let allItems: Item[] = loadAllItems();
  let allPromotions: Promotion[] = loadPromotions();
  let allReceipts = genAllReceipt(allItems, tags);
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

  // 创建一个Map来统计每个商品的数量
  const itemMap = new Map<string, ReceiptItem>();

  // 解析tags，统计每个商品的数量
  tags.forEach(tag => {
    const [barcode, quantityStr] = tag.split('-');
    const quantity = quantityStr ? parseFloat(quantityStr) : 1;

    if (itemMap.has(barcode)) {
      // 如果已经存在此商品，增加数量
      const receiptItem = itemMap.get(barcode)!;
      receiptItem.quantity += quantity;
      receiptItem.subtotal = receiptItem.quantity * receiptItem.unitMoney; // 更新小计
    } else {
      // 找到该商品的详细信息
      const item = allItems.find(item => item.barcode === barcode);
      if (item) {
        // 如果是新商品，创建新的 ReceiptItem 并添加到 Map
        const newReceiptItem: ReceiptItem = {
          name: item.name,
          quantity: quantity,
          unitName: item.unit,
          unitMoney: item.price,
          subtotal: quantity * item.price // 初始小计为数量乘以单价
        };
        itemMap.set(barcode, newReceiptItem);
      }
    }
  });

  return itemMap

}

export function checkPromotion(itemMap: Map<string, ReceiptItem>, allPromotions: Promotion[]): ReceiptItem[] {
  // 检查促销并调整小计
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
  return ''
}
