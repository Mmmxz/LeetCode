// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：

// 1.左括号必须用相同类型的右括号闭合。
// 2.左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

// 示例 1:

// 输入: "()"
// 输出: true
// 示例 2:

// 输入: "()[]{}"
// 输出: true
// 示例 3:

// 输入: "(]"
// 输出: false
// 示例 4:

// 输入: "([)]"
// 输出: false
// 示例 5:

// 输入: "{[]}"
// 输出: true

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-parentheses
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  // 1.用数组来实现栈 pop 表示出栈 push 表示入栈
  let stack = []
  // 2.用对象来匹配闭合的括号
  const hash = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  for (let char of s) {
    if (char === '(' || char === '[' || char === '{') {
      // 3.左括号放入栈中
      stack.push(char)
    } else {
      // 4.栈中有元素时 右括号与当前栈顶元素匹配
      if (stack.length) {
        // stack has item
        // stack top item
        const top = stack.pop()
        // 4.1.栈顶元素与当前元素不匹配 直接返回 false
        if (char !== hash[top]) {
          return false
        }
      // 5.栈为空 当前有右括号 直接返回 false
      } else {
        // stack is empty
        return false
      }
    }
  }
  // 6.如果循环结束后 栈中仍有元素 返回 false
  if (stack.length) {
    return false
  }
  return true
};