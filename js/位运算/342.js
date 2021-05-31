// 342. 4的幂
// 给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 true ；否则，返回 false 。

// 整数 n 是 4 的幂次方需满足：存在整数 x 使得 n == 4x

 

// 示例 1：

// 输入：n = 16
// 输出：true
// 示例 2：

// 输入：n = 5
// 输出：false
// 示例 3：

// 输入：n = 1
// 输出：true
 

// 提示：

// -231 <= n <= 231 - 1
 

// 进阶：

// 你能不使用循环或者递归来完成本题吗？

/**
 * @description 循环
 * @param {number} n
 * @return {boolean}
 */
 var isPowerOfFour = function(n) {
  if (n <= 0) {
    return false
  }
  while (n % 4 === 0) {
    n /= 4
  }
  return n === 1
};

/**
 * @description 循环
 * @param {number} n
 * @return {boolean}
 */
 var isPowerOfFour = function(n) {
  // 判断是否2的偶数次幂
  if (n <= 0) {
    return false
  }
  let count = 0 // 用来计算是2的多少次幂
  while (n % 2 === 0) {
    count++
    n /= 2
  }
  return n === 1 && count % 2 === 0
};

/**
 * @description 性质
 * @param {number} n
 * @return {boolean}
 */
 var isPowerOfFour = function(n) {
  if (n <= 0) {
    return false
  }
  // 4的幂的特性 从低位0开始 偶数位为1 如4->100 16>10000
  // 找到一个31位的二进制数 满足奇数位为1 偶数位为0 转化为16进制为 0x55555555
  // 将4的幂与这个二进制数& 得到的仍然是本身
  // 如果是8->1000和二进制& 得到的是0
  // 如果是20->10100和二进制& 得到的仍然是20 但它不是4的幂 也不是2的幂
  // 由以上规律可知 先判断是否为2的幂 然后再判断&1010101010是否是本身即可
  if ((n & (n - 1)) !== 0) {
    // 不是2的幂
    return false
  }
  return (n & 0x55555555) === n
};