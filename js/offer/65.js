// 剑指 Offer 65. 不用加减乘除做加法
// 写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

 

// 示例:

// 输入: a = 1, b = 1
// 输出: 2
 

// 提示：

// a, b 均可能是负数或 0
// 结果不会溢出 32 位整数

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function(a, b) {
  while (b !== 0) { // 当进位为0时跳出
    let c = (a & b) << 1 // c=进位
    a ^= b // 非进位和
    b = c // b=进位
  }
  return a
};
