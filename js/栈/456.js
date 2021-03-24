// 456. 132 模式
// 给你一个整数数组 nums ，数组中共有 n 个整数。132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j] 。

// 如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false 。

 

// 进阶：很容易想到时间复杂度为 O(n^2) 的解决方案，你可以设计一个时间复杂度为 O(n logn) 或 O(n) 的解决方案吗？

 

// 示例 1：

// 输入：nums = [1,2,3,4]
// 输出：false
// 解释：序列中不存在 132 模式的子序列。
// 示例 2：

// 输入：nums = [3,1,4,2]
// 输出：true
// 解释：序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
// 示例 3：

// 输入：nums = [-1,3,2,0]
// 输出：true
// 解释：序列中有 3 个 132 模式的的子序列：[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。
 

// 提示：

// n == nums.length
// 1 <= n <= 104
// -109 <= nums[i] <= 109

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 解法 1 ：暴力
 var find132pattern = function(nums) {
  // 以3为标准 找1和2 1是3左边最小的元素且比3小 2是[j+1...n-1]范围内比3小且比1大的数字
  const n = nums.length
  if (n < 3) {
    return false
  }
  let imin = nums[0]
  // j的范围是从1到n-1
  for (let j = 1; j < n - 1; j++) {
    // 什么时候符合题意
    if (imin < nums[j]) {
      // i < j 时，在区间内找k
      for (let k = j + 1; k < n; k++) {
        if (nums[k] > imin && nums[k] < nums[j]) {
          return true
        }
      }
    }
    // 每轮更新imin为j左侧的最小值
    imin = Math.min(imin, nums[j])
  }
  return false
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 解法 2 ：单调栈
 var find132pattern = function(nums) {
  // 以3为基准 1是3左侧的最小数 2是3右侧比3小的最大数
  // 单调栈找2 元素从栈底到栈顶从大到小 单调递减栈
  // 1.遍历一次3 先找出每个1
  // 2.从右往左遍历3 范围是[n, 1] 找出3的右侧比3小的最大数即2
  // 3.比较2和1的大小
  const n = nums.length
  if (n < 3) {
    return false
  }
  // 对于每个3 都有对应其左侧的最小的1
  const lefti = new Array(n).fill(nums[0])
  for (let j = 1; j < n; j++) {
    // 每轮的最小值是前一个最小值和当前的数字比较
    lefti[j] = Math.min(nums[j], lefti[j - 1])
  }
  let stack = []
  for (let j = n; j >= 1; j--) {
    // 找k 当栈顶元素小于j时 出栈 最后一个出栈的就是小于j的最大值
    while (stack.length && stack[stack.length - 1] < nums[j]) {
      let numk = stack.pop()
      if (numk > lefti[j]) {
        return true
      }
    }
    stack.push(nums[j])
  }
  return false
};