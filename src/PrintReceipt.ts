import { loadAllItems, loadPromotions } from "./Dependencies";

interface ItemDto {
  barcode: string;
  name: string;
  unit: string;
  price: number;
}
interface PromotionDto {
  type: string;
  barcodes: string[];
}

export interface ReceiptItemDto {
  barcode: string;
  quantity: number;
  subTotalPrice: number;
}

export function printReceipt(tags: string[]): string {
  const items: ItemDto[] = loadAllItems();
  const promotions: PromotionDto[] = loadPromotions();

  const receiptItems: ReceiptItemDto[] = recordQuantityAndCalcPrice(
    tags,
    items
  );

  const discount: number = applyPromotion(receiptItems, promotions);

  const resultText = render(receiptItems, items, discount);

  return resultText;
}

export function render(
  receiptItems: ReceiptItemDto[],
  allItems: ItemDto[],
  discount: number
): string {
  let resText = `***<store earning no money>Receipt ***\n`;
  let totalPrice = 0;
  for (let receiptItem of receiptItems) {
    const itemDescription = allItems.find(
      (i) => i.barcode === receiptItem.barcode
    );
    resText += `Name：${itemDescription?.name}，`;
    resText += `Quantity：${receiptItem.quantity} ${itemDescription?.unit}s，`;
    resText += `Unit：${itemDescription?.price.toFixed(2)}(yuan)，`;
    resText += `Subtotal：${receiptItem.subTotalPrice.toFixed(2)}(yuan)\n`;

    totalPrice += receiptItem.subTotalPrice;
  }
  resText += "----------------------\n";
  resText += `Total：${totalPrice.toFixed(2)}(yuan)\n`;
  resText += `Discounted prices：${discount.toFixed(2)}(yuan)\n`;
  resText += `**********************`;

  return resText;
}

export function applyPromotion(
  receiptItems: ReceiptItemDto[],
  promotions: PromotionDto[]
): number {
  let allDiscount = 0;
  for (let promotion of promotions)
  {
    for (let item of receiptItems) {
      if (promotion.barcodes.includes(item.barcode)) {
        const freeAmount = Math.floor(item.quantity / 3);
        const discount = (item.subTotalPrice / item.quantity) * freeAmount;
        item.subTotalPrice = item.subTotalPrice - discount;
        allDiscount += discount;
      }
    }
  }
  
  return allDiscount;
}

export function recordQuantityAndCalcPrice(
  tags: string[],
  items: ItemDto[]
): ReceiptItemDto[] {
  const res: ReceiptItemDto[] = [];
  for (let tag of tags) {
    let receiptItems = parseTag(tag);
    const existItem = res.find((i) => i.barcode === receiptItems.barcode);
    if (existItem) {
      existItem.quantity = receiptItems.quantity + existItem.quantity;
      existItem.subTotalPrice =
        existItem.quantity * getItemUnitPriceByBarcode(receiptItems.barcode, items);
    } else {
      const unitPrice = getItemUnitPriceByBarcode(receiptItems.barcode, items);
      receiptItems.subTotalPrice = receiptItems.quantity * unitPrice;

      res.push(receiptItems);
    }
  }
  return res;
}

function getItemUnitPriceByBarcode(tag: string, items: ItemDto[]): number {
  var target = items.find((item) => item.barcode === tag);
  if (!target) return 0;
  return target.price;
}

function parseTag(tag: string): ReceiptItemDto {
  if (tag.includes("-")) {
    const splitTag = tag.split("-");
    return {
      barcode: splitTag[0],
      quantity: Number.parseFloat(splitTag[1]),
      subTotalPrice: 0,
    };
  } else {
    return {
      barcode: tag,
      quantity: 1,
      subTotalPrice: 0,
    };
  }
}
