// 859. 亲密字符串
// 给你两个字符串 s 和 goal ，只要我们可以通过交换 s 中的两个字母得到与 goal 相等的结果，就返回 true ；否则返回 false 。

// 交换字母的定义是：取两个下标 i 和 j （下标从 0 开始）且满足 i != j ，接着交换 s[i] 和 s[j] 处的字符。

// 例如，在 "abcd" 中交换下标 0 和下标 2 的元素可以生成 "cbad" 。
 

// 示例 1：

// 输入：s = "ab", goal = "ba"
// 输出：true
// 解释：你可以交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 相等。
// 示例 2：

// 输入：s = "ab", goal = "ab"
// 输出：false
// 解释：你只能交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 不相等。
// 示例 3：

// 输入：s = "aa", goal = "aa"
// 输出：true
// 解释：你可以交换 s[0] = 'a' 和 s[1] = 'a' 生成 "aa"，此时 s 和 goal 相等。
// 示例 4：

// 输入：s = "aaaaaaabc", goal = "aaaaaaacb"
// 输出：true
 

// 提示：

// 1 <= s.length, goal.length <= 2 * 104
// s 和 goal 由小写英文字母组成

/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function(s, goal) {
  // 让两个字符串相等
  // 如果两个字符串本来就相等:需要s中有重复的字符 才能保证交换s的字母后 依然相等
  // 如果两个字符串不相等 则需要它们只有两个不同的位置 且这两个位置的字母排序后相等
  if (s.length !== goal.length) return false
  if (s === goal) {
    if (s.length !== new Set(s).size) {
      // 说明s有重复的字母
      return true
    } else {
      return false
    }
  }
  let count = 0
  const n = s.length
  let diffa = '', diffb = ''
  for (let i = 0; i < n; i++) {
    if (s[i] !== goal[i]) {
      diffa += s[i]
      diffb += goal[i]
      count++
    }
    if (count > 2) {
      return false
    }
  }
  if (count === 2 && `${diffa[1]}${diffa[0]}` === diffb){
    // 判断diffa的字母交换后，和diffb是否相等
    return true
  }
  return false
};
