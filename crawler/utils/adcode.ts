export function getValueByKey(input: string, key: string): string {
  // 将字符串按照 ";" 分割成数组
  const pairs = input.split(';');

  // 遍历数组，查找键值对
  for (const pair of pairs) {
    // 将每一个键值对按照 "=" 分割
    const [k, v] = pair.split('=');

    // 如果找到了对应的 key，就返回它的值
    if (k === key) {
      return v;
    }
  }

  // 如果找不到对应的 key，就返回 null
  return '';
}
