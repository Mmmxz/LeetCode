// 131. 分割回文串
// 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

// 返回 s 所有可能的分割方案。

// 示例:

// 输入: "aab"
// 输出:
// [
//   ["aa","b"],
//   ["a","a","b"]
// ]

/**
 * @param {string} s
 * @return {string[][]}
 */
// 解法 1 ：回溯
 var partition = function(s) {
  const res = []
  // 截取s 判断截取部分是否回文 然后再回溯继续遍历
  const dfs = (s, path) => {
    if (!s) {
      res.push(path.slice())
      return
    }
    for (let i = 1; i <= s.length; i++) {
      const pre = s.slice(0, i)
      if (isPalindrome(pre)) {
        path.push(pre)
        dfs(s.substr(i), path)
        path.pop()
      }
    }
  }
  dfs(s, [])
  return res
};

// 判断是否回文
const isPalindrome = (str) => {
  if (!str) {
    return true
  }
  let start = 0, end = str.length - 1
  while (start < end) {
    if (str[start] !== str[end]) {
      return false
    }
    start++
    end--
  }
  return true
}

/**
 * @param {string} s
 * @return {string[][]}
 */
// 解法 2 ：回溯 + 记忆化存储
 var partition = function(s) {
  // s从1开始分割到末尾 a-> ab  a -> a-> b aa -> b aab
  // memo 存放字符串是否回文
  const res = [], memo = {}
  const dfs = (s, path) => {
    if (!s) {
      res.push(path.slice())
      return
    }
    for (let i = 1; i <= s.length; i++) {
      const pre = s.substr(0, i)
      if (isPalindrome(pre)) {
        // 拆分子串
        path.push(pre)
        dfs(s.substr(i), path)
        path.pop()
      }
    }
  }
  const isPalindrome = (str) => {
    // 如果判断过str 直接返回结果
    if (memo[str]) {
      return memo[str]
    }
    // 判断是否回文并存储在备忘录中
    if (!str) {
      memo[str] = true
    }
    let start = 0, end = str.length - 1
    while (start < end) {
      if (str[start] !== str[end]) {
        memo[str] = false
        return memo[str]
      }
      start++
      end--
    }
    memo[str] = true
    return memo[str]
  }
  dfs(s, [])
  return res
};