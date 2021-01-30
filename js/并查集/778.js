// 778. 水位上升的泳池中游泳
// 在一个 N x N 的坐标方格 grid 中，每一个方格的值 grid[i][j] 表示在位置 (i,j) 的平台高度。

// 现在开始下雨了。当时间为 t 时，此时雨水导致水池中任意位置的水位为 t 。你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。

// 你从坐标方格的左上平台 (0，0) 出发。最少耗时多久你才能到达坐标方格的右下平台 (N-1, N-1)？

 

// 示例 1:

// 输入: [[0,2],[1,3]]
// 输出: 3
// 解释:
// 时间为0时，你位于坐标方格的位置为 (0, 0)。
// 此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。

// 等时间到达 3 时，你才可以游向平台 (1, 1). 因为此时的水位是 3，坐标方格中的平台没有比水位 3 更高的，所以你可以游向坐标方格中的任意位置
// 示例2:

// 输入: [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
// 输出: 16
// 解释:
//  0  1  2  3  4
// 24 23 22 21  5
// 12 13 14 15 16
// 11 17 18 19 20
// 10  9  8  7  6

// 最终的路线用加粗进行了标记。
// 我们必须等到时间为 16，此时才能保证平台 (0, 0) 和 (4, 4) 是连通的
 

// 提示:

// 2 <= N <= 50.
// grid[i][j] 是 [0, ..., N*N - 1] 的排列。

/**
 * @param {number[][]} grid
 * @return {number}
 */
// 思路：采用并查集，按权值从小到大加入边，当某个边加入后，使左上和右下成为连通，将这个边的权值就是最小的消耗值。
// 思路与 #1631 类似，只不过边的权值由差值变成两个点的最大值。
var swimInWater = function(grid) {
  const len = grid.length
  let edges = []
  // 1.循环两次，将每个点的右和下两个方向的边加入 edges 中，注意数组越界。
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const id = i * len + j
      // right
      if (j < len - 1) {
        // 右侧记录 [id, id + 1, value]
        edges.push([id, id + 1, Math.max(grid[i][j], grid[i][j + 1])])
      }
      // down
      if (i < len - 1) {
        // 下侧记录 [id, id + n, value]
        edges.push([id, id + len, Math.max(grid[i][j], grid[i + 1][j])])
      }
    }
  }
  // 2.将 edges 按权值从小到大排序
  edges.sort((a, b) => a[2] - b[2])
  let ans = 0
  const total = len * len
  const uf = new UnionFind(total)
  // 3.循环边，如果左上和右下是同一个连通分量，返回这条边的权值
  for (let [u, v, value] of edges) {
    uf.unite(u, v)
    if (uf.connected(0, total - 1)) {
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