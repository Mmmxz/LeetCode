// 50. Pow(x, n)
// 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。

 

// 示例 1：

// 输入：x = 2.00000, n = 10
// 输出：1024.00000
// 示例 2：

// 输入：x = 2.10000, n = 3
// 输出：9.26100
// 示例 3：

// 输入：x = 2.00000, n = -2
// 输出：0.25000
// 解释：2-2 = 1/22 = 1/4 = 0.25
 

// 提示：

// -100.0 < x < 100.0
// -231 <= n <= 231-1
// -104 <= xn <= 104

/**
 * @description 快速幂
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (x === 0) {
    return 0
  }
  let res = 1
  if (n < 0) {
    x = 1 / x
    n = -n
  }
  while (n) {
    if (n & 1) {
      // 如果n是奇数
      res *= x
    }
    x *= x
    // 此处要用无符号右移
    n >>>= 1
  }
  return res
};


/**
 * @description 递归
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (n === 0) {
    return 1
  } else if (n < 0) {
    return 1 / x * myPow(1 / x, -n - 1)
  } else {
    if (n % 2 === 1) {
      return x * myPow(x, n - 1)
    } else {
      return myPow(x * x, n / 2)
    }
  }
};
