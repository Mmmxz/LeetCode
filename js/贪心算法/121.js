// 121. 买卖股票的最佳时机
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

// 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

// 注意：你不能在买入股票前卖出股票。

 

// 示例 1:

// 输入: [7,1,5,3,6,4]
// 输出: 5
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
// 示例 2:

// 输入: [7,6,4,3,1]
// 输出: 0
// 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let money = 0
  const n = prices.length
  if (!n) {
    return 0
  }
  // 假设第一天买入
  let buy = prices[0]
  // 第二天开始循环
  for (let i = 1; i < n; i++) {
    // 如果这天价格大于买入价格 就求利润 并且与当前利润比较 取最大值
    if (prices[i] >= buy) {
      money = Math.max(money, prices[i] - buy)
    // 这天价格小于买入价格 则假设是这天买入 继续循环
    } else {
      buy = prices[i]
    }
  }
  return money
};

/**
 * @param {number[]} prices
 * @return {number}
 */
// 贪心算法
 var maxProfit = function(prices) {
  const n = prices.length
  // 记录每一天之前的最小价格作为买入价格 同时求利润
  let min = prices[0], max = 0
  for (let i = 1; i < n; i++) {
    if (prices[i - 1] < min) {
      min = prices[i - 1]
    }
    max = Math.max(max, prices[i] - min)
  }
  return max
};