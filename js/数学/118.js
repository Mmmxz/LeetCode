// 118. 杨辉三角
// 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

// 在「杨辉三角」中，每个数是它左上方和右上方的数的和。



 

// 示例 1:

// 输入: numRows = 5
// 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
// 示例 2:

// 输入: numRows = 1
// 输出: [[1]]
 

// 提示:

// 1 <= numRows <= 30

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  let ans = []
  for (let i = 1; i <= numRows; i++) {
    let temp = new Array(i).fill(1)
    // temp有i个元素
    for (let j = 1; j < i - 1; j++) {
      // 中间的数怎么算？ 等于上一行的数错位相加
      // 当前行的j项 等于当前行上一行的j-1项和j项的和
      temp[j] = ans[i - 2][j - 1] + ans[i - 2][j]
    }
    ans.push(temp)
  }
  return ans
};
