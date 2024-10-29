import { Type } from 'path-scurry';

import { countTag } from "./countItem";
import { loadAllItems, loadPromotions } from "./Dependencies";
import { ICount, IProduct } from "./IProduct";

export function parseTags(tags: string[]) {
  const allProducts = loadAllItems();
  const tradeProducts: IProduct[] = [];
  const realtag = tags.map((tag) => tag.split("-")[0]);
  
  

  const quantityMap:Map<string,number> = countTag(tags);
  // const promotionList:number[] = whetherEngagePromotion(tags);
  const res = calcSubTotal(quantityMap);
  const subtotalMap = res.SubTotal;
  const totalDiscount = res.totalDiscount;
  

  for (let tag of tags) {
    let item = allProducts.find((product) => product.barcode === tag);
    if (item) {
      // let tradeProduct: IProduct = {
      //   barcode: item.barcode,
      //   name: item.name,
      //   unit: item.unit,
      //   // quantity: quantityList.shift(),
      //   price: item.price,
    }
  }
  for(let [key,val] of quantityMap){
    let itemIProduct: IProduct ={
      barcode: key,
      name: allProducts.find(product => product.barcode === key)?.name as string,
      unit: allProducts.find(product => product.barcode === key)?.unit as string,
      price: allProducts.find(product => product.barcode === key)?.price as number,
      quantity: val,
      subtotal: subtotalMap.get(key) as number,
    };
    tradeProducts.push(itemIProduct)
  }
  return {tradeProducts, totalDiscount};
}


function calcSubTotal(quantityMap:Map<string,number>) {
  const SubTotal = new Map<string, number>()
  let allItems = loadAllItems();
  let totalDiscount = 0
  for ( let [barcode, quantity] of quantityMap) {
    const item = allItems.find(item => item.barcode == barcode)
    const singlePrice: number = item? item.price : 9999
    let subDiscount = 0
    let isPromotion = false
    let allPromotions = loadPromotions()
    if (allPromotions[0].barcodes.includes(barcode)) {
      isPromotion = true
    }
    if (isPromotion) {
      subDiscount = singlePrice * Math.floor(quantity/3)
    }
    totalDiscount += subDiscount
    let subtotal = singlePrice * quantity - subDiscount
    SubTotal.set(barcode, subtotal)
  }
  return {SubTotal:SubTotal, totalDiscount:totalDiscount}
}