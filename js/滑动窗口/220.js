// 220. 存在重复元素 III
// 给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。

// 如果存在则返回 true，不存在返回 false。

 

// 示例 1：

// 输入：nums = [1,2,3,1], k = 3, t = 0
// 输出：true
// 示例 2：

// 输入：nums = [1,0,1,1], k = 1, t = 2
// 输出：true
// 示例 3：

// 输入：nums = [1,5,9,1,5,9], k = 2, t = 3
// 输出：false
 

// 提示：

// 0 <= nums.length <= 2 * 104
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 104
// 0 <= t <= 231 - 1

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
// 解法 1 ：滑动窗口
var containsNearbyAlmostDuplicate = function(nums, k, t) {
  // 滑窗大小为 k 滑窗中最大值和最小值的差值<=t
  const n = nums.length
  let left = 0, right = 0 // [left...right)
  while (right < n) {
    const c = nums[right]
    right++
    // 保证滑窗中索引范围 <= k
    if (right - left > k + 1) {
      // 窗口滑动
      left++
    }
    // 在索引满足的窗口中 判断值是否满足
    // right是开区间 right-left为窗口中的个数 将窗口中的新加入的数 c 与之前的每个数比较 有符合的直接返回即可
    for (let i = left; i < right - 1; i++) {
      if (Math.abs(nums[i] - c) <= t) {
        return true
      }
    }
  }
  return false
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
// 解法 2 ：暴力 不推荐
var containsNearbyAlmostDuplicate = function(nums, k, t) {
  const n = nums.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (Math.abs(nums[i] - nums[j]) <= t && Math.abs(i - j) <= k) {
        return true
      }
    }
  }
  return false
};
