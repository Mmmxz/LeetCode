// 643. 子数组最大平均数 I
// 给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。

 

// 示例：

// 输入：[1,12,-5,-6,50,3], k = 4
// 输出：12.75
// 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 

// 提示：

// 1 <= k <= n <= 30,000。
// 所给数据范围 [-10,000，10,000]。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
  // [left...right) 左闭右开 sum 保存每次累加的和 res 存储当前窗口的最大和
  let left = 0, right = 0, sum = 0, ans = -Infinity
  while (right < nums.length) {
    const c = nums[right++]
    sum += c
    // 窗口中的元素保持 k 个
    if (right - left > k) {
      // 收缩
      const d = nums[left++]
      sum -= d
    }
    if (right - left === k) {
      // 窗口合适时 取最大的和
      ans = Math.max(sum, ans)
    }
  }
  return ans / k
};