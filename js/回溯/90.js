// 90. 子集 II
// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

 

// 示例 1：

// 输入：nums = [1,2,2]
// 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
// 示例 2：

// 输入：nums = [0]
// 输出：[[],[0]]
 

// 提示：

// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 思路在 #78 的基础上增加了剪枝逻辑 与 #47 一样
 var subsetsWithDup = function(nums) {
  let res = []
  const n = nums.length
  const visited = new Array(n).fill(0)
  const backtrack = (index, arr) => {
    res.push(arr.slice())
    for (let i = index; i < n; i++) {
      // 当前数与前一个数相同 且前一个数没被用过 说明一定会重复 直接剪枝
      if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) {
        continue
      }
      if (!visited[i]) {
        arr.push(nums[i])
        visited[i] = 1
        backtrack(i + 1, arr)
        arr.pop()
        visited[i] = 0
      }
    }
  }
  // 排序 保证同样的数字在一起挨着
  nums.sort((a, b) => a - b)
  backtrack(0, [])
  return res
};