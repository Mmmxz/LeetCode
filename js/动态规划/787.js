// 787. K 站中转内最便宜的航班
// 有 n 个城市通过一些航班连接。给你一个数组 flights ，其中 flights[i] = [fromi, toi, pricei] ，表示该航班都从城市 fromi 开始，以价格 pricei 抵达 toi。

// 现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到出一条最多经过 k 站中转的路线，使得从 src 到 dst 的 价格最便宜 ，并返回该价格。 如果不存在这样的路线，则输出 -1。

 

// 示例 1：

// 输入: 
// n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
// src = 0, dst = 2, k = 1
// 输出: 200
// 解释: 
// 城市航班图如下


// 从城市 0 到城市 2 在 1 站中转以内的最便宜价格是 200，如图中红色所示。
// 示例 2：

// 输入: 
// n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
// src = 0, dst = 2, k = 0
// 输出: 500
// 解释: 
// 城市航班图如下


// 从城市 0 到城市 2 在 0 站中转以内的最便宜价格是 500，如图中蓝色所示。
 

// 提示：

// 1 <= n <= 100
// 0 <= flights.length <= (n * (n - 1) / 2)
// flights[i].length == 3
// 0 <= fromi, toi < n
// fromi != toi
// 1 <= pricei <= 104
// 航班没有重复，且不存在自环
// 0 <= src, dst, k < n
// src != dst

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
  // dp[i][j] 代表从 src 经过 i 次转机到达 j 的最小花费
  // 转移方程 dp[i][j] = min(dp[i-1][x] + price(x->j), dp[i][j])
  // i次中转到达j的最小价格为 min(i-1次中转到x站的价格+x站到j站的价格, i次中转到j站的价格)
  const dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(Number.MAX_SAFE_INTEGER))
  for (let i = 0; i < flights.length; i++) {
    if (flights[i][0] === src) {
      // 从起点直达的路线花费
      dp[0][flights[i][1]] = flights[i][2]
    }
  }
  for (let i = 0; i <= k; i++) {
    // 从起点到起点 不管中转几次 最小花费永远为 0
    dp[i][src] = 0
  }
  for (let i = 1; i <= k; i++) {
    for (let j = 0; j < flights.length; j++) {
      // 仍为初值代表不可到达当前路线的出发站
      if (dp[i - 1][flights[j][0]] !== Number.MAX_SAFE_INTEGER) {
        dp[i][flights[j][1]] = Math.min(dp[i - 1][flights[j][0]] + flights[j][2], dp[i][flights[j][1]])
      }
    }
  }
  return dp[k][dst] === Number.MAX_SAFE_INTEGER ? -1 : dp[k][dst]
};
