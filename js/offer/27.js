// 剑指 Offer 27. 二叉树的镜像
// 请完成一个函数，输入一个二叉树，该函数输出它的镜像。

// 例如输入：

//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// 镜像输出：

//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

 

// 示例 1：

// 输入：root = [4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]
 

// 限制：

// 0 <= 节点个数 <= 1000

// 注意：本题与主站 226 题相同：https://leetcode-cn.com/problems/invert-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var mirrorTree = function(root) {
  if (!root) return null
  const node = new TreeNode(root.val)
  const left = root.left, right = root.right
  node.left = mirrorTree(right)
  node.right = mirrorTree(left)
  return node
};
