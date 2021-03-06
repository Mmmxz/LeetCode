// 523. 连续的子数组和
// 给你一个整数数组 nums 和一个整数 k ，编写一个函数来判断该数组是否含有同时满足下述条件的连续子数组：

// 子数组大小 至少为 2 ，且
// 子数组元素总和为 k 的倍数。
// 如果存在，返回 true ；否则，返回 false 。

// 如果存在一个整数 n ，令整数 x 符合 x = n * k ，则称 x 是 k 的一个倍数。

 

// 示例 1：

// 输入：nums = [23,2,4,6,7], k = 6
// 输出：true
// 解释：[2,4] 是一个大小为 2 的子数组，并且和为 6 。
// 示例 2：

// 输入：nums = [23,2,6,4,7], k = 6
// 输出：true
// 解释：[23, 2, 6, 4, 7] 是大小为 5 的子数组，并且和为 42 。 
// 42 是 6 的倍数，因为 42 = 7 * 6 且 7 是一个整数。
// 示例 3：

// 输入：nums = [23,2,6,4,7], k = 13
// 输出：false
 

// 提示：

// 1 <= nums.length <= 105
// 0 <= nums[i] <= 109
// 0 <= sum(nums[i]) <= 231 - 1
// 1 <= k <= 231 - 1

/**
 * @description 思路：前缀和 + 同余定理
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function(nums, k) {
  const n = nums.length
  const prefix = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i]
  }
  // 对于任意的prefix[j] - prefix[i] = n * k 由同余定理可知 prefix[i]%k 和 prefix[j]%k 一定相等
  let m1 = new Map()
  for (let i = 0; i <= n; i++) {
    if (m1.has(prefix[i] % k)) {
      if (i - m1.get(prefix[i] % k) >= 2) {
        return true
      }
    } else {
      m1.set(prefix[i] % k, i)
    }
  }
  return false
};