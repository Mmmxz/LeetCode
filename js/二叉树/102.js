// 102. 二叉树的层序遍历
// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

 

// 示例：
// 二叉树：[3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层序遍历结果：

// [
//   [3],
//   [9,20],
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
var levelOrder = function(root) {
  if (!root) return []
  // 1.定义 res 存储结果 queue 作为队列 初始化存储二叉树根节点
  let res = []
  let queue = [root]
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
    // 6.每次循环一层 将其放入结果
    res.push(subArr)
  }
  return res
};

// 队列的基本应用-广度优先遍历