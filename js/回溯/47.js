// 47. 全排列 II
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

 

// 示例 1：

// 输入：nums = [1,1,2]
// 输出：
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
// 示例 2：

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 

// 提示：

// 1 <= nums.length <= 8
// -10 <= nums[i] <= 10

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 思路在 #46 的基础上，加入了去重剪枝逻辑
 var permuteUnique = function(nums) {
  let res = []
  const n = nums.length
  const visited = new Array(n).fill(0)
  const findPermute = (index, arr) => {
    if (index === n) {
      res.push(arr.slice())
      return
    }
    for (let i = 0; i < n; i++) {
      // 当现在这个数等于之前的数 且之前那个数没有访问时 肯定会重复 所以剪掉
      if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) {
        continue
      }
      if (!visited[i]) {
        arr.push(nums[i])
        visited[i] = 1
        findPermute(index + 1, arr)
        visited[i] = 0
        arr.pop()
      }
    }
  }
  // 从小到大排序 使相同的元素挨在一起 方便剪枝
  nums.sort((a, b) => a - b)
  findPermute(0, [])
  return res
};

// 题解参考：https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liwe-2/