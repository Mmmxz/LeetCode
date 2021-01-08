// 547. 省份数量
// 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

// 省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

// 给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

// 返回矩阵中 省份 的数量。

 

// 示例 1：


// 输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
// 输出：2
// 示例 2：


// 输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
// 输出：3
 

// 提示：

// 1 <= n <= 200
// n == isConnected.length
// n == isConnected[i].length
// isConnected[i][j] 为 1 或 0
// isConnected[i][i] == 1
// isConnected[i][j] == isConnected[j][i]

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
  // 城市的数量
  const len = isConnected.length
  // 相连的城市数量，也就是省份
  let res = 0
  // 表示哪些城市被访问过
  let visited = new Array(len).fill(0)
  const dfs = (isConnected, index) => {
    for (let j = 0; j < isConnected.length; j++) {
      if (isConnected[index][j] === 1 && !visited[j]) {
        // 如果第 index 和第 j 个城市相连，说明他们是同一个省份的，把它标记为已访问过
        visited[j] = 1
        // 然后继续查找和第 j 个城市相连的城市
        dfs(isConnected, j)
      }
    }
  }
  // 遍历所有的城市
  for (let i = 0; i < len; i++) {
    // 如果当前城市没有被访问过 说明是一个新的省份 count 要加 1 并且和这个城市相连的都标记为已访问过 也就是同一省份的
    if (!visited[i]) {
      res++
      dfs(isConnected, i)
    }
  }
  return res
};