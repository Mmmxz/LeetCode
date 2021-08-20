// 541. 反转字符串 II
// 给定一个字符串 s 和一个整数 k，从字符串开头算起，每 2k 个字符反转前 k 个字符。

// 如果剩余字符少于 k 个，则将剩余字符全部反转。
// 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
 

// 示例 1：

// 输入：s = "abcdefg", k = 2
// 输出："bacdfeg"
// 示例 2：

// 输入：s = "abcd", k = 2
// 输出："bacd"
 

// 提示：

// 1 <= s.length <= 104
// s 仅由小写英文组成
// 1 <= k <= 104

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
  const res = s.split('')
  const n = s.length
  // 按2k来循环 反转前k个
  let start = 0, isReverse = true
  while (start < n) {
    // start索引开始 往后找k个字符 将其反转
    if (isReverse) {
      reverse(res, start, k)
    }
    isReverse = !isReverse
    start += k
  }
  return res.join('')
};

const reverse = (arr, start, k) => {
  // 将数组从start位置反转k个字符 有可能超过数组长度 取较小结束坐标
  let left = start, right = Math.min(start + k - 1, arr.length - 1)
  while (left < right) {
    let temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
    left++
    right--
  }
}
