// 331. 验证二叉树的前序序列化
// 序列化二叉树的一种方法是使用前序遍历。当我们遇到一个非空节点时，我们可以记录下这个节点的值。如果它是一个空节点，我们可以使用一个标记值记录，例如 #。

//      _9_
//     /   \
//    3     2
//   / \   / \
//  4   1  #  6
// / \ / \   / \
// # # # #   # #
// 例如，上面的二叉树可以被序列化为字符串 "9,3,4,#,#,1,#,#,2,#,6,#,#"，其中 # 代表一个空节点。

// 给定一串以逗号分隔的序列，验证它是否是正确的二叉树的前序序列化。编写一个在不重构树的条件下的可行算法。

// 每个以逗号分隔的字符或为一个整数或为一个表示 null 指针的 '#' 。

// 你可以认为输入格式总是有效的，例如它永远不会包含两个连续的逗号，比如 "1,,3" 。

// 示例 1:

// 输入: "9,3,4,#,#,1,#,#,2,#,6,#,#"
// 输出: true
// 示例 2:

// 输入: "1,#"
// 输出: false
// 示例 3:

// 输入: "9,#,#,1"
// 输出: false

/**
 * @param {string} preorder
 * @return {boolean}
 */
// 解法 1 ：栈
var isValidSerialization = function(preorder) {
  const stack = [], arr = preorder.split(',')
  for (let i = 0; i < arr.length; i++) {
    // 依次入栈 如果碰到 1## 将其替换成#
    stack.push(arr[i])
    while (stack.length >= 3 && stack[stack.length - 1] === '#' && stack[stack.length - 2] === '#' && stack[stack.length - 3] !== '#') {
      stack.pop()
      stack.pop()
      stack.pop()
      stack.push('#')
    }
  }
  // 如果栈有且只有一个# 则是true
  return stack.length === 1 && stack.pop() === '#'
};

// 参考题解：https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree/solution/pai-an-jiao-jue-de-liang-chong-jie-fa-zh-66nt/

/**
 * @param {string} preorder
 * @return {boolean}
 */
// 解法 2 ：二叉树入度等于出度特性
var isValidSerialization = function(preorder) {
  if (preorder === '#') {
    return true // 特殊情况 只有一个空节点也是二叉树
  }
  // 二叉树的入度 === 出度
  // 根节点入度0 出度2
  // 其他非空节点入度1 出度2
  // 空节点入度1 出度0
  const nodes = preorder.split(','), n = nodes.length
  let indegree = 0, outdegree = 0
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      // 节点数大于1且根节点为空 不是二叉树
      if (nodes[i] === '#') {
        return false
      } else {
        outdegree += 2
      }
      continue
    }
    if (nodes[i] === '#') {
      indegree += 1
    } else {
      indegree += 1
      outdegree += 2
    }
    // 如果还未遍历完 但当前的入度已经大于等于出度，此时没有新的坑位给后面的节点，直接返回false
    if (i !== n - 1 && indegree >= outdegree) {
      return false
    }
  }
  return indegree === outdegree
};