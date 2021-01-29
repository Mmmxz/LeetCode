// 1631. 最小体力消耗路径
// 你准备参加一场远足活动。给你一个二维 rows x columns 的地图 heights ，其中 heights[row][col] 表示格子 (row, col) 的高度。一开始你在最左上角的格子 (0, 0) ，且你希望去最右下角的格子 (rows-1, columns-1) （注意下标从 0 开始编号）。你每次可以往 上，下，左，右 四个方向之一移动，你想要找到耗费 体力 最小的一条路径。

// 一条路径耗费的 体力值 是路径上相邻格子之间 高度差绝对值 的 最大值 决定的。

// 请你返回从左上角走到右下角的最小 体力消耗值 。

 

// 示例 1：



// 输入：heights = [[1,2,2],[3,8,2],[5,3,5]]
// 输出：2
// 解释：路径 [1,3,5,3,5] 连续格子的差值绝对值最大为 2 。
// 这条路径比路径 [1,2,2,2,5] 更优，因为另一条路径差值最大值为 3 。
// 示例 2：



// 输入：heights = [[1,2,3],[3,8,4],[5,3,5]]
// 输出：1
// 解释：路径 [1,2,3,4,5] 的相邻格子差值绝对值最大为 1 ，比路径 [1,3,5,3,5] 更优。
// 示例 3：


// 输入：heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
// 输出：0
// 解释：上图所示路径不需要消耗任何体力。
 

// 提示：

// rows == heights.length
// columns == heights[i].length
// 1 <= rows, columns <= 100
// 1 <= heights[i][j] <= 106

/**
 * @param {number[][]} heights
 * @return {number}
 */
// 思路：采用并查集，按权值从小到大加入边，当某个边加入后，使左上和右下成为连通，将这个边的权值就是最小的消耗值。
var minimumEffortPath = function(heights) {
  const m = heights.length
  // 1 <= rows, columns <= 100
  const n = heights[0].length
  // 1.循环两次，将每个点的右和下两个方向的边加入 edges 中，注意数组越界。
  let edges = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 2.将二维坐标转成一维坐标
      const id = i * n + j
      // 3.当前点和右侧点及权值
      if (j < n - 1) {
        // 右侧记录 [id, id + 1, value]
        edges.push([id, id + 1, Math.abs(heights[i][j] - heights[i][j + 1])])
      }
      // 4.当前点和下方点及权值 (i + 1) * n + j => i * n + j + n => id + n
      if (i < m - 1) {
        // 下侧记录 [id, id + n, value]
        edges.push([id, id + n, Math.abs(heights[i][j] - heights[i + 1][j])])
      }
    }
  }
  // 5.将 edges 按权值从小到大排序
  edges.sort((a, b) => a[2] - b[2])
  let ans = 0
  const uf = new UnionFind(m * n)
  // 6.循环边，如果左上和右下是同一个连通分量，返回这条边的权值
  for (let [u, v, value] of edges) {
    uf.unite(u, v)
    if (uf.connected(0, m * n - 1)) {
      ans = value
      break
    }
  }
  return ans
};

class UnionFind {
  constructor(n) {
    this.count = n
    this.size = new Array(n).fill(1)
    this.parent = new Array(n).fill(0).map((item, index) => index)
  }
  find(x) {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]]
      x = this.parent[x]
    }
    return x
  }
  connected(p, q) {
    return this.find(p) === this.find(q)
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
    this.count -= 1
    return true
  }
}