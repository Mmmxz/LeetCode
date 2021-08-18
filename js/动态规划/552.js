// 552. 学生出勤记录 II
// 可以用字符串表示一个学生的出勤记录，其中的每个字符用来标记当天的出勤情况（缺勤、迟到、到场）。记录中只含下面三种字符：
// 'A'：Absent，缺勤
// 'L'：Late，迟到
// 'P'：Present，到场
// 如果学生能够 同时 满足下面两个条件，则可以获得出勤奖励：

// 按 总出勤 计，学生缺勤（'A'）严格 少于两天。
// 学生 不会 存在 连续 3 天或 连续 3 天以上的迟到（'L'）记录。
// 给你一个整数 n ，表示出勤记录的长度（次数）。请你返回记录长度为 n 时，可能获得出勤奖励的记录情况 数量 。答案可能很大，所以返回对 109 + 7 取余 的结果。

 

// 示例 1：

// 输入：n = 2
// 输出：8
// 解释：
// 有 8 种长度为 2 的记录将被视为可奖励：
// "PP" , "AP", "PA", "LP", "PL", "AL", "LA", "LL" 
// 只有"AA"不会被视为可奖励，因为缺勤次数为 2 次（需要少于 2 次）。
// 示例 2：

// 输入：n = 1
// 输出：3
// 示例 3：

// 输入：n = 10101
// 输出：183236316
 

// 提示：

// 1 <= n <= 105

/**
 * @param {number} n
 * @return {number}
 */
var checkRecord = function(n) {
  const MOD = Math.pow(10, 9) + 7
  // memo[n][2][3]
  const memo = new Array(n).fill(-1).map(() => new Array(2).fill(-1).map(() => new Array(3).fill(-1))) 
  // day-当前的天数 从0开始 absent-当前缺勤次数 late-当前连续迟到次数
  const dfs = (day, absent, late) => {
    // 来到了n天 是一种符合的情况
    if (day >= n) {
      return 1
    }
    if (memo[day][absent][late] !== -1) {
      return memo[day][absent][late]
    }
    let ans = 0
    // 1.present随便放
    ans = (ans + dfs(day + 1, absent, 0)) % MOD
    // 2.absent最多放1个
    if (absent < 1) {
      ans = (ans + dfs(day + 1, 1, 0)) % MOD
    }
    // 3.late最多连续放2个
    if (late < 2) {
      ans = (ans + dfs(day + 1, absent, late + 1)) % MOD
    }
    memo[day][absent][late] = ans
    return ans
  }
  // 从0天开始 缺勤和连续迟到都是0
  return dfs(0, 0, 0)
};


/**
 * @param {number} n
 * @return {number}
 */
var checkRecord = function(n) {
  const MOD = Math.pow(10, 9) + 7
  // 定义dp[i][j][k]代表第i天j次absent连续k次late的方案数
  // 状态转移 从i-1天转移而来
  // 当前填入P i-1天任何状态都能转移过来
  // 当前填入A i-1天之前肯定不能absent 同时late状态可以转移过来
  // 当前填入L i-1天absent的状态转移过来 最多只能有一个连续的late
  // dp[n][2][3]
  const dp = new Array(n).fill(0).map(() => new Array(2).fill(0).map(() => new Array(3).fill(0))) 
  dp[0][0][0] = 1
  dp[0][1][0] = 1
  dp[0][0][1] = 1
  for (let i = 1; i < n; i++) {
    // 本次填入P 分成前一天累计了0个A和1个A两种情况
    dp[i][0][0] = (dp[i - 1][0][0] + dp[i - 1][0][1] + dp[i - 1][0][2]) % MOD
    dp[i][1][0] = (dp[i - 1][1][0] + dp[i - 1][1][1] + dp[i - 1][1][2]) % MOD
    // 本次填入A 前一天没有A都能转移过来
    dp[i][1][0] = (dp[i][1][0] + dp[i - 1][0][0] + dp[i - 1][0][1] + dp[i - 1][0][2]) % MOD
    // 本次填入L
    dp[i][0][1] = dp[i - 1][0][0]
    dp[i][0][2] = dp[i - 1][0][1]
    dp[i][1][1] = dp[i - 1][1][0]
    dp[i][1][2] = dp[i - 1][1][1]
  }
  let ans = 0
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      ans = (ans + dp[n - 1][i][j]) % MOD
    }
  }
  return ans
};
