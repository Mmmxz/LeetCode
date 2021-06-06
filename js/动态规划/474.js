// 474. 一和零
// 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。

// 请你找出并返回 strs 的最大子集的大小，该子集中 最多 有 m 个 0 和 n 个 1 。

// 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。

 

// 示例 1：

// 输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
// 输出：4
// 解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
// 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。
// 示例 2：

// 输入：strs = ["10", "0", "1"], m = 1, n = 1
// 输出：2
// 解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
 

// 提示：

// 1 <= strs.length <= 600
// 1 <= strs[i].length <= 100
// strs[i] 仅由 '0' 和 '1' 组成
// 1 <= m, n <= 100

/**
 * @description 0-1背包问题变种
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
  // 0-1背包问题 用三维数组表示0和1的数量
  const len = strs.length
  // 定义dp[i][j][k] 表示前i个字符串 最多有j个0和k个1的最大子集大小
  const dp = new Array(len + 1).fill(0).map(() => new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)))
  // 状态转移方程 对于每个str 有两种情况：选择或不选
  // 如果不选 dp[i][j][k] = dp[i - 1][j][k]
  // 如果选 则需要满足当前最多有j个0和k个1 此时 dp[i][j][k] = max(dp[i-1][j][k], dp[i-1][j-zero][k-one] + 1)
  for (let i = 1; i <= len; i++) {
    const count = countZeroandOne(strs[i - 1])
    const zero = count[0], one = count[1]
    for (let j = 0; j <= m; j++) {
      for (let k = 0; k <= n; k++) {
        dp[i][j][k] = dp[i - 1][j][k]
        // // 注意前i个字符串 有索引的偏移
        if (j >= zero && k >= one) {
          dp[i][j][k] = Math.max(dp[i - 1][j][k], dp[i - 1][j - zero][k - one] + 1)
        }
      }
    }
  }
  return dp[len][m][n]
};

var countZeroandOne = (str) => {
  const count = new Array(2).fill(0)
  for (const char of str) {
    count[char.charCodeAt() - '0'.charCodeAt()]++
  }
  return count
}
