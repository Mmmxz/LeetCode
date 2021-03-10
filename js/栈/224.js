// 224. 基本计算器
// 实现一个基本的计算器来计算一个简单的字符串表达式 s 的值。

 

// 示例 1：

// 输入：s = "1 + 1"
// 输出：2
// 示例 2：

// 输入：s = " 2-1 + 2 "
// 输出：3
// 示例 3：

// 输入：s = "(1+(4+5+2)-3)+(6+8)"
// 输出：23
 

// 提示：

// 1 <= s.length <= 3 * 105
// s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
// s 表示一个有效的表达式

/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
  // nums 存储数字 ops 存储操作
  const nums = [0], ops = [], n = s.length
  for (let i = 0; i < n; i++) {
    const char = s[i]
    if (char === ' ') {
      continue
    } else if (char === '(') {
      // 左括号直接入栈
      ops.push(char)
    } else if (char === ')') {
      // 计算到碰到最近一个左括号为止
      while (ops.length) {
        const op = ops[ops.length - 1]
        if (op !== '(') {
          cal(nums, ops)
        } else {
          // 碰到左括号 停止计算 将其出栈
          ops.pop()
          break
        }
      }
    } else if (char === '+' || char === '-') {
      // 操作入栈之前 计算当前能计算的 直到遇到左括号或者没有操作
      while (ops.length && ops[ops.length - 1] !== '(') {
        cal(nums, ops)
      }
      // 放入ops
      ops.push(char)
    } else {
      // 取数字 向后遍历直到不是数字
      let num = Number(char)
      let j = i + 1
      while (j < n && ![' ', '+', '-', '(', ')'].includes(s[j])) {
        num = num * 10 + Number(s[j])
        j++
      }
      i = j - 1
      nums.push(num)
    }
  }
  while (ops.length) {
    cal(nums, ops)
  }
  return nums[nums.length - 1]
};

const cal = (nums, ops) => {
  // 当数字有2个以上且有操作时 进行计算
  if (nums.length > 1 && ops.length) {
    // 取一个符号 2个数字计算结果并入栈
    const op = ops.pop()
    const num2 = nums.pop(), num1 = nums.pop()
    let result = 0
    if (op === '+') {
      result = num2 + num1
    } else {
      result = num1 - num2
    }
    nums.push(result)
  }
}