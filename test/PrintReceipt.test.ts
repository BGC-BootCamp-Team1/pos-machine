import { loadAllItems, loadPromotions } from '../src/Dependencies'
import { Item, Promotion, ReceiptItem } from '../src/Model'
import {genAllReceipt, printReceipt, checkPromotion, render} from '../src/PrintReceipt'

describe('printReceipt', () => {
  it('should print receipt with promotion when print receipt', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ]

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`

    expect(printReceipt(tags)).toEqual(expectText)
  })

  it('should return itemMap when genAllReceipt', ()=>{
    let allItems: Item[] = loadAllItems();
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-3.5',
    ]
    const expectedMap: Map<string, ReceiptItem> = new Map([ 
      ['ITEM000001', { name: 'Sprite', quantity: 2, unitName: 'bottle', unitMoney: 3.00, subtotal: 6.00 }],
      ['ITEM000003', { name: 'Litchi', quantity: 3.5, unitName: 'pound', unitMoney: 15.00, subtotal: 52.50 }]
    ])
    expect(genAllReceipt(allItems, tags)).toEqual(expectedMap)
  })

  it('should return Promoted Receipts when checkPromotion', ()=>{
    let allPromotions: Promotion[] = loadPromotions();
    const receiptsMap: Map<string, ReceiptItem> = new Map([ 
      ['ITEM000001', { name: 'Sprite', quantity: 4, unitName: 'bottle', unitMoney: 3.00, subtotal: 12.00 }],
      ['ITEM000003', { name: 'Litchi', quantity: 3.5, unitName: 'pound', unitMoney: 15.00, subtotal: 52.50 }]
    ])
    let discountedReceipts: ReceiptItem[] = checkPromotion(receiptsMap, allPromotions);
    const expectReceipts = 
    [
      { name: 'Sprite', quantity: 4, unitName: 'bottle', unitMoney: 3.00, subtotal: 9.00 },
      { name: 'Litchi', quantity: 3.5, unitName: 'pound', unitMoney: 15.00, subtotal: 52.50 }
    ]
    expect(checkPromotion(receiptsMap, allPromotions)).toEqual(expectReceipts)
  })

  it('should return rendered receipts when render',()=>{
    const receipts = 
    [
      { name: 'Sprite', quantity: 4, unitName: 'bottle', unitMoney: 3.00, subtotal: 9.00 },
      { name: 'Litchi', quantity: 3.5, unitName: 'pound', unitMoney: 15.00, subtotal: 52.50 }
    ]
    const expectRenderedReceipts = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：4 bottles，Unit：3.00(yuan)，Subtotal：9.00(yuan)
Name：Litchi，Quantity：3.5 pounds，Unit：15.00(yuan)，Subtotal：52.50(yuan)
----------------------
Total：61.50(yuan)
Discounted prices：3.00(yuan)
**********************`
    expect(render(receipts)).toEqual(expectRenderedReceipts)
  })
})
