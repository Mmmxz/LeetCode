// 559. N 叉树的最大深度
// 给定一个 N 叉树，找到其最大深度。

// 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。

// N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。

 

// 示例 1：



// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：3
// 示例 2：



// 输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// 输出：5
 

// 提示：

// 树的深度不会超过 1000 。
// 树的节点数目位于 [0, 104] 之间。

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0
  let queue = [root]
  let ans = 0
  while (queue.length) {
    const len = queue.length
    ans++
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      for (const child of cur.children) {
        queue.push(child)
      }
    }
  }
  return ans
};

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0
  if (root.children == null || root.children.length === 0) return 1
  let max = 0
  for (let i = 0; i < root.children.length; i++) {
    max = Math.max(max, maxDepth(root.children[i]))
  }
  return 1 + max
};
