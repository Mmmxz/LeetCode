// 363. 矩形区域不超过 K 的最大数值和
// 给你一个 m x n 的矩阵 matrix 和一个整数 k ，找出并返回矩阵内部矩形区域的不超过 k 的最大数值和。

// 题目数据保证总会存在一个数值和不超过 k 的矩形区域。

 

// 示例 1：


// 输入：matrix = [[1,0,1],[0,-2,3]], k = 2
// 输出：2
// 解释：蓝色边框圈出来的矩形区域 [[0, 1], [-2, 3]] 的数值和是 2，且 2 是不超过 k 的最大数字（k = 2）。
// 示例 2：

// 输入：matrix = [[2,2,-1]], k = 3
// 输出：3
 

// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
// -100 <= matrix[i][j] <= 100
// -105 <= k <= 105
 

// 进阶：如果行数远大于列数，该如何设计解决方案？

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
 var maxSumSubmatrix = function(matrix, k) {
  const m = matrix.length, n = matrix[0].length
  // 矩形改为存储前缀和
  const arr = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        arr[i][j] = matrix[i][j]
      } else if (i === 0 && j > 0) {
        arr[i][j] = matrix[i][j] + arr[i][j - 1]
      } else if (i > 0 && j === 0) {
        arr[i][j] = matrix[i][j] + arr[i - 1][j]
      } else {
        arr[i][j] = matrix[i][j] + arr[i - 1][j] + arr[i][j - 1] - arr[i - 1][j - 1]
      }
    }
  }
  // 遍历所有矩形 求最大值
  let maxNum = -Infinity
  for (let x1 = 0; x1 < m; x1++) {
    for (let y1 = 0; y1 < n; y1++) {
      // x1,y1
      for (let x2 = x1; x2 < m; x2++) {
        for (let y2 = y1; y2 < n; y2++) {
          // x2,y2
          // 分情况计算每个区域的和 取最大值
          let sum = 0
          if (x1 === 0 && y1 === 0) {
            sum = arr[x2][y2]
          } else if (x1 === 0 && y1 > 0) {
            sum = arr[x2][y2] - arr[x2][y1 - 1]
          } else if (x1 > 0 && y1 === 0) {
            sum = arr[x2][y2] - arr[x1 - 1][y2]
          } else {
            sum = arr[x2][y2] - arr[x2][y1 - 1] - arr[x1 - 1][y2] + arr[x1 - 1][y1 - 1]
          }
          if (sum <= k) {
            maxNum = Math.max(sum, maxNum)
          }
        }
      }
    }
  }
  return maxNum
};