// 567. 字符串的排列
// 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

// 换句话说，第一个字符串的排列之一是第二个字符串的子串。

// 示例1:

// 输入: s1 = "ab" s2 = "eidbaooo"
// 输出: True
// 解释: s2 包含 s1 的排列之一 ("ba").
 

// 示例2:

// 输入: s1= "ab" s2 = "eidboaoo"
// 输出: False
 

// 注意：

// 输入的字符串只包含小写字母
// 两个字符串的长度都在 [1, 10,000] 之间

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 思路：用长度为 26 的数组存储每个字母出现的次数，比较是否相等将其转换为字符串即可。
var checkInclusion = function(s1, s2) {
  const len1 =  s1.length
  const len2 = s2.length
  const arr1 = new Array(26).fill(0), arr2 = new Array(26).fill(0)
  // 1.初始化 s1 对应的字母统计数组
  for (let i = 0; i < len1; i++) {
    arr1[s1[i].charCodeAt() - 'a'.charCodeAt()]++
  }
  let left = 0, right = 0
  while (right < len2) {
    // 2.进入窗口， s2 的统计数组增加
    const c = s2[right]
    right++
    arr2[c.charCodeAt() - 'a'.charCodeAt()]++
    // 3.什么时候出数据，当窗口长度大于 s1 长度时，代表窗口数据多了，移动左指针，因为每次窗口长度 +1 ，所以 if 与 while 均可
    if (right - left > len1) {
      const d = s2[left]
      left++
      arr2[d.charCodeAt() - 'a'.charCodeAt()]--
    }
    // 4.当窗口长度符合 s1 长度，判断是否相等即可
    if (right - left === len1 && arr1.toString() === arr2.toString()) {
      return true
    }
  }
  return false
};