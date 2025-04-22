export function mapToObject(map: Map<any, any>): Record<string, any> {
  const obj = {};
  for (const [key, value] of map.entries()) {
    obj[key] = value; // Bạn có thể cần .toJSON() hoặc custom chuyển class về plain object ở đây
  }
  return obj;
}
