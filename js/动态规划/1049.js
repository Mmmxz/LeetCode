// 1049. 最后一块石头的重量 II
// 有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。

// 每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：

// 如果 x == y，那么两块石头都会被完全粉碎；
// 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
// 最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。

 

// 示例 1：

// 输入：stones = [2,7,4,1,8,1]
// 输出：1
// 解释：
// 组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]，
// 组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]，
// 组合 2 和 1，得到 1，所以数组转化为 [1,1,1]，
// 组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
// 示例 2：

// 输入：stones = [31,26,33,21,40]
// 输出：5
// 示例 3：

// 输入：stones = [1,2]
// 输出：1
 

// 提示：

// 1 <= stones.length <= 30
// 1 <= stones[i] <= 100

/**
 * @description 背包问题
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function(stones) {
  // 选出质量相近的两堆石头 每堆石头重量不能超过 sum/2
  // 定义dp[i][j] 代表在前i个石头中 选择重量不超过j的石头的最大价值
  // 对于第i块石头，不选，dp[i][j]=dp[i-1][j]；选，dp[i][j]=dp[i-1][j-nums[i-1]] + nums[i-1]；(i从1开始 所以取nums[i-1]) i∈[1,n] j∈[0,sum/2] dp[i][j]取选与不选的最大值
  // base case dp[0][j]=0 没有石头可选 最大价值为0；dp[i][0]=0 重量不超过0 最大价值为0
  const n = stones.length
  const sum = stones.reduce((acc, cur) => acc + cur, 0)
  const target = Math.floor(sum / 2)
  const dp = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= target; j++) {
      dp[i][j] = dp[i - 1][j]
      // 当前背包容量大于当前的石头重量 该石头可选择放入或不放入
      if (j >= stones[i - 1]) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - stones[i - 1]] + stones[i - 1])
      }
    }
  }
  return Math.abs(sum - dp[n][target] - dp[n][target])
};
