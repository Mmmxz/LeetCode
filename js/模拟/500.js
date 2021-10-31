// 500. 键盘行
// 给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。键盘如下图所示。

// 美式键盘 中：

// 第一行由字符 "qwertyuiop" 组成。
// 第二行由字符 "asdfghjkl" 组成。
// 第三行由字符 "zxcvbnm" 组成。
// American keyboard

 

// 示例 1：

// 输入：words = ["Hello","Alaska","Dad","Peace"]
// 输出：["Alaska","Dad"]
// 示例 2：

// 输入：words = ["omk"]
// 输出：[]
// 示例 3：

// 输入：words = ["adsdf","sfd"]
// 输出：["adsdf","sfd"]
 

// 提示：

// 1 <= words.length <= 20
// 1 <= words[i].length <= 100
// words[i] 由英文字母（小写和大写字母）组成

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
  const line1 = 'qwertyuiop'
  const line2 = 'asdfghjkl'
  const line3 = 'zxcvbnm'
  let ans = []
  for (const str of words) {
    let str1 = str.toLowerCase()
    let flag1 = true, flag2 = true, flag3 = true
    for (const char of str1) {
      if (!line1.includes(char)) {
        flag1 = false
      }
      if (!line2.includes(char)) {
        flag2 = false
      }
      if (!line3.includes(char)) {
        flag3 = false
      }
    }
    if (flag1 || flag2 || flag3) {
      ans.push(str)
    }
  }
  return ans
};
