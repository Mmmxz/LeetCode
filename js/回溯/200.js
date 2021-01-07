// 200. 岛屿数量
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

// 此外，你可以假设该网格的四条边均被水包围。

 

// 示例 1：

// 输入：grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// 输出：1
// 示例 2：

// 输入：grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// 输出：3
 

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// grid[i][j] 的值为 '0' 或 '1'

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let res = 0
  // 二维矩阵的高和宽
  let h = grid.length
  if (!h) {
    return res
  }
  let w = grid[0].length
  // 标记已访问
  let visited = Array(h).fill(false).map(() => Array(w).fill(false))
  // 坐标在二维数组内
  const inArea = (x, y) => {
    return x >= 0 && x < h && y >= 0 && y < w
  }
  // 四个方向
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  // dfs 深度优先遍历 标记已访问的点
  const floodfill = (grid, startx, starty) => {
    visited[startx][starty] = true
    for (let i = 0; i < 4; i++) {
      let newx = startx + directions[i][0]
      let newy = starty + directions[i][1]
      if (inArea(newx, newy) && !visited[newx][newy] && grid[newx][newy] === '1') {
        floodfill(grid, newx, newy)
      }
    }
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      // 该区域未访问 且值为 1
      if (grid[i][j] === '1' && !visited[i][j]) {
        // 符合要求 省份 +1 调用 dfs 方法 标记相邻的省份
        res++
        floodfill(grid, i, j)
      }
    }
  }
  return res
};