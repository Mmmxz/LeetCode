// 304. 二维区域和检索 - 矩阵不可变
// 给定一个二维矩阵，计算其子矩形范围内元素的总和，该子矩阵的左上角为 (row1, col1) ，右下角为 (row2, col2) 。

// Range Sum Query 2D
// 上图子矩阵左上角 (row1, col1) = (2, 1) ，右下角(row2, col2) = (4, 3)，该子矩形内元素的总和为 8。

 

// 示例：

// 给定 matrix = [
//   [3, 0, 1, 4, 2],
//   [5, 6, 3, 2, 1],
//   [1, 2, 0, 1, 5],
//   [4, 1, 0, 1, 7],
//   [1, 0, 3, 0, 5]
// ]

// sumRegion(2, 1, 4, 3) -> 8
// sumRegion(1, 1, 2, 2) -> 11
// sumRegion(1, 2, 2, 4) -> 12
 

// 提示：

// 你可以假设矩阵不可变。
// 会多次调用 sumRegion 方法。
// 你可以假设 row1 ≤ row2 且 col1 ≤ col2 。

// 解法 1 ：前缀和 与矩阵大小相同，需要判断边界条件
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
  const row = matrix.length
  if (!row) {
    return
  }
  const col = matrix[0].length
  // 二维数组存储 [0,0] 到 [i,j] 的前缀和
  const arr = new Array(row).fill(0).map(() => new Array(col).fill(0))
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i === 0 && j === 0) {
        arr[i][j] = matrix[i][j]
      }
      if (i === 0 && j > 0) {
        arr[i][j] = matrix[i][j] + arr[i][j - 1]
      }
      if (i > 0 && j === 0) {
        arr[i][j] = matrix[i][j] + arr[i - 1][j]
      }
      if (i > 0 && j > 0) {
        arr[i][j] = arr[i - 1][j] + arr[i][j - 1] + matrix[i][j] - arr[i - 1][j - 1]
      }
    }
  }
  this.list = arr
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  if (row1 === 0 && col1 === 0) {
    return this.list[row2][col2]
  }
  if (row1 === 0 && col1 > 0) {
    return this.list[row2][col2] - this.list[row2][col1 - 1]
  }
  if (row1 > 0 && col1 === 0) {
    return this.list[row2][col2] - this.list[row1 - 1][col2]
  }
  return this.list[row2][col2] - this.list[row2][col1 - 1] - this.list[row1 - 1][col2] + this.list[row1 - 1][col1 - 1] 
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */

//  解法 2 ：前缀和 比矩阵长宽大 1 无需判断边界条件
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
  const row = matrix.length
  if (!row) {
    return
  }
  const col = matrix[0].length
  const arr = new Array(row + 1).fill(0).map(() => new Array(col + 1).fill(0))
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      arr[i + 1][j + 1] = matrix[i][j] + arr[i][j + 1] + arr[i + 1][j] - arr[i][j]
    }
  }
  // arr[i][j] 存储 [0,0] -> (i,j) 的和，不包含matrix[i][j]
  this.list = arr
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  return this.list[row2 + 1][col2 + 1] - this.list[row2 + 1][col1] - this.list[row1][col2 + 1] + this.list[row1][col1]
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */