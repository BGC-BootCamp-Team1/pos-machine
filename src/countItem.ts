import { ICount } from "./IProduct";

export function countItem(tags: string[]):ICount[] {
  // 定义一个数组来存储结果
  const result: number[] = [];

  // 定义一个对象来统计每个商品的数量
  const itemCount: { [key: string]: number } = {};

  // 遍历 tags 数组并统计数量
  tags.forEach((tag) => {
    // 分割字符串，获得 ITEM 的标识符
    const [itemId, quantityStr] = tag.split("-");

    // 如果有数量信息，提取它并计算
    if (quantityStr) {
      const quantity = parseFloat(quantityStr);
      if (itemCount[itemId]) {
        itemCount[itemId] += quantity; // 累加数量
      } else {
        itemCount[itemId] = quantity; // 初始化数量
      }
    } else {
      // 无数量信息的情况
      if (itemCount[itemId]) {
        itemCount[itemId]++;
      } else {
        itemCount[itemId] = 1;
      }
    }
  });

  


  return itemCount as ICount[]; // 输出: [5, 2.5, 1]
}
