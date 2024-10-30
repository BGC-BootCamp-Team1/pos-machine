import { loadAllItems, loadPromotions } from "../src/Dependencies";

describe('printReceipt', () => {
  it('should load items from in memory data', () => {
    const items = loadAllItems();
    expect(6).toEqual(items.length);
  })
  
  it('should load promotions from in memory data', () => {
    const promotions = loadPromotions();
    expect(1).toEqual(promotions.length);
  })
})
