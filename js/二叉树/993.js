// 993. 二叉树的堂兄弟节点
// 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。

// 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。

// 我们给出了具有唯一值的二叉树的根节点 root ，以及树中两个不同节点的值 x 和 y 。

// 只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false。

 

// 示例 1：


// 输入：root = [1,2,3,4], x = 4, y = 3
// 输出：false
// 示例 2：


// 输入：root = [1,2,3,null,4,null,5], x = 5, y = 4
// 输出：true
// 示例 3：



// 输入：root = [1,2,3,null,4], x = 2, y = 3
// 输出：false
 

// 提示：

// 二叉树的节点数介于 2 到 100 之间。
// 每个节点的值都是唯一的、范围为 1 到 100 的整数。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @description 解法 1 ：BFS
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
 var isCousins = function(root, x, y) {
  let depthX = getDepth(root, x), depthY = getDepth(root, y)
  if (depthX.depth === depthY.depth && depthX.parentValue !== depthY.parentValue) {
    return true
  }
  return false
};
let getDepth = (root, x) => {
  if (!root) return
  let depth = 0
  let queue = [{
    node: root,
    parentValue: -1,
    depth
  }] // 根节点的父节点值是-1 深度是0
  while (queue.length) {
    const len = queue.length
    depth++
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      if (cur.node.val === x) {
        return cur
      }
      if (cur.node.left) {
        queue.push({
          node: cur.node.left,
          parentValue: cur.node.val,
          depth
        })
      }
      if (cur.node.right) {
        queue.push({
          node: cur.node.right,
          parentValue: cur.node.val,
          depth
        })
      }
    }
  }
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
 * @description 解法 2 ：DFS
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
 var isCousins = function(root, x, y) {
  let resx = dfs(root, -1, x, 0), resy = dfs(root, -1, y, 0)
  if (resx[1] === resy[1] && resx[0] !== resy[0]) {
    return true
  }
  return false
};

/**
 * @param {TreeNode} node 当前节点
 * @param {number} parentValue 父节点的值 根节点是-1
 * @param {number} target 要搜索的目标值
 * @param {number} depth 深度
 * @return {array} [parentValue, depth]
 */
const dfs = (node, parentValue, target, depth) => {
  if (!node) return null
  if (node.val === target) {
    return [parentValue, depth]
  }
  let res1 = dfs(node.left, node.val, target, depth + 1)
  let res2 = dfs(node.right, node.val, target, depth + 1)
  return res1 || res2
}