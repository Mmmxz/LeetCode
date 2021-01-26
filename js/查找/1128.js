// 1128. 等价多米诺骨牌对的数量
// 给你一个由一些多米诺骨牌组成的列表 dominoes。

// 如果其中某一张多米诺骨牌可以通过旋转 0 度或 180 度得到另一张多米诺骨牌，我们就认为这两张牌是等价的。

// 形式上，dominoes[i] = [a, b] 和 dominoes[j] = [c, d] 等价的前提是 a==c 且 b==d，或是 a==d 且 b==c。

// 在 0 <= i < j < dominoes.length 的前提下，找出满足 dominoes[i] 和 dominoes[j] 等价的骨牌对 (i, j) 的数量。

 

// 示例：

// 输入：dominoes = [[1,2],[2,1],[3,4],[5,6]]
// 输出：1
 

// 提示：

// 1 <= dominoes.length <= 40000
// 1 <= dominoes[i][j] <= 9

/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function(dominoes) {
  // 1.m1 存储每张牌的值出现的次数，正反算成一个 key 如 1,2 和 2,1 只存储一条记录
  let m1 = new Map()
  for (let i = 0; i < dominoes.length; i++) {
    // 2.求出每张牌的字符串正反形式
    const num = dominoes[i]
    const str = num.toString() // 1,2
    const str1 = num.reverse().toString() // 2,1
    // 3.将其存入 map 中
    if (m1.has(str)) {
      // 存在正序 存入正
      m1.set(str, m1.get(str) + 1)
    } else if (m1.has(str1)) {
      // 存在逆序 存入逆
      m1.set(str1, m1.get(str1) + 1)
    } else {
      // 正逆都不存在 存入正
      m1.set(str, 1)
    }
  }
  // 4.计算出现次数大于 1 的记录，用公式 Cn2 = n(n - 1) / 2 含义是从 n 个中取 2 个无排列/组合的个数
  let res = 0
  for (let n of m1.values()) {
    if (n > 1) {
      res += (n * (n - 1)) / 2
    }
  }
  return res
};