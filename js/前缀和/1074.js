// 1074. 元素和为目标值的子矩阵数量
// 给出矩阵 matrix 和目标值 target，返回元素总和等于目标值的非空子矩阵的数量。

// 子矩阵 x1, y1, x2, y2 是满足 x1 <= x <= x2 且 y1 <= y <= y2 的所有单元 matrix[x][y] 的集合。

// 如果 (x1, y1, x2, y2) 和 (x1', y1', x2', y2') 两个子矩阵中部分坐标不同（如：x1 != x1'），那么这两个子矩阵也不同。

 

// 示例 1：



// 输入：matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
// 输出：4
// 解释：四个只含 0 的 1x1 子矩阵。
// 示例 2：

// 输入：matrix = [[1,-1],[-1,1]], target = 0
// 输出：5
// 解释：两个 1x2 子矩阵，加上两个 2x1 子矩阵，再加上一个 2x2 子矩阵。
// 示例 3：

// 输入：matrix = [[904]], target = 0
// 输出：0
 

// 提示：

// 1 <= matrix.length <= 100
// 1 <= matrix[0].length <= 100
// -1000 <= matrix[i] <= 1000
// -10^8 <= target <= 10^8

/**
 * @description 前缀和 + 暴力
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
 var numSubmatrixSumTarget = function(matrix, target) {
  // 前缀和
  const m = matrix.length, n = matrix[0].length
  const prefix = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  // perfix[i][j] 保存子矩阵 [0,0]-[i-1][j-1]的和
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      prefix[i][j] = matrix[i-1][j-1] + prefix[i][j-1] + prefix[i-1][j] - prefix[i-1][j-1]
      // prefix[i + 1][j + 1] = matrix[i][j] + prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j]
    }
  }
  let ans = 0
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      for (let x = 1; x <= i; x++) {
        for (let y = 1; y <= j; y++) {
          // 求区间[x-1,y-1]-[i-1,j-1]的和
          const sum = prefix[i][j] - prefix[x-1][j] - prefix[i][y-1] + prefix[x-1][y-1]
          if (sum === target) {
            ans++
          }
          // if (sum[i][j] - sum[p - 1][j] - sum[i][q - 1] + sum[p - 1][q - 1] == t) ans++;
        }
      }
    }
  }
  return ans
};