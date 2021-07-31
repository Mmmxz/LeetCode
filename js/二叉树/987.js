// 987. 二叉树的垂序遍历
// 给你二叉树的根结点 root ，请你设计算法计算二叉树的 垂序遍历 序列。

// 对位于 (row, col) 的每个结点而言，其左右子结点分别位于 (row + 1, col - 1) 和 (row + 1, col + 1) 。树的根结点位于 (0, 0) 。

// 二叉树的 垂序遍历 从最左边的列开始直到最右边的列结束，按列索引每一列上的所有结点，形成一个按出现位置从上到下排序的有序列表。如果同行同列上有多个结点，则按结点的值从小到大进行排序。

// 返回二叉树的 垂序遍历 序列。

 

// 示例 1：


// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[9],[3,15],[20],[7]]
// 解释：
// 列 -1 ：只有结点 9 在此列中。
// 列  0 ：只有结点 3 和 15 在此列中，按从上到下顺序。
// 列  1 ：只有结点 20 在此列中。
// 列  2 ：只有结点 7 在此列中。
// 示例 2：


// 输入：root = [1,2,3,4,5,6,7]
// 输出：[[4],[2],[1,5,6],[3],[7]]
// 解释：
// 列 -2 ：只有结点 4 在此列中。
// 列 -1 ：只有结点 2 在此列中。
// 列  0 ：结点 1 、5 和 6 都在此列中。
//           1 在上面，所以它出现在前面。
//           5 和 6 位置都是 (2, 0) ，所以按值从小到大排序，5 在 6 的前面。
// 列  1 ：只有结点 3 在此列中。
// 列  2 ：只有结点 7 在此列中。
// 示例 3：


// 输入：root = [1,2,3,4,6,5,7]
// 输出：[[4],[2],[1,5,6],[3],[7]]
// 解释：
// 这个示例实际上与示例 2 完全相同，只是结点 5 和 6 在树中的位置发生了交换。
// 因为 5 和 6 的位置仍然相同，所以答案保持不变，仍然按值从小到大排序。
 

// 提示：

// 树中结点数目总数在范围 [1, 1000] 内
// 0 <= Node.val <= 1000

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
 * @return {number[][]}
 */
var verticalTraversal = function(root) {
  // 同一col的节点 按从上到下排序 如果是同一row的节点 则按节点值从小到大排序
  const queue = [{
    node: root,
    col: 0,
    row: 0
  }] // bfs的遍历结构是 节点及节点的col和row索引
  const memo = new Map() // memo存储 key为列索引 value为该列的节点值以及row 形如 {value: 1, row: 0}
  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      if (memo.get(cur.col)) {
        memo.set(cur.col, [...memo.get(cur.col), { value: cur.node.val, row: cur.row }])
      } else {
        memo.set(cur.col, [{ value: cur.node.val, row: cur.row}])
      }
      if (cur.node.left) {
        queue.push({
          node: cur.node.left,
          col: cur.col - 1,
          row: cur.row + 1
        })
      }
      if (cur.node.right) {
        queue.push({
          node: cur.node.right,
          col: cur.col + 1,
          row: cur.row + 1
        })
      }
    }
  }
  // 将memo转化为答案输出
  let arr = Array.from(memo.entries())
  // 按列从左到右排序
  arr.sort((a, b) => a[0] - b[0])
  let ans = []
  for (const [col, values] of arr) {
    // 按行从小到大排序 相同行按值从小到大排序
    values.sort((a, b) => a.row === b.row ? a.value - b.value : a.row - b.row)
    ans.push(values.map(item => item.value))
  }
  return ans
};
