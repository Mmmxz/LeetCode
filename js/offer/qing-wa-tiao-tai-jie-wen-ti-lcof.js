// 剑指 Offer 10- II. 青蛙跳台阶问题
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

// 示例 1：

// 输入：n = 2
// 输出：2
// 示例 2：

// 输入：n = 7
// 输出：21
// 示例 3：

// 输入：n = 0
// 输出：1
// 提示：

// 0 <= n <= 100
// 注意：本题与主站 70 题相同：https://leetcode-cn.com/problems/climbing-stairs/

/**
 * @param {number} n
 * @return {number}
 */
// 解法 1 ：空间复杂度 O(1)
var numWays = function(n) {
  if (n < 2) {
    return 1
  }
  let prev = 1, cur = 1
  for (let i = 2; i <= n; i++) {
    let temp = cur
    cur = (cur + prev) % 1000000007
    prev = temp
  }
  return cur
};

/**
 * @param {number} n
 * @return {number}
 */
// 解法 2 ：空间复杂度 O(n)
var numWays = function(n) {
  const ans = new Array(n + 1).fill(0)
  if (n < 2) {
    return 1
  }
  ans[0] = 1
  ans[1] = 1
  for (let i = 2; i <= n; i++) {
    ans[i] = (ans[i - 1] + ans[i - 2]) % 1000000007
  }
  return ans[n]
};