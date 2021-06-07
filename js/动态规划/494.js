// 494. 目标和
// 给你一个整数数组 nums 和一个整数 target 。

// 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：

// 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
// 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

 

// 示例 1：

// 输入：nums = [1,1,1,1,1], target = 3
// 输出：5
// 解释：一共有 5 种方法让最终目标和为 3 。
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3
// 示例 2：

// 输入：nums = [1], target = 1
// 输出：1
 

// 提示：

// 1 <= nums.length <= 20
// 0 <= nums[i] <= 1000
// 0 <= sum(nums[i]) <= 1000
// -1000 <= target <= 100

/**
 * @description 背包问题
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
  // 使nums总和为sum 正数和为pos 负数和为neg
  // pos+neg=sum 且 pos-neg=target 可推导出 sum-neg-neg=target => neg=(sum-target)/2
  const n = nums.length
  const sum = nums.reduce((acc, cur) => acc + cur, 0)
  const diff = sum - target
  // 由于都是整数 所以sum-target必须是偶数 才能保证neg是整数
  if (diff < 0 || diff % 2 !== 0) {
    return 0
  }
  const neg = diff / 2
  // neg即在n个数中 选择和为neg的数 一共有多少种方案
  // 定义dp[i][j] 在前i个数中使得和为j的方案 需要返回dp[n][neg]
  const dp = new Array(n + 1).fill(0).map(() => new Array(neg + 1).fill(0))
  // 对于 dp[0][j] 当j为0时 在0个数中使和为0 有1种方案；当j∈[1,neg] 有0种方案
  // 对于 dp[i][j] i∈[1,n] 需要判断是否j和nums[i-1]的大小
  // 若j<nums[i-1] 则nums[i-1]不能选 dp[i][j]=dp[i-1][j]
  // 若j>=nums[i-1] 则nums[i-1]可选可不选 dp[i][j]=dp[i-1][j](不选的情况)+dp[i-1][j-nums[i-1]](选择的情况)
  dp[0][0] = 1
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1] // 有偏移量
    for (let j = 0; j <= neg; j++) {
      if (j >= num) {
        dp[i][j] = dp[i-1][j] + dp[i-1][j-num]
      } else {
        dp[i][j] = dp[i-1][j]
      }
    }
  }
  return dp[n][neg]
};

/**
 * @description dfs 暴力破解 O(2^n)
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
  // dfs
  const n = nums.length
  let res = 0
  const dfs = (index, sum) => {
    if (index > n) {
      return
    }
    if (index === n && sum === target) {
      res++
      return
    }
    // 处理当前的数字 求出当前和
    dfs(index + 1, sum - nums[index]) // 作为正数处理
    dfs(index + 1, sum + nums[index]) // 作为负数处理
  }
  dfs(0, 0)
  return res
};
