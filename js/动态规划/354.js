// 354. 俄罗斯套娃信封问题
// 给定一些标记了宽度和高度的信封，宽度和高度以整数对形式 (w, h) 出现。当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。

// 请计算最多能有多少个信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。

// 说明:
// 不允许旋转信封。

// 示例:

// 输入: envelopes = [[5,4],[6,4],[6,7],[2,3]]
// 输出: 3 
// 解释: 最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。

/**
 * @param {number[][]} envelopes
 * @return {number}
 */
// 思路：求最长递增子序列。
var maxEnvelopes = function(envelopes) {
  // 对信封的w从小到大排序 w相同的项 按h逆序排列 保证求最长子序列时相同w的不会选取多次
  envelopes.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0]
    } else {
      // w相等时 按h的从大到小排列
      return b[1] - a[1]
    }
  })
  // 根据h求LIS 最长递增子序列 与#300相同
  // dp[i] [0,i]的最长递增子序列
  // dp[i] = max(dp[i], dp[j] + 1) j < i && nums[j] < nums[i]
  const n = envelopes.length
  const dp = new Array(n).fill(1)
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[j][1] < envelopes[i][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
};