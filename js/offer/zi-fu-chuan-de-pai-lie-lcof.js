// 剑指 Offer 38. 字符串的排列
// 输入一个字符串，打印出该字符串中字符的所有排列。

 

// 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

 

// 示例:

// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]
 

// 限制：

// 1 <= s 的长度 <= 8


/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
  const n = s.length, arr = s.split(''), ans = [], visited = new Array(n).fill(0)
  arr.sort()
  const dfs = (index, path) => {
    if (index === n) {
      ans.push(path.join(''))
      return
    }
    for (let i = 0; i < n; i++) {
      if (visited[i] || i > 0 && !visited[i - 1] && arr[i] === arr[i - 1]) {
        continue
      }
      visited[i] = 1
      path.push(arr[i])
      dfs(index + 1, path)
      path.pop()
      visited[i] = 0
    }
  }
  dfs(0, [])
  return ans
};
