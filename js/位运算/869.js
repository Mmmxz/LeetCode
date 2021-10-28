// 869. 重新排序得到 2 的幂
// 给定正整数 N ，我们按任何顺序（包括原始顺序）将数字重新排序，注意其前导数字不能为零。

// 如果我们可以通过上述方式得到 2 的幂，返回 true；否则，返回 false。

 

// 示例 1：

// 输入：1
// 输出：true
// 示例 2：

// 输入：10
// 输出：false
// 示例 3：

// 输入：16
// 输出：true
// 示例 4：

// 输入：24
// 输出：false
// 示例 5：

// 输入：46
// 输出：true
 

// 提示：

// 1 <= N <= 10^9

/**
 * @param {number} n
 * @return {boolean}
 */

// 把从1到1e9的所有数字 计算0-9出现的次数 存在set中

var reorderedPowerOf2 = function(n) {
  return powerOf2Digits.has(countDigits(n))
};

const countDigits = (n) => {
  // 记录数字n中 0-9出现的次数 然后拼接作为字符串存储
  const cnt = new Array(10).fill(0)
  while (n) {
    cnt[n % 10]++
    n = Math.floor(n / 10)
  }
  return cnt.join('')
}

const powerOf2Digits = new Set()
for (let n = 1; n <= 1e9; n <<= 1) {
  powerOf2Digits.add(countDigits(n))
}

/**
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function(n) {
  const backtrack = (nums, idx, num) => {
    if (idx === nums.length) {
      return isPowerOfTwo(num)
    }
    for (let i = 0; i < nums.length; i++) {
      // 过滤前导0
      if ((num === 0 && nums[i] === '0') || vis[i] || (i > 0 && !vis[i - 1] && nums[i] === nums[i - 1])) {
        continue
      }
      vis[i] = 1
      if (backtrack(nums, idx + 1, num * 10 + nums[i].charCodeAt() - '0'.charCodeAt())) {
        return true
      }
      vis[i] = 0
    }
    return false
  }
  const nums = Array.from('' + n)
  nums.sort()
  const vis = new Array(nums.length).fill(0)
  return backtrack(nums, 0, 0)
};

const isPowerOfTwo = (n) => {
  return (n & (n - 1)) === 0
}
