// 453. 最小操作次数使数组元素相等
// 给你一个长度为 n 的整数数组，每次操作将会使 n - 1 个元素增加 1 。返回让数组所有元素相等的最小操作次数。

 

// 示例 1：

// 输入：nums = [1,2,3]
// 输出：3
// 解释：
// 只需要3次操作（注意每次操作会增加两个元素的值）：
// [1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
// 示例 2：

// 输入：nums = [1,1,1]
// 输出：0
 

// 提示：

// n == nums.length
// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109
// 答案保证符合 32-bit 整数

/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
  // 对n-1个数加1 等同于 对一个数减1
  // 最终所有数都相等 即想办法让所有数都成为最小的数
  let count = 0
  const n = nums.length
  const min = Math.min(...nums)
  for (let i = 0; i < n; i++) {
    count += nums[i] - min
  }
  return count
};
