import { loadAllItems, loadPromotions } from '../src/Dependencies'
import { ItemDto, ReceiptItem, Promotion, Receipt } from '../src/Models'
import {calculateSubtotal, countReceiptItemsFromTags, generateReceipt, printReceipt, renderReceipt} from '../src/PrintReceipt'

const itemData: ItemDto[] = loadAllItems() as ItemDto[];
const promotions: Promotion[] = loadPromotions() as Promotion[];

describe('countReceiptItemsFromTags', () => {
  it('should return correct counts', () => {
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
    expect(countReceiptItemsFromTags(tags)).toEqual({ ITEM000001: 5, ITEM000003: 2.5, ITEM000005: 3 })
  })
})

describe('calculateSubtotal', () => {
  it('should return correct prices', () => {
    const itemCounts = { ITEM000001: 5, ITEM000003: 2.5, ITEM000005: 3 };
    expect(calculateSubtotal(itemCounts,promotions,itemData)).toEqual({ ITEM000001: 12.00, ITEM000003: 37.50, ITEM000005: 9.00 })
  })
})

describe('generateReceipt', () => {
  it('should return total receipt', () => {
    const itemCounts = { ITEM000001: 5, ITEM000003: 2.5};
    const itemPrices = { ITEM000001: 12.00, ITEM000003: 37.50}
    const expectedReceipt: Receipt = {
      receiptItems: [{
        name: "Sprite",
        quantity: 5,
        unit: "bottle",
        unitPrice: 3.00,
        subtotal: 12.00
      },
      {
        name: "Litchi",
        quantity: 2.5,
        unit: "pound",
        unitPrice: 15.00,
        subtotal: 37.50
      }
    ],
      total: 49.50,
      discountedPrice: 3.00}
    expect(generateReceipt(itemCounts,itemPrices,itemData)).toEqual(expectedReceipt)
  })
})

describe('renderReceipt', () => {
  it('should render receipt', () => {
    const receipt: Receipt = {
      receiptItems: [{
        name: "Sprite",
        quantity: 5,
        unit: "bottle",
        unitPrice: 3.00,
        subtotal: 12.00
      },
      {
        name: "Litchi",
        quantity: 2.5,
        unit: "pound",
        unitPrice: 15.00,
        subtotal: 37.50
      }
    ],
      total: 49.50,
      discountedPrice: 3.00}
    const expectedReceiptString: string = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
----------------------
Total：49.50(yuan)
Discounted prices：37.50(yuan)
**********************`
    expect(renderReceipt(receipt)).toEqual(expectedReceiptString)
  })
})

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
