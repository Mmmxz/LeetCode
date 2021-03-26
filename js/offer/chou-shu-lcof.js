// 剑指 Offer 49. 丑数
// 我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。

 

// 示例:

// 输入: n = 10
// 输出: 12
// 解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
// 说明:  

// 1 是丑数。
// n 不超过1690。
// 注意：本题与主站 264 题相同：https://leetcode-cn.com/problems/ugly-number-ii/

/**
 * @param {number} n
 * @return {number}
 */
 var nthUglyNumber = function(n) {
  // dp[i]代表第i+1个丑数 由丑数的定义可知 下一个丑数是由前面的某几个丑数乘以2/3/5得到的
  // dp[0]=1, 定义abc三个索引 从0开始 a代表*2 b代表*3 c代表*5 每次取他们的最小值 并且将最小值对应的索引+1
  const dp = new Array(n).fill(0)
  dp[0] = 1
  let a = 0, b = 0, c = 0
  for (let i = 1; i < n; i++) {
    const A = dp[a] * 2, B = dp[b] * 3, C = dp[c] * 5
    dp[i] = Math.min(A, B, C)
    if (A === dp[i]) {
      a++
    }
    if (B === dp[i]) {
      b++
    }
    if (C === dp[i]) {
      c++
    }
  }
  return dp[n - 1]
};