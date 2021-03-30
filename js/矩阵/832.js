// 832. 翻转图像
// 给定一个二进制矩阵 A，我们想先水平翻转图像，然后反转图像并返回结果。

// 水平翻转图片就是将图片的每一行都进行翻转，即逆序。例如，水平翻转 [1, 1, 0] 的结果是 [0, 1, 1]。

// 反转图片的意思是图片中的 0 全部被 1 替换， 1 全部被 0 替换。例如，反转 [0, 1, 1] 的结果是 [1, 0, 0]。

 

// 示例 1：

// 输入：[[1,1,0],[1,0,1],[0,0,0]]
// 输出：[[1,0,0],[0,1,0],[1,1,1]]
// 解释：首先翻转每一行: [[0,1,1],[1,0,1],[0,0,0]]；
//      然后反转图片: [[1,0,0],[0,1,0],[1,1,1]]
// 示例 2：

// 输入：[[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
// 输出：[[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
// 解释：首先翻转每一行: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]]；
//      然后反转图片: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
 

// 提示：

// 1 <= A.length = A[0].length <= 20
// 0 <= A[i][j] <= 1

/**
 * @param {number[][]} A
 * @return {number[][]}
 */
// 解法 1 ：暴力
var flipAndInvertImage = function(A) {
  const row = A.length, col = A[0].length
  for (let i = 0; i < row; i++) {
    // 反转 1->0 0->1
    for (let j = 0; j < col; j++) {
      A[i][j] ^= 1
    }
    // 水平翻转
    let start = 0, end = col - 1
    while (start < end) {
      let temp = A[i][start]
      A[i][start] = A[i][end]
      A[i][end] = temp
      start++
      end--
    }
  }
  return A
};

/**
 * @param {number[][]} A
 * @return {number[][]}
 */
// 解法 2 ：遍历一次
var flipAndInvertImage = function(A) {
  const row = A.length, col = A[0].length
  for (let i = 0; i < row; i++) {
    let start = 0, end = col - 1
    while (start < end) {
      // 先翻转 如果两数不等 翻转后再反转 相当于不变 所以不用处理 如果两数相等 则翻转后再反转就是直接进行反转
      if (A[i][start] === A[i][end]) {
        A[i][start] ^= 1
        A[i][end] ^= 1
      }
      start++
      end--
    }
    // 如果有没处理到的数 直接反转
    if (start === end) {
      A[i][start] ^= 1
    }
  }
  return A
};