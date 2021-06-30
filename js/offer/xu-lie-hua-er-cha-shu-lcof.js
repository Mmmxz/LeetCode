// 剑指 Offer 37. 序列化二叉树
// 请实现两个函数，分别用来序列化和反序列化二叉树。

// 你需要设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

// 提示：输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

 

// 示例：


// 输入：root = [1,2,3,null,null,4,5]
// 输出：[1,2,3,null,null,4,5]
 

// 注意：本题与主站 297 题相同：https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  // dfs
  if (root === null) {
    return 'X'
  }
  const left = serialize(root.left)
  const right = serialize(root.right)
  return root.val + ',' + left + ',' + right
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  const list = data.split(',')
  const buildTree = (list) => {
    const rootval = list.shift()
    if (rootval === 'X') {
      return null
    }
    const root = new TreeNode(rootval)
    root.left = buildTree(list)
    root.right = buildTree(list)
    return root
  }
  return buildTree(list)
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  // bfs
  const queue = [root], ans = []
  while (queue.length) {
    const node = queue.shift()
    if (node) {
      ans.push(node.val)
      queue.push(node.left)
      queue.push(node.right)
    } else {
      ans.push('X')
    }
  }
  return ans.toString()
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  if (data === 'X') return null
  const list = data.split(',')
  let cursor = 1
  const root = new TreeNode(list[0])
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    const leftVal = list[cursor]
    const rightVal = list[cursor + 1]
    if (leftVal !== 'X') {
      const leftNode = new TreeNode(leftVal)
      node.left = leftNode
      queue.push(leftNode)
    }
    if (rightVal !== 'X') {
      const rightNode = new TreeNode(rightVal)
      node.right = rightNode
      queue.push(rightNode)
    }
    cursor += 2
  }
  return root
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */


// 参考题解：https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/solution/shou-hua-tu-jie-dfshe-bfsliang-chong-jie-fa-er-cha/
