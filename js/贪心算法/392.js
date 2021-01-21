// 392. 判断子序列
// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

// 进阶：

// 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

// 致谢：

// 特别感谢 @pbrother 添加此问题并且创建所有测试用例。

 

// 示例 1：

// 输入：s = "abc", t = "ahbgdc"
// 输出：true
// 示例 2：

// 输入：s = "axc", t = "ahbgdc"
// 输出：false
 

// 提示：

// 0 <= s.length <= 100
// 0 <= t.length <= 10^4
// 两个字符串都只由小写字符组成。

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 解法 1 ：贪心算法 双指针
var isSubsequence = function(s, t) {
  const n = s.length, m = t.length
  let i = 0, j = 0
  while(i < n && j < m) {
    if (s[i] === t[j]) {
      i++
    }
    j++
  }
  return i === n
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 解法 2 ： 暴力
var isSubsequence = function(s, t) {
  // 1.res 存储 s 的每个字符在 t 中的索引，子序列要求索引从小到大依次排列； index 是每个字符的索引。
  let res = []
  let index = 0
  // 2.循环 s
  for (let i = 0; i < s.length; i++) {
    // 3.第二个参数是从哪里开始查找，第一次从 0 开始，后面从索引的后一位开始，当 index + 1 超过 t 的长度或没找到 s[i] 时均会返回 -1
    index = t.indexOf(s[i], index ? index + 1 : 0)
    if (index === -1) {
      return false
    } else {
      // 4.index 需要大于当前索引结果中的最大值 才能保证是一个子序列
      if (index > Math.max(...res)) {
        res.push(index)
      } else {
        return false
      }
    }
  }
  return true
};