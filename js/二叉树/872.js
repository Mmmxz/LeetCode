// 872. 叶子相似的树
// 请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列 。



// 举个例子，如上图所示，给定一棵叶值序列为 (6, 7, 4, 9, 8) 的树。

// 如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 叶相似 的。

// 如果给定的两个根结点分别为 root1 和 root2 的树是叶相似的，则返回 true；否则返回 false 。

 

// 示例 1：



// 输入：root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
// 输出：true
// 示例 2：

// 输入：root1 = [1], root2 = [1]
// 输出：true
// 示例 3：

// 输入：root1 = [1], root2 = [2]
// 输出：false
// 示例 4：

// 输入：root1 = [1,2], root2 = [2,2]
// 输出：true
// 示例 5：



// 输入：root1 = [1,2,3], root2 = [1,3,2]
// 输出：false
 

// 提示：

// 给定的两棵树可能会有 1 到 200 个结点。
// 给定的两棵树上的值介于 0 到 200 之间。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
// 解法 1 ：迭代
 var leafSimilar = function(root1, root2) {
  return getLeafNode(root1) === getLeafNode(root2)
};

const getLeafNode = (root) => {
  // 前序遍历 找叶子节点
  const stack = [], res = []
  while (stack.length || root) {
    while (root) {
      if (!root.left && !root.right) {
        res.push(root.val)
      }
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    root = root.right
  }
  return res.toString()
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
// 解法 2 ：递归
var leafSimilar = function(root1, root2) {
  let res1 = [], res2 = []
  preorder(root1, res1)
  preorder(root2, res2)
  return res1.toString() === res2.toString()
};
const preorder = (root, res) => {
  if (!root) {
    return []
  }
  if (!root.left && !root.right) {
    res.push(root.val)
    return
  }
  preorder(root.left, res)
  preorder(root.right, res)
}