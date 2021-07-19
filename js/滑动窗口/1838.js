// 1838. 最高频元素的频数
// 元素的 频数 是该元素在一个数组中出现的次数。

// 给你一个整数数组 nums 和一个整数 k 。在一步操作中，你可以选择 nums 的一个下标，并将该下标对应元素的值增加 1 。

// 执行最多 k 次操作后，返回数组中最高频元素的 最大可能频数 。

 

// 示例 1：

// 输入：nums = [1,2,4], k = 5
// 输出：3
// 解释：对第一个元素执行 3 次递增操作，对第二个元素执 2 次递增操作，此时 nums = [4,4,4] 。
// 4 是数组中最高频元素，频数是 3 。
// 示例 2：

// 输入：nums = [1,4,8,13], k = 5
// 输出：2
// 解释：存在多种最优解决方案：
// - 对第一个元素执行 3 次递增操作，此时 nums = [4,4,8,13] 。4 是数组中最高频元素，频数是 2 。
// - 对第二个元素执行 4 次递增操作，此时 nums = [1,8,8,13] 。8 是数组中最高频元素，频数是 2 。
// - 对第三个元素执行 5 次递增操作，此时 nums = [1,4,13,13] 。13 是数组中最高频元素，频数是 2 。
// 示例 3：

// 输入：nums = [3,9,6], k = 2
// 输出：1
 

// 提示：

// 1 <= nums.length <= 105
// 1 <= nums[i] <= 105
// 1 <= k <= 105

/**
 * @description 滑窗模板
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function(nums, k) {
  // 1.排序
  nums.sort((a, b) => a - b)
  // 2.滑窗
  const n = nums.length
  // 如果数组只有一个元素 则频数一定是1
  if (n === 1) {
    return 1
  }
  // [left,right) 左闭右开区间
  let left = 0, right = 0, ans = 0, total = 0 // 总频数
  while (right < n) {
    right++
    // 滑窗中元素必须大于两个
    if (right - left < 2) {
      continue
    }
    // 每轮total增加：滑窗最大数与滑窗第二大数的差 * 滑窗最大数左边的个数
    total += (nums[right - 1] - nums[right - 2]) * (right - left - 1)
    while (total > k) {
      // 当total需要减少时，需要移除最左侧的数，total减少滑窗最大数与滑窗最小数的差
      total -= nums[right - 1] - nums[left]
      left++
    }
    // 频数即滑窗的包含的元素个数
    ans = Math.max(right - left, ans)
  }
  return ans
};


/**
 * @description 参考题解写法
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function(nums, k) {
  const n = nums.length
  // 从小到大排序
  nums.sort((a, b) => a - b)
  let left = 0, right = 1
  let ans = 1, total = 0
  while (right < n) {
    total += (nums[right] - nums[right - 1]) * (right - left)
    while (total > k) {
      total -= nums[right] - nums[left]
      left++
    }
    ans = Math.max(right - left + 1, ans)
    right++
  }
  return ans
};
