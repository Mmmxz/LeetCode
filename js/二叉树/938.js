// 938. 二叉搜索树的范围和
// 给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。

 

// 示例 1：


// 输入：root = [10,5,15,3,7,null,18], low = 7, high = 15
// 输出：32
// 示例 2：


// 输入：root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
// 输出：23
 

// 提示：

// 树中节点数目在范围 [1, 2 * 104] 内
// 1 <= Node.val <= 105
// 1 <= low <= high <= 105
// 所有 Node.val 互不相同

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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
// 递归
 var rangeSumBST = function(root, low, high) {
  let res = 0
  const inOrder = (node) => {
    if (!node) return 0
    inOrder(node.left)
    if (node.val >= low && node.val <= high) {
      res += node.val
    }
    if (node.val > high) {
      return
    }
    inOrder(node.right)
  }
  inOrder(root)
  return res
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
// 迭代
 var rangeSumBST = function(root, low, high) {
  let stack = [], res = 0
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (root.val >= low && root.val <= high) {
      res += root.val
    }
    if (root.val > high) {
      break
    }
    root = root.right
  }
  return res
};