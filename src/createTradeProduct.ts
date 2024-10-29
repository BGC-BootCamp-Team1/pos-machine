import { countItem } from "./countItem";
import { loadAllItems } from "./Dependencies";
import { ICount, IProduct } from "./IProduct";

export function createTradeProduct(tags: string[]): IProduct[] {
  const allProducts = loadAllItems();
  const tradeProducts: IProduct[] = [];
  const realtag = tags.map((tag) => tag.split("-")[0]);
  
  const quantityList:ICount[]= countItem(tags);

  

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
  return tradeProducts;
}
