// 39. 组合总和
// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的数字可以无限制重复被选取。

// 说明：

// 所有数字（包括 target）都是正整数。
// 解集不能包含重复的组合。 
// 示例 1：

// 输入：candidates = [2,3,6,7], target = 7,
// 所求解集为：
// [
//   [7],
//   [2,2,3]
// ]
// 示例 2：

// 输入：candidates = [2,3,5], target = 8,
// 所求解集为：
// [
//   [2,2,2,2],
//   [2,3,3],
//   [3,5]
// ]
 

// 提示：

// 1 <= candidates.length <= 30
// 1 <= candidates[i] <= 200
// candidate 中的每个元素都是独一无二的。
// 1 <= target <= 500

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum = function(candidates, target) {
  const n = candidates.length
  let res = []
  const dfs = (index, target, path) => {
    if (target === 0) {
      res.push(path.slice())
      return
    }
    for (let i = index; i < n; i++) {
      if (target - candidates[i] < 0) {
        return
      }
      path.push(candidates[i])
      // 子递归传了 i 而不是 i+1 ，因为元素可以重复选入集合，如果传 i+1 就不重复了
      dfs(i, target - candidates[i], path)
      path.pop()
    }
  }
  candidates.sort((a, b) => a - b)
  dfs(0, target, [])
  return res
};


/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  // 组合，每组答案无序，需要start记录开始位置
  const n = candidates.length, ans = []
  const dfs = (start, path, sum) => {
    if (sum === target) {
      ans.push(path.slice())
      return
    }
    // 选择范围
    for (let i = start; i < n; i++) {
      // 剪枝
      if (sum > target) {
        // 因为没从小到大排序 所以这里continue 而不是break
        continue
      }
      path.push(candidates[i])
      // 可以重复使用
      dfs(i, path, sum + candidates[i])
      path.pop()
    }
  }
  dfs(0, [], 0)
  return ans
};
