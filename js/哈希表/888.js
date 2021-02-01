// 888. 公平的糖果棒交换
// 爱丽丝和鲍勃有不同大小的糖果棒：A[i] 是爱丽丝拥有的第 i 根糖果棒的大小，B[j] 是鲍勃拥有的第 j 根糖果棒的大小。

// 因为他们是朋友，所以他们想交换一根糖果棒，这样交换后，他们都有相同的糖果总量。（一个人拥有的糖果总量是他们拥有的糖果棒大小的总和。）

// 返回一个整数数组 ans，其中 ans[0] 是爱丽丝必须交换的糖果棒的大小，ans[1] 是 Bob 必须交换的糖果棒的大小。

// 如果有多个答案，你可以返回其中任何一个。保证答案存在。

 

// 示例 1：

// 输入：A = [1,1], B = [2,2]
// 输出：[1,2]
// 示例 2：

// 输入：A = [1,2], B = [2,3]
// 输出：[1,2]
// 示例 3：

// 输入：A = [2], B = [1,3]
// 输出：[2,3]
// 示例 4：

// 输入：A = [1,2,5], B = [2,4]
// 输出：[5,4]
 

// 提示：

// 1 <= A.length <= 10000
// 1 <= B.length <= 10000
// 1 <= A[i] <= 100000
// 1 <= B[i] <= 100000
// 保证爱丽丝与鲍勃的糖果总量不同。
// 答案肯定存在。

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
// 根据题意列出等式，假设 [x, y] 是要交换的糖果，交换后两人糖果相等，可得 sumA - x + y = sumB - y + x
var fairCandySwap = function(A, B) {
  // sumA - x + y = sumB - y + x ==> y = (sumB - sumA) / 2 + x
  // 即 B 中存在一个数 是 A中某个数的 (sumB - sumA) / 2 + x 该组即答案
  const sumA = A.reduce((acc, cur) => acc + cur, 0)
  const sumB = B.reduce((acc, cur) => acc + cur, 0)
  let hash = {}
  for (let num of A) {
    hash[num] = num
  }
  for (let num of B) {
    const target = num - (sumB - sumA) / 2
    if (hash[target]) {
      return [target, num]
    }
  }
};

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
// 使用 set 结构
var fairCandySwap = function(A, B) {
  const sumA = A.reduce((cur, acc) => cur + acc, 0)
  const sumB = B.reduce((cur, acc) => cur + acc, 0)
  const diff = (sumB - sumA) / 2
  let setB = new Set(B)
  for (let i = 0; i < A.length; i++) {
    const target = A[i] + diff
    if (setB.has(target)) {
      return [A[i], target]
    }
  }
};