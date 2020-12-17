// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

// 示例 1:

// 输入: s = "anagram", t = "nagaram"
// 输出: true
// 示例 2:

// 输入: s = "rat", t = "car"
// 输出: false
// 说明:
// 你可以假设字符串只包含小写字母。

// 进阶:
// 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-anagram
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  var sMap = new Map()
  // 1.smap 存储 s 中每个字符出现的次数
  for (let char of s) {
    sMap.set(char, sMap.has(char) ? sMap.get(char) + 1 : 1)
  }
  // 2.遍历 t ，对于 smap 中包含的字符 则将其 -1 如果有 smap 中不存在的字符 将其设置为 1
  for (let char of t) {
    sMap.set(char, sMap.has(char) ? sMap.get(char) - 1 : 1)
  }
  // 3.当 smap 中的 values 值都是 0 时 代表是异位词
  return [...sMap.values()].every(item => item === 0)
};