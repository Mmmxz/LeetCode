// 132. 分割回文串 II
// 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。

// 返回符合要求的 最少分割次数 。

 

// 示例 1：

// 输入：s = "aab"
// 输出：1
// 解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
// 示例 2：

// 输入：s = "a"
// 输出：0
// 示例 3：

// 输入：s = "ab"
// 输出：1
 

// 提示：

// 1 <= s.length <= 2000
// s 仅由小写英文字母组成

/**
 * @param {string} s
 * @return {number}
 */
// 回溯 + 动态规划 #131 进阶题
 var minCut = function(s) {
  //  初始化 [i...j] 是否为回文串
  const n = s.length, res = []
  const dp = new Array(n).fill(false).map(() => new Array(n).fill(false))
  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      if (i === j) {
        dp[i][j] = true
      } else if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true
      } else if (j - i > 1 && s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true
      }
    }
  }
  // 定义f[i] 代表以i结尾的分割子串的最小次数 答案是求f[n-1]
  // 如果dp[0][j]是回文串，则f[j] = 0，无需分割
  // 如果dp[0][j]不是回文串，则f[j] = f[j-1] + 1(该字符独立消耗一次分割次数) || f[i - 1] + 1 && i < j 取最小值即可
  const f = new Array(n).fill(0)
  for (let j = 1; j < n; j++) {
    if (dp[0][j]) {
      f[j] = 0
    } else {
      f[j] = f[j - 1] + 1
      for (let i = 1; i < j; i++) {
        if (dp[i][j]) {
          f[j] = Math.min(f[j], f[i - 1] + 1)
        }
      }
    }
  }
  return f[n - 1]
};

// 参考题解 https://leetcode-cn.com/problems/palindrome-partitioning-ii/solution/xiang-jie-liang-bian-dong-tai-gui-hua-ji-s5xr/