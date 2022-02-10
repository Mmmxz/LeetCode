// 1447. 最简分数
// 给你一个整数 n ，请你返回所有 0 到 1 之间（不包括 0 和 1）满足分母小于等于  n 的 最简 分数 。分数可以以 任意 顺序返回。

 

// 示例 1：

// 输入：n = 2
// 输出：["1/2"]
// 解释："1/2" 是唯一一个分母小于等于 2 的最简分数。
// 示例 2：

// 输入：n = 3
// 输出：["1/2","1/3","2/3"]
// 示例 3：

// 输入：n = 4
// 输出：["1/2","1/3","1/4","2/3","3/4"]
// 解释："2/4" 不是最简分数，因为它可以化简为 "1/2" 。
// 示例 4：

// 输入：n = 1
// 输出：[]
 

// 提示：

// 1 <= n <= 100

/**
 * @param {number} n
 * @return {string[]}
 */
var simplifiedFractions = function(n) {
  // 分母2~n 分子1～i-1 两个数不能约分
  let ans = []
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      // 判断两个数能否约分
      if (gcd(j, i) === 1) {
        ans.push(j + '/' + i)
      }
    }
  }
  return ans
};

const gcd = (a, b) => {
  // a 较小数 b 较大数
  if (b === 0) {
    return a
  }
  return gcd(b, a % b)
}
