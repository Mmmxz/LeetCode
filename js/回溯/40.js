// 40. 组合总和 II
// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的每个数字在每个组合中只能使用一次。

// 注意：解集不能包含重复的组合。 

 

// 示例 1:

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 输出:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]
// 示例 2:

// 输入: candidates = [2,5,2,1,2], target = 5,
// 输出:
// [
// [1,2,2],
// [5]
// ]
 

// 提示:

// 1 <= candidates.length <= 100
// 1 <= candidates[i] <= 50
// 1 <= target <= 30

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  // [1,2] [2,1] 是1组答案 需要借助 start
  candidates.sort((a, b) => a - b)
  const n = candidates.length, ans = []
  const dfs = (start, path, sum) => {
    if (sum === target) {
      ans.push(path.slice())
      return
    }
    for (let i = start; i < n; i++) {
      // 剪枝
      if (sum > target) {
        break
      }
      // 去重
      if (i > start && candidates[i] === candidates[i - 1]) {
        continue
      }
      path.push(candidates[i])
      dfs(i + 1, path, sum + candidates[i])
      path.pop()
    }
  }
  dfs(0, [], 0)
  return ans
};
