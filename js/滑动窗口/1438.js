// 1438. 绝对差不超过限制的最长连续子数组
// 给你一个整数数组 nums ，和一个表示限制的整数 limit，请你返回最长连续子数组的长度，该子数组中的任意两个元素之间的绝对差必须小于或者等于 limit 。

// 如果不存在满足条件的子数组，则返回 0 。

 

// 示例 1：

// 输入：nums = [8,2,4,7], limit = 4
// 输出：2 
// 解释：所有子数组如下：
// [8] 最大绝对差 |8-8| = 0 <= 4.
// [8,2] 最大绝对差 |8-2| = 6 > 4. 
// [8,2,4] 最大绝对差 |8-2| = 6 > 4.
// [8,2,4,7] 最大绝对差 |8-2| = 6 > 4.
// [2] 最大绝对差 |2-2| = 0 <= 4.
// [2,4] 最大绝对差 |2-4| = 2 <= 4.
// [2,4,7] 最大绝对差 |2-7| = 5 > 4.
// [4] 最大绝对差 |4-4| = 0 <= 4.
// [4,7] 最大绝对差 |4-7| = 3 <= 4.
// [7] 最大绝对差 |7-7| = 0 <= 4. 
// 因此，满足题意的最长子数组的长度为 2 。
// 示例 2：

// 输入：nums = [10,1,2,4,7,2], limit = 5
// 输出：4 
// 解释：满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 <= 5 。
// 示例 3：

// 输入：nums = [4,2,2,2,4,4,2,2], limit = 0
// 输出：3
 

// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9
// 0 <= limit <= 10^9

/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function(nums, limit) {
  let left = 0, right = 0, ans = 0, window = []
  // [left...right)
  const len = nums.length
  while (right < len) {
    // c 每次要加入的元素 d 每次要删除的元素
    const c = nums[right]
    right++
    // 加入元素时 顺便从小到大排序
    window = insertSort(window, c)
    const diff = Math.abs(window[0] - window[window.length - 1])
    if (diff > limit) {
      // 左边出 window
      const d = nums[left]
      left++
      // 在 有序的window中删除第一个d
      window.splice(window.findIndex(item => item === d), 1)
    }
    ans = Math.max(ans, right - left)
  }
  return ans
};
var insertSort = function(arr, num) {
  if (!arr.length) {
    arr.push(num)
    return arr
  }
  let index = 0
  while (index < arr.length) {
    if (num < arr[index]) {
      break
    }
    index++
  }
  arr.splice(index, 0, num)
  return arr
}