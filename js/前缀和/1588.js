// 1588. 所有奇数长度子数组的和
// 给你一个正整数数组 arr ，请你计算所有可能的奇数长度子数组的和。

// 子数组 定义为原数组中的一个连续子序列。

// 请你返回 arr 中 所有奇数长度子数组的和 。

 

// 示例 1：

// 输入：arr = [1,4,2,5,3]
// 输出：58
// 解释：所有奇数长度子数组和它们的和为：
// [1] = 1
// [4] = 4
// [2] = 2
// [5] = 5
// [3] = 3
// [1,4,2] = 7
// [4,2,5] = 11
// [2,5,3] = 10
// [1,4,2,5,3] = 15
// 我们将所有值求和得到 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58
// 示例 2：

// 输入：arr = [1,2]
// 输出：3
// 解释：总共只有 2 个长度为奇数的子数组，[1] 和 [2]。它们的和为 3 。
// 示例 3：

// 输入：arr = [10,11,12]
// 输出：66
 

// 提示：

// 1 <= arr.length <= 100
// 1 <= arr[i] <= 1000

/**
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function(arr) {
  const n = arr.length
  // prefix[i]代表0,i-1的和 arr总和为prefix[n] [0,n-1]
  // prefix[i + 1]-prefix[j]代表[j,i]的和 即范围[0,i]减去[0,j-1]为sum[j,i]
  const prefix = new Array(n + 1).fill(0)
  prefix[0] = 0
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + arr[i - 1]
  }
  // 思路：找出所有奇数长度子数组，求和
  let sum = 0
  // 以i为起点找连续子数组
  for (let i = 0; i < n; i++) {
    for (let len = 1; len + i - 1 < n; len += 2) {
      // len 代表[i,j]的长度为奇数的情况 -> j-i+1=len j∈[i,n-1] j=len+i-1 < n
      const j = len + i - 1
      // 求[i,j]的和
      sum += prefix[j + 1] - prefix[i]
    }
  }  
  return sum
};

/**
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function(arr) {
  const n = arr.length, prefix = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + arr[i]
  }
  let sum = 0
  // 奇数长度子数组 [left, right] right-left+1=len
  for (let len = 1; len <= n; len += 2) {
    for (let left = 0; len + left - 1 < n; left++) {
      const right = len + left - 1
      sum += prefix[right + 1] - prefix[left]
    }
  }
  return sum
};
