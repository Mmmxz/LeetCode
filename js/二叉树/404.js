// 404. 左叶子之和
// 计算给定二叉树的所有左叶子之和。

// 示例：

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 不能根据当前节点判断是否是左叶子 而要根据判断当前节点的左子节点来判断
var sumOfLeftLeaves = function(root) {
  if (!root) {
    return 0
  }
  const left = sumOfLeftLeaves(root.left)
  const right = sumOfLeftLeaves(root.right)
  // 如果是该节点的左子树存在 且左子树是叶子节点 则返回其左子树的子节点的值
  let sum = 0
  if (root.left && !root.left.left && !root.left.right) {
    sum = root.left.val
  }
  return sum + left + right
};