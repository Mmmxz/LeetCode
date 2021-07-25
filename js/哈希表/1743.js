// 1743. 从相邻元素对还原数组
// 存在一个由 n 个不同元素组成的整数数组 nums ，但你已经记不清具体内容。好在你还记得 nums 中的每一对相邻元素。

// 给你一个二维整数数组 adjacentPairs ，大小为 n - 1 ，其中每个 adjacentPairs[i] = [ui, vi] 表示元素 ui 和 vi 在 nums 中相邻。

// 题目数据保证所有由元素 nums[i] 和 nums[i+1] 组成的相邻元素对都存在于 adjacentPairs 中，存在形式可能是 [nums[i], nums[i+1]] ，也可能是 [nums[i+1], nums[i]] 。这些相邻元素对可以 按任意顺序 出现。

// 返回 原始数组 nums 。如果存在多种解答，返回 其中任意一个 即可。

 

// 示例 1：

// 输入：adjacentPairs = [[2,1],[3,4],[3,2]]
// 输出：[1,2,3,4]
// 解释：数组的所有相邻元素对都在 adjacentPairs 中。
// 特别要注意的是，adjacentPairs[i] 只表示两个元素相邻，并不保证其 左-右 顺序。
// 示例 2：

// 输入：adjacentPairs = [[4,-2],[1,4],[-3,1]]
// 输出：[-2,4,1,-3]
// 解释：数组中可能存在负数。
// 另一种解答是 [-3,1,4,-2] ，也会被视作正确答案。
// 示例 3：

// 输入：adjacentPairs = [[100000,-100000]]
// 输出：[100000,-100000]
 

// 提示：

// nums.length == n
// adjacentPairs.length == n - 1
// adjacentPairs[i].length == 2
// 2 <= n <= 105
// -105 <= nums[i], ui, vi <= 105
// 题目数据保证存在一些以 adjacentPairs 作为元素对的数组 nums

/**
 * @param {number[][]} adjacentPairs
 * @return {number[]}
 */
var restoreArray = function(adjacentPairs) {
  // memo 存每个数相邻的关系
  const memo = new Map()
  for (const [num1, num2] of adjacentPairs) {
    memo.set(num1, memo.has(num1) ? [...memo.get(num1), num2] : [num2])
    memo.set(num2, memo.has(num2) ? [...memo.get(num2), num1] : [num1])
  }
  // 答案数组长度为关系数组长度 +1
  const n = adjacentPairs.length + 1
  const ans = new Array(n).fill(0)
  // 相邻关系为1 代表该数字在首或者尾 找到其中一个 作为答案首位
  for (const [num, adj] of memo.entries()) {
    if (adj.length === 1) {
      ans[0] = num
      break
    }
  }
  // 第二位是首位的唯一相邻关系
  ans[1] = memo.get(ans[0])[0]
  // 继续找下一位
  for (let i = 2; i < n; i++) {
    // 找到前一位的关系数组 当前位置的数一定在前一位的关系数组中
    const adj = memo.get(ans[i - 1])
    // 每个数的关系数组长度最多为2 因为一维数组非首尾只会有两个相邻的数
    // 前一位i-1的关系数组有两个数 一个是i-2 一个是i 将i对应的值给ans[i]即可
    ans[i] = ans[i - 2] === adj[0] ? adj[1] : adj[0]
  }
  return ans
};
