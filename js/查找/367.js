// 367. 有效的完全平方数
// 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。

// 进阶：不要 使用任何内置的库函数，如  sqrt 。

 

// 示例 1：

// 输入：num = 16
// 输出：true
// 示例 2：

// 输入：num = 14
// 输出：false
 

// 提示：

// 1 <= num <= 2^31 - 1

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
  // x * x = num
  let low = 1, high = num
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low
    const res = mid * mid
    if (res === num) {
      return true
    } else if (res > num) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return false
};
