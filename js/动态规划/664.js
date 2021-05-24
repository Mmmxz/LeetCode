// 664. 奇怪的打印机
// 有台奇怪的打印机有以下两个特殊要求：

// 打印机每次只能打印由 同一个字符 组成的序列。
// 每次可以在任意起始和结束位置打印新字符，并且会覆盖掉原来已有的字符。
// 给你一个字符串 s ，你的任务是计算这个打印机打印它需要的最少打印次数。

 
// 示例 1：

// 输入：s = "aaabbb"
// 输出：2
// 解释：首先打印 "aaa" 然后打印 "bbb"。
// 示例 2：

// 输入：s = "aba"
// 输出：2
// 解释：首先打印 "aaa" 然后在第二个位置打印 "b" 覆盖掉原来的字符 'a'。
 

// 提示：

// 1 <= s.length <= 100
// s 由小写英文字母组成

/**
 * @param {string} s
 * @return {number}
 */
 var strangePrinter = function(s) {
  // 定义 dp[i][j] 代表区间[i,j]的最小打印次数
  // dp[i][i]=1, 当区间只有一个字符时 打印一次
  // 转移方程，当 s[i]==s[j] 时, dp[i][j]=dp[i][j-1];
  // 当 s[i]!=s[j] 时, dp[i][j]=min(dp[i][k]+dp[k+1][j]), i<=k<j;
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i][j - 1]
      } else {
        let min = Number.MAX_SAFE_INTEGER
        for (let k = i; k < j; k++) {
          min = Math.min(min, dp[i][k] + dp[k + 1][j])
        }
        dp[i][j] = min
      }
    }
  }

  return dp[0][n - 1]
};