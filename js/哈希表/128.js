// 128. 最长连续序列
// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

 

// 示例 1：

// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
// 示例 2：

// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9
 

// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  // 思路：从x找x+1 x+2 ... 直到hash中不存在更大的数
  // 对于每个数 检查比它小1的数 如果不存在 则可以处理 如果存在 说明已经处理过了
  let memo = new Set(nums)
  let ans = 0
  for (const num of memo) {
    if (memo.has(num - 1)) {
      continue
    }
    // 从num开始往后找 此时长度为1
    let curLen = 1
    let curNum = num
    while (memo.has(curNum + 1)) {
      curNum++
      curLen++
    }
    // 更新答案
    ans = Math.max(curLen, ans)
  }
  return ans
};
