// 763. 划分字母区间
// 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。

 

// 示例：

// 输入：S = "ababcbacadefegdehijhklij"
// 输出：[9,7,8]
// 解释：
// 划分结果为 "ababcbaca", "defegde", "hijhklij"。
// 每个字母最多出现在一个片段中。
// 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
 

// 提示：

// S的长度在[1, 500]之间。
// S只包含小写字母 'a' 到 'z' 。

/**
 * @param {string} S
 * @return {number[]}
 */
 var partitionLabels = function(S) {
  const n = S.length
  // memo 存每个字符开始和结束的位置
  const memo = new Map()
  for (let i = 0; i < n; i++) {
    if (memo.has(S[i])) {
      memo.set(S[i], [memo.get(S[i])[0], i])
    } else {
      memo.set(S[i], [i, i])
    }
  }
  const list = Array.from(memo.values()), len = list.length
  // 区间合并
  let arr = [list[0]]
  for (let i = 1; i < len; i++) {
    // 合并重合的
    if (arr[arr.length - 1][1] > list[i][0]) {
      arr[arr.length - 1][1] = Math.max(arr[arr.length - 1][1], list[i][1])
    } else {
      arr.push(list[i])
    }
  }
  // 算出每个区间的长度
  let ans = []
  for (const item of arr) {
    ans.push(item[1] - item[0] + 1)
  }
  return ans
};

/**
 * @param {string} s
 * @return {number[]}
 */
 var partitionLabels = function(s) {
  // 记录每个字符的结束位置 然后合并即可
  const memo = new Array(26).fill(0)
  const len = s.length
  for (let i = 0; i < len; i++) {
    memo[s[i].charCodeAt() - 'a'.charCodeAt()] = i
  }
  const ans = []
  let start = end = 0
  for (let i = 0; i < len; i++) {
    end = Math.max(end, memo[s[i].charCodeAt() - 'a'.charCodeAt()])
    if (i === end) {
      ans.push(end - start + 1)
      start = end = i + 1
    }
  }
  return ans
};
