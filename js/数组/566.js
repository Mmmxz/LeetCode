// 566. 重塑矩阵
// 在MATLAB中，有一个非常有用的函数 reshape，它可以将一个矩阵重塑为另一个大小不同的新矩阵，但保留其原始数据。

// 给出一个由二维数组表示的矩阵，以及两个正整数r和c，分别表示想要的重构的矩阵的行数和列数。

// 重构后的矩阵需要将原始矩阵的所有元素以相同的行遍历顺序填充。

// 如果具有给定参数的reshape操作是可行且合理的，则输出新的重塑矩阵；否则，输出原始矩阵。

// 示例 1:

// 输入: 
// nums = 
// [[1,2],
//  [3,4]]
// r = 1, c = 4
// 输出: 
// [[1,2,3,4]]
// 解释:
// 行遍历nums的结果是 [1,2,3,4]。新的矩阵是 1 * 4 矩阵, 用之前的元素值一行一行填充新矩阵。
// 示例 2:

// 输入: 
// nums = 
// [[1,2],
//  [3,4]]
// r = 2, c = 4
// 输出: 
// [[1,2],
//  [3,4]]
// 解释:
// 没有办法将 2 * 2 矩阵转化为 2 * 4 矩阵。 所以输出原矩阵。
// 注意：

// 给定矩阵的宽和高范围在 [1, 100]。
// 给定的 r 和 c 都是正数。

/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
  const h = nums.length, w = nums[0].length
  const total = h * w, after = r * c
  // 无法转换 输出原矩阵
  if (total !== after) {
    return nums
  }
  let res = new Array(r).fill(0).map(() => new Array(c).fill(0))
  const temp = nums.flat()
  // 双重循环 依次赋值即可
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      res[i][j] = temp.shift()
    }
  }
  return res
};