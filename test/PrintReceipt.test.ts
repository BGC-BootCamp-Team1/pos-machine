import { loadAllItems, loadPromotions } from '../src/Dependencies'
import {applyPromotion, printReceipt, ReceiptItemDto, recordQuantityAndCalcPrice} from '../src/PrintReceipt'

const items = loadAllItems();

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

})

describe('recordQuantity', () => {
  const items = loadAllItems();
  it('should return empty given empty tags', () => {
    expect(recordQuantityAndCalcPrice([], items)).toEqual([]);
  })

  it('should return 2 ReceiptItemDto with correct quantity', () => {
    const tags = ["ITEM000001", "ITEM000005"];
    const expectedReceptItems: ReceiptItemDto[] = [
      {
        barcode: "ITEM000001",
        quantity: 1,
        totalPrice: 3
      },
      {
        barcode: "ITEM000005",
        quantity: 1,
        totalPrice: 4.5
      }
    ];
    expect(recordQuantityAndCalcPrice(tags, items)).toEqual(expectedReceptItems);
  })

  
  it('should increase quantity with same barcode', () => {
    const tags = ["ITEM000001", "ITEM000005", "ITEM000001"];
    const expectedReceptItems: ReceiptItemDto[] = [
      {
        barcode: "ITEM000001",
        quantity: 2,
        totalPrice: 6
      },
      {
        barcode: "ITEM000005",
        quantity: 1,
        totalPrice: 4.5
      }
    ];
    expect(recordQuantityAndCalcPrice(tags, items)).toEqual(expectedReceptItems);
  })

  it('should deserialize weigh barcode', () => {
    const tags = ["ITEM000001", "ITEM000005", "ITEM000001-1.5"];
    const expectedReceptItems: ReceiptItemDto[] = [
      {
        barcode: "ITEM000001",
        quantity: 2.5,
        totalPrice: 7.5
      },
      {
        barcode: "ITEM000005",
        quantity: 1,
        totalPrice: 4.5
      }
    ];
    expect(recordQuantityAndCalcPrice(tags, items)).toEqual(expectedReceptItems);
  })

})

describe('applyPromotion', () => {
  const promotions = loadPromotions();
  it('should return 0 discount with no items in promotion', () => {
    const receiptItems : ReceiptItemDto[] = [
      {
        barcode: 'ITEM000004',
        quantity: 1,
        totalPrice: 1,
      }
    ]
    expect(applyPromotion(receiptItems, promotions)).toBe(0);
  })
})

