// 34. 在排序数组中查找元素的第一个和最后一个位置
// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 进阶：

// 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 

// 示例 1：

// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 示例 2：

// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]
// 示例 3：

// 输入：nums = [], target = 0
// 输出：[-1,-1]
 

// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 二分
 var searchRange = function(nums, target) {
  //  先找第一个 再找最后一个
  const first = findFirst(nums, target)
  if (first === -1) {
    return [-1, -1]
  }
  const last = findLast(nums, target)
  return [first, last]
};

const findFirst = (nums, target) => {
  const n = nums.length
  let low = 0, high = n - 1
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low
    if (nums[mid] === target) {
      // 继续向左找
      high = mid - 1
    } else if (nums[mid] > target) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  // 此时 low 和 high 的位置关系是 [high, low]
  if (low !== n && nums[low] === target) {
    return low
  }
  return -1
}
const findLast = (nums, target) => {
  const n = nums.length
  let low = 0, high = n - 1
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low
    if (nums[mid] === target) {
      // 继续向右找
      low = mid + 1
    } else if (nums[mid] > target) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  // [high, low]
  if (high !== -1 && nums[high] === target) {
    return high
  }
  return high
}
// 参考题解：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/da-jia-bu-yao-kan-labuladong-de-jie-fa-fei-chang-2/