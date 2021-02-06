// 1423. 可获得的最大点数
// 几张卡牌 排成一行，每张卡牌都有一个对应的点数。点数由整数数组 cardPoints 给出。

// 每次行动，你可以从行的开头或者末尾拿一张卡牌，最终你必须正好拿 k 张卡牌。

// 你的点数就是你拿到手中的所有卡牌的点数之和。

// 给你一个整数数组 cardPoints 和整数 k，请你返回可以获得的最大点数。

 

// 示例 1：

// 输入：cardPoints = [1,2,3,4,5,6,1], k = 3
// 输出：12
// 解释：第一次行动，不管拿哪张牌，你的点数总是 1 。但是，先拿最右边的卡牌将会最大化你的可获得点数。最优策略是拿右边的三张牌，最终点数为 1 + 6 + 5 = 12 。
// 示例 2：

// 输入：cardPoints = [2,2,2], k = 2
// 输出：4
// 解释：无论你拿起哪两张卡牌，可获得的点数总是 4 。
// 示例 3：

// 输入：cardPoints = [9,7,7,9,7,7,9], k = 7
// 输出：55
// 解释：你必须拿起所有卡牌，可以获得的点数为所有卡牌的点数之和。
// 示例 4：

// 输入：cardPoints = [1,1000,1], k = 1
// 输出：1
// 解释：你无法拿到中间那张卡牌，所以可以获得的最大点数为 1 。 
// 示例 5：

// 输入：cardPoints = [1,79,80,1,1,1,200,1], k = 3
// 输出：202
 

// 提示：

// 1 <= cardPoints.length <= 10^5
// 1 <= cardPoints[i] <= 10^4
// 1 <= k <= cardPoints.length

/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
// 思路：题目要求 k 个从两端取的数的最大和，可以转化为滑动窗口，窗口大小为总长度 n - k 个数的最小和，用总和减去滑动窗口最小和，可得剩余 k 个数的最大和。
var maxScore = function(cardPoints, k) {
  const n = cardPoints.length
  const total = cardPoints.reduce((acc, cur) => acc + cur, 0)
  // [left...right) sum 保存当前窗口的和 min 保存滑动窗口的最小和
  let left = 0, right = 0, sum = 0, min = 0
  while (right < n) {
    const c = cardPoints[right]
    right++
    sum += c
    const len = right - left // 窗口元素数量
    // 窗口符合要求 保存最小的窗口和
    if (len === n - k) {
      if (min === 0) {
        min = sum
      } else {
        min = Math.min(min, sum)
      }
    }
    // 窗口超过要求 需要删除左侧元素
    if (right - left >= n - k) {
      const d = cardPoints[left]
      left++
      sum -= d
    }
  }
  // 总和 - 最小和 = 剩余数的最大和
  return total - min
};