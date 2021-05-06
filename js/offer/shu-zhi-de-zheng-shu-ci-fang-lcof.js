// 剑指 Offer 16. 数值的整数次方
// 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。

 

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
 

// 注意：本题与主站 50 题相同：https://leetcode-cn.com/problems/powx-n/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
 var myPow = function(x, n) {
  // 递归
  // 如果n == 0，返回1
  // 如果n < 0，最终结果为 1/x^{-n}
  // 如果n为奇数，最终结果为 x * x ^ {n - 1}
  // 如果n为偶数，最终结果为 x ^ {2*(n/2)}
  if (n === 0) {
    return 1
  } else if (n < 0) {
    return 1 / (x * myPow(x, -n - 1))
  } else if (n % 2 === 1) {
    // 奇数
    return x * myPow(x, n - 1)
  } else {
    return myPow(x * x, n / 2)
  }
};

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
 var myPow = function(x, n) {
  //  迭代
  if (x === 0) return 0
  let res = 1
  // n 是负数时 转化为正数
  if (n < 0) {
    x = 1 / x
    n = -n
  }
  while (n > 0) {
    // 二进制最后一位为 1 时 需要额外乘一个 x
    if (n & 1 === 1) {
      res *= x
    }
    x *= x
    // 无符号右移
    n >>>= 1
  }
  return res
};