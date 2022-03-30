// 剑指 Offer 12. 矩阵中的路径
// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

 

// 例如，在下面的 3×4 的矩阵中包含单词 "ABCCED"（单词中的字母已标出）。



 

// 示例 1：

// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true
// 示例 2：

// 输入：board = [["a","b"],["c","d"]], word = "abcd"
// 输出：false
 

// 提示：

// 1 <= board.length <= 200
// 1 <= board[i].length <= 200
// board 和 word 仅由大小写英文字母组成
 

// 注意：本题与主站 79 题相同：https://leetcode-cn.com/problems/word-search/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// 解法 1 ：回溯
 var exist = function(board, word) {
  const m = board.length, n = board[0].length
  const len = word.length
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(0))
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const inArea = (i, j) => {
    return i >= 0 && i < m && j >= 0 && j < n
  }
  // index 当前匹配第几个字母
  const backtrack = (startX, startY, index) => {
    if (index === len - 1) {
      // 最后一个字母是否匹配
      return board[startX][startY] === word[index]
    }
    // 当前这个是否匹配
    if (board[startX][startY] === word[index]) {
      // 继续找下一个
      visited[startX][startY] = 1
      for (let i = 0; i < 4; i++) {
        const newX = startX + direction[i][0]
        const newY = startY + direction[i][1]
        if (inArea(newX, newY) && !visited[newX][newY] && backtrack(newX, newY, index + 1)) {
          return true
        }
      }
      visited[startX][startY] = 0
    }
    return false
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (backtrack(i, j, 0)) {
        return true
      }
    }
  }
  return false
};
