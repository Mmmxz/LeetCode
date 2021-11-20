// 594. 最长和谐子序列
// 和谐数组是指一个数组里元素的最大值和最小值之间的差别 正好是 1 。

// 现在，给你一个整数数组 nums ，请你在所有可能的子序列中找到最长的和谐子序列的长度。

// 数组的子序列是一个由数组派生出来的序列，它可以通过删除一些元素或不删除元素、且不改变其余元素的顺序而得到。

 

// 示例 1：

// 输入：nums = [1,3,2,2,5,2,3,7]
// 输出：5
// 解释：最长的和谐子序列是 [3,2,2,2,3]
// 示例 2：

// 输入：nums = [1,2,3,4]
// 输出：2
// 示例 3：

// 输入：nums = [1,1,1,1]
// 输出：0
 

// 提示：

// 1 <= nums.length <= 2 * 104
// -109 <= nums[i] <= 109

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
  nums.sort((a, b) => a - b)
  let left = 0, right = 0, ans = 0
  while (right < nums.length) {
    const c = nums[right]
    right++
    // 什么时候窗口中的元素不符合lhs 当新加入的元素和最左侧的元素不相等且相差不为1
    while (c - nums[left] !== 1 && c - nums[left] !== 0) {
      left++
    }
    // 保证 [left,right) 是一个lhs
    if (c - nums[left] === 1) {
      ans = Math.max(ans, right - left)
    }
  }
  return ans
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
  // 找相差为1的值的最大个数
  const memo = new Map()
  for (const num of nums) {
    memo.set(num, memo.has(num) ? memo.get(num) + 1 : 1)
  }
  memo.keys()
  let ans = 0
  for (const key of memo.keys()) {
    // 如果存在和key相差1的值 就将它们的个数相加 代表lhs的长度
    if (memo.has(key + 1)) {
      ans = Math.max(ans, memo.get(key + 1) + memo.get(key))
    }
    if (memo.has(key - 1)) {
      ans = Math.max(ans, memo.get(key - 1) + memo.get(key))
    }
  }
  return ans
};
