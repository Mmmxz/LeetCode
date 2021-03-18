// 115. 不同的子序列
// 给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。

// 字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

// 题目数据保证答案符合 32 位带符号整数范围。

 

// 示例 1：

// 输入：s = "rabbbit", t = "rabbit"
// 输出：3
// 解释：
// 如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
// (上箭头符号 ^ 表示选取的字母)
// rabbbit
// ^^^^ ^^
// rabbbit
// ^^ ^^^^
// rabbbit
// ^^^ ^^^
// 示例 2：

// 输入：s = "babgbag", t = "bag"
// 输出：5
// 解释：
// 如下图所示, 有 5 种可以从 s 中得到 "bag" 的方案。 
// (上箭头符号 ^ 表示选取的字母)
// babgbag
// ^^ ^
// babgbag
// ^^    ^
// babgbag
// ^    ^^
// babgbag
//   ^  ^^
// babgbag
//     ^^^
 

// 提示：

// 0 <= s.length, t.length <= 1000
// s 和 t 由英文字母组成

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
// 解法 1 ：递归 + 备忘录
 var numDistinct = function(s, t) {
  // 从后往前匹配 
  const len1 = s.length, len2 = t.length
  // memo[i][j]保存从s[0...i]中包含t[0...j]的子序列个数
  const memo = new Array(len1).fill(-1).map(() => new Array(len2).fill(-1))
  const helper = (i, j) => {
    // 先判断t 此时不需要管s是否为空 都可以匹配；如果先判断s 则需要看此时t是否为空 t为空则匹配到 t不为空则匹配不到
    if (j < 0) {
      // t 遍历完了 成为空串 此时s为空串 或者删光自己的字符 都可以匹配到t 个数为1
      return 1
    }
    if (i < 0) {
      // s 小于0了 成为空串 此时t不是空串 个数为0
      return 0
    }
    if (memo[i][j] !== -1) {
      return memo[i][j]
    }
    if (s[i] === t[j]) {
      memo[i][j] = helper(i - 1, j) + helper(i - 1, j - 1)
      // 最后一位匹配上了 则可以用最后一位 也可以不用
      return memo[i][j]
    } else {
      memo[i][j] = helper(i - 1, j)
      // 最后一位没匹配上
      return memo[i][j]
    }
  }
  return helper(len1 - 1, len2 - 1)
};

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
 var numDistinct = function(s, t) {
  // dp 解法
  // dp[i][j]：从开头到s[i-1]的子串中，出现『从开头到t[i-1]的子串』的 次数。
  // 即：前 i 个字符的 s 子串中，出现前 j 个字符的 t 子串的次数。
  // 状态转移方程：
  // s[i-1] === t[j-1] dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
  // s[i-1] !== t[j-1] dp[i][j] = dp[i - 1][j]
  // base case
  // j === 0, dp[i][0] = 1
  // i === 0, dp[0][j] = 0
  const slen = s.length, tlen = t.length
  const dp = new Array(slen + 1).fill(0).map(() => new Array(tlen + 1).fill(0))
  for (let i = 0; i <= slen; i++) {
    dp[i][0] = 1
  }
  for (let i = 1; i < slen + 1; i++) {
    for (let j = 1; j < tlen + 1; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[slen][tlen]
};
