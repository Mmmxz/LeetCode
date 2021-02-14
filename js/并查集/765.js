// 765. 情侣牵手
// N 对情侣坐在连续排列的 2N 个座位上，想要牵到对方的手。 计算最少交换座位的次数，以便每对情侣可以并肩坐在一起。 一次交换可选择任意两人，让他们站起来交换座位。

// 人和座位用 0 到 2N-1 的整数表示，情侣们按顺序编号，第一对是 (0, 1)，第二对是 (2, 3)，以此类推，最后一对是 (2N-2, 2N-1)。

// 这些情侣的初始座位  row[i] 是由最初始坐在第 i 个座位上的人决定的。

// 示例 1:

// 输入: row = [0, 2, 1, 3]
// 输出: 1
// 解释: 我们只需要交换row[1]和row[2]的位置即可。
// 示例 2:

// 输入: row = [3, 2, 0, 1]
// 输出: 0
// 解释: 无需交换座位，所有的情侣都已经可以手牵手了。
// 说明:

// len(row) 是偶数且数值在 [4, 60]范围内。
// 可以保证row 是序列 0...len(row)-1 的一个全排列。

/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function(row) {
  const len = row.length // 一共多少人
  // 一共多少对情侣
  const n = row.length / 2
  const uf = new UnionFind(n) // 多少对就有多少初始化分量
  for (let i = 0; i < len; i += 2) {
    // 0,1 2,3, 4,5是情侣 /2向下取整是相等的 不相等的不是情侣
    uf.unite(Math.floor(row[i] / 2), Math.floor(row[i + 1] / 2))
  }
  // 情侣对数 - 连通分量个数 = 需要交换次数
  return n - uf.getCount()
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