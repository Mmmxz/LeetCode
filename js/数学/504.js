// 504. 七进制数
// 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。

 

// 示例 1:

// 输入: num = 100
// 输出: "202"
// 示例 2:

// 输入: num = -7
// 输出: "-10"
 

// 提示：

// -107 <= num <= 107

/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(num) {
  const ans = []
  if (num === 0) return '0'
  const sign = num < 0
  if (sign) num = -num
  while (num > 0) {
    ans.push(num % 7 + '')
    num = Math.floor(num / 7)
  }
  if (sign) ans.push('-')
  return ans.reverse().join('')
};
