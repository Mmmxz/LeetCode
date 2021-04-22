// 345. 反转字符串中的元音字母
// 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

 

// 示例 1：

// 输入："hello"
// 输出："holle"
// 示例 2：

// 输入："leetcode"
// 输出："leotcede"
 

// 提示：

// 元音字母不包含字母 "y" 。

/**
 * @param {string} s
 * @return {string}
 */
 var reverseVowels = function(s) {
  const arr = ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U']
  s = s.split('')
  let left = 0, right = s.length - 1
  while (left < right) {
    if (arr.includes(s[left]) && arr.includes(s[right])) {
      // 交换
      let temp = s[left]
      s[left] = s[right]
      s[right] = temp
      left++
      right--
    } else if (arr.includes(s[left]) && !arr.includes(s[right])) {
      right--
    } else if (arr.includes(s[right]) && !arr.includes(s[left])) {
      left++
    } else {
      left++
      right--
    }
  }
  return s.join('')
};