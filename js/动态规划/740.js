// 740. 删除并获得点数
// 给你一个整数数组 nums ，你可以对它进行一些操作。

// 每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除每个等于 nums[i] - 1 或 nums[i] + 1 的元素。

// 开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

 

// 示例 1：

// 输入：nums = [3,4,2]
// 输出：6
// 解释：
// 删除 4 获得 4 个点数，因此 3 也被删除。
// 之后，删除 2 获得 2 个点数。总共获得 6 个点数。
// 示例 2：

// 输入：nums = [2,2,3,3,3,4]
// 输出：9
// 解释：
// 删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
// 之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
// 总共获得 9 个点数。
 

// 提示：

// 1 <= nums.length <= 2 * 104
// 1 <= nums[i] <= 104

/**
 * @param {number[]} nums
 * @return {number}
 */
 var deleteAndEarn = function(nums) {
  const n = nums.length
  // 定义sum数组 统计相同元素的和 比如数3的下标为3 2的下标为2
  const max = Math.max(...nums)
  const sum = new Array(max + 1).fill(0)
  for (const num of nums) {
    sum[num] += num
  }
  // 对sum数组进行打家劫舍思路 #198 一个下标要了 相邻的下标不能要
  // 定义dp为以i结束的最大值
  if (max + 1 <= 2) {
    return Math.max(sum[0], sum[1])
  }
  const dp = new Array(max + 1).fill(0)
  dp[0] = sum[0], dp[1] = Math.max(sum[0], sum[1])
  // dp[i] = max(dp[i - 2] + sum[i], dp[i - 1])
  for (let i = 2; i < max + 1; i++) {
    dp[i] = Math.max(dp[i - 2] + sum[i], dp[i - 1])
  }
  return dp[max]
};