// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。

 

// 示例：

// 输入：nums = [1,2,3,4]
// 输出：[1,3,2,4] 
// 注：[3,1,2,4] 也是正确的答案之一。
 

// 提示：

// 0 <= nums.length <= 50000
// 1 <= nums[i] <= 10000

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
  // 一个索引j 从后往前标记奇数 一个索引o从前往后标记偶数 当j>o时交换 直到j<o
  const n = nums.length
  let o = 0, j = n - 1
  while (j > o) {
    // o对应的是奇数 继续往后找
    while (nums[o] % 2 === 1) {
      o++
    }
    while (nums[j] % 2 === 0) {
      // j对应的是偶数 继续往前找
      j--
    }
    // 直到o对应偶数 j对应奇数时 判断是否可以交换
    if (j > o) {
      // 交换
      let temp = nums[o]
      nums[o] = nums[j]
      nums[j] = temp
    }
  }
  return nums
};
