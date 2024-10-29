import {loadAllItems, loadPromotions} from './Dependencies'
import {Decimal} from 'decimal.js';
import {MetaData, Item, ItemMetaData} from "./Model";

export function convert2Map(tags: string[]) {
  let map = new Map<string,number>();
  for (let tag of tags) {
    let quantity:number = 0;
    let barcode:string = tag.split('-')[0];
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
                                        promotionList: { type: string; barcodes: string[] }[])
    :MetaData {
  let metaData:MetaData={
    DiscountedPrices: new Decimal(0),
    Total: new Decimal(0),
    items: []
  }
  let promotion = promotionList[0];

  for (let [key, value] of map) {
    let item :Item=itemList.find(obj => obj.barcode === key) as Item;

    let itemMetaData:ItemMetaData = {
      Name: item.name,
      Quantity: new Decimal(value) ,
      Unit:item.price,
      unit:item.unit,
      Subtotal:new Decimal(0)
    }

    if(promotion.barcodes.includes(key)){
      //disc
      let subTotal= calculateTotalPriceOneFree(item.price,value);

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
  for(let item of metaData.items) {
    receipt+=`Name：${item.Name}，Quantity：${item.Quantity} ${item.unit}s，Unit：${item.Unit.toFixed(2)}(yuan)，Subtotal：${item.Subtotal.toFixed(2)}(yuan)\n`
  }
  receipt+=`----------------------\nTotal：${metaData.Total.toFixed(2)}(yuan)\nDiscounted prices：${metaData.DiscountedPrices.toFixed(2)}(yuan)\n**********************`

  return receipt;
}

export function printReceipt(tags: string[]): string {
  let itemList = loadAllItems() as Item[];
  let promotionList = loadPromotions();
  let map :Map<string,number> =convert2Map(tags)
  let metaData:MetaData = generateReceiptMetaData(map,itemList,promotionList);
  let expectText:string = render(metaData);
  return expectText
}

export function calculateTotalPriceOneFree(price: number, quantity: number): number {
  const actualQuantityToPay = Math.ceil(quantity / 3 * 2);
  return actualQuantityToPay * price;
}
