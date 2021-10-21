// 66. 加一
// 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

// 你可以假设除了整数 0 之外，这个整数不会以零开头。

 

// 示例 1：

// 输入：digits = [1,2,3]
// 输出：[1,2,4]
// 解释：输入数组表示数字 123。
// 示例 2：

// 输入：digits = [4,3,2,1]
// 输出：[4,3,2,2]
// 解释：输入数组表示数字 4321。
// 示例 3：

// 输入：digits = [0]
// 输出：[1]
 

// 提示：

// 1 <= digits.length <= 100
// 0 <= digits[i] <= 9

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    digits[i] += 1
    digits[i] %= 10
    if (digits[i] !== 0) {
      // 说明最后一位不是9 直接返回结果
      return digits
    }
  }
  // 走到这里 说明都是9
  digits.unshift(1)
  return digits
};

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  // [9,9,9] -> [1,0,0,0] 考虑最多100位数字相加 所以不能用数字运算
  // [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]
  let ten = 0 // 进位
  for (let i = digits.length - 1; i >= 0; i--) {
    if (i === digits.length - 1) {
      digits[i] += 1
      if (digits[i] > 9) {
        ten = Math.floor(digits[i] / 10)
        digits[i] %= 10
      }
    } else {
      // 如果有ten 则需要进位
      if (ten) {
        digits[i] += ten
        if (digits[i] > 9) {
          ten = Math.floor(digits[i] / 10)
          digits[i] %= 10
        } else {
          ten = 0
          break
        }
      }
    }
  }
  // 如果循环完毕 ten存在
  if (ten) {
    digits.unshift(ten)
  }
  return digits
};
