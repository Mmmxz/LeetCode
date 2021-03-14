// 5. 最长回文子串
// 给你一个字符串 s，找到 s 中最长的回文子串。

 

// 示例 1：

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：

// 输入：s = "cbbd"
// 输出："bb"
// 示例 3：

// 输入：s = "a"
// 输出："a"
// 示例 4：

// 输入：s = "ac"
// 输出："a"
 

// 提示：

// 1 <= s.length <= 1000
// s 仅由数字和英文字母（大写和/或小写）组成

/**
 * @param {string} s
 * @return {string}
 */
// 解法 1 ：动态规划 1340ms
 var longestPalindrome = function(s) {
  // dp[i][j]代表以[i,j]的最长回文子串
  const n = s.length
  let ans = ''
  const dp = new Array(n).fill(false).map(() => new Array(n).fill(false))
  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      // 什么情况下是回文
      if (i === j) {
        dp[i][j] = true
      } else if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true
      } else if (j - i > 1 && s[i] === s[j] && dp[i + 1][j - 1] ) {
        dp[i][j] = true
      }
      if (dp[i][j] === true && j - i + 1 > ans.length) {
        ans = s.slice(i, j + 1)
      }
    }
  }
  return ans
};