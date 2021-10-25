// 240. 搜索二维矩阵 II
// 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

// 每行的元素从左到右升序排列。
// 每列的元素从上到下升序排列。
 

// 示例 1：


// 输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
// 输出：true
// 示例 2：


// 输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
// 输出：false
 

// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= n, m <= 300
// -109 <= matrix[i][j] <= 109
// 每行的所有元素从左到右升序排列
// 每列的所有元素从上到下升序排列
// -109 <= target <= 109

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  // 以左下角为根的二分搜索树
  const m = matrix.length, n = matrix[0].length
  for (let i = m - 1, j = 0; i >= 0 && j <= n;) {
    if (matrix[i][j] === target) {
      return true
    } else if (matrix[i][j] > target) {
      i--
    } else {
      j++
    }
  }
  return false
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  const m = matrix.length, n = matrix[0].length
  // 元素索引 [0,m*n-1] 二位索引ij转一维索引x=i*n+j; 一维索引x转二维索引i=x/n;j=x%n
  // 对每行用二分 先确定target可能在哪一行 target>=[i,0] && target<[i+1,0]
  let row = -1
  // 只要target>=[i,0] 就需要进行一次二分查找
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] <= target && binarySearch(matrix[i], target)) {
      return true
    }
  }
  return false
};

const binarySearch = (arr, target) => {
  const n = arr.length
  let low = 0, high = n - 1
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low
    if (arr[mid] === target) {
      return true
    } else if (arr[mid] > target) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return false
}
