// 69. x 的平方根
// 实现 int sqrt(int x) 函数。

// 计算并返回 x 的平方根，其中 x 是非负整数。

// 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

// 示例 1:

// 输入: 4
// 输出: 2
// 示例 2:

// 输入: 8
// 输出: 2
// 说明: 8 的平方根是 2.82842..., 
//      由于返回类型是整数，小数部分将被舍去。

/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function(x) {
  // 找到平方小于x的最大数
  let left = 1, right = x
  // 在循环条件为 l <= h 并且循环退出时，h 总是比 l 小 1，也就是说 h = 2，l = 3，因此最后的返回值应该为 h 而不是 l。
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left
    const mul = mid * mid
    if (mul === x) {
      return mid
    } else if (mul < x) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return right
};