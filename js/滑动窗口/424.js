// 424. 替换后的最长重复字符
// 给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 k 次。在执行上述操作后，找到包含重复字母的最长子串的长度。

// 注意：字符串长度 和 k 不会超过 104。

 

// 示例 1：

// 输入：s = "ABAB", k = 2
// 输出：4
// 解释：用两个'A'替换为两个'B',反之亦然。
// 示例 2：

// 输入：s = "AABABBA", k = 1
// 输出：4
// 解释：
// 将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
// 子串 "BBBB" 有最长重复字母, 答案为 4。

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  // array 存储 26 个字母出现的次数
  const hash = new Array(26).fill(0)
  
  if (!s.length) {
    return 0
  }
  let left = 0, historyMaxStr = 0
  for (let right = 0; right < s.length; right++) {
    // 扩张窗口， index 代表要加入字母的索引
    const index = s[right].charCodeAt() - 'A'.charCodeAt()
    hash[index] += 1
    // 滑动窗口内相同字母出现次数的历史最大值
    historyMaxStr = Math.max(historyMaxStr, hash[index])
    // 窗口宽度大于历史最大值 + k ，证明 k 不足以将当前窗口全部替换成同一个字母，则窗口滑动；否则窗口扩张
    if (right - left + 1 > historyMaxStr + k) {
      // leftIndex 代表左侧要离开字母的索引
      const leftIndex = s[left].charCodeAt() - 'A'.charCodeAt()
      hash[leftIndex] -= 1
      left++
    }
  }
  // 返回滑动窗口的大小 即 right - left ，因为 right 已经到达最右侧 所以 right == s.length
  return s.length - left
};

// 参考题解 https://leetcode-cn.com/problems/longest-repeating-character-replacement/solution/tong-guo-ci-ti-liao-jie-yi-xia-shi-yao-shi-hua-don/