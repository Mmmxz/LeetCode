// 101. 对称二叉树
// 给定一个二叉树，检查它是否是镜像对称的。

 

// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
 

// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

//     1
//    / \
//   2   2
//    \   \
//    3    3
 

// 进阶：

// 你可以运用递归和迭代两种方法解决这个问题吗？

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 解法 1 ：递归
// tips: 两个树互为镜像：它们的两个根结点具有相同的值；每个树的右子树都与另一个树的左子树镜像对称。
var isSymmetric = function(root) {
  // 1.对称 即根节点的值相等 根节点的左子树等于
  const check = (l, r) => {
    if (!l && !r) {
      return true
    }
    if (!l || !r) {
      return false
    }
    return l.val === r.val && check(l.left, r.right) && check(l.right, r.left)
  }
  return check(root, root)
};