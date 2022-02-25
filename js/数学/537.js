// 537. 复数乘法
// 复数 可以用字符串表示，遵循 "实部+虚部i" 的形式，并满足下述条件：

// 实部 是一个整数，取值范围是 [-100, 100]
// 虚部 也是一个整数，取值范围是 [-100, 100]
// i2 == -1
// 给你两个字符串表示的复数 num1 和 num2 ，请你遵循复数表示形式，返回表示它们乘积的字符串。

 

// 示例 1：

// 输入：num1 = "1+1i", num2 = "1+1i"
// 输出："0+2i"
// 解释：(1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i ，你需要将它转换为 0+2i 的形式。
// 示例 2：

// 输入：num1 = "1+-1i", num2 = "1+-1i"
// 输出："0+-2i"
// 解释：(1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i ，你需要将它转换为 0+-2i 的形式。 
 

// 提示：

// num1 和 num2 都是有效的复数表示。

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var complexNumberMultiply = function(num1, num2) {
  // (a+bi)(c+di)=(ac−bd)+(bc+ad)i
  const convert = (num) => {
    let a = 0, b = 0, neg = false, isA = true
    for (let i = 0; i < num.length; i++) {
      if (num[i] === '-') {
        neg = true
      } else if (num[i] === '+' || num[i] === 'i') {
        if (neg) {
          if (isA) {
            a *= -1
          } else {
            b *= -1
          }
        }
        isA = neg = false
      } else if (isA) {
        a = 10 * a + num[i].charCodeAt() - '0'.charCodeAt()
      } else {
        b = 10 * b + num[i].charCodeAt() - '0'.charCodeAt()
      }
    }
    return [a, b]
  }
  const n1 = convert(num1), n2 = convert(num2)
  return '' + (n1[0] * n2[0] - n1[1] * n2[1]) + '+' + (n1[1] * n2[0] + n1[0] * n2[1]) + 'i'
};
