// 930. 和相同的二元子数组
// 给你一个二元数组 nums ，和一个整数 goal ，请你统计并返回有多少个和为 goal 的 非空 子数组。

// 子数组 是数组的一段连续部分。

 

// 示例 1：

// 输入：nums = [1,0,1,0,1], goal = 2
// 输出：4
// 解释：
// 有 4 个满足题目要求的子数组：[1,0,1]、[1,0,1,0]、[0,1,0,1]、[1,0,1]
// 示例 2：

// 输入：nums = [0,0,0,0,0], goal = 0
// 输出：15
 

// 提示：

// 1 <= nums.length <= 3 * 104
// nums[i] 不是 0 就是 1
// 0 <= goal <= nums.length

/**
 * @description 前缀和 + hash 参考题解：https://leetcode-cn.com/problems/binary-subarrays-with-sum/solution/de-liao-yi-wen-ba-qian-zhui-he-miao-sha-mqngx/
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function(nums, goal) {
  const n = nums.length
  const prefix = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1]
  }
  let ans = 0
  const memo = new Map()
  memo.set(0, 1)
  for (let i = 0; i < n; i++) {
    if (memo.has(prefix[i + 1] - goal)) {
      ans += memo.get(prefix[i + 1] - goal)
    }
    memo.set(prefix[i + 1], (memo.get(prefix[i + 1]) || 0) + 1)
  }
  return ans
};
