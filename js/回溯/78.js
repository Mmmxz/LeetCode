// 78. 子集
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

 

// 示例 1：

// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
// 示例 2：

// 输入：nums = [0]
// 输出：[[],[0]]
 

// 提示：

// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10
// nums 中的所有元素 互不相同

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const ans = []
  const dfs = (index, arr) => {
    if (index === nums.length) {
      ans.push(arr.slice())
      return
    }
    arr.push(nums[index]) // 选择这个数
    dfs(index + 1, arr) // 基于该选择 继续往下递归 考察下一个数
    arr.pop() // 上面递归结束 撤销该选择
    dfs(index + 1, arr) // 不选这个数 继续往下递归 考察下一个数
  }
  dfs(0, [])
  return ans  
};
