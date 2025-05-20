/* eslint-disable */

function power(a, b) {
  // điều kiện dừng đệ quy
  if (b === 0) {
    return 1;
  }

  // gọi lại chính nó
  return a * power(a, b - 1);
}

/**
 * Tổng các số từ 1 đến n
 * @param n
 */
function sumTo(n) {
  if (n === 1) {
    return 1;
  }
  return (n += sumTo(n - 1));
}

/**
 * Tính giai thừa của n
 * @param n
 */
function factorial(n) {
  if (n === 0) return 1;

  return n * factorial(n - 1);
}

/**
 * Tính số Fibonacci thứ n
 * Số Fibonacci là các số trong một dãy số đặc biệt, trong đó mỗi số là tổng của hai số liền trước
 * 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
 * @param n
 */
function fibonacci(n) {
  if (n === 0 || n === 1) return n;

  return fibonacci(n - 1) + fibonacci(n - 2);
}
