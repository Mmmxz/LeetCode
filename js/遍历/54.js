// 54. 螺旋矩阵
// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

 

// 示例 1：


// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]
// 示例 2：


// 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 

// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 10
// -100 <= matrix[i][j] <= 100

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
  const m = matrix.length, n = matrix[0].length
  // 右下左上 顺时针方向
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  let up = 0, down = m - 1, left = 0, right = n - 1
  const ans = [], total = m * n
  let x = 0, y = 0, curDirection = 0 // 当前的方向
  while (ans.length !== total) {
    ans.push(matrix[x][y])
    // 何时改方向
    if (curDirection === 0 && y === right) {
      // 向右 且到达最右边 方向改为向下 且减去一行
      up += 1
      curDirection = (curDirection + 1) % 4
    }
    if (curDirection === 1 && x === down) {
      // 向下 且到达最下边 方向改为向左 且减去一列
      right -= 1
      curDirection = (curDirection + 1) % 4
    }
    if (curDirection === 2 && y === left) {
      // 向左 且到达最左边 方向改为向上 且减去一行
      down -= 1
      curDirection = (curDirection + 1) % 4
    }
    if (curDirection === 3 && x === up) {
      // 向上 且到达最上边 方向改为向右 且减去一列
      left += 1
      curDirection = (curDirection + 1) % 4
    }

    // xy 更新
    x += direction[curDirection][0]
    y += direction[curDirection][1]
  }
  return ans
};

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 借助visited判断已访问
 var spiralOrder = function(matrix) {
  const m = matrix.length, n = matrix[0].length
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(0))
  const ans = [], total = m * n, direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  // 遍历过 置为1 碰到边界或者访问过 更换方向
  let directionIndex = 0, row = 0, col = 0
  for (let i = 0; i < total; i++) {
    ans.push(matrix[row][col])
    visited[row][col] = 1
    const nextRow = row + direction[directionIndex][0], nextCol = col + direction[directionIndex][1]
    // 碰到没访问过 且坐标在矩阵中 则啥都不做 否则改变方向
    if (!(nextRow >= 0 && nextRow < m && nextCol >= 0 && nextCol < n && !visited[nextRow][nextCol])) {
      directionIndex = (directionIndex + 1) % 4
    }
    // 按照方向确定下一个row和col
    row += direction[directionIndex][0]
    col += direction[directionIndex][1]
  }
  return ans
};