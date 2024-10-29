import {loadAllItems, loadPromotions} from './Dependencies'
import {Decimal} from 'decimal.js';
import {Item, ItemMetaData, MetaData, Promotion} from "./Model";

export function convert2Map(tags: string[]) {
  const map = new Map<string,number>();
  for (const tag of tags) {
    let quantity:number = 0;
    const barcode:string = tag.split('-')[0];
    if(tag.split('-').length <= 1) {
      quantity = 1;
    }else {
      quantity = Number( tag.split('-')[1] );
    }
    if(map.has(barcode)) {
      map.set(barcode, quantity+map.get(barcode)!);
    }else {
      map.set(barcode, quantity);
    }
  }
  return map;
}


export function generateReceiptMetaData(map: Map<string, number>,
                                        itemList:Item[],
                                        promotionList: Promotion[])
    :MetaData {
  const metaData:MetaData={
    DiscountedPrices: new Decimal(0),
    Total: new Decimal(0),
    items: []
  }
  const promotion = promotionList[0];

  for (const [key, value] of map) {
    const item :Item=itemList.find(obj => obj.barcode === key) as Item;

    const itemMetaData:ItemMetaData = {
      Name: item.name,
      Quantity: new Decimal(value) ,
      Unit:item.price,
      unit:item.unit,
      Subtotal:new Decimal(0)
    }

    if(promotion.barcodes.includes(key)){
      //disc
      const subTotal= calculateTotalPriceOneFree(item.price,value);

      itemMetaData.Subtotal = itemMetaData.Subtotal.add( subTotal);

      metaData.DiscountedPrices = metaData.DiscountedPrices.add(item.price*value-subTotal);
      metaData.Total =metaData.Total.add(subTotal);
    }else {
      itemMetaData.Subtotal = itemMetaData.Subtotal.add(item.price*value);
      metaData.Total = metaData.Total.add(item.price*value);
    }

    metaData.items.push(itemMetaData)
  }
  return metaData;
}

export function render(metaData: MetaData) {
  let receipt:string = "";
  receipt+=`***<store earning no money>Receipt ***\n`
  for(const item of metaData.items) {
    receipt+=`Name：${item.Name}，Quantity：${item.Quantity} ${item.unit}s，Unit：${item.Unit.toFixed(2)}(yuan)，Subtotal：${item.Subtotal.toFixed(2)}(yuan)\n`
  }
  receipt+=`----------------------\nTotal：${metaData.Total.toFixed(2)}(yuan)\nDiscounted prices：${metaData.DiscountedPrices.toFixed(2)}(yuan)\n**********************`

  return receipt;
}

export function printReceipt(tags: string[]): string {
  const itemList = loadAllItems() as Item[];
  const promotionList = loadPromotions();
  let map :Map<string,number> =convert2Map(tags)
  const metaData:MetaData = generateReceiptMetaData(map,itemList,promotionList);
  return render(metaData)
}

export function calculateTotalPriceOneFree(price: number, quantity: number): number {
  const actualQuantityToPay = Math.ceil(quantity / 3 * 2);
  return actualQuantityToPay * price;
}
