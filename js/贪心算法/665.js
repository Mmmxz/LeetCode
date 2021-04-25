// 665. 非递减数列
// 给你一个长度为 n 的整数数组，请你判断在 最多 改变 1 个元素的情况下，该数组能否变成一个非递减数列。

// 我们是这样定义一个非递减数列的： 对于数组中所有的 i (0 <= i <= n-2)，总满足 nums[i] <= nums[i + 1]。

 

// 示例 1:

// 输入: nums = [4,2,3]
// 输出: true
// 解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
// 示例 2:

// 输入: nums = [4,2,1]
// 输出: false
// 解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
 

// 说明：

// 1 <= n <= 10 ^ 4
// - 10 ^ 5 <= nums[i] <= 10 ^ 5

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
  let count = 0 // 操作次数 最多一次
  // 操作次数大于 1 次直接跳出循环
  for (let i = 0; i < nums.length - 1 && count < 2; i++) {
    // 此时需要改变值
    if (nums[i] > nums[i + 1]) {
      count++
      // 只有该情况会改变 nums[i + 1]
      if (i > 0 && nums[i + 1] < nums[i - 1]) {
        // -1 4 -2
        nums[i + 1] = nums[i]
      // 其余情况均改变 a[i]
      } else {
        // -1 4 2
        nums[i] = nums[i + 1]
      }
    }
  }
  // 判断操作次数 1 次或 0次则符合题意
  return count < 2
};

// 思路：
// 1.遇到 a[i] > a[i + 1] 需要处理，要么 a[i] 变小，要么 a[i + 1] 增大；
// 2.贪心思想，尽量使 a[i] 变小，因为 a[i + 1] 变大会影响后面数字的判断；
// 3.当 a[i] > a[i + 1] 时，必然存在 a[i] >= a[i - 1]
// 3.1.如果 a[i - 1] > a[i + 1] 就需要使 a[i + 1] 变大为 a[i] 如 -1,4,-2
// 3.2.如果 a[i - 1] < a[i + 1] 就需要使 a[i] 变小为 a[i + 1] 如 -1,4,2
// 4.其他情况都可以将 a[i] 变小。


/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var checkPossibility = function(nums) {
  const n = nums.length
  let count = 0
  // 目标：得到一个递增序列
  // 当出现递减时 可以改前面的数 也可以改后面的数 尽量改前面的 这样不会影响后面
  // 什么情况下只能改后面的 当前面的数改了后 使前面变为递减时 此时就必须改后面
  for (let i = 1; i < n; i++) {
    if (nums[i - 1] > nums[i]) {
      // 当nums[i-1]改为nums[i]后 使前面变成递减 即nums[i-2]>nums[i-1] 这时候必须改后面
      if (i > 1 && nums[i - 2] > nums[i]) {
        nums[i] = nums[i - 1]
      } else {
        // 其余情况都改前面即可
        nums[i - 1] = nums[i]
      }
      count++
    }
    if (count > 1) {
      return false
    }
  }
  return true
};
