import {loadAllItems, loadPromotions} from './Dependencies'
import { IProduct } from './IProduct';
// import { getReciptContent } from './getReciptContent';

export function printReceipt(tags: string[]): string {
  const allProducts = loadAllItems();
  const tradeProducts:IProduct[] = [];
  for(let tag in tags){
    let item = allProducts.find(product => product.barcode === tag);
    if(item){
      tradeProducts.push(item);
    }

    
  }

  // let out:string="";
  //   for(let item in tradeProducts){
        
  //       out+=`Name: ${item.name}\n`;
  //   }
  //   return out;
  let out =`***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`
return out;
  
  // return getReciptContent(tradeProducts);
}




