// 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

// 示例:

// 输入: [1,2,3,null,5,null,4]
// 输出: [1, 3, 4]
// 解释:

//    1            <---
//  /   \
// 2     3         <---
//  \     \
//   5     4       <---


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/binary-tree-right-side-view
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
  if (!root) return []
  let queue = [root]
  let res = []
  while (queue.length) {
    let subArr = []
    let len = queue.length
    for (let i = 0; i < len; i++) {
      let cur = queue.shift()
      subArr.push(cur.val)
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
    }
    // 取每层最右边的结点值放入结果中
    const right = subArr[subArr.length - 1]
    res.push(right)
  }
  return res
};

// 思路见 #102