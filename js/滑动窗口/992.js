// 992. K 个不同整数的子数组
// 给定一个正整数数组 A，如果 A 的某个子数组中不同整数的个数恰好为 K，则称 A 的这个连续、不一定独立的子数组为好子数组。

// （例如，[1,2,3,1,2] 中有 3 个不同的整数：1，2，以及 3。）

// 返回 A 中好子数组的数目。

 

// 示例 1：

// 输入：A = [1,2,1,2,3], K = 2
// 输出：7
// 解释：恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
// 示例 2：

// 输入：A = [1,2,1,3,4], K = 3
// 输出：3
// 解释：恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].
 

// 提示：

// 1 <= A.length <= 20000
// 1 <= A[i] <= A.length
// 1 <= K <= A.length

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
// 求 最多 k 个不同整数的子数组数组
// 求 最多 k-1 个不同整数的子数组数组
// 相减即可得出 k 个不同整数的子数组数目
var subarraysWithKDistinct = function(A, K) {
  return countAtMost(A, K) - countAtMost(A, K - 1)
};

// 求 最多k个不同整数的子数组数目
var countAtMost = (arr, k) => {
  const m1 = new Map()
  const len = arr.length
  // valid 存储窗口中有效值的个数
  let left = 0, right = 0, valid = 0, res = 0
  while (right < len) {
    const c = arr[right]
    right++
    if (m1.has(c)) {
      m1.set(c, m1.get(c) + 1)
    } else {
      // m1 中不存在要加入的元素，有效值个数 +1
      valid++
      m1.set(c, 1)
    }
    // 有效值个数大于 k 个，左窗口移动
    while (valid > k) {
      const d = arr[left]
      left++
      m1.set(d, m1.get(d) - 1)
      // 判断移除的数不存在 有效值 -1
      if (!m1.get(d)) {
        m1.delete(d)
        valid--
      }
    }
    // 此时窗口是有效的， [left...right) 中每个子数组都是满足要求的，累加以 right 为右端点的子数组数目即可
    res += right - left
  }
  return res
}