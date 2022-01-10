// 我们从二叉树的根节点 root 开始进行深度优先搜索。

// 在遍历中的每个节点处，我们输出 D 条短划线（其中 D 是该节点的深度），然后输出该节点的值。（如果节点的深度为 D，则其直接子节点的深度为 D + 1。根节点的深度为 0）。

// 如果节点只有一个子节点，那么保证该子节点为左子节点。

// 给出遍历输出 S，还原树并返回其根节点 root。

//  

// 示例 1：



// 输入："1-2--3--4-5--6--7"
// 输出：[1,2,5,3,4,6,7]
// 示例 2：



// 输入："1-2--3---4-5--6---7"
// 输出：[1,2,5,3,null,6,null,4,null,7]
// 示例 3：



// 输入："1-401--349---90--88"
// 输出：[1,401,null,349,88,90]
//  

// 提示：

// 原始树中的节点数介于 1 和 1000 之间。
// 每个节点的值介于 1 和 10 ^ 9 之间。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/recover-a-tree-from-preorder-traversal
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {string} S
 * @return {TreeNode}
 */
var recoverFromPreorder = function(S) {
  const stack = []
  for (let i = 0; i < S.length;) {
    let currentLevel = 0
    while (i < S.length && S[i] === '-') { // 避免循环半途中出界
      i++
      currentLevel++ // 连字符的个数代表level
    }
    const start = i // 记录当前节点的开始值位置
    while (i < S.length && S[i] !== '-') {
      i++
    }
    const curNode = new TreeNode(S.slice(start, i))
    if (stack.length === 0) {
      stack.push(curNode)
      continue
    }
    while (stack.length > currentLevel) {
      stack.pop()
    }
    if (stack[stack.length - 1].left) {
      stack[stack.length - 1].right = curNode
    } else {
      stack[stack.length - 1].left = curNode
    }
    stack.push(curNode)
  }
  return stack[0]
};
