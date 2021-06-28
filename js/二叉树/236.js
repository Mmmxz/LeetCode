// 236. 二叉树的最近公共祖先
// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

 

// 示例 1：


// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出：3
// 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
// 示例 2：


// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出：5
// 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
// 示例 3：

// 输入：root = [1,2], p = 1, q = 2
// 输出：1
 

// 提示：

// 树中节点数目在范围 [2, 105] 内。
// -109 <= Node.val <= 109
// 所有 Node.val 互不相同 。
// p != q
// p 和 q 均存在于给定的二叉树中。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @description 巧妙解法 参考k神题解
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (root === null || root === p || root === q) return root
  let left = lowestCommonAncestor(root.left, p, q)
  let right = lowestCommonAncestor(root.right, p, q)
  if (left === null && right === null) return null
  if (left === null) return right
  if (right === null) return left
  return root
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @description 暴力展开解法 时间复杂度较高 方便理解
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  // 如何找公共祖先 从根节点遍历 如果pq都在左子树 则继续遍历左子树 如果pq分别在左右子树 则返回root
  // 判断一个节点在根节点的哪个子树中
  if (!root) return null
  if (root === p || root === q) return root
  if (findNode(root.left, p) && findNode(root.left, q)) {
    // 都在左子树
    return lowestCommonAncestor(root.left, p, q)
  }
  if (findNode(root.right, p) && findNode(root.right, q)) {
    // 都在右子树
    return lowestCommonAncestor(root.right, p, q)
  }
  // 分别在左右子树
  return root
};

const findNode = (root, node) => {
  // 判断node节点在不在root中
  if (!root) {
    return false
  }
  if (root.val === node.val) {
    return true
  }
  return findNode(root.left, node) || findNode(root.right, node)
}
