// 94. 二叉树的中序遍历
// 给定一个二叉树的根节点 root ，返回它的 中序 遍历。

 

// 示例 1：


// 输入：root = [1,null,2,3]
// 输出：[1,3,2]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [1]
// 输出：[1]
// 示例 4：


// 输入：root = [1,2]
// 输出：[2,1]
// 示例 5：


// 输入：root = [1,null,2]
// 输出：[1,2]
 

// 提示：

// 树中节点数目在范围 [0, 100] 内
// -100 <= Node.val <= 100
 

// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？

// 解法 1 ：递归 左 -> 根 -> 右
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
 * @return {number[]}
 */
// 解法 1 ：递归
var inorderTraversal = function(root) {
  let res = []
  const inorder = (node) => {
    if (node) {
      inorder(node.left)
      res.push(node.val)
      inorder(node.right)
    }
  }
  inorder(root)
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
 * @return {number[]}
 */
// 解法 2 ：栈 和前序遍历 #144 类似
 var inorderTraversal = function(root) {
  let stack = [], res = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    res.push(root.val)
    root = root.right
  }
  return res
};