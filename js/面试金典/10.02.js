// 面试题 10.02. 变位词组
// 编写一种方法，对字符串数组进行排序，将所有变位词组合在一起。变位词是指字母相同，但排列不同的字符串。

// 注意：本题相对原题稍作修改

// 示例:

// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
// 输出:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
// 说明：

// 所有输入均为小写字母。
// 不考虑答案输出的顺序。

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  // 排序后相等的词就是变位词
  const memo = new Map() // {key: [str1, str2]} key = str.sort()
  const ans = []
  for (const str of strs) {
    const key = str.split('').sort().join('')
    if (memo.has(key)) {
      memo.set(key, [...memo.get(key), str])
    } else {
      memo.set(key, [str])
    }
  }
  for (const arr of memo.values()) {
    ans.push(arr)
  }
  return ans
};
