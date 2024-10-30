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
  totalPrice: number;
}

export function printReceipt(tags: string[]): string {
  const items: ItemDto[] = loadAllItems();
  const promotions: PromotionDto[] = loadPromotions();

  const receiptItems: ReceiptItemDto[] = recordQuantityAndCalcPrice(
    tags,
    items
  );

  const discount = applyPromotion(receiptItems, promotions);

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
    resText += `Subtotal：${receiptItem.totalPrice.toFixed(2)}(yuan)\n`;

    totalPrice += receiptItem.totalPrice;
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
  const promotion = promotions[0];
  for (let item of receiptItems) {
    if (promotion.barcodes.includes(item.barcode)) {
      const freeAmount = Math.floor(item.quantity / 3);
      const discount = (item.totalPrice / item.quantity) * freeAmount;
      item.totalPrice = item.totalPrice - discount;
      allDiscount += discount;
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
    let deserializeTag = deserializeTagToReceiptItem(tag);
    const existItem = res.find((i) => i.barcode === deserializeTag.barcode);
    if (existItem) {
      existItem.quantity = deserializeTag.quantity + existItem.quantity;
      existItem.totalPrice =
        existItem.quantity * findUnitPrice(deserializeTag.barcode, items);
    } else {
      const unitPrice = findUnitPrice(deserializeTag.barcode, items);
      deserializeTag.totalPrice = deserializeTag.quantity * unitPrice;

      res.push(deserializeTag);
    }
  }
  return res;
}

function findUnitPrice(tag: string, items: ItemDto[]): number {
  var target = items.find((item) => item.barcode === tag);
  if (!target) return 0;
  return target.price;
}

function deserializeTagToReceiptItem(tag: string): ReceiptItemDto {
  if (tag.includes("-")) {
    const splitTag = tag.split("-");
    return {
      barcode: splitTag[0],
      quantity: Number.parseFloat(splitTag[1]),
      totalPrice: 0,
    };
  } else {
    return {
      barcode: tag,
      quantity: 1,
      totalPrice: 0,
    };
  }
}
