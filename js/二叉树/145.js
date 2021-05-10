// 145. 二叉树的后序遍历
// 给定一个二叉树，返回它的 后序 遍历。

// 示例:

// 输入: [1,null,2,3]  
//    1
//     \
//      2
//     /
//    3 

// 输出: [3,2,1]
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？

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
 var postorderTraversal = function(root) {
  const res = []
  const inorder = (node) => {
    if (!node) return
    inorder(node.left)
    inorder(node.right)
    res.push(node.val)
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
// 解法 2 ：迭代 中序遍历与前后遍历的方法有较大区别
 var postorderTraversal = function(root) {
  const stack = [], res = []
  let prev = null // 用来记录上一个节点
  while (stack.length || root) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    // 判断当前根节点的右子树是否为空或者是否是从右子树回到的根节点
    const temp = stack[stack.length - 1]
    if (temp.right && temp.right !== prev) {
      // 从左子树到达的根节点 并且右子树不为空 接下来应该转到右子树遍历
      root = temp.right
    } else {
      // 从右子树到达根节点 或者从左子树到达的根节点但是根节点的右子树为空 此时处理根节点 可以把当前节点弹出
      res.push(temp.val)
      prev = temp
      stack.pop()
    }
  }
  return res
};
// 参考题解：https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--34/