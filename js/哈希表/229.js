// 229. 求众数 II
// 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

 

 

// 示例 1：

// 输入：[3,2,3]
// 输出：[3]
// 示例 2：

// 输入：nums = [1]
// 输出：[1]
// 示例 3：

// 输入：[1,1,1,3,3,2,2,2]
// 输出：[1,2]
 

// 提示：

// 1 <= nums.length <= 5 * 104
// -109 <= nums[i] <= 109
 

// 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
  // 最多有两个元素出现次数可以超过1/3，所以找出第一多和第二多的元素，判断第二多是否超过1/3即可
  const n = nums.length
  let hash = {}, ans = []
  const count = Math.floor(n / 3)
  for (let i = 0; i < n; i++) {
    if (hash[nums[i]]) {
      hash[nums[i]] += 1
    } else {
      hash[nums[i]] = 1
    }
    if (hash[nums[i]] > count && !ans.includes(nums[i])) {
      ans.push(nums[i])
    }
  }
  return ans
};
