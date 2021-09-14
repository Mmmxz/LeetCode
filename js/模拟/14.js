// 14. 最长公共前缀
// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

 

// 示例 1：

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
// 示例 2：

// 输入：strs = ["dog","racecar","car"]
// 输出：""
// 解释：输入不存在公共前缀。
 

// 提示：

// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] 仅由小写英文字母组成

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  // 依次比较所有字符串的相同位置是否一样
  // 思路：取第一个作为模板 将每一位与后面的字符串比较
  let ans = '', template = strs[0]
  for (let i = 0; i < template.length; i++) {
    // 每个字符 与后面的字符串比较
    for (let j = 1; j < strs.length; j++) {
      const str = strs[j]
      if (template[i] !== str[i]) {
        // 不相同的前缀 直接返回
        return ans
      }
    }
    // 该字符是公共前缀
    ans += template[i]
  }
  return ans
};
