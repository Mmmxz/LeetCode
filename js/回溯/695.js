// 695. 岛屿的最大面积
// 给定一个包含了一些 0 和 1 的非空二维数组 grid 。

// 一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

// 找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)

 

// 示例 1:

// [[0,0,1,0,0,0,0,1,0,0,0,0,0],
//  [0,0,0,0,0,0,0,1,1,1,0,0,0],
//  [0,1,1,0,1,0,0,0,0,0,0,0,0],
//  [0,1,0,0,1,1,0,0,1,0,1,0,0],
//  [0,1,0,0,1,1,0,0,1,1,1,0,0],
//  [0,0,0,0,0,0,0,0,0,0,1,0,0],
//  [0,0,0,0,0,0,0,1,1,1,0,0,0],
//  [0,0,0,0,0,0,0,1,1,0,0,0,0]]
// 对于上面这个给定矩阵应返回 6。注意答案不应该是 11 ，因为岛屿只能包含水平或垂直的四个方向的 1 。

// 示例 2:

// [[0,0,0,0,0,0,0,0]]
// 对于上面这个给定的矩阵, 返回 0。

 

// 注意: 给定的矩阵grid 的长度和宽度都不超过 50。

/**
 * @description dfs
 * @param {number[][]} grid
 * @return {number}
 */
 var maxAreaOfIsland = function(grid) {
  const m = grid.length, n = grid[0].length
  // 上下左右
  const direction = [[0, 1], [0, -1], [-1, 0], [1, 0]]
  let maxArea = 0
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      return 0
    }
    // 设置为0代表已访问过
    grid[i][j] = 0
    let area = 1, dx = [-1, 1, 0, 0], dy = [0, 0, 1, -1];
    for (let k = 0; k < direction.length; k++) {
      const newX = i + direction[k][0], newY = j + direction[k][1]
      area += dfs(newX, newY)
    }
    return area
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      maxArea = Math.max(maxArea, dfs(i, j))
    }
  }
  return maxArea
};
