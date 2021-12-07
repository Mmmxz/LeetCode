// 22. 括号生成
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

 

// 示例 1：

// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
// 示例 2：

// 输入：n = 1
// 输出：["()"]
 

// 提示：

// 1 <= n <= 8

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let res = []
  dfs('', n, n, res)
  return res
};

// str-当前的字符串 left-左括号数量 right-右括号数量 res-保存答案
const dfs = (str, left, right, res) => {
  if (left == 0 && right == 0) {
    res.push(str)
    return
  }
  if (left > right) {
    return
  }
  if (left > 0) {
    dfs(str + '(', left - 1, right, res)
  }
  if (right > 0) {
    dfs(str + ')', left, right - 1, res)
  }
}

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  // 思路，dfs
  let res = []
  const dfs = (left, right, cur) => {
    if (left == n && right == n) {
      res.push(cur)
      return
    }
    // 什么时候剪枝 当左小于右 一定不对
    if (left < right) {
      return
    }
    if (left < n) {
      dfs(left + 1, right, cur + '(')
    }
    if (right < n) {
      dfs(left, right + 1, cur + ')')
    }
  }
  dfs(0, 0, '')
  return res
};
