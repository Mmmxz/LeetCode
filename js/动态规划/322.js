// 322. 零钱兑换
// 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

// 你可以认为每种硬币的数量是无限的。

 

// 示例 1：

// 输入：coins = [1, 2, 5], amount = 11
// 输出：3 
// 解释：11 = 5 + 5 + 1
// 示例 2：

// 输入：coins = [2], amount = 3
// 输出：-1
// 示例 3：

// 输入：coins = [1], amount = 0
// 输出：0
// 示例 4：

// 输入：coins = [1], amount = 1
// 输出：1
// 示例 5：

// 输入：coins = [1], amount = 2
// 输出：2
 

// 提示：

// 1 <= coins.length <= 12
// 1 <= coins[i] <= 231 - 1
// 0 <= amount <= 104

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  // dp[i]代表凑成金额i所需的最少硬币个数
  // dp[-1] = -1, dp[0] = 0, dp[i] = min(dp[i - 1], dp[i - 2], dp[i - 5]) + 1
  // 要求amount 所以数组是从 0~amount 空间为 amount+1 初始化 amount金额最多由amount个1元组成 amount+1可在任何情况下都大于求解 方便比较求最小值
  const dp = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin < 0) continue // 当前金额减去硬币小于0 代表无法凑成
      dp[i] = Math.min(dp[i - coin] + 1, dp[i])
    }
  }
  // 如果dp[amount]是初始化的值 说明没有匹配 应该返回-1
  return (dp[amount] === amount + 1) ? -1 : dp[amount]
};
