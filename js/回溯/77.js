// 77. 组合
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

// 示例:

// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
 var combine = function(n, k) {
  let res = []
  const dfs = (index, path) => {
    if (path.length === k) {
      res.push(path.slice())
      return
    }
    for (let i = index; i <= n; i++) {
      path.push(i)
      // 取 i+1 让数字无法重复使用 如果取 i 则数字会重复使用
      dfs(i + 1, path)
      path.pop()
    }
  }
  dfs(1, [])
  return res
};
