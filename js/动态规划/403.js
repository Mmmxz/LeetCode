// 403. 青蛙过河
// 一只青蛙想要过河。 假定河流被等分为若干个单元格，并且在每一个单元格内都有可能放有一块石子（也有可能没有）。 青蛙可以跳上石子，但是不可以跳入水中。

// 给你石子的位置列表 stones（用单元格序号 升序 表示）， 请判定青蛙能否成功过河（即能否在最后一步跳至最后一块石子上）。

// 开始时， 青蛙默认已站在第一块石子上，并可以假定它第一步只能跳跃一个单位（即只能从单元格 1 跳至单元格 2 ）。

// 如果青蛙上一步跳跃了 k 个单位，那么它接下来的跳跃距离只能选择为 k - 1、k 或 k + 1 个单位。 另请注意，青蛙只能向前方（终点的方向）跳跃。

 

// 示例 1：

// 输入：stones = [0,1,3,5,6,8,12,17]
// 输出：true
// 解释：青蛙可以成功过河，按照如下方案跳跃：跳 1 个单位到第 2 块石子, 然后跳 2 个单位到第 3 块石子, 接着 跳 2 个单位到第 4 块石子, 然后跳 3 个单位到第 6 块石子, 跳 4 个单位到第 7 块石子, 最后，跳 5 个单位到第 8 个石子（即最后一块石子）。
// 示例 2：

// 输入：stones = [0,1,2,3,4,8,9,11]
// 输出：false
// 解释：这是因为第 5 和第 6 个石子之间的间距太大，没有可选的方案供青蛙跳跃过去。
 

// 提示：

// 2 <= stones.length <= 2000
// 0 <= stones[i] <= 231 - 1
// stones[0] == 0

// 参考题解：https://leetcode-cn.com/problems/frog-jump/solution/shou-hua-tu-jie-ji-hao-de-di-gui-ti-man-8kk2z/
// 伪代码
// 从之前跳了 k 步 跳到了 index 索引处
function helper(stones, index, k) {
  for (let i in Range(index + 1, len(stones) - 1)) {
    const gap = stones[i] - stones[index]
    if (gap >= k - 1 && gap <= k + 1) {
      if (helper(stones, i, gap) === true) {
        return true
      }
    }
    if (gap > k + 1) break // i 太远了 已经无法跳到 i 说明后面的更跳不到
    if (gap < k - 1) continue // i 太近了 继续往后找看能否跳到合适位置
  }
  if (index === len(stones) - 1) return true
  return false
}
// 用 for 循环枚举出当前所有的选项
//   当前所在位置是 index。第 index+1 个石头到最末尾石头都可跳的选项
//   “选项”为我们展开出一棵解的空间树，在上面做DFS搜索
// 用 k 的约束做剪枝，做出一种选择，基于它，往下递归
//   本轮迭代的石头i，计算出它到当前石头的距离 gap
//   如果 gap >= k-1 && gap <= k+1，则石头i能跳，继续递归，看看能不能返回真
//   如果 gap > k+1，跳不到石头i，它之后的石头更跳不到，直接 break。
//   如果 gap < k-1，说明石头i太近了而跳不到，继续考察后面远一点的石头。
// 子递归helper(stones,i,gap)会压栈压到底，走到递归树底部的递归走完了for循环（即每个选项都考察了，都去不了下一站），就判断当前的 index 是不是末尾索引。
//   如果是，说明能过河，返回true，这个 true 会随着递归出栈，向上返回
//   如果不是，当前不是终点且去不了下一站，返回false，这个递归分支走不下去了，结束当前递归，注意不是结束整个搜索，还要进入for的下一轮迭代(如果有)，继续搜其他分支。

/**
 * @param {number[]} stones
 * @return {boolean}
 */
// 递归解法：超时 16/50用例
 var canCross = function(stones) {
  const n = stones.length
  const helper = (index, k) => {
    for (let i = index + 1; i < n; i++) {
      const gap = stones[i] - stones[index]
      if (gap >= k - 1 && gap <= k + 1) {
        if (helper(i, gap)) {
          return true
        }
      }
      if (gap > k + 1) break
      if (gap < k - 1) continue
    }
    if (index === n - 1) return true
    return false
  }
  return helper(0, 0)
};

/**
 * @param {number[]} stones
 * @return {boolean}
 */
// 记忆化搜索
var canCross = function(stones) {
  const n = stones.length
  // 定义 set 作为记忆化 去除重复子问题
  const set = new Set()
  const helper = (index, k) => {
    // 构造唯一的 key 值
    const key = index * 1000 + k
    // 第二次碰到了该重复问题 说明第一次返回了 false 所以直接返回即可
    if (set.has(key)) {
      return false
    } else {
      set.add(key)
    }
    for (let i = index + 1; i < n; i++) {
      const gap = stones[i] - stones[index]
      if (gap >= k - 1 && gap <= k + 1) {
        if (helper(i, gap)) {
          return true
        }
      }
      if (gap > k + 1) break
      // if (gap < k - 1) continue // 可以省略
    }
    return index === n - 1
  }
  return helper(0, 0)
};

// 参考题解：https://leetcode-cn.com/problems/frog-jump/solution/qing-wa-guo-he-by-leetcode-solution-mbuo/
/**
 * @param {number[]} stones
 * @return {boolean}
 */
// 动态规划 650ms/120mb
 var canCross = function(stones) {
  // 定义 dp[i][k] 能否跳距离k从而到达位置i处
  // 最后返回 dp[n-1][k]
  // dp[i][k] = dp[j][k-1]||dp[j][k]||dp[j][k+1] 其中k=stones[i]-stones[j]
  const n = stones.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(false))
  dp[0][0] = true
  // 如果两个相邻石头之间的距离超过了i 说明一定不能跳到终点
  for (let i = 1; i < n; i++) {
    if (stones[i] - stones[i - 1] > i) {
      return false
    }
  }
  for (let i = 1; i < n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const k = stones[i] - stones[j]
      if (k > j + 1) {
        break
      }
      dp[i][k] = dp[j][k - 1] || dp[j][k] || dp[j][k + 1]
      if (i === n - 1 && dp[i][k]) {
        return true
      }
    }
  }
  return false
};