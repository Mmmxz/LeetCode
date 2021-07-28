// 863. 二叉树中所有距离为 K 的结点
// 给定一个二叉树（具有根结点 root）， 一个目标结点 target ，和一个整数值 K 。

// 返回到目标结点 target 距离为 K 的所有结点的值的列表。 答案可以以任何顺序返回。

 

// 示例 1：

// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
// 输出：[7,4,1]
// 解释：
// 所求结点为与目标结点（值为 5）距离为 2 的结点，
// 值分别为 7，4，以及 1



// 注意，输入的 "root" 和 "target" 实际上是树上的结点。
// 上面的输入仅仅是对这些对象进行了序列化描述。
 

// 提示：

// 给定的树是非空的。
// 树上的每个结点都具有唯一的值 0 <= node.val <= 500 。
// 目标结点 target 是树上的结点。
// 0 <= K <= 1000.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function(root, target, k) {
  const parents = new Map() // 记录每个节点的父节点
  const ans = []
  const findParent = (node) => {
    if (node.left) {
      parents.set(node.left.val, node)
      findParent(node.left)
    }
    if (node.right) {
      parents.set(node.right.val, node)
      findParent(node.right)
    }
  }
  // 从root出发 记录所有节点的父节点
  findParent(root)
  // 从target出发 记录深度为k的节点
  const findDepth = (node, from, depth) => {
    if (!node) return
    if (depth === k) {
      ans.push(node.val)
      return
    }
    // 三个方向 左右子节点和父节点
    if (node.left !== from) {
      findDepth(node.left, node, depth + 1)
    }
    if (node.right !== from) {
      findDepth(node.right, node, depth + 1)
    }
    if (parents.get(node.val) !== from) {
      findDepth(parents.get(node.val), node, depth + 1)
    }
  }
  findDepth(target, null, 0)
  return ans
};
