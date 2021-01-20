// 628. 三个数的最大乘积
// 给定一个整型数组，在数组中找出由三个数组成的最大乘积，并输出这个乘积。

// 示例 1:

// 输入: [1,2,3]
// 输出: 6
// 示例 2:

// 输入: [1,2,3,4]
// 输出: 24
// 注意:

// 给定的整型数组长度范围是[3,104]，数组中所有的元素范围是[-1000, 1000]。
// 输入的数组中任意三个数的乘积不会超出32位有符号整数的范围。

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
  const len = nums.length
  // 1.从小到大排序
  nums.sort((a, b) => a - b)
  // 2.返回 max( 最大三个数乘积 , 最小两个数与最大一个数的乘积 ) 负负得正
  return Math.max(nums[0] * nums[1] * nums[len - 1], nums[len - 2] * nums[len - 3] * nums[len - 1])
};