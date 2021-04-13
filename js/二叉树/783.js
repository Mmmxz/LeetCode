// 783. 二叉搜索树节点最小距离
// 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。

// 注意：本题与 530：https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/ 相同

 

// 示例 1：


// 输入：root = [4,2,6,1,3]
// 输出：1
// 示例 2：


// 输入：root = [1,0,48,null,null,12,49]
// 输出：1
 

// 提示：

// 树中节点数目在范围 [2, 100] 内
// 0 <= Node.val <= 105

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 二叉搜索树中序遍历后是有序递增数组
 var minDiffInBST = function(root) {
  // 中序遍历
  let res = [], min = Infinity
  const mid = (node) => {
    if (!node) {
      return
    }
    mid(node.left)
    res.push(node.val)
    mid(node.right)
  }
  mid(root)
  for (let i = 1; i < res.length; i++) {
    min = Math.min(res[i] - res[i - 1], min)
  }
  return min
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 解法 2 ：边遍历边求解
 var minDiffInBST = function(root) {
  let ans = Number.MAX_SAFE_INTEGER, prev = -1
  const dfs = (node) => {
    if (!node) {
      return 
    }
    dfs(node.left)
    if (prev === -1) {
      prev = node.val
    } else {
      ans = Math.min(ans, node.val - prev)
      prev = node.val
    }
    dfs(node.right)
  }
  dfs(root)
  return ans
};