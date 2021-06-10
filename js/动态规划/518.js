// 518. 零钱兑换 II
// 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。 

 

// 示例 1:

// 输入: amount = 5, coins = [1, 2, 5]
// 输出: 4
// 解释: 有四种方式可以凑成总金额:
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1
// 示例 2:

// 输入: amount = 3, coins = [2]
// 输出: 0
// 解释: 只用面额2的硬币不能凑成总金额3。
// 示例 3:

// 输入: amount = 10, coins = [10] 
// 输出: 1
 

// 注意:

// 你可以假设：

// 0 <= amount (总金额) <= 5000
// 1 <= coin (硬币面额) <= 5000
// 硬币种类不超过 500 种
// 结果符合 32 位符号整数

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
  // 一维背包问题 dp[i]代表凑成金额i的组合数
  const dp = new Array(amount + 1).fill(0)
  dp[0] = 1 // 不选硬币可凑成0元 有1种方案
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin]
    }
  }
  return dp[amount]
};

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
  // 背包问题
  // dp[i][j] 前i个硬币 凑成j金额的组合数
  // dp[0][j]=0 dp[i][0]=1 dp[0][0]=1
  // 对于第i个(i从1开始，所以索引用i-1)硬币
  // 如果j<coins[i-1] 说明不可以选 dp[i][j]=dp[i-1][j]
  // 如果j>=coins[i-1] 说明可选可不选 dp[i][j]=dp[i-1][j]+dp[i-1][j-k*coins[i-1]]
  // k的含义是当选择了第k个硬币时 k可以使用1次到多次 用前i-1个硬币凑j-k*coins[i-1]的组合数
  const n = coins.length
  const dp = new Array(n + 1).fill(0).map(() => new Array(amount + 1).fill(0))
  dp[0][0] = 1
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= amount; j++) {
      // 两种情况
      // 不选第k个
      dp[i][j] = dp[i - 1][j]
      // 选第k个
      for (let k = 1; k * coins[i - 1] <= j; k++) {
        dp[i][j] += dp[i - 1][j - k * coins[i - 1]]
      }
    }
  }
  return dp[n][amount]
};
