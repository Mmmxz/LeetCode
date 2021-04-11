// 264. 丑数 II
// 给你一个整数 n ，请你找出并返回第 n 个 丑数 。

// 丑数 就是只包含质因数 2、3 和/或 5 的正整数。

 

// 示例 1：

// 输入：n = 10
// 输出：12
// 解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。
// 示例 2：

// 输入：n = 1
// 输出：1
// 解释：1 通常被视为丑数。
 

// 提示：

// 1 <= n <= 1690

/**
 * @param {number} n
 * @return {number}
 */
 var nthUglyNumber = function(n) {
  // dp[i]代表第i+i个丑数
  const dp = new Array(n).fill(1)
  let a = 0, b = 0, c = 0
  for (let i = 1; i < n; i++) {
    const ua = dp[a] * 2, ub = dp[b] * 3, uc = dp[c] * 5
    dp[i] = Math.min(ua, ub, uc)
    if (ua === dp[i]) {
      a++
    }
    if (ub === dp[i]) {
      b++
    }
    if (uc === dp[i]) {
      c++
    }
  }
  return dp[n - 1]
};