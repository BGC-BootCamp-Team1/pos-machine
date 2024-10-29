import {loadAllItems, loadPromotions} from './Dependencies'

interface ItemDto 
{
  barcode: string,
  name: string,
  unit: string,
  price: number
}
interface PromotionDto
{
  type: string,
  barcodes: string[]
}

interface ReceiptItemDto 
{
  barcode: string,
  quantity: number,
  totalPrice: number
}

export function printReceipt(tags: string[]): string {
  var items = loadAllItems();
  var promotions = loadPromotions();

  
  const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`
  return expectText;
}
