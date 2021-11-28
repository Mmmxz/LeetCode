// 给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

// 字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

// 说明：

// 字母异位词指字母相同，但排列不同的字符串。
// 不考虑答案输出的顺序。
// 示例 1:

// 输入:
// s: "cbaebabacd" p: "abc"

// 输出:
// [0, 6]

// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
//  示例 2:

// 输入:
// s: "abab" p: "ab"

// 输出:
// [0, 1, 2]

// 解释:
// 起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
// 起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
// 起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-all-anagrams-in-a-string
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// 思路：滑动窗口
var findAnagrams = function(s, p) {
  // 1.定义闭口区间 [left...right] 有效值 valid 统计 p 所需字符 needs 窗口包含字符 windows 存储结果 res
  let left = 0, right = -1, valid = 0
  let needs = new Map()
  // 2.将 p 中包含的字符串及次数存入 map 结构
  for (let char of p) {
    needs.set(char, needs.has(char) ? needs.get(char) + 1 : 1)
  }
  let windows = new Map()
  let res = []
  // 3. 遍历 s 当窗口右侧到达 s 末尾时 即处理完毕子串 循环结束
  while (right < s.length) {
    // 4.要进入窗口的字符 i
    const i = s[++right]
    // 5.如果 i 是所需字符 就将其加入窗口 map 
    if (needs.has(i)) {
      windows.set(i, windows.has(i) ? windows.get(i) + 1 : 1)
      // 6.当窗口中字符数和所需字符数一致时 有效字符数加一
      if (windows.get(i) === needs.get(i)) {
        valid++
      }
    }
    // 7.当滑动窗口大小超过 p 的长度时 缩小窗口
    while (right - left + 1 >= p.length) {
      // 8.有效字符数和所需字符数一致 找到一条合适的子串
      if (valid === needs.size) {
        res.push(left)
      }
      // 9.要离开窗口的字符 o
      const o = s[left++]
      // 10.如果 o 是所需字符 且所需字符数和窗口中的字符数一致 有效字符数减一
      if (needs.has(o)) {
        if (needs.get(o) === windows.get(o)) {
          valid--
        }
        // 11.更新窗口中的字符数
        windows.set(o, windows.get(o) - 1)
      }
    }
  }
  return res
};

// 1、统计p串中所需字符
// 2、开始遍历s串，同时通过right扩大滑动窗口，随着新字符进入窗口，如果新字符是所需字符就更新滑动窗口中的字符记录，当窗口中字符数和所需字符数一致时，得到一个新的有效字符，有效字符数自增。
// 3、当滑动窗口的大小超出p串长度时，先判断所需要的字符是否都在窗口中，如果是则保存当前滑动窗口中子串的起始索引。然后接着通过left收缩窗口，随着字符离开窗口，如果离开的字符是所需字符，且窗口中的字符数和所需字符数一致时，就少了一个有效字符，有效字符数自减。然后更新滑动窗口中的字符记录。


/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 * @description 滑窗模板
 */
var findAnagrams = function(s, p) {
  const needs = new Map(), window = new Map()
  for (const char of p) {
    needs.set(char, needs.has(char) ? needs.get(char) + 1 : 1)
  }
  // valid 记录当前有效的字母个数 当有效值和needs.size相等 说明符合条件
  let left = 0, right = 0, valid = 0 // [left,right)
  const len = s.length, ans = []
  while (right < len) {
    const c = s[right++]
    if (needs.has(c)) {
      window.set(c, window.has(c) ? window.get(c) + 1 : 1)
      if (window.get(c) === needs.get(c)) {
        valid++
      }
    }
    // 什么时候缩小窗口
    while (right - left === p.length) {
      // 先判断是否符合条件
      if (valid === needs.size) {
        ans.push(left)
      }
      const d = s[left++]
      // 如果d是有效位 则需要在window里面删除
      if (needs.has(d)) {
        if (needs.get(d) === window.get(d)) {
          valid--
        }
        window.set(d, window.get(d) - 1)
      }
    }
  }
  return ans
};
