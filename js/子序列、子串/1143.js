// 1143. 最长公共子序列
// 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

// 若这两个字符串没有公共子序列，则返回 0。

 

// 示例 1:

// 输入：text1 = "abcde", text2 = "ace" 
// 输出：3  
// 解释：最长公共子序列是 "ace"，它的长度为 3。
// 示例 2:

// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc"，它的长度为 3。
// 示例 3:

// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0。
 

// 提示:

// 1 <= text1.length <= 1000
// 1 <= text2.length <= 1000
// 输入的字符串只含有小写英文字符。

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// 解法 1 ：动态规划 自顶向下
var longestCommonSubsequence = function(text1, text2) {
  const len1 = text1.length, len2 = text2.length
  // 备忘录
  const memo = new Array(len1).fill(0).map(() => new Array(len2).fill(-1))
  const dp = function(str1, i, str2, j) {
    if (i === str1.length || j === str2.length) {
      return 0
    }
    if (memo[i][j] !== -1) {
      return memo[i][j]
    }
    if (str1[i] === str2[j]) {
      memo[i][j] = 1 + dp(str1, i + 1, str2, j + 1)
    } else {
      // 两个字符有一个属于公共子序列 || 都不属于
      memo[i][j] = Math.max(
        dp(str1, i + 1, str2, j),
        dp(str1, i, str2, j + 1)
        // 都不属于的情况 长度一定小于有一个属于的情况 所以求最大值时无需计算 已经包含在上述情况中
      )
    }
    return memo[i][j]
  }

  // dp[i][j] 代表 text1-[i...] text2[j...] 的公共子序列长度
  return dp(text1, 0, text2, 0)
};

