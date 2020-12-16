// 给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

// 示例 1:

// 输入:
// "tree"

// 输出:
// "eert"

// 解释:
// 'e'出现两次，'r'和't'都只出现一次。
// 因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
// 示例 2:

// 输入:
// "cccaaa"

// 输出:
// "cccaaa"

// 解释:
// 'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
// 注意"cacaca"是不正确的，因为相同的字母必须放在一起。
// 示例 3:

// 输入:
// "Aabb"

// 输出:
// "bbAa"

// 解释:
// 此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
// 注意'A'和'a'被认为是两种不同的字符。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/sort-characters-by-frequency
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  // 1.map 结构存储每个字符出现的次数 res 存储结果
  let record = new Map(), res = ''
  // 2.遍历 s 存储统计数字到 record 中
  for (let c of s) {
    record.set(c, record.has(c) ? record.get(c) + 1 : 1)
  }
  // 3.使用 Array 内置的 sort 方法 将 record 中的 entries 按 value 从大到小排序
  record = new Map([...record].sort((v1, v2) => v2[1] - v1[1]))
  // 4.遍历 map 结构 使用 String 内置的 repeat 方法拼接出 res
  for (let c of record) {
    let char = c[0]
    res += char.repeat(c[1])
  }
  return res
};