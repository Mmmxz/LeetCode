// 79. 单词搜索
// 给定一个二维网格和一个单词，找出该单词是否存在于网格中。

// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

 

// 示例:

// board =
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]

// 给定 word = "ABCCED", 返回 true
// 给定 word = "SEE", 返回 true
// 给定 word = "ABCB", 返回 false
 

// 提示：

// board 和 word 中只包含大写和小写英文字母。
// 1 <= board.length <= 200
// 1 <= board[i].length <= 200
// 1 <= word.length <= 10^3

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  // 1.定义 m n 分别存储二维数组的长度
  let m = board.length
  if (!m) {
    return false
  }
  let n = board[0].length
  // 2.visited 该点是否访问过
  // 不能用该方式初始化二维数组 因为 fill 是浅拷贝 会使内部的 new Array(n).fill(false) 指向同一个内存地址
  // let visited = new Array(m).fill(new Array(n).fill(false))
  let visited = Array(m).fill(false).map(() => Array(n).fill(false))
  // 3.inArea 该坐标是否在二维数组内部
  const inArea = (x, y) => {
    return x >= 0 && x < m && y >= 0 && y < n
  }
  // 4.当前点的【上右下左】对应点
  const moveMap = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  // 5.递归查找方法 index 代表当前对比的字母索引 startx starty 代表当前的坐标
  const findWord = (board, word, index, startx, starty) => {
    // 5.1.最后一个字母是否匹配
    if (index === word.length - 1) {
      return board[startx][starty] === word[index]
    }
    // 5.2.非最后一位字母
    if (board[startx][starty] === word[index]) {
      // 5.3.标记已访问
      visited[startx][starty] = true
      // 5.4.从 startx starty 出发 向四个方向寻找
      for(let i = 0; i < 4; i++) {
        let newx = startx + moveMap[i][0]
        let newy = starty + moveMap[i][1]
        // 5.5.如果新坐标是有效的 并且未访问 继续查询下一个字母
        if (inArea(newx, newy) && !visited[newx][newy] && findWord(board, word, index + 1, newx, newy)) {
          return true
        }
      }
      // 5.5.未找到正确路径 回溯 将已访问恢复为未访问
      visited[startx][starty] = false
    }
    // 5.6.本次查询结束 该路径不符合
    return false
  }

  // 6.调用查找方法
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (findWord(board, word, 0, i, j)) {
        return true
      }
    }
  }
  return false
};