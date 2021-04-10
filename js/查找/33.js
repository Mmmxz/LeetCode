// 33. 搜索旋转排序数组
// 整数数组 nums 按升序排列，数组中的值 互不相同 。

// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

 

// 示例 1：

// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4
// 示例 2：

// 输入：nums = [4,5,6,7,0,1,2], target = 3
// 输出：-1
// 示例 3：

// 输入：nums = [1], target = 0
// 输出：-1
 

// 提示：

// 1 <= nums.length <= 5000
// -10^4 <= nums[i] <= 10^4
// nums 中的每个值都 独一无二
// 题目数据保证 nums 在预先未知的某个下标上进行了旋转
// -10^4 <= target <= 10^4
 

// 进阶：你可以设计一个时间复杂度为 O(log n) 的解决方案吗？

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
  // 有序数组用二分
  const n = nums.length
  let left = 0, right = n - 1
  while (left <= right) {
    const mid = Math.floor((left - right) / 2 + right)
    if (nums[mid] === target) {
      return mid
    }
    // 根据大小关系判断 target 在左边还是右边
    if (nums[mid] >= nums[left]) {
      // 左边是升序的
      if (target >= nums[left] && target < nums[mid]) {
        // 在 [left...mid) 二分
        right = mid - 1
      } else {
        // (mid...right]
        left = mid + 1
      }
    } else {
      // 右边是升序的
      if (target > nums[mid] && target <= nums[right]) {
        // 在 (mid...right] 二分
        left = mid + 1
      } else {
        // [left...mid)
        right = mid - 1
      }
    }
  }
  return -1
};