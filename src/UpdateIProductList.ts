import { loadPromotions } from "./Dependencies";
import { IProduct } from "./IProduct";

export function UpdateIProductList(products: IProduct[]): IProduct[] {
//   let PromotedProduct: IProduct[] = products;
  const promotions = loadPromotions();
  const promoBarcodes = new Set<string>();

  // Get all promo barcodes
  promotions.forEach((promo) => {
    promo.barcodes.forEach((barcode) => promoBarcodes.add(barcode));
  });

  return products.map((product) => {
    if (promoBarcodes.has(product.barcode) && product.quantity > 2) {
      const updatedSubtotal = (product.quantity - 1) * product.price;
      return {
        ...product,
        subtotal: updatedSubtotal,
        subdiscount: product.price ,
      };
    }

    return product;
  });

  //   return PromotedProduct;
}
