// 227. 基本计算器 II
// 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

// 整数除法仅保留整数部分。

 

// 示例 1：

// 输入：s = "3+2*2"
// 输出：7
// 示例 2：

// 输入：s = " 3/2 "
// 输出：1
// 示例 3：

// 输入：s = " 3+5 / 2 "
// 输出：5
 

// 提示：

// 1 <= s.length <= 3 * 105
// s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
// s 表示一个 有效表达式
// 表达式中的所有整数都是非负整数，且在范围 [0, 231 - 1] 内
// 题目数据保证答案是一个 32-bit 整数

/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
  // 两个栈 一个存数 一个存操作
  const nums = [], ops = [], n = s.length
  // 循环 碰到乘除就先计算 碰到加减直接放入栈中后面统一算
  for (let i = 0; i < n; i++) {
    const char = s[i]
    if (char === ' ') {
      continue
    } else if (char === '*' || char === '/') {
      // 乘除直接计算
      const num1 = nums.pop()
      // 取下一个计算的数
      const {num: num2, index} = nextNum(s, i)
      i = index
      const res = char === '*' ? num1 * num2 : Math.trunc(num1 / num2)
      nums.push(res)
    } else if (char === '+' || char === '-') {
      // 如果是减，将下一个数字改成负数，放入 nums
      if (char === '-') {
        // 将 - 的下一个数字变成负数
        let {num, index} = nextNum(s, i)
        i = index
        nums.push(-num)
      }
      // 加减稍后计算
      ops.push('+')
    } else {
      // 如果是数字，要取全。 i-1 的意思是从 i-1 开始取完整的数字，不包括 i-1
      let {num, index} = nextNum(s, i - 1)
      i = index
      nums.push(num)
    }
  }
  // 计算加法
  while (ops.length) {
    cal(nums, ops)
  }
  return nums.pop()
};

const cal = (nums, ops) => {
  // 计算一次，结果放入 nums
  if (nums.length > 1 && ops.length) {
    const num2 = nums.pop(), num1 = nums.pop(), op = ops.pop()
    const res = op === '+' ? num1 + num2 : num1 - num2
    nums.push(res)
  }
}

// 求出 s 从索引 i 后面的下一位完整数字，不包括 i
const nextNum = (s, i) => {
  const n = s.length
  // 取下一个不为空的连续数
  let j = i + 1
  while (j < n && s[j] === ' ') {
    j++
  }
  let num = Number(s[j])
  j++
  while (j < n && !['+', '-', ' ', '*', '/'].includes(s[j])) {
    num = num * 10 + Number(s[j])
    j++
  }
  // 返回数字和索引， index 用于重置循环的 i
  return {
    num,
    index: j - 1
  }
}