// 59. 螺旋矩阵 II
// 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

 

// 示例 1：


// 输入：n = 3
// 输出：[[1,2,3],[8,9,4],[7,6,5]]
// 示例 2：

// 输入：n = 1
// 输出：[[1]]
 

// 提示：

// 1 <= n <= 20

/**
 * @param {number} n
 * @return {number[][]}
 */
 var generateMatrix = function(n) {
  const total = n * n
  // 右下左上
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0))
  let up = 0, down = n - 1, left = 0, right = n - 1, curDirection = 0, x = 0, y = 0
  for (let i = 1; i <= total; i++) {
    matrix[x][y] = i

    // 什么时候改方向
    if (curDirection === 0 && y === right) {
      // 向右且到达最右
      up += 1
      curDirection = (curDirection + 1) % 4
    }
    if (curDirection === 1 && x === down) {
      // 向下且到达最下
      right -= 1
      curDirection = (curDirection + 1) % 4
    }
    if (curDirection === 2 && y === left) {
      // 向左且到达最左
      down -= 1
      curDirection = (curDirection + 1) % 4
    }
    if (curDirection === 3 && x === up) {
      // 向上且到达最上
      left += 1
      curDirection = (curDirection + 1) % 4
    }
    x += direction[curDirection][0]
    y += direction[curDirection][1]
  }
  return matrix
};