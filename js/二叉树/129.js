// 645. 错误的集合
// 集合 s 包含从 1 到 n 的整数。不幸的是，因为数据错误，导致集合里面某一个数字复制了成了集合里面的另外一个数字的值，导致集合 丢失了一个数字 并且 有一个数字重复 。

// 给定一个数组 nums 代表了集合 S 发生错误后的结果。

// 请你找出重复出现的整数，再找到丢失的整数，将它们以数组的形式返回。

 

// 示例 1：

// 输入：nums = [1,2,2,4]
// 输出：[2,3]
// 示例 2：

// 输入：nums = [1,1]
// 输出：[1,2]
 

// 提示：

// 2 <= nums.length <= 104
// 1 <= nums[i] <= 104

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
 * @return {number}
 */
var sumNumbers = function(root) {
  // bfs 层序遍历
  const queue = [root]
  let ans = 0
  while (queue.length) {
    const cur = queue.shift()
    // 如果cur是叶子节点 就收集答案
    if (cur.left === null && cur.right === null) {
      ans += cur.val
    }
    // 如果不是叶子节点 将父节点的值加到子节点中
    if (cur.left) {
      cur.left.val += cur.val * 10
      queue.push(cur.left)
    }
    if (cur.right) {
      cur.right.val += cur.val * 10
      queue.push(cur.right)
    }
  }
  return ans
};


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
 * @return {number}
 */
var sumNumbers = function(root) {
  // dfs
  const helper = (node, pre) => {
    if (node === null) return 0
    // 每个节点的值是 pre * 10 + node.val
    let temp = pre * 10 + node.val
    // 如果是叶子节点 则返回这个数
    if (node.left === null && node.right === null) {
      return temp
    }
    // 如果不是叶子节点 则将它的左右和作为它的节点值返回
    return helper(node.left, temp) + helper(node.right, temp)
  }
  return helper(root, 0)
};
