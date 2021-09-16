// 212. 单词搜索 II
// 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words，找出所有同时在二维网格和字典中出现的单词。

// 单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。

 

// 示例 1：


// 输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
// 输出：["eat","oath"]
// 示例 2：


// 输入：board = [["a","b"],["c","d"]], words = ["abcb"]
// 输出：[]
 

// 提示：

// m == board.length
// n == board[i].length
// 1 <= m, n <= 12
// board[i][j] 是一个小写英文字母
// 1 <= words.length <= 3 * 104
// 1 <= words[i].length <= 10
// words[i] 由小写英文字母组成
// words 中的所有字符串互不相同

// 暴力
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  const m = board.length, n = board[0].length
  // 循环words 找存在的单词
  const ans = [], memo = new Set(words)
  let visited = new Array(m).fill(0).map(() => new Array(n).fill(0))
  const direction = [[1,0],[0,1],[-1,0],[0,-1]]
  const inArea = (i, j) => i >= 0 && i < m && j >= 0 && j < n
  const dfs = (i, j, cur, target) => {
    if (cur > 10) return false
    if (cur === target.length - 1) {
      return board[i][j] === target[cur]
    }
    if (board[i][j] === target[cur]) {
      visited[i][j] = 1
      for (let k = 0; k < 4; k++) {
        const newx = i + direction[k][0]
        const newy = j + direction[k][1]
        if (inArea(newx, newy) && !visited[newx][newy] && dfs(newx, newy, cur + 1, target)) {
          return true
        }
      }
      visited[i][j] = 0
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 对于board[i][j] 作为起点找匹配的单词
      for (const str of memo) {
        visited = new Array(m).fill(0).map(() => new Array(n).fill(0))
        if (dfs(i, j, 0, str)) {
          ans.push(str)
          memo.delete(str)
        }
      }
    }
  }
  return ans
};

// todo 前缀树
