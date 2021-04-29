// 1091. 二进制矩阵中的最短路径
// 给你一个 n x n 的二进制矩阵 grid 中，返回矩阵中最短 畅通路径 的长度。如果不存在这样的路径，返回 -1 。

// 二进制矩阵中的 畅通路径 是一条从 左上角 单元格（即，(0, 0)）到 右下角 单元格（即，(n - 1, n - 1)）的路径，该路径同时满足下述要求：

// 路径途经的所有单元格都的值都是 0 。
// 路径中所有相邻的单元格应当在 8 个方向之一 上连通（即，相邻两单元之间彼此不同且共享一条边或者一个角）。
// 畅通路径的长度 是该路径途经的单元格总数。

 

// 示例 1：


// 输入：grid = [[0,1],[1,0]]
// 输出：2
// 示例 2：


// 输入：grid = [[0,0,0],[1,1,0],[1,1,0]]
// 输出：4
// 示例 3：

// 输入：grid = [[1,0,0],[1,1,0],[1,1,0]]
// 输出：-1
 

// 提示：

// n == grid.length
// n == grid[i].length
// 1 <= n <= 100
// grid[i][j] 为 0 或 1

/**
 * @param {number[][]} grid
 * @return {number}
 */
 var shortestPathBinaryMatrix = function(grid) {
  // bfs
  if (grid[0][0] !== 0) {
    return -1
  }
  const n = grid.length
  // 8个方向 上下左右 左上 右上 左下 右下
  const direction = [[0, 1], [0, -1], [-1, 0], [1, 0], [-1, 1], [1, 1], [-1, -1], [1, -1]]
  const inArea = (i, j) => i >= 0 && i < n && j >= 0 && j < n
  let queue = [[0, 0]], step = 1
  grid[0][0] = 1 // 标记起点已访问
  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      if (cur[0] === n - 1 && cur[1] === n - 1) {
        return step
      }
      // 遍历8个方向 如果是0 加入结果
      for (let j = 0; j < 8; j++) {
        const newx = cur[0] + direction[j][0], newy = cur[1] + direction[j][1]
        if (inArea(newx, newy) && grid[newx][newy] === 0) {
          queue.push([newx, newy])
          grid[newx][newy] = 1
        }
      }
    }
    step++
  }
  return -1
};