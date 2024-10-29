
export function countTag(tags: string[]): Map<string, number> {
  // 定义一个数组来存储结果
  //   const result: number[] = [];
  const quantityMap: Map<string, number> = new Map();

  for (let tag of tags) {
    let numberToAdd: number;
    if (!tag.includes("-")) {
      numberToAdd = 1;
    } else {
      let splitedtag = tag.split("-");
      tag = splitedtag[0];
      numberToAdd = parseFloat(splitedtag[1]);
    }

    if (!quantityMap.has(tag)) {
      quantityMap.set(tag, numberToAdd);
    } else {
      quantityMap.set(tag, quantityMap.get(tag)! + numberToAdd);
    }
  }

  return quantityMap;
}
