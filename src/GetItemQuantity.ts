export function GetItemQuantity(tags: string[]): Map<string, number> {
  const tagCountMap = new Map<string, number>();

  for (const tag of tags) {
    if (tag.includes("-")) {
      const [key, value] = tag.split("-");
      const numericValue = parseFloat(value);

      if (tagCountMap.has(key)) {
        tagCountMap.set(key, tagCountMap.get(key)! + numericValue);
      } else {
        tagCountMap.set(key, numericValue);
      }
    } else {
      if (tagCountMap.has(tag)) {
        tagCountMap.set(tag, tagCountMap.get(tag)! + 1);
      } else {
        tagCountMap.set(tag, 1);
      }
    }
  }

  return tagCountMap;
}
