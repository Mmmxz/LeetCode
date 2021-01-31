// 839. 相似字符串组
// 如果交换字符串 X 中的两个不同位置的字母，使得它和字符串 Y 相等，那么称 X 和 Y 两个字符串相似。如果这两个字符串本身是相等的，那它们也是相似的。

// 例如，"tars" 和 "rats" 是相似的 (交换 0 与 2 的位置)； "rats" 和 "arts" 也是相似的，但是 "star" 不与 "tars"，"rats"，或 "arts" 相似。

// 总之，它们通过相似性形成了两个关联组：{"tars", "rats", "arts"} 和 {"star"}。注意，"tars" 和 "arts" 是在同一组中，即使它们并不相似。形式上，对每个组而言，要确定一个单词在组中，只需要这个词和该组中至少一个单词相似。

// 给你一个字符串列表 strs。列表中的每个字符串都是 strs 中其它所有字符串的一个字母异位词。请问 strs 中有多少个相似字符串组？

 

// 示例 1：

// 输入：strs = ["tars","rats","arts","star"]
// 输出：2
// 示例 2：

// 输入：strs = ["omv","ovm"]
// 输出：1
 

// 提示：

// 1 <= strs.length <= 100
// 1 <= strs[i].length <= 1000
// sum(strs[i].length) <= 2 * 104
// strs[i] 只包含小写字母。
// strs 中的所有单词都具有相同的长度，且是彼此的字母异位词。
 

// 备注：

//       字母异位词（anagram），一种把某个字符串的字母的位置（顺序）加以改换所形成的新词。

/**
 * @param {string[]} strs
 * @return {number}
 */
// 思路：并查集，答案即连通分量的个数。重点：每个字符串是顶点，相似的字符串代表边，循环边连通，即可得出连通分量；判断两个字符串是否相似，相似的两个字符串代表一条边。
var numSimilarGroups = function(strs) {
  const n = strs.length
  var uf = new UnionFind(n)
  // 1.edges 存储每条边，以索引为顶点，方便并查集操作。
  let edges = []
  // 2.双重循环，两个相似的字符串可以代表一条边。
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isLikeStr(strs[i], strs[j])) {
        edges.push([i, j])
      }
    }
  }
  // 3.遍历所有边，得出连通分量
  for (let [u, v] of edges) {
    uf.unite(u, v)
  }
  return uf.getCount()
};

// 判断相似方法，已知字符串都是字母异位词
var isLikeStr = (str1, str2) => {
  // 相等，返回 true
  if (str1 === str2) {
    return true
  }
  const len = str1.length
  // diff 记录不同单词的数量
  let diff = 0
  // diff 只有为 2 时，符合相似字符串的定义 其他情况均返回 false
  for (let i = 0; i < len; i++) {
    if (str1[i] !== str2[i]) {
      diff += 1
    }
    if (diff > 2) {
      break
    }
  }
  // 如果两个字符不同的个数 == 2 则属于相似
  return diff === 2
}

class UnionFind {
  constructor(n) {
    this.count = n
    this.size = new Array(n).fill(1)
    this.parent = new Array(n).fill(0).map((item, index) => index)
  }
  isConnected(str1, str2) {
    return this.find(str1) === this.find(str2)
  }
  find(str) {
    while (this.parent[str] !== str) {
      str = this.parent[str]
    }
    return str
  }
  unite(str1, str2) {
    const root1 = this.find(str1), root2 = this.find(str2)
    if (root1 === root2) {
      return false
    }
    if (this.size[root1] > this.size[root2]) {
      this.parent[root2] = root1
      this.size[root1] += this.size[root2]
    } else {
      this.parent[root1] = root2
      this.size[root2] += this.size[root1]
    }
    this.count -= 1
    return true
  }
  getCount() {
    return this.count
  }
}