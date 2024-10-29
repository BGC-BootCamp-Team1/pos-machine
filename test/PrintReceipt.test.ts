
import { GetIProductList } from "../src/GetIProductList";
import { GetItemQuantity } from "../src/GetItemQuantity";
import { IProduct } from "../src/IProduct";

import { printReceipt } from "../src/PrintReceipt";
import { UpdateIProductList } from "../src/UpdateIProductList";

describe("printReceipt", () => {
  it("should print receipt with promotion when print receipt", () => {
    const tags = [
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000003-2.5",
      "ITEM000005",
      "ITEM000005-2",
    ];

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`;

    expect(printReceipt(tags)).toEqual(expectText);
  });
});

// fdescribe("create trade product successfully", () => {
//   it(`should create trade product successfully with tags`, () => {
//     const tags = ["ITEM000001", "ITEM000003-2.5", "ITEM000005", "ITEM000005-2"];

//     const pros = parseTags(tags);
//     expect(pros.length).toBe(4);
//     expect(pros[0].name).toBe("Sprite");
//     expect(pros[0].price).toBe(3.0);
//   });
// });

describe("parseTags", () => {
  it("should parse tags' barcode and quantity successfully", () => {
    const tags = [
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000003-2.5",
      "ITEM000003-3.6",
      "ITEM000005",
      "ITEM000005-2",
    ];
    const result = GetItemQuantity(tags);
    // console.log(result);
      expect(result.size).toBe(3);
      expect(result.get("ITEM000001")).toEqual(5);
      // expect(result.get("ITEM000003")).toEqual(2.5);
      expect(result.get("ITEM000003")).toEqual(6.1);
  });
}); 


describe("getIProductList", () => {
  it("should get IProduct List successfully", () => {
    const tags = [
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000003-2.5",
      "ITEM000003-3.6",
      "ITEM000005",
      "ITEM000005-2",
    ];
    const result = GetItemQuantity(tags);
    const prosresult = GetIProductList(result);
    // console.log(prosresult);

    expect(prosresult.length).toBe(3);

   
    const item = prosresult.find(p => p.barcode === 'ITEM000005');
    expect(item).toBeDefined();
    if (item) {
      expect(item.subtotal).toBe(13.5);
    }

  });
}); 





fdescribe("UpdateIProductList", () => {
  it("should applyPromotions successfully", () => {
    const tags = [
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000003-2.5",
      "ITEM000003-3.6",
      "ITEM000005",
      "ITEM000005-2",
    ];
    const result = GetItemQuantity(tags);
    const prosresult = GetIProductList(result);
    console.log(prosresult);

    expect(prosresult.length).toBe(3);

   
    const item = prosresult.find(p => p.barcode === 'ITEM000005');
    expect(item).toBeDefined();
    if (item) {
      expect(item.subtotal).toBe(13.5);
    }

    const newproducts = UpdateIProductList(prosresult);
    console.log(newproducts);

    expect(newproducts.length).toBe(3);
    const newitem = newproducts.find(p => p.barcode === 'ITEM000001');
    expect(newitem).toBeDefined();
    if (newitem) {
      expect(newitem.subtotal).toBe(12);
      expect(newitem.subdiscount).toBe(3);
    }
    

  });
}); 



