// 1190. 反转每对括号间的子串
// 给出一个字符串 s（仅含有小写英文字母和括号）。

// 请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。

// 注意，您的结果中 不应 包含任何括号。

 

// 示例 1：

// 输入：s = "(abcd)"
// 输出："dcba"
// 示例 2：

// 输入：s = "(u(love)i)"
// 输出："iloveu"
// 示例 3：

// 输入：s = "(ed(et(oc))el)"
// 输出："leetcode"
// 示例 4：

// 输入：s = "a(bcdefghijkl(mno)p)q"
// 输出："apmnolkjihgfedcbq"
 

// 提示：

// 0 <= s.length <= 2000
// s 中只有小写英文字母和括号
// 我们确保所有括号都是成对出现的

/**
 * @description 参考题解思路
 * @param {string} s
 * @return {string}
 */
 var reverseParentheses = function(s) {
  let stack = [], res = ''
  for (const ch of s) {
    if (ch === '(') {
      // 碰到左括号 将当前的字符入栈保存起来
      stack.push(res)
      res = ''
    } else if (ch === ')') {
      // 碰到右括号 将当前的res翻转 然后拼接在栈顶保存的元素上
      res = res.split('').reverse().join('')
      const str = stack.pop()
      res = str + res
    } else {
      // 字符拼接在res中
      res += ch
    }
  }
  return res
};


/**
 * @param {string} s
 * @return {string}
 */
 var reverseParentheses = function(s) {
  // 1.左括号 入栈  2.连续字符 入栈  3. 右括号 出栈且翻转字符 直到碰到左括号 将结果入栈 4.直到循环完成 栈空
  let stack = []
  const n = s.length
  for (let i = 0; i < n; i++) {
    if (s[i] === '(') {
      stack.push(s[i])
    } else if (s[i] === ')') {
      // wihle 直到匹配到左括号为止
      let top = stack.pop(), str = ''
      while (top !== '(') {
        // 栈顶一定是字符串 将其反转
        str += top.split('').reverse().join('')
        top = stack.pop()
      }
      if (str !== '') {
        stack.push(str)
      }
    } else {
      // 找到连续的字符 加入栈中
      let str = s[i]
      while (i + 1 < n && s[i + 1] !== '(' && s[i + 1] !== ')') {
        str += s[++i]
      }
      stack.push(str)
    }
  }
  return stack.join('')
};