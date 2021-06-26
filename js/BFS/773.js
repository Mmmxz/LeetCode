// 773. 滑动谜题
// 在一个 2 x 3 的板上（board）有 5 块砖瓦，用数字 1~5 来表示, 以及一块空缺用 0 来表示.

// 一次移动定义为选择 0 与一个相邻的数字（上下左右）进行交换.

// 最终当板 board 的结果是 [[1,2,3],[4,5,0]] 谜板被解开。

// 给出一个谜板的初始状态，返回最少可以通过多少次移动解开谜板，如果不能解开谜板，则返回 -1 。

// 示例：

// 输入：board = [[1,2,3],[4,0,5]]
// 输出：1
// 解释：交换 0 和 5 ，1 步完成
// 输入：board = [[1,2,3],[5,4,0]]
// 输出：-1
// 解释：没有办法完成谜板
// 输入：board = [[4,1,2],[5,0,3]]
// 输出：5
// 解释：
// 最少完成谜板的最少移动次数是 5 ，
// 一种移动路径:
// 尚未移动: [[4,1,2],[5,0,3]]
// 移动 1 次: [[4,1,2],[0,5,3]]
// 移动 2 次: [[0,1,2],[4,5,3]]
// 移动 3 次: [[1,0,2],[4,5,3]]
// 移动 4 次: [[1,2,0],[4,5,3]]
// 移动 5 次: [[1,2,3],[4,5,0]]
// 输入：board = [[3,2,4],[1,5,0]]
// 输出：14
// 提示：

// board 是一个如上所述的 2 x 3 的数组.
// board[i][j] 是一个 [0, 1, 2, 3, 4, 5] 的排列.

/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function(board) {
  const start = board.flat().join('')
  if (start === '123450') {
    return 0
  }
  // 某个位置 可以与哪些位置来交换
  const around = [[1, 3], [0, 2, 4], [1, 5], [0, 4], [1, 3, 5], [2, 4]]
  const visited = new Set(), queue = []
  let step = 0
  queue.push(start)
  visited.add(start)
  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      if (cur === '123450') {
        return step
      }
      // 考虑当前cur 能转换成几种没访问过的结果
      // 找到cur中0的位置
      const index = cur.indexOf('0')
      // around[index] 是能产生多少种情况
      const n = around[index].length
      for (let j = 0; j < n; j++) {
        // around[index][j] 代表0与当前cur哪个位置的字符进行交换
        const str = swap(cur, index, around[index][j])
        if (!visited.has(str)) {
          queue.push(str)
          visited.add(str)
        }
      }
    }
    step++
  }
  return -1
};

const swap = (str, i, j) => {
  const res = str.split('')
  let temp = res[j]
  res[j] = res[i]
  res[i] = temp
  return res.join('')
}
