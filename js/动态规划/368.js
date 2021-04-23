// 368. 最大整除子集
// 给你一个由 无重复 正整数组成的集合 nums ，请你找出并返回其中最大的整除子集 answer ，子集中每一元素对 (answer[i], answer[j]) 都应当满足：
// answer[i] % answer[j] == 0 ，或
// answer[j] % answer[i] == 0
// 如果存在多个有效解子集，返回其中任何一个均可。

 

// 示例 1：

// 输入：nums = [1,2,3]
// 输出：[1,2]
// 解释：[1,3] 也会被视为正确答案。
// 示例 2：

// 输入：nums = [1,2,4,8]
// 输出：[1,2,4,8]
 

// 提示：

// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 2 * 109
// nums 中的所有整数 互不相同

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var largestDivisibleSubset = function(nums) {
  nums.sort((a, b) => a - b)
  // 定义 dp[i] 代表以 i 为结束的 LDS 的长度
  const n = nums.length
  const dp = new Array(n).fill(1)
  // maxSize 存储最长的子集长度 maxVal 存储最长子集中的最大值
  let maxSize = 1, maxVal = nums[0]
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0) {
        dp[i] = Math.max(dp[j] + 1, dp[i])
      }
    }
    if (dp[i] > maxSize) {
      maxSize = dp[i]
      maxVal = nums[i]
    }
  }
  // 求出最长子集长度和最长子集中的最大值后 倒推子集
  let res = []
  if (maxSize === 1) {
    res.push(nums[0])
    return res
  }
  for (let i = n - 1; i >= 0 && maxSize > 0; i--) {
    if (maxSize === dp[i] && maxVal % nums[i] === 0) {
      res.push(nums[i])
      maxSize--
      maxVal = nums[i]
    }
  }
  return res
};