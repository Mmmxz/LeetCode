// 257. 二叉树的所有路径
// 给定一个二叉树，返回所有从根节点到叶子节点的路径。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:

// 输入:

//    1
//  /   \
// 2     3
//  \
//   5

// 输出: ["1->2->5", "1->3"]

// 解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3

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
 * @return {string[]}
 */
// 深度优先遍历
var binaryTreePaths = function(root) {
  const res = []
  const dfs = (root, path) => {
    if (!root) {
      return
    }
    path += root.val
    if (!root.left && !root.right) {
      // 如果是叶子节点，将该字符串加入 res 中。
      res.push(path)
    } else {
      // 不是叶子节点，继续遍历左右子树。
      path += '->'
      dfs(root.left, path)
      dfs(root.right, path)
    }
  }
  dfs(root, '')
  return res
};