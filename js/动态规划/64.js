// 64. 最小路径和
// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

// 说明：每次只能向下或者向右移动一步。

 

// 示例 1：


// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
// 输出：7
// 解释：因为路径 1→3→1→1→1 的总和最小。
// 示例 2：

// 输入：grid = [[1,2,3],[4,5,6]]
// 输出：12
 

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 200
// 0 <= grid[i][j] <= 100

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  // dp[i][j]代表从左上角到[i,j]的最小和 return dp[m-1][n-1]
  // dp[0][0] = grid[0][0]
  // dp[i][j] = min( dp[i-1][j], dp[i][j-1] ) + grid[i][j]
  const m = grid.length, n = grid[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp[0][0] = grid[0][0]
      } else if (i === 0 && j > 0) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
      } else if (i > 0 && j === 0) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
      }
    }
  }
  return dp[m - 1][n - 1]
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  // 回溯 超时
  const m = grid.length, n = grid[0].length
  let ans = Number.MAX_SAFE_INTEGER
  const direction = [[0, 1], [1, 0]]
  const inArea = (i, j) => i >= 0 && i < m && j >= 0 && j < n
  const dfs = (i, j, sum) => {
    if (i === m - 1 && j === n - 1) {
      ans = Math.min(ans, sum)
      return
    }
    for (let k = 0; k < 2; k++) {
      const newx = direction[k][0] + i
      const newy = direction[k][1] + j
      if (inArea(newx, newy)) {
        dfs(newx, newy, sum + grid[newx][newy])
      }
    }
  }
  dfs(0, 0, grid[0][0])
  return ans
};
