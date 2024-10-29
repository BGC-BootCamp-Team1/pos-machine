import { loadAllItems } from "./Dependencies";
import { IProduct } from "./IProduct";

export function createTradeProduct(tags:string[]): IProduct[] {
  const allProducts = loadAllItems();
  const tradeProducts: IProduct[] = [];
  tags = tags.map((tag) => tag.split('-')[0]);
  console.log(tags)
  for (let tag of tags) {
    
    let item = allProducts.find((product) => product.barcode === tag);
    if (item) {
      // console.log("start -------------")
      // console.log(item)
      tradeProducts.push(item);
    }
  }
  return tradeProducts;
}
