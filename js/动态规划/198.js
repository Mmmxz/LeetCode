// 198. 打家劫舍
// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

 

// 示例 1：

// 输入：[1,2,3,1]
// 输出：4
// 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//      偷窃到的最高金额 = 1 + 3 = 4 。
// 示例 2：

// 输入：[2,7,9,3,1]
// 输出：12
// 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//      偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 

// 提示：

// 0 <= nums.length <= 100
// 0 <= nums[i] <= 400

/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法 1 ：备忘录 自顶向下
 var rob = function(nums) {
  const n = nums.length
  const memo = new Array(n).fill(-1)
  // dp(start) [start...] 能抢到最高金额
  const dp = start => {
    if (start >= n) {
      return 0
    }
    if (memo[start] !== -1) {
      return memo[start]
    }
    // 对于每个房屋 可选择抢或者不抢
    memo[start] = Math.max(nums[start] + dp(start + 2), dp(start + 1))
    return memo[start]
  }
  return dp(0)
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法 2 ：动态规划 自底向上
 var rob = function(nums) {
  const n = nums.length
  // dp[i]=x 表示从第 i 间房子开始抢劫最多的金额为x
  // base case dp[n]=0
  const dp = new Array(n + 2).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = Math.max(nums[i] + dp[i + 2], dp[i + 1])
  }
  return dp[0]
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法 3 ：动态规划
 var rob = function(nums) {
  // 定义 dp[i] 代表以i为结束的最高金额 最后返回dp[n-1]
  const n = nums.length
  if (n <= 2) {
    return Math.max(...nums)
  }
  const dp = new Array(n).fill(0)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  // dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]) // 前一个偷了 这个不偷 前一个没偷 这个偷了
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  return dp[n - 1]
};