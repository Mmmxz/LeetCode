// 576. 出界的路径数
// 给你一个大小为 m x n 的网格和一个球。球的起始坐标为 [startRow, startColumn] 。你可以将球移到在四个方向上相邻的单元格内（可以穿过网格边界到达网格之外）。你 最多 可以移动 maxMove 次球。

// 给你五个整数 m、n、maxMove、startRow 以及 startColumn ，找出并返回可以将球移出边界的路径数量。因为答案可能非常大，返回对 109 + 7 取余 后的结果。

 

// 示例 1：


// 输入：m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
// 输出：6
// 示例 2：


// 输入：m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
// 输出：12
 

// 提示：

// 1 <= m, n <= 50
// 0 <= maxMove <= 50
// 0 <= startRow < m
// 0 <= startColumn < n

/**
 * @description 记忆化搜索
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */
var findPaths = function(m, n, maxMove, startRow, startColumn) {
  const MOD = Math.pow(10, 9) + 7
  // 步数从1开始 所以设置大小为max+1
  const memo = new Array(m).fill(0).map(() => new Array(n).fill(0).map(() => new Array(maxMove + 1).fill(-1)))
  const dir = [[1,0],[-1,0],[0,1],[0,-1]]
  const dfs = (x, y, k) => {
    if (x < 0 || x >= m || y < 0 || y >= n) {
      return 1
    }
    if (k === 0) {
      return 0
    }
    if (memo[x][y][k] !== -1) {
      return memo[x][y][k]
    }
    let ans = 0
    for (let i = 0; i < 4; i++) {
      const nx = x + dir[i][0], ny = y + dir[i][1]
      ans += dfs(nx, ny, k - 1)
      ans = ans % MOD
    }
    memo[x][y][k] = ans
    return ans
  }
  return dfs(startRow, startColumn, maxMove)
};
