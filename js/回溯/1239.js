// 1239. 串联字符串的最大长度
// 给定一个字符串数组 arr，字符串 s 是将 arr 某一子序列字符串连接所得的字符串，如果 s 中的每一个字符都只出现过一次，那么它就是一个可行解。

// 请返回所有可行解 s 中最长长度。

 

// 示例 1：

// 输入：arr = ["un","iq","ue"]
// 输出：4
// 解释：所有可能的串联组合是 "","un","iq","ue","uniq" 和 "ique"，最大长度为 4。
// 示例 2：

// 输入：arr = ["cha","r","act","ers"]
// 输出：6
// 解释：可能的解答有 "chaers" 和 "acters"。
// 示例 3：

// 输入：arr = ["abcdefghijklmnopqrstuvwxyz"]
// 输出：26
 

// 提示：

// 1 <= arr.length <= 16
// 1 <= arr[i].length <= 26
// arr[i] 中只含有小写英文字母

/**
 * @description 回溯-用位运算优化重复字符判断
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function(arr) {
  const masks = []
  // 筛选arr的每个字符 可行解一定是不重复的字符串
  for (const str of arr) {
    let mask = 0
    for (let i = 0; i < str.length; i++) {
      const ch = str[i].charCodeAt() - 'a'.charCodeAt()
      // 判断mask有没有ch
      if ((mask >> ch) & 1 !== 0) {
        // 已经有ch 说明重复 不能作为可行解
        mask = 0
        break
      }
      // 将ch加入mask
      mask |= 1 << ch
    }
    if (mask > 0) {
      masks.push(mask)
    }
  }
  const n = masks.length
  let ans = 0
  const dfs = (start, path) => {
    if (start === n) {
      ans = Math.max(ans, path.toString(2).split('0').join('').length)
      return
    }
    // 没有公共元素
    if ((path & masks[start]) === 0) {
      dfs(start + 1, path | masks[start])
    }
    dfs(start + 1, path)
  }
  dfs(0, 0)
  return ans
};

/**
 * @description 暴力回溯
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function(arr) {
  const n = arr.length
  let res = []
  // 回溯
  const dfs = (start, path) => {
    res.push(path.join(''))
    if (start === n) {
      return
    }
    for (let i = start; i < n; i++) {
      path.push(arr[i])
      dfs(i + 1, path)
      path.pop()
    }
  }
  dfs(0, [])
  let ans = 0
  // 找出res中最长的不重复字符串
  for (const str of res) {
    const memo = new Array(26).fill(0)
    for (const char of str) {
      const key = char.charCodeAt() - 'a'.charCodeAt()
      memo[key]++
    }
    if (memo.some(item => item > 1)) {
      // 说明有字符出现超过1次
      continue
    } else {
      ans = Math.max(str.length, ans)
    }
  }
  return ans
};
