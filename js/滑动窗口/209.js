// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

//  

// 示例：

// 输入：s = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
//  

// 进阶：

// 如果你已经完成了 O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/minimum-size-subarray-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  // 1.定义 nums[left...right] 为滑动窗口， sum 为闭合区间 [left...right] 的和， result 为最小子数组长度 初始化为数组长度 +1
  // tips. 如果 right 初始化为 0 那么闭合区间 [left...right] 在初始化时就存在 nums[0] 这个元素了 所以 right 初始化设置为 -1
  let left = 0, right = -1, sum = 0, result = nums.length + 1
  // 2.当左边界小于数组长度时 [left...right] 闭合区间至少有一个子数组
  while(left < nums.length) {
    // 3.sum < s 右指针后移 增加窗口大小 注意 右指针移动时要判断是否越界 即右指针在数组末尾时 只移动左指针
    if (sum < s && right + 1 < nums.length) {
      right++
      sum += nums[right]

    // 4.sum >= s 左指针后移 缩小窗口大小 此逻辑不需要判断越界 是由于先取 nums[left] 指针再移动 不会产生越界
    } else {
      sum -= nums[left]
      left++
    }

    // 5.如果当前的区间和符合条件 则取 result 值与当前子数组长度的最小值作为 result 存储
    if (sum >= s) {
      result = Math.min(result, right - left + 1)
    }
  }
  // 6.当循环完毕 result 仍然为初始值时 代表没有符合条件的子区间 此时 result 按照题意应该返回 0
  if (result === nums.length + 1) {
    result = 0
  }
  return result
};

/**
 * @description 滑窗模板
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
 var minSubArrayLen = function(target, nums) {
  // 滑窗
  const n = nums.length
  let left = 0, right = 0 // [left, right) 左闭右开
  let sum = 0, res = Number.MAX_SAFE_INTEGER
  while (right < n) {
    const c = nums[right]
    right++
    sum += c
    // 什么时候移动窗口
    while (sum >= target) {
      // 记录窗口长度
      res = Math.min(right - left, res)
      const d = nums[left]
      sum -= d
      left++
    }
  }
  return res === Number.MAX_SAFE_INTEGER ? 0 : res
};
