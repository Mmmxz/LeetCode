// 171. Excel表列序号
// 给定一个Excel表格中的列名称，返回其相应的列序号。

// 例如，

//     A -> 1
//     B -> 2
//     C -> 3
//     ...
//     Z -> 26
//     AA -> 27
//     AB -> 28 
//     ...
// 示例 1:

// 输入: "A"
// 输出: 1
// 示例 2:

// 输入: "AB"
// 输出: 28
// 示例 3:

// 输入: "ZY"
// 输出: 701
// 致谢：
// 特别感谢 @ts 添加此问题并创建所有测试用例。

/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function(columnTitle) {
  const n = columnTitle.length
  // A-Z [1,26]
  let ans = 0
  for (let i = n - 1; i >= 0; i--) {
    // 当前是最后一位 * 26^0 倒数第二位 * 26^1 倒数第三位 * 26^2
    ans += (columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1) * 26 ** (n - 1 - i)
  }
  return ans
};
