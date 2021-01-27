// 1579. 保证图可完全遍历
// Alice 和 Bob 共有一个无向图，其中包含 n 个节点和 3  种类型的边：

// 类型 1：只能由 Alice 遍历。
// 类型 2：只能由 Bob 遍历。
// 类型 3：Alice 和 Bob 都可以遍历。
// 给你一个数组 edges ，其中 edges[i] = [typei, ui, vi] 表示节点 ui 和 vi 之间存在类型为 typei 的双向边。请你在保证图仍能够被 Alice和 Bob 完全遍历的前提下，找出可以删除的最大边数。如果从任何节点开始，Alice 和 Bob 都可以到达所有其他节点，则认为图是可以完全遍历的。

// 返回可以删除的最大边数，如果 Alice 和 Bob 无法完全遍历图，则返回 -1 。

 

// 示例 1：



// 输入：n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
// 输出：2
// 解释：如果删除 [1,1,2] 和 [1,1,3] 这两条边，Alice 和 Bob 仍然可以完全遍历这个图。再删除任何其他的边都无法保证图可以完全遍历。所以可以删除的最大边数是 2 。
// 示例 2：



// 输入：n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
// 输出：0
// 解释：注意，删除任何一条边都会使 Alice 和 Bob 无法完全遍历这个图。
// 示例 3：



// 输入：n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
// 输出：-1
// 解释：在当前图中，Alice 无法从其他节点到达节点 4 。类似地，Bob 也不能达到节点 1 。因此，图无法完全遍历。
 

// 提示：

// 1 <= n <= 10^5
// 1 <= edges.length <= min(10^5, 3 * n * (n-1) / 2)
// edges[i].length == 3
// 1 <= edges[i][0] <= 3
// 1 <= edges[i][1] < edges[i][2] <= n
// 所有元组 (typei, ui, vi) 互不相同

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var maxNumEdgesToRemove = function(n, edges) {
  const ufa = new UnionFind(n), ufb = new UnionFind(n)
  let ans = 0
  for (const edge of edges) {
    // edge[0] - 类型 edge[1] edge[2] - 节点 保证节点从 0 开始
    edge[1] -= 1
    edge[2] -= 1
  }
  // 公共边
  for (const [t, u, v] of edges) {
    if (t === 3) {
      // ufa 和 ufb 都需要加入公共边 如果加入失败 则代表该边是多余的 可以删除
      if (!ufa.union(u, v)) {
        ans += 1
      } else {
        ufb.union(u, v)
      }
    }
  }
  // 独占边
  for (const [t, u, v] of edges) {
    if (t === 1) {
      // 如果连接失败 代表这条边是多余的 可以删除
      if (!ufa.union(u, v)) {
        ans += 1
      }
    }
    if (t === 2) {
      if (!ufb.union(u, v)) {
        ans += 1
      }
    }
  }
  // 如果 a || b 的连通分量不是 1 ，说明 a || b 无法完全遍历图 返回 -1 
  if (ufa.getCount() !== 1 || ufb.getCount() !== 1) {
    return -1
  }
  return ans
};

class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((item, index) => index)
    // 联通分量
    this.count = n
    this.size = new Array(n).fill(1)
  }
  find(x) {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]]
      x = this.parent[x]
    }
    return x
  }
  union(p, q) {
    let rootP = this.find(p)
    let rootQ = this.find(q)
    if (rootP === rootQ) {
      return false
    }
    // 小树连接到大树中
    if (this.size[rootP] > this.size[rootQ]) {
      this.parent[rootQ] = rootP
      this.size[rootP] += this.size[rootQ]
    } else {
      this.parent[rootP] = rootQ
      this.size[rootQ] += this.size[rootP]
    }
    this.count--
    return true
  }
  connected(p, q) {
    return find(p) === find(q)
  }
  getCount() {
    return this.count
  }
}