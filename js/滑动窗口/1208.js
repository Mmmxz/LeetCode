// 1208. 尽可能使字符串相等
// 给你两个长度相同的字符串，s 和 t。

// 将 s 中的第 i 个字符变到 t 中的第 i 个字符需要 |s[i] - t[i]| 的开销（开销可能为 0），也就是两个字符的 ASCII 码值的差的绝对值。

// 用于变更字符串的最大预算是 maxCost。在转化字符串时，总开销应当小于等于该预算，这也意味着字符串的转化可能是不完全的。

// 如果你可以将 s 的子字符串转化为它在 t 中对应的子字符串，则返回可以转化的最大长度。

// 如果 s 中没有子字符串可以转化成 t 中对应的子字符串，则返回 0。

 

// 示例 1：

// 输入：s = "abcd", t = "bcdf", cost = 3
// 输出：3
// 解释：s 中的 "abc" 可以变为 "bcd"。开销为 3，所以最大长度为 3。
// 示例 2：

// 输入：s = "abcd", t = "cdef", cost = 3
// 输出：1
// 解释：s 中的任一字符要想变成 t 中对应的字符，其开销都是 2。因此，最大长度为 1。
// 示例 3：

// 输入：s = "abcd", t = "acde", cost = 0
// 输出：1
// 解释：你无法作出任何改动，所以最大长度为 1。
 

// 提示：

// 1 <= s.length, t.length <= 10^5
// 0 <= maxCost <= 10^6
// s 和 t 都只含小写英文字母。

/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
// 题目可以转化为：求数组最长的连续区间，满足区间和小于等于 max ，使用滑动窗口解决。
var equalSubstring = function(s, t, maxCost) {
  const n = s.length
  // 1.diff 存储每位的转换花费值
  let diff = []
  for (let i = 0; i < n; i++) {
    diff.push(cost(s[i], t[i]))
  }
  // 例如 [1, 2, 0, 0] max = 3 找出最长的连续串 满足和小于等于 max
  // [left...right) sum 存储当前窗口的和
  let left = 0, right = 0, sum = 0, maxans = 0
  while (right < n) {
    let c = diff[right]
    right++
    sum += c
    // 当前窗口总和满足条件
    if (sum <= maxCost) {
      // 取当前答案和当前区间长度相比的最大值
      maxans = Math.max(maxans, right - left)
    } else {
      // 当前总和大于最大花费 不满足条件 缩小区间
      let d = diff[left]
      left++
      sum -= d
    }
  }
  return maxans
};

var cost = (c1, c2) => {
  // 转换花费的值
  return Math.abs(c1.charCodeAt() - c2.charCodeAt())
}