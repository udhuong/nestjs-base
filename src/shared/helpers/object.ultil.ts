/* eslint-disable */

/**
 * So sánh 2 object nông
 * @param obj1
 * @param obj2
 */
export function isShallowEqual(obj1, obj2) {
  for (let prop in obj1) {
    if (obj1[prop] !== obj2[prop]) return false;
  }

  for (let prop in obj2) {
    if (obj2[prop] !== obj1[prop]) return false;
  }

  return true;
}

export function isObject(obj) {
  return obj != null && typeof obj === 'object';
}

/**
 * So sánh 2 object có thể lồng nhau hoặc dùng lodash: _.isEqual
 * @param obj1
 * @param obj2
 *
 */
export function isDeepEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1); // trả về mảng các thuộc tính của obj1
  const keys2 = Object.keys(obj2); // trả về mảng các thuộc tính của obj2

  // nếu số lượng keys khác nhau thì chắc chắn khác nhau
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    // kiểm tra xem hai giá trị có cùng là object hay không
    const areObjects = isObject(val1) && isObject(val2);

    // nếu cùng là object thì phải gọi đệ quy để so sánh 2 object
    if (areObjects && !isDeepEqual(val1, val2)) {
      return false;
    }

    // nếu không cùng là object thì so sánh giá trị
    if (!areObjects && val1 !== val2) {
      return false;
    }
  }

  return true;
}

/**
 * Copy object sâu
 * - có giới hạn là nó sẽ bỏ qua thuộc tính mà giá trị của nó là hàm
 * - dùng thư viện _.cloneDeep(value)
 * @param obj
 */
export function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function cloneObject(obj) {
  return Object.assign({}, obj);
}

export function cloneDeepObject(obj) {
  return Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
}
