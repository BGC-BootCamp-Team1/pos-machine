import {calculateTotalPriceOneFree, convert2Map, printReceipt} from '../src/PrintReceipt'

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

  it('should convert2Map', () => {
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
    const expectList = [
      {
        barcode:"ITEM000001",
        count:5
      },
      {
        barcode:"ITEM000003",
        count:2.5
      },
      {
        barcode:"ITEM000005",
        count:3
      }
    ]
    let map = convert2Map(tags);

    for (const item of expectList) {
      expect(map.get(item.barcode)).toEqual(item.count);
    }
    expect(map.size).toEqual(expectList.length);
  })

  it('Test calculateTotalPriceOneFree', () => {
    let DiscountedPrices = calculateTotalPriceOneFree(100,7);
    let exp = 500;

    expect(DiscountedPrices).toEqual(exp);


  })



})
