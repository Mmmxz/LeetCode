// 剑指 Offer 39. 数组中出现次数超过一半的数字
// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

 

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

 

// 示例 1:

// 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
// 输出: 2
 

// 限制：

// 1 <= 数组长度 <= 50000

 

// 注意：本题与主站 169 题相同：https://leetcode-cn.com/problems/majority-element/

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  const n = nums.length
  const m1 = new Map()
  for (let i = 0; i < n; i++) {
    m1.set(nums[i], m1.has(nums[i]) ? m1.get(nums[i]) + 1 : 1)
  }
  let maxCount = 0, ans = 0
  for (let [num, count] of m1) {
    if (maxCount < count) {
      maxCount = count
      ans = num
    }
  }
  return ans
};
