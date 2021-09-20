// 给定一个无序的整数数组，找到其中最长上升子序列的长度。

// 示例:

// 输入: [10,9,2,5,3,7,101,18]
// 输出: 4 
// 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
// 说明:

// 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
// 你算法的时间复杂度应该为 O(n2) 。
// 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-increasing-subsequence
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  // dp[i] 代表 [0, i] 的最长递增子序列
  // dp[i] = max(dp[i], dp[j] + 1) j < i && nums[j] < nums[i]
  const len = nums.length
  let dp = new Array(len).fill(1)
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
};

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))


/**
 * @description 贪心 + 二分
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  const n = nums.length, cell = [nums[0]]
  for (let i = 1; i < n; i++) {
    if (nums[i] > cell[cell.length - 1]) {
      cell.push(nums[i])
      continue
    }
    // 用nums[i]替换cell中比它大的数中最小的数
    // 用二分法找cell中比nums[i]大的最小索引
    let low = 0, high = cell.length - 1
    while(low <= high) {
      const mid = Math.floor((high - low) / 2) + low
      if (cell[mid] === nums[i]) {
        // 中点等于target时 继续往左边找较小的
        high--
      } else if (cell[mid] > nums[i]) {
        // 中点大于target时 继续往左边找较小的
        high--
      } else {
        // 中点小于target时 继续往右边找较大的
        low++
      }
    }
    // [high,low] 当找到合适的值 依然会往左边找 结束后 low是要被替换的值
    cell[low] = nums[i]
  }
  return cell.length
};
