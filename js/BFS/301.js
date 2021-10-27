// 301. 删除无效的括号
// 给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。

// 返回所有可能的结果。答案可以按 任意顺序 返回。

 

// 示例 1：

// 输入：s = "()())()"
// 输出：["(())()","()()()"]
// 示例 2：

// 输入：s = "(a)())()"
// 输出：["(a())()","(a)()()"]
// 示例 3：

// 输入：s = ")("
// 输出：[""]
 

// 提示：

// 1 <= s.length <= 25
// s 由小写英文字母以及括号 '(' 和 ')' 组成
// s 中至多含 20 个括号

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
  let level = new Set()
  level.add(s)
  while (true) {
    // 过滤不合法的
    let valid = Array.from(level).filter(str => isValid(str))
    if (valid.length > 0) {
      return valid
    }
    // 下一层
    let nextLevel = new Set()
    for (const str of level) {
      // 每次移除一个括号
      for (let i = 0; i < str.length; i++) {
        if (str[i] === '(' || str[i] === ')') {
          nextLevel.add(str.slice(0, i) + str.slice(i + 1))
        }
      }
    }
    level = nextLevel
    // 全部括号都被移除依然不符合，跳出循环
    if (level.length === 0) {
      return []
    }
  }
};

const isValid = (str) => {
  let cnt = 0
  for (const char of str) {
    if (char === '(') cnt++
    if (char === ')') cnt--
    if (cnt < 0) return false
  }
  return cnt === 0
}
