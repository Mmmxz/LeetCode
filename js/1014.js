// 给定正整数数组 A，A[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的距离为 j - i。

// 一对景点（i < j）组成的观光组合的得分为（A[i] + A[j] + i - j）：景点的评分之和减去它们两者之间的距离。

// 返回一对观光景点能取得的最高分。

//  

// 示例：

// 输入：[8,1,5,2,6]
// 输出：11
// 解释：i = 0, j = 2, A[i] + A[j] + i - j = 8 + 5 + 0 - 2 = 11
//  

// 提示：

// 2 <= A.length <= 50000
// 1 <= A[i] <= 1000

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/best-sightseeing-pair
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} A
 * @return {number}
 */
// 暴力解法->超时 时间复杂度O(n²)
// var maxScoreSightseeingPair = function(A) {
//   let score = []
//   for (let i = 0; i < A.length - 1; i++) {
//     for (let j = i + 1; j < A.length; j++) {
//       score.push(A[i] + A[j] + i - j)
//     }
//   }
//   return Math.max(...score)
// };

// 优化->贪心算法 时间复杂度O(n)
// 贪心算法：将问题分解为 A[i] + i 和 A[j] - j 的最大值  i < j
// 那我们在一次遍历 j 的时候只需要不断保存并且更新 A[i] + i 的值即可求出最大值
var maxScoreSightseeingPair = function(A) {
  let maxScore = 0, left = A[0] + 0 // A[i] + i
  for (let j = 1; j < A.length; j++) {
    maxScore = Math.max(maxScore, A[j] - j + left)
    left = Math.max(left, A[j] + j) // left存储 A[i] + i 的最大值
  }
  return maxScore
};

console.log(maxScoreSightseeingPair([8,1,5,2,6]))