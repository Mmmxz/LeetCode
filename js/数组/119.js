// 119. 杨辉三角 II
// 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。



// 在杨辉三角中，每个数是它左上方和右上方的数的和。

// 示例:

// 输入: 3
// 输出: [1,3,3,1]
// 进阶：

// 你可以优化你的算法到 O(k) 空间复杂度吗？

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  // 注意：从第 0 行开始
  const res = new Array(rowIndex + 1).fill(0) // 存储每行
  for (let i = 0; i <= rowIndex; i++) {
    res[i] = new Array(i + 1).fill(0) // 存储当前行的每个值
    res[i][0] = res[i][i] = 1 // 每行的第一个和最后一个一定是 1
    // 其他第 j 个元素的值 = 上一行的 j-1 元素 + 上一行的 j 元素
    for (let j = 1; j < i; j++) {
      res[i][j] = res[i - 1][j - 1] + res[i - 1][j]
    }
  }
  // 返回结果行
  return res[rowIndex]
};