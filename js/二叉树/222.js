// 222. 完全二叉树的节点个数
// 给出一个完全二叉树，求出该树的节点个数。

// 说明：

// 完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

// 示例:

// 输入: 
//     1
//    / \
//   2   3
//  / \  /
// 4  5 6

// 输出: 6

// 解法 1 ：通用解法（未使用完全二叉树性质）
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
var countNodes = function(root) {
  if (!root) {
    return 0
  }
  const left = countNodes(root.left)
  const right = countNodes(root.right)
  return left + right + 1
};

// 解法 2 移位法
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
var countNodes = function(root) {
  if (!root) {
    return 0
  }
  const left = getDepth(root.left)
  const right = getDepth(root.right)
  if (left === right) {
    return countNodes(root.right) + (1 << left)
  } else {
    return countNodes(root.left) + (1 << right)
  }
};
var getDepth = (root) => {
  let depth = 0
  while(root) {
    depth++
    root = root.left
  }
  return depth
}