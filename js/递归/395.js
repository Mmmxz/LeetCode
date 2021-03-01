// 395. 至少有 K 个重复字符的最长子串
// 给你一个字符串 s 和一个整数 k ，请你找出 s 中的最长子串， 要求该子串中的每一字符出现次数都不少于 k 。返回这一子串的长度。

 

// 示例 1：

// 输入：s = "aaabb", k = 3
// 输出：3
// 解释：最长子串为 "aaa" ，其中 'a' 重复了 3 次。
// 示例 2：

// 输入：s = "ababbc", k = 2
// 输出：5
// 解释：最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
 

// 提示：

// 1 <= s.length <= 104
// s 仅由小写英文字母组成
// 1 <= k <= 105

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
  // 递归终止条件，字符串长度小于 k ，一定不满足条件，直接返回 0
  if (s.length < k) {
    return 0
  }
  let hash = {}
  // 统计每个字符出现的次数
  for (let char of s) {
    if (hash[char]) {
      hash[char]++
    } else {
      hash[char] = 1
    }
  }
  for (let [key, value] of Object.entries(hash)) {
    // 如果该字符出现次数 <k ，说明结果中不含该字符，将字符串按该字符拆分
    if (value < k) {
      let res = 0
      for (let t of s.split(key)) {
        // 对于拆分后的字符串 t ，递归求满足提议的最大长度
        res = Math.max(res, longestSubstring(t, k))
      }
      return res
    }
  }
  // 如果每个值都大于 k 次，说明 s 就是符合题意的字符串
  return s.length
};

// 参考题解：https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters/solution/jie-ben-ti-bang-zhu-da-jia-li-jie-di-gui-obla/