// 103. 二叉树的锯齿形层序遍历
// 给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回锯齿形层序遍历如下：

// [
//   [3],
//   [20,9],
//   [15,7]
// ]

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
var zigzagLevelOrder = function(root) {
  if (!root) return []
  // 1.定义 res 存储结果 queue 作为队列 初始化存储二叉树根节点 index 存储当前循环的层数 据此判断是否需要反转该子数组
  let res = []
  let queue = [root]
  let index = 0
  // 2.当队列为空时结束循环
  while (queue.length) {
    // 3.定义 subArr 存储二叉树每一层的结点 len 当前队列的长度 即这一层的元素个数
    let subArr = []
    let len = queue.length
    for (let i = 0; i < len; i++) {
      // 4.取出队头元素 放入子数组中
      let cur = queue.shift()
      subArr.push(cur.val)
      // 5.将取出元素的左右结点加入队列
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
    }
    // 6.奇数层 反转子数组
    if (index++ % 2) {
      subArr = subArr.reverse()
    }
    // 7.每次循环一层 将其放入结果
    res.push(subArr)
  }
  return res
};