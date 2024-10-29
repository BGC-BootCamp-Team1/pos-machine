// import { parseTags } from "./parseTags";
import { loadAllItems, loadPromotions } from "./Dependencies";
import { GetIProductList } from "./GetIProductList";
import { GetItemQuantity } from "./GetItemQuantity";
import { IProduct } from "./IProduct";
import { UpdateIProductList } from "./UpdateIProductList";

export function printReceipt(tags: string[]): string {
  // const tradeProducts = parseTags(tags);
  const quantityMap = GetItemQuantity(tags);
  const initialIProductList = GetIProductList(quantityMap);
  const finalProducts = UpdateIProductList(initialIProductList);
  let out: string = render(finalProducts);
  // out = render(tradeProducts.tradeProducts, tradeProducts.totalDiscount);

  return out;
}

// function render(tradeProducts: IProduct[], discount: number): string {
function render(finalProducts: IProduct[]): string {
  let totalPrice = 0;
  let totalDiscount = 0;
  let receiptItems = "";

  for (let item of finalProducts) {
    totalPrice += item.subtotal;
    totalDiscount += item.subdiscount;
    receiptItems += `Name：${item.name}，Quantity：${item.quantity} ${
      item.unit
    }${item.quantity > 1 ? "s" : ""}，Unit：${item.price.toFixed(
      2
    )}(yuan)，Subtotal：${item.subtotal.toFixed(2)}(yuan)\n`;
  }

  let totalPriceStr = totalPrice.toFixed(2);
  let totalDiscountStr = totalDiscount.toFixed(2);

  return `***<store earning no money>Receipt ***
${receiptItems}----------------------
Total：${totalPriceStr}(yuan)
Discounted prices：${totalDiscountStr}(yuan)
**********************`;
}
