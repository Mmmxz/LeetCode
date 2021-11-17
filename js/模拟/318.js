// 318. 最大单词长度乘积
// 给定一个字符串数组 words，找到 length(word[i]) * length(word[j]) 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。

 

// 示例 1:

// 输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
// 输出: 16 
// 解释: 这两个单词为 "abcw", "xtfn"。
// 示例 2:

// 输入: ["a","ab","abc","d","cd","bcd","abcd"]
// 输出: 4 
// 解释: 这两个单词为 "ab", "cd"。
// 示例 3:

// 输入: ["a","aa","aaa","aaaa"]
// 输出: 0 
// 解释: 不存在这样的两个单词。
 

// 提示：

// 2 <= words.length <= 1000
// 1 <= words[i].length <= 1000
// words[i] 仅包含小写字母

/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function(words) {
  // 找到两个单词 不含有公共字母 返回其长度的乘积 取最大值
  const memo = new Array(26).fill(0)
  let ans = 0
  const n = words.length
  for (let i = 0; i < n; i++) {
    // 用memo记录每个字母的出现次数
    for (const char of words[i]) {
      memo[char.charCodeAt() - 'a'.charCodeAt()]++
    }
    for (let j = i + 1; j < n; j++) {
      let isRight = true
      for (const char of words[j]) {
        let index = char.charCodeAt() - 'a'.charCodeAt()
        if (memo[index] !== 0) {
          // 说明有公共字母
          isRight = false
          break
        }
      }
      if (isRight) {
        ans = Math.max(words[i].length * words[j].length, ans)
      }
    }
    memo.fill(0)
  }
  return ans
};
