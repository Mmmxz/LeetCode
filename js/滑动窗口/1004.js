// 1004. 最大连续1的个数 III
// 给定一个由若干 0 和 1 组成的数组 A，我们最多可以将 K 个值从 0 变成 1 。

// 返回仅包含 1 的最长（连续）子数组的长度。

 

// 示例 1：

// 输入：A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
// 输出：6
// 解释： 
// [1,1,1,0,0,1,1,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 6。
// 示例 2：

// 输入：A = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
// 输出：10
// 解释：
// [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 10。
 

// 提示：

// 1 <= A.length <= 20000
// 0 <= K <= A.length
// A[i] 为 0 或 1 

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
// 思路与 #424 类似
var longestOnes = function(A, K) {
  // count - 当前窗口中 1 出现的次数， max - 历史最大长度
  let left = 0, right = 0, max = 0, count = 0
  while (right < A.length) {
    if (A[right]) {
      count++
    }
    right++
    // 窗口扩张后 更新历史最大长度
    max = Math.max(max, count)
    // 窗口宽度小于等于 max + k 时，窗口会不断扩张；大于时，窗口会滑动，永远不会收缩
    if (right - left > max + K) {
      if (A[left]) {
        count--
      }
      left++
    }
  }
  return right - left
};