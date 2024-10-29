
import { parseTags } from "./parseTags";
import { loadAllItems, loadPromotions } from "./Dependencies";
import { IProduct } from "./IProduct";
// import { getReciptContent } from './getReciptContent';

export function printReceipt(tags: string[]): string {
  const tradeProducts = parseTags(tags);
  let out: string = "";
  out = render(tradeProducts.tradeProducts,tradeProducts.totalDiscount);
  // for(let item in tradeProducts){

  //     out+=`Name: ${item.name}\n`;
  // }
  // return out;
//   out = `***<store earning no money>Receipt ***
// Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
// Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
// Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
// ----------------------
// Total：58.50(yuan)
// Discounted prices：7.50(yuan)
// **********************`;
  return out;

  // return getReciptContent(tradeProducts);
}

function render(tradeProducts:IProduct[],discount:number):string {

  
  
  let totalPrice = 0;
  let receiptItems = "";

  for(let item of tradeProducts){
    totalPrice += item.subtotal;
    receiptItems+=`Name：${item.name}，Quantity：${item.quantity} ${item.unit}${
      item.quantity > 1 ? "s" : ""
    }，Unit：${item.price.toFixed(2)}(yuan)，Subtotal：${(item.subtotal).toFixed(2)}(yuan)\n`;
  }

  // for (let [barcode, subtotal] of itemSubtotal) {
  //   totalPrice += subtotal;
  //   const item = allItems.find((item) => item.barcode === barcode);
  //   const quantity = itemQuantity.get(barcode);
  //   if (item && quantity !== undefined) {
  //     receiptItems += `Name：${item.name}，Quantity：${quantity} ${item.unit}${
  //       quantity > 1 ? "s" : ""
  //     }，Unit：${item.price.toFixed(2)}(yuan)，Subtotal：${subtotal.toFixed(
  //       2
  //     )}(yuan)\n`;
  //   }
  // }
  let totalPriceStr = totalPrice.toFixed(2);
  let totalDiscountStr = discount.toFixed(2);

  return `***<store earning no money>Receipt ***
${receiptItems}----------------------
Total：${totalPriceStr}(yuan)
Discounted prices：${totalDiscountStr}(yuan)
**********************`;
}
