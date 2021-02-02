// 684. 冗余连接
// 在本问题中, 树指的是一个连通且无环的无向图。

// 输入一个图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。

// 结果图是一个以边组成的二维数组。每一个边的元素是一对[u, v] ，满足 u < v，表示连接顶点u 和v的无向图的边。

// 返回一条可以删去的边，使得结果图是一个有着N个节点的树。如果有多个答案，则返回二维数组中最后出现的边。答案边 [u, v] 应满足相同的格式 u < v。

// 示例 1：

// 输入: [[1,2], [1,3], [2,3]]
// 输出: [2,3]
// 解释: 给定的无向图为:
//   1
//  / \
// 2 - 3
// 示例 2：

// 输入: [[1,2], [2,3], [3,4], [1,4], [1,5]]
// 输出: [1,4]
// 解释: 给定的无向图为:
// 5 - 1 - 2
//     |   |
//     4 - 3
// 注意:

// 输入的二维数组大小在 3 到 1000。
// 二维数组中的整数在1到N之间，其中N是输入数组的大小。
// 更新(2017-09-26):
// 我们已经重新检查了问题描述及测试用例，明确图是无向 图。对于有向图详见冗余连接II。对于造成任何不便，我们深感歉意。

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
// 解法：并查集
var findRedundantConnection = function(edges) {
  // 在树中，n 个点有 n-1 条边，题意可知有 1 条冗余边 所以节点数为 n 个
  const n = edges.length
  const uf = new UnionFind(n)
  let ans = []
  for (let [u, v] of edges) {
    // 顶点从 0 开始，方便并查集计算
    const p1 = u - 1, p2 = v - 1
    // 如果两个顶点属于一个连通分量，则这条边是多余的，会导致环的出现，将其返回
    if (uf.isConnected(p1, p2)) {
      ans = [u, v]
    // 否则这条边不会导致出现环，合并这两个点的连通分量
    } else {
      uf.unite(p1, p2)
    }
  }
  return ans
};

class UnionFind {
  constructor(n) {
    this.count = n
    this.parent = new Array(n).fill(0).map((item, index) => index)
    this.size = new Array(n).fill(1)
  }
  getCount() {
    return this.count
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
      this.size[rootq] = this.size[rootp]
    }
    this.count--
    return true
  }
  isConnected(p, q) {
    return this.find(p) === this.find(q)
  }
}