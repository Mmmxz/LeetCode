// 1609. 奇偶树
// 如果一棵二叉树满足下述几个条件，则可以称为 奇偶树 ：

// 二叉树根节点所在层下标为 0 ，根的子节点所在层下标为 1 ，根的孙节点所在层下标为 2 ，依此类推。
// 偶数下标 层上的所有节点的值都是 奇 整数，从左到右按顺序 严格递增
// 奇数下标 层上的所有节点的值都是 偶 整数，从左到右按顺序 严格递减
// 给你二叉树的根节点，如果二叉树为 奇偶树 ，则返回 true ，否则返回 false 。

 

// 示例 1：



// 输入：root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
// 输出：true
// 解释：每一层的节点值分别是：
// 0 层：[1]
// 1 层：[10,4]
// 2 层：[3,7,9]
// 3 层：[12,8,6,2]
// 由于 0 层和 2 层上的节点值都是奇数且严格递增，而 1 层和 3 层上的节点值都是偶数且严格递减，因此这是一棵奇偶树。
// 示例 2：



// 输入：root = [5,4,2,3,3,7]
// 输出：false
// 解释：每一层的节点值分别是：
// 0 层：[5]
// 1 层：[4,2]
// 2 层：[3,3,7]
// 2 层上的节点值不满足严格递增的条件，所以这不是一棵奇偶树。
// 示例 3：



// 输入：root = [5,9,1,3,5,7]
// 输出：false
// 解释：1 层上的节点值应为偶数。
// 示例 4：

// 输入：root = [1]
// 输出：true
// 示例 5：

// 输入：root = [11,8,6,1,3,9,11,30,20,18,16,12,10,4,2,17]
// 输出：true
 

// 提示：

// 树中节点数在范围 [1, 105] 内
// 1 <= Node.val <= 106

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
 * @return {boolean}
 */
var isEvenOddTree = function(root) {
  if (!root) return true
  // 层序遍历 然后判断该层的奇偶 再判断该层中节点的奇偶和增减
  const queue = [root]
  let row = 0
  while (queue.length) {
    const len = queue.length
    let temp = []
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      if (row % 2 === 0) {
        // 偶数层 元素全是奇数 且递增
        if (cur.val % 2 === 0) {
          return false
        }
        if (temp.length && cur.val <= temp[temp.length - 1]) {
          return false
        }
      } else {
        // 奇数层 元素全是偶数 且递减
        if (cur.val % 2 !== 0) {
          return false
        }
        if (temp.length && cur.val >= temp[temp.length - 1]) {
          return false
        }
      }
      temp.push(cur.val)
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
    }
    row++
  }
  return true
};
