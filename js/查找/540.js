// 540. 有序数组中的单一元素
// 给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。

// 示例 1:

// 输入: [1,1,2,3,3,4,4,8,8]
// 输出: 2
// 示例 2:

// 输入: [3,3,7,7,10,11,11]
// 输出: 10
// 注意: 您的方案应该在 O(log n)时间复杂度和 O(1)空间复杂度中运行。

/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNonDuplicate = function(nums) {
  const n = nums.length
  // index为单一元素索引 当mid为偶数时 如果mid+1在index左侧 则nums[mid] === nums[mid + 1]
  // 如果mid在index右侧 则nums[mid] !== nums[mid+1]
  let low = 0, high = n - 1
  while (low < high) {
    let mid = Math.floor((high - low) / 2) + low
    // 保证 low/high/mid 都在偶数位，使得查找区间大小一直都是奇数
    if (mid % 2 === 1) {
      mid--
    }
    // index在mid+1的右侧
    if (nums[mid] === nums[mid + 1]) {
      low = mid + 2
    } else {
      high = mid
    }
  }
  return nums[low]
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
  // 当前数和下一个是否相等 如果不相等则返回
  const n = nums.length
  for (let i = 0; i < n; i += 2) {
    if (nums[i] !== nums[i + 1]) {
      return nums[i]
    }
  }
};
