// 剑指 Offer 50. 第一个只出现一次的字符
// 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

// 示例:

// s = "abaccdeff"
// 返回 "b"

// s = "" 
// 返回 " "
 

// 限制：

// 0 <= s 的长度 <= 50000

/**
 * @param {string} s
 * @return {character}
 */
 var firstUniqChar = function(s) {
  let hash = {}
  for (const ch of s) {
    if (!hash[ch]) {
      hash[ch] = 1
    } else {
      hash[ch]++
    }
  }
  for (let [key, value] of Object.entries(hash)) {
    if (value === 1) {
      return key
    }
  }
  return ' '
};
