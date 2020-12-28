// 111. 二叉树的最小深度
// 给定一个二叉树，找出其最小深度。

// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

// 说明：叶子节点是指没有子节点的节点。

 

// 示例 1：


// 输入：root = [3,9,20,null,null,15,7]
// 输出：2
// 示例 2：

// 输入：root = [2,null,3,null,4,null,5,null,6]
// 输出：5
 

// 提示：

// 树中节点数的范围在 [0, 105] 内
// -1000 <= Node.val <= 1000

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
var minDepth = function(root) {
  // 1.递归到 null 节点 返回高度 0
  if (!root) return 0
  // 2.左右子树都存在 当前节点的高度 = 左右子树递归结果的较小值 + 1
  if (root.left && root.right) {
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1
  // 3.存在左子树或右子树 当前节点的高度 = 存在的子树的高度 + 1
  } else if (root.left) {
    return minDepth(root.left) + 1
  } else if (root.right) {
    return minDepth(root.right) + 1
  // 4.左右子树都不存在 返回当前节点的高度 1
  } else {
    return 1
  }
};