// 525. 连续数组
// 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。

 

// 示例 1:

// 输入: nums = [0,1]
// 输出: 2
// 说明: [0, 1] 是具有相同数量0和1的最长连续子数组。
// 示例 2:

// 输入: nums = [0,1,0]
// 输出: 2
// 说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
 

// 提示：

// 1 <= nums.length <= 105
// nums[i] 不是 0 就是 1

/**
 * @param {number[]} nums
 * @return {number}
 */
 var findMaxLength = function(nums) {
  // 对于区间[i,j-1]， (prefix[j]-prefix[i]) * 2 = j - i 即2 * prefix[j] - j = 2 * prefix[i] - i
  const n = nums.length
  const prefix = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1]
  }
  let ans = 0
  const memo = new Map()
  for (let i = 0; i <= n; i++) {
    const key = 2 * prefix[i] - i
    if (memo.has(key)) {
      ans = Math.max(ans, i - memo.get(key))
    } else {
      memo.set(key, i)
    }
  }
  return ans
};