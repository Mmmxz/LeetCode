// 260. 只出现一次的数字 III
// 给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。

 

// 进阶：你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？

 

// 示例 1：

// 输入：nums = [1,2,1,3,2,5]
// 输出：[3,5]
// 解释：[5, 3] 也是有效的答案。
// 示例 2：

// 输入：nums = [-1,0]
// 输出：[-1,0]
// 示例 3：

// 输入：nums = [0,1]
// 输出：[1,0]
// 提示：

// 2 <= nums.length <= 3 * 104
// -231 <= nums[i] <= 231 - 1
// 除两个只出现一次的整数外，nums 中的其他数字都出现两次

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
  let xorsum = 0
  for (const num of nums) {
    xorsum ^= num
  }
  // 找到最低位的1所在的位置 设置为l
  let low1 = xorsum & -xorsum
  let num1 = 0, num2 = 0
  for (const num of nums) {
    if (num & low1) {
      num1 ^= num
    } else {
      num2 ^= num
    }
  }
  return [num1, num2]
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
  const n = nums.length
  let memo = new Set()
  for (let i = 0; i < n; i++) {
    if (memo.has(nums[i])) {
      memo.delete(nums[i])
    } else {
      memo.add(nums[i])
    }
  }
  return Array.from(memo)
};
