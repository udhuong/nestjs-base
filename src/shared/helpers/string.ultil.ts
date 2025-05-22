/* eslint-disable */

/**
 * Viết hoa chữ cái đầu tiên của chuỗi
 * @param str
 */
export function toUpperFirst(str: string): string {
  if (str.length === 0) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}
