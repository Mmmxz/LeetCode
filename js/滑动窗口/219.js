// 219. 存在重复元素 II
// 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。

 

// 示例 1:

// 输入: nums = [1,2,3,1], k = 3
// 输出: true
// 示例 2:

// 输入: nums = [1,0,1,1], k = 1
// 输出: true
// 示例 3:

// 输入: nums = [1,2,3,1,2,3], k = 2
// 输出: false

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// 思路：使用一个 size 为 k+1 的滑动窗口来查找其中是否有重复元素
// tips. [0, k] 的闭口区间，含有 k+1 个元素 索引差值 k-0=k
var containsNearbyDuplicate = function(nums, k) {
  // 1.定义一个 set 结构 使其最大容量为 k+1
  let record = new Set()
  // 2.循环 nums
  for (let i = 0; i < nums.length; i++) {
    // 3.滑动窗口容量 +1 并判断是否在 set 中已经存在 如果存在 直接返回 true 如果不存在 将其加入 set 中
    if (record.has(nums[i])) {
      return true
    } else {
      record.add(nums[i])
    }
    // 4.加入元素后 判断当前 size 如果等于 k+1 则需要删除滑动窗口最左侧的元素 即 i-k
    if (record.size === k + 1) {
      record.delete(nums[i-k])
    }
  }
  // 5.循环结束 代表没有符合的情况 返回 false
  return false
};