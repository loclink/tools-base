/**
 * 首字母转大写字符串
 * @param message 需要转换的字符串
 * @returns 
 */
const firstUpperCase = (message: string) => {
  return message.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};

export { firstUpperCase };
