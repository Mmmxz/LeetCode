// 137. 只出现一次的数字 II
// 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。

 

// 示例 1：

// 输入：nums = [2,2,3,2]
// 输出：3
// 示例 2：

// 输入：nums = [0,1,0,1,0,1,99]
// 输出：99
 

// 提示：

// 1 <= nums.length <= 3 * 104
// -231 <= nums[i] <= 231 - 1
// nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次
 

// 进阶：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法 1 ：hash
 var singleNumber = function(nums) {
  const n = nums.length
  let hash = {}
  for (let i = 0; i < n; i++) {
    if (hash[nums[i]]) {
      hash[nums[i]]++
    } else {
      hash[nums[i]] = 1
    }
  }
  for (let [key, value] of Object.entries(hash)) {
    if (value === 1) {
      return key
    }
  }
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法 2 ：有限状态自动机
 var singleNumber = function(nums) {
  let one = 0, two = 0 // 定义二进制三个状态 00 01 10 含义为 two one
  for (const num of nums) {
    one = one ^ num & ~two
    two = two ^ num & ~one
  }
  return one
};
// 参考题解：https://leetcode-cn.com/problems/single-number-ii/solution/single-number-ii-mo-ni-san-jin-zhi-fa-by-jin407891/