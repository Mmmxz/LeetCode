// 989. 数组形式的整数加法
// 对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。

// 给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。

 

// 示例 1：

// 输入：A = [1,2,0,0], K = 34
// 输出：[1,2,3,4]
// 解释：1200 + 34 = 1234
// 示例 2：

// 输入：A = [2,7,4], K = 181
// 输出：[4,5,5]
// 解释：274 + 181 = 455
// 示例 3：

// 输入：A = [2,1,5], K = 806
// 输出：[1,0,2,1]
// 解释：215 + 806 = 1021
// 示例 4：

// 输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
// 输出：[1,0,0,0,0,0,0,0,0,0,0]
// 解释：9999999999 + 1 = 10000000000
 

// 提示：

// 1 <= A.length <= 10000
// 0 <= A[i] <= 9
// 0 <= K <= 10000
// 如果 A.length > 1，那么 A[0] != 0

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
// 解法 1 ：暴力 每次相加后放入结果中 当前位 = (A 的当前位 + B 的当前位 + 进位carry) % 10
var addToArrayForm = function(A, K) {
  // bit 存储进位
  let bit = 0, sum = 0
  let listK = K.toString().split('')
  let lenA = A.length
  let lenK = listK.length
  let res = []
  while(lenA > 0 || lenK > 0) {
    let add1 = A.pop() || 0, add2 = listK.pop() || 0
    lenK--
    lenA--
    sum = Number(add1) + Number(add2) + bit
    if (sum > 9) {
      bit = 1
      sum %= 10
    } else {
      bit = 0
    }
    res.unshift(sum)
  }
  if (bit) {
    res.unshift(bit)
  }
  return res
};

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
// 解法 2 ：逐位相加 与解法 1 思路一样 实现有差别
var addToArrayForm = function(A, K) {
  const res = []
  const n = A.length
  for (let i = n - 1; i >= 0; i--) {
    let sum = A[i] + K % 10
    K = Math.floor(K / 10)
    if (sum >= 10) {
      K++
      sum -= 10
    }
    res.unshift(sum)
  }
  for (; K > 0; K = Math.floor(K / 10)) {
    res.unshift(K % 10)
  }
  return res
};