// 62. 不同路径
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

// 问总共有多少条不同的路径？

 

// 示例 1：


// 输入：m = 3, n = 7
// 输出：28
// 示例 2：

// 输入：m = 3, n = 2
// 输出：3
// 解释：
// 从左上角开始，总共有 3 条路径可以到达右下角。
// 1. 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右
// 3. 向下 -> 向右 -> 向下
// 示例 3：

// 输入：m = 7, n = 3
// 输出：28
// 示例 4：

// 输入：m = 3, n = 3
// 输出：6
 

// 提示：

// 1 <= m, n <= 100
// 题目数据保证答案小于等于 2 * 109

/**
 * @description 二维dp
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  // dp[i][j]代表到达[i][j]的路径总数 注意 dp[0][0]=1
  // dp[0][0]=1** dp[1][0]=1 dp[0][1]=1 dp[1][1]=2 dp[0][j]=dp[i][0]=1
  // dp[i][j]=dp[i-1][j]+dp[i][j-1]
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = 1
      } else if (i === 0) {
        dp[i][j] = 1
      } else if (j === 0) {
        dp[i][j] = 1
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }
  return dp[m - 1][n - 1]
};

/**
 * @description 一维dp 参考：https://leetcode-cn.com/problems/unique-paths/solution/san-chong-shi-xian-xiang-xi-tu-jie-62-bu-4jz1/
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  // dp[i][j]只依赖dp[i-1][j]+dp[i][j-1] 优化为一维
  // dp[j]=dp[j-1]+dp[j] dp[j-1]代表二维中的dp[i][j-1] dp[j]代表上一行的计算结果 将其求和即可
  const dp = new Array(n).fill(1)
  // 第一行的一定是1种
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 每个数=左边的数+上边的数
      dp[j] = dp[j - 1] + dp[j]
    }
  }
  return dp[n - 1]
};
