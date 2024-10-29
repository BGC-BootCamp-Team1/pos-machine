import { parseTags } from "./parseTags";
import { loadAllItems, loadPromotions } from "./Dependencies";
import { IProduct } from "./IProduct";
// import { getReciptContent } from './getReciptContent';

export function printReceipt(tags: string[]): string {
  const tradeProducts = parseTags(tags);
  let out: string = "";
  out = render(tradeProducts.tradeProducts, tradeProducts.totalDiscount);
  return out;

  
}

function render(tradeProducts: IProduct[], discount: number): string {
  let totalPrice = 0;
  let receiptItems = "";

  for (let item of tradeProducts) {
    totalPrice += item.subtotal;
    receiptItems += `Name：${item.name}，Quantity：${item.quantity} ${
      item.unit
    }${item.quantity > 1 ? "s" : ""}，Unit：${item.price.toFixed(
      2
    )}(yuan)，Subtotal：${item.subtotal.toFixed(2)}(yuan)\n`;
  }

 
  let totalPriceStr = totalPrice.toFixed(2);
  let totalDiscountStr = discount.toFixed(2);

  return `***<store earning no money>Receipt ***
${receiptItems}----------------------
Total：${totalPriceStr}(yuan)
Discounted prices：${totalDiscountStr}(yuan)
**********************`;
}
