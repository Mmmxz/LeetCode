// 剑指 Offer 53 - I. 在排序数组中查找数字 I
// 统计一个数字在排序数组中出现的次数。

 

// 示例 1:

// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2
// 示例 2:

// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: 0
 

// 限制：

// 0 <= 数组长度 <= 50000

 

// 注意：本题与主站 34 题相同（仅返回值不同）：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/

/**
 * @description 二分法
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
  // 找到出现的第一个位置
  const first = findFirst(nums, target)
  if (first === -1) {
    return 0
  }
  const last = findLast(nums, target)
  return last - first + 1
};

const findFirst = (nums, target) => {
  const n = nums.length
  let left = 0, right = n - 1
  while (left <= right) {
    const mid = Math.floor((right - left) / 2 + left)
    if (nums[mid] === target) {
      // 第一个一定是在这个左边 包括这个
      right = mid - 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  // 此时left和right的关系是 [right, left]
  if (left !== n && nums[left] === target) {
    return left
  }
  return -1
}

const findLast = (nums, target) => {
  const n = nums.length
  let left = 0, right = n - 1
  while (left <= right) {
    const mid = Math.floor((right - left) / 2 + left)
    if (nums[mid] === target) {
      // 继续向右找
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  // [right, left]
  if (right !== -1 && nums[right] === target) {
    return right
  }
  return -1
}