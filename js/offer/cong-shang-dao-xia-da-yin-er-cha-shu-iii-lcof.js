// 剑指 Offer 32 - III. 从上到下打印二叉树 III
// 请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

 

// 例如:
// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层次遍历结果：

// [
//   [3],
//   [20,9],
//   [15,7]
// ]
 

// 提示：

// 节点总数 <= 1000

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  if (!root) {
    return []
  }
  let ans = [], queue = [root], count = 0
  while (queue.length) {
    let arr = []
    count++
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      arr.push(node.val)
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    // 奇数 直接复制 偶数 翻转
    if (count % 2) {
      ans.push(arr)
    } else {
      ans.push(arr.reverse())
    }
  }
  return ans
};