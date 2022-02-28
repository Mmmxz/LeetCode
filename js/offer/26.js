// 剑指 Offer 26. 树的子结构
// 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

// B是A的子结构， 即 A中有出现和B相同的结构和节点值。

// 例如:
// 给定的树 A:

//      3
//     / \
//    4   5
//   / \
//  1   2
// 给定的树 B：

//    4 
//   /
//  1
// 返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

// 示例 1：

// 输入：A = [1,2,3], B = [3,1]
// 输出：false
// 示例 2：

// 输入：A = [3,4,5,1,2], B = [4,1]
// 输出：true
// 限制：

// 0 <= 节点个数 <= 10000

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */

 var isSubStructure = function(A, B) {
  // AB初始化时有一个不存在 直接返回false
  if (!A || !B) return false
  const dfs = (rootA, rootB) => {
    // 如果B不存在 说明走完了B 返回true
    if (!rootB) return true
    // 再判断A 如果不存在 此时B还存在 说明肯定不是子结构 返回false
    if (!rootA) return false
    // AB都存在 比较值是否相等 再依次比较左右子树
    return rootA.val === rootB.val && dfs(rootA.left, rootB.left) && dfs(rootA.right, rootB.right)
  }
  // 使用dfs方法找到AB第一个相同的节点 如果A的根节点不同 就继续左右子树去找 直到找到根节点匹配的子树
  return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};
