/* eslint-disable */
export function mapToObject(map: Map<any, any>): Record<string, any> {
  const obj = {};
  for (const [key, value] of map.entries()) {
    obj[key] = value; // Bạn có thể cần .toJSON() hoặc custom chuyển class về plain object ở đây
  }
  return obj;
}

// let delay = 5000;
//
// let timerId = setTimeout(function request() {
//   /*... gửi request lên server...*/
//
//   if (/* mã lỗi trả về liên quan đến server quá tải */) {
//     // tăng delay lên hai lần
//     delay *= 2;
//   }
//
//   // chạy lại setTimeout với giá trị delay mới
//   timerId = setTimeout(request, delay);
//
// }, delay);
