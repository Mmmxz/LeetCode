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
  // 在状态转移方程中，我们是从长度较短的字符串向长度较长的字符串进行转移的，因此一定要注意动态规划的循环顺序。
  // 要注意求的顺序 如果外层i 内层j 则先求 00 01 02 03 04 此时无法求得内部如 13 是否是回文 所以不可取
  // 如果外层j 内层i 则先求 00 01 11 02 12 22
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

/**
 * @param {string} s
 * @return {string}
 */
// 解法 2 ：中心扩散法
 var longestPalindrome = function(s) {
  const len = s.length
  if (len < 2) {
    return s
  }

  let ans = ''
  const helper = (m, n) => {
    while (m >= 0 && n < len && s[m] === s[n]) {
      // 扩散
      m -= 1
      n += 1
    }
    // 循环完毕时 [m,n]区间的mn对应字符不是相等的 相等的是 [m+1, n-1]
    if (n - 1 - (m + 1) + 1 > ans.length) {
      ans = s.slice((m + 1), (n - 1) + 1)
    }
  }
  for (let i = 0; i < len; i++) {
    // 如果最长为偶数
    helper(i, i + 1)
    // 如果最长为奇数
    helper(i, i)
  }
  return ans
};