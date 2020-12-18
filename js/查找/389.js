// 给定两个字符串 s 和 t，它们只包含小写字母。

// 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。

// 请找出在 t 中被添加的字母。

//  

// 示例 1：

// 输入：s = "abcd", t = "abcde"
// 输出："e"
// 解释：'e' 是那个被添加的字母。
// 示例 2：

// 输入：s = "", t = "y"
// 输出："y"
// 示例 3：

// 输入：s = "a", t = "aa"
// 输出："a"
// 示例 4：

// 输入：s = "ae", t = "aea"
// 输出："a"
//  

// 提示：

// 0 <= s.length <= 1000
// t.length == s.length + 1
// s 和 t 只包含小写字母

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-the-difference
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
  let res = ''
  let sMap = new Map()
  for (let char of s) {
    sMap.set(char, sMap.has(char) ? sMap.get(char) + 1 : 1)
  }
  for (let char of t) {
    sMap.set(char, sMap.has(char) ? sMap.get(char) - 1 : 1)
  }
  // 对比之后 统计次数不为 0 的字符就是要找的字符
  res = [...sMap.entries()].filter(item => item[1])[0][0]
  return res
};