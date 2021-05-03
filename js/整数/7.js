// 7. 整数反转
// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

 

// 注意：

// 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 

// 示例 1：

// 输入：x = 123
// 输出：321
// 示例 2：

// 输入：x = -123
// 输出：-321
// 示例 3：

// 输入：x = 120
// 输出：21
// 示例 4：

// 输入：x = 0
// 输出：0
 

// 提示：

// -231 <= x <= 231 - 1

// 解法 1 ：暴力法
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  // 1.将数字取绝对值转换为字符串 然后翻转
  let res = Math.abs(x).toString().split('').reverse().join('')
  // 2.加正负号 判断是否越界
  if (x < 0) {
    res = -res
    res = res < -Math.pow(2, 31) ? 0 : res
  } else {
    res = res > Math.pow(2, 31) ? 0 : res
  }
  return res
};

// 解法 2 ：取余法
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let num = Math.abs(x), res = 0
  // 1.每次取 num 的最后一位 计算到结果中 num 每次除以 10 并取整
  while(num > 0) {
    res = res * 10 + num % 10
    num = Math.trunc(num / 10)
  }
  // 2.加正负号 判断是否越界
  if (x < 0) {
    res = -res
    res = res < -Math.pow(2, 31) ? 0 : res
  } else {
    res = res > Math.pow(2, 31) ? 0 : res
  }
  return res
};

/**
 * @param {number} x
 * @return {number}
 */
// 解法 3 ：双指针
 var reverse = function(x) {
  const MAX = Math.pow(2, 31) - 1, MIN = -Math.pow(2, 31)
  x = x.toString().split('')
  let left = 0, right = x.length - 1
  while (left < right) {
    // 符号位略过
    if (Number.isNaN(Number(x[left]))) {
      left++
    }
    // 交换数字
    let temp = x[left]
    x[left] = x[right]
    x[right] = temp
    left++
    right--
  }
  x = x.join('')
  if (Number(x) < MIN || Number(x) > MAX) {
    return 0
  }
  return Number(x)
};