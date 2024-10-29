import {loadAllItems, loadPromotions} from './Dependencies'
import Decimal from 'decimal.js';

function convert2Map(tags: string[]) {
  let map = new Map<string,Decimal>();
  for (let tag of tags) {
    let quantity:Decimal;
    let barcode:string = tag.split('-')[0];
    if(tag.split('-').length <= 1) {
      quantity = new Decimal(1);
    }else {
      quantity = new Decimal(tag.split('-')[1]);
    }
    if(map.has(barcode)) {
      map.set(barcode, quantity.add(map.get(barcode)!));
    }else {
      map.set(barcode, quantity);
    }
  }
  return map;
}

interface MetaData{
  Name: string;
  Quantity: number;
  Unit:string;
  Subtotal:Decimal;
  Total:Decimal;
  DiscountedPrices:Decimal;
}

function generateReceiptMetaData(map: Map<string, Decimal>, itemList:any[], promotionList: { type: string; barcodes: string[] }[]) {
  for (let [key, value] of map) {
    console.log(key, value);
  }


  return [];
}

export function printReceipt(tags: string[]): string {
  let itemList = loadAllItems();
  let promotionList = loadPromotions();
  let map :Map<string,Decimal> =convert2Map(tags)
  let metaDataList:MetaData[] = generateReceiptMetaData(map,itemList,promotionList);

  return ''
}
