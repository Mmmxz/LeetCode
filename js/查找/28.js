// 28. 实现 strStr()
// 实现 strStr() 函数。

// 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  -1 。

 

// 说明：

// 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

// 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。

 

// 示例 1：

// 输入：haystack = "hello", needle = "ll"
// 输出：2
// 示例 2：

// 输入：haystack = "aaaaa", needle = "bba"
// 输出：-1
// 示例 3：

// 输入：haystack = "", needle = ""
// 输出：0
 

// 提示：

// 0 <= haystack.length, needle.length <= 5 * 104
// haystack 和 needle 仅由小写英文字符组成

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// 解法 1 ：截取字符串 借助 slice API
 var strStr = function(haystack, needle) {
  const n = needle.length, len = haystack.length
  if (!n) {
    return 0
  }
  let index = -1
  for (let i = 0; i < len; i++) {
    if (haystack[i] === needle[0]) {
      // 从 i 开始截取长度 n 的字符串来比较
      let str = haystack.slice(i, n + i)
      if (str === needle) {
        return i
      }
    }
  }
  return index
};

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// 解法 2 ：从开头匹配
 var strStr = function(haystack, needle) {
  // 分别比较每个字符 都相等则返回开始下标
  const len = haystack.length, n = needle.length
  for (let i = 0; i <= len - n; i++) {
    let curH = i, curN = 0
    while (curN < n && haystack[curH] === needle[curN]) {
      curH++
      curN++
    }
    if (curN === n) {
      return i
    }
  }
  return -1
};