// 617. 合并二叉树
// 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

// 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

// 示例 1:

// 输入: 
// 	Tree 1                     Tree 2                  
//           1                         2                             
//          / \                       / \                            
//         3   2                     1   3                        
//        /                           \   \                      
//       5                             4   7                  
// 输出: 
// 合并后的树:
// 	     3
// 	    / \
// 	   4   5
// 	  / \   \ 
// 	 5   4   7
// 注意: 合并必须从两个树的根节点开始。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
  if (!root1) return root2
  if (!root2) return root1
  // bfs
  let merged = new TreeNode(root1.val + root2.val)
  let queue1 = [root1], queue2 = [root2], queue = [merged]
  while (queue1.length && queue2.length) {
    let node = queue.shift(), node1 = queue1.shift(), node2 = queue2.shift()
    let left1 = node1.left, left2 = node2.left, right1 = node1.right, right2 = node2.right
    if (left1 || left2) {
      if (left1 && left2) {
        let left = new TreeNode(left1.val + left2.val)
        node.left = left
        queue.push(left)
        queue1.push(left1)
        queue2.push(left2)
      } else if (left1) {
        node.left = left1
      } else {
        node.left = left2
      }
    }
    if (right1 || right2) {
      if (right1 && right2) {
        let right = new TreeNode(right1.val + right2.val)
        node.right = right
        queue.push(right)
        queue1.push(right1)
        queue2.push(right2)
      } else if (right1) {
        node.right = right1
      } else {
        node.right = right2
      }
    }
  }
  return merged
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
  if (!root1 && !root2) {
    return null
  } else if (!root1) {
    return root2
  } else if (!root2) {
    return root1
  } else {
    let node = new TreeNode()
    node.val = root1.val + root2.val
    node.left = mergeTrees(root1.left, root2.left)
    node.right = mergeTrees(root1.right, root2.right)
    return node
  }
};
