// 96. 不同的二叉搜索树
// 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。

 

// 示例 1：


// 输入：n = 3
// 输出：5
// 示例 2：

// 输入：n = 1
// 输出：1
 

// 提示：

// 1 <= n <= 19

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  // 二叉搜索树-左节点<根节点<右节点
  // 定义dp[i]代表以i为根的bst个数 g[n]代表长度为n的序列能构成的bst个数
  // g[n]=dp[1]+dp[2]+...+dp[n]
  // 当i为根节点时，左子树节点i-1个，右子树节点为n-i个 f[i]=g[i-1]*g[n-i]
  // g[n]=g[0]*g[n-1]+g[1]*g[n-2]+...+g[n-1]*g[0]
  const g = new Array(n+1).fill(0)
  g[0] = 1
  g[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      g[i] += g[j - 1] * g[i - j]
    }
  }
  return g[n]
};
