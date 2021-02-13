// 959. 由斜杠划分区域
// 在由 1 x 1 方格组成的 N x N 网格 grid 中，每个 1 x 1 方块由 /、\ 或空格构成。这些字符会将方块划分为一些共边的区域。

// （请注意，反斜杠字符是转义的，因此 \ 用 "\\" 表示。）。

// 返回区域的数目。

 

// 示例 1：

// 输入：
// [
//   " /",
//   "/ "
// ]
// 输出：2
// 解释：2x2 网格如下：

// 示例 2：

// 输入：
// [
//   " /",
//   "  "
// ]
// 输出：1
// 解释：2x2 网格如下：

// 示例 3：

// 输入：
// [
//   "\\/",
//   "/\\"
// ]
// 输出：4
// 解释：（回想一下，因为 \ 字符是转义的，所以 "\\/" 表示 \/，而 "/\\" 表示 /\。）
// 2x2 网格如下：

// 示例 4：

// 输入：
// [
//   "/\\",
//   "\\/"
// ]
// 输出：5
// 解释：（回想一下，因为 \ 字符是转义的，所以 "/\\" 表示 /\，而 "\\/" 表示 \/。）
// 2x2 网格如下：

// 示例 5：

// 输入：
// [
//   "//",
//   "/ "
// ]
// 输出：3
// 解释：2x2 网格如下：

 

// 提示：

// 1 <= grid.length == grid[0].length <= 30
// grid[i][j] 是 '/'、'\'、或 ' '。

/**
 * @param {string[]} grid
 * @return {number}
 */
// 将 1*1 的格子分成 4 个三角形，顺时针编号 0123 ，将其按要求合并求出连通分量即可。
var regionsBySlashes = function(grid) {
  const n = grid.length
  const total = n * n * 4 // 2*2 有 4 个格子 初始化有 16 个连通分量
  const uf = new UnionFind(total)
  // 循环 先把相邻的格子的右下侧连接起来
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const id = i * n + j // 0 1 2 3 表示第几个大格子
      // 每个小格子的编号 id * 4 + (0, 1 2 3)  [0-15]
      // 对于每个大格子 处理它的右侧和下侧与别的格子（如果存在）来合并
      if (i + 1 < n) {
        // 处理行相连 当大格子有下侧相邻格子（即大格子不在最后一行）时 合并 2 号与相邻大格子的 0 号
        uf.unite(id * 4 + 2, (id + n) * 4 + 0)
      }
      if (j + 1 < n) {
        // 处理列相连 当大格子有右侧相邻格子（即大格子不在最后一列）时 合并 1 号与相邻大格子的 3 号
        uf.unite(id * 4 + 1, (id + 1) * 4 + 3)
      }
      // 下面处理每个大格子的值
      if (grid[i][j] === '/') {
        // 连接 0,3 1,2
        uf.unite(id * 4 + 0, id * 4 + 3)
        uf.unite(id * 4 + 1, id * 4 + 2)
      }
      if (grid[i][j] === '\\') {
        // 连接 0,1 2,3
        uf.unite(id * 4 + 0, id * 4 + 1)
        uf.unite(id * 4 + 2, id * 4 + 3)
      }
      if (grid[i][j] === ' ') {
        // 连接 0,1,2,3
        uf.unite(id * 4 + 0, id * 4 + 1)
        uf.unite(id * 4 + 2, id * 4 + 3)
        uf.unite(id * 4 + 0, id * 4 + 2)
      }
    }
  }
  return uf.getCount()
};

class UnionFind {
  constructor(n) {
    this.count = n
    this.size = new Array(n).fill(1)
    this.parent = new Array(n).fill(0).map((item, index) => index)
  }
  find(x) {
    while (x !== this.parent[x]) {
      this.parent[x] = this.parent[this.parent[x]]
      x = this.parent[x]
    }
    return x
  }
  unite(p, q) {
    const rootp = this.find(p), rootq = this.find(q)
    if (rootp === rootq) {
      return false
    }
    if (this.size[rootp] > this.size[rootq]) {
      this.parent[rootq] = rootp
      this.size[rootp] += this.size[rootq]
    } else {
      this.parent[rootp] = rootq
      this.size[rootq] += this.size[rootp]
    }
    this.count--
    return true
  }
  getCount() {
    return this.count
  }
}