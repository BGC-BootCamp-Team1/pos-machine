import { loadAllItems, loadPromotions } from "./Dependencies";
import { IProduct } from "./IProduct";

export function GetIProductList(quantityMap: Map<string, number>): IProduct[] {
  const products: IProduct[] = [];
  const allItems = loadAllItems();
  const promotions = loadPromotions();

  for (const [barcode, quantity] of quantityMap) {
    const newItem = allItems.find((item) => item.barcode === barcode);
    
    if (newItem) {
      const subtotal = newItem.price * quantity;
      const product = {
        barcode,
        name: newItem.name,
        unit: newItem.unit,
        price: newItem.price,
        quantity,
        subtotal,
      };
      products.push(product);
    }
  }
  return products;
}
