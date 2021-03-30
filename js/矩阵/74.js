// 74. 搜索二维矩阵
// 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

// 每行中的整数从左到右按升序排列。
// 每行的第一个整数大于前一行的最后一个整数。
 

// 示例 1：


// 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// 输出：true
// 示例 2：


// 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
// 输出：false
 

// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
// -104 <= matrix[i][j], target <= 104

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
  const m = matrix.length, n = matrix[0].length
  // 判断应该在哪一行 初始化在最后一行
  let row = m - 1
  for (let i = 1; i < m; i++) {
    // 如果当前行首大于目标 说明应该在上一行找
    if (matrix[i][0] > target) {
      row = i - 1
      break
    }
  }
  // 在目标行中找是否包含
  return matrix[row].includes(target)
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
  // 转一维数组 二分
  const m = matrix.length, n = matrix[0].length
  let low = 0, high = m * n - 1
  while (low <= high) {
    const mid = Math.floor((high - low) /2) + low
    // mid 是一维的 要转换为2维
    const x = matrix[Math.floor(mid / n)][mid % n]
    if (x > target) {
      high = mid - 1
    } else if (x < target) {
      low = mid + 1
    } else {
      return true
    }
  }
  return false
};