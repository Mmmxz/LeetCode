// 415. 字符串相加
// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

 

// 提示：

// num1 和num2 的长度都小于 5100
// num1 和num2 都只包含数字 0-9
// num1 和num2 都不包含任何前导零
// 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  // 从后往前遍历 记录进位
  let ans = ''
  let i = num1.length - 1, j = num2.length - 1
  let ten = 0 // 记录进位
  while (i >= 0 || j >= 0) {
    let sum = 0
    if (i >= 0 && j >= 0) {
      sum = Number(num1[i]) + Number(num2[j]) + ten
      i--
      j--
    } else if (i >= 0) {
      sum = Number(num1[i]) + ten
      i--
    } else {
      // j>=0
      sum = Number(num2[j]) + ten
      j--
    }
    // 每次用完进位ten 记得重置回0
    if (sum > 9) {
      ten = Math.floor(sum / 10)
      sum %= 10
    } else {
      ten = 0
    }
    ans = sum + ans
  }
  if (ten) {
    ans = ten + ans
  }
  return ans
};
