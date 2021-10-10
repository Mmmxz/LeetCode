// 441. 排列硬币
// 你总共有 n 枚硬币，并计划将它们按阶梯状排列。对于一个由 k 行组成的阶梯，其第 i 行必须正好有 i 枚硬币。阶梯的最后一行 可能 是不完整的。

// 给你一个数字 n ，计算并返回可形成 完整阶梯行 的总行数。

 

// 示例 1：


// 输入：n = 5
// 输出：2
// 解释：因为第三行不完整，所以返回 2 。
// 示例 2：


// 输入：n = 8
// 输出：3
// 解释：因为第四行不完整，所以返回 3 。
 

// 提示：

// 1 <= n <= 231 - 1

/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
  // 根据公式前k行的硬币数量 total = k(k + 1) / 2
  // 最少1行 最多n行
  let low = 1, high = n
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low
    if (mid * (mid + 1) <= 2 * n) {
      // 如果 calc(mid) <= total 说明total足够排列mid行 继续找能排列的更多行数
      low = mid + 1
    } else {
      // 如果 calc(mid) > total 即total不够排列mid行 往小了找何时的行数
      high = mid - 1
    }
  }
  // high, low
  // 当mid刚好能找到total行时 继续low=mid+1 所以此时返回前面的high
  return high
};
