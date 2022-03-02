// 剑指 Offer 07. 重建二叉树
// 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

 

// 例如，给出

// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]
// 返回如下的二叉树：

//     3
//    / \
//   9  20
//     /  \
//    15   7
 

// 限制：

// 0 <= 节点个数 <= 5000

 

// 注意：本题与主站 105 题重复：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
 var buildTree = function(preorder, inorder) {
  const n = preorder.length
  if (!n) {
    return null
  }
  const rootVal = preorder[0]
  const node = new TreeNode(rootVal)
  // 在中序中找到根节点的索引 同时也是左节点的长度
  let i = 0
  for (; i < n; i++) {
    if (inorder[i] === rootVal) {
      break
    }
  }
  // 递归重建左右子树
  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i))
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1))
  return node
};
