// 435. 无重叠区间
// 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

// 注意:

// 可以认为区间的终点总是大于它的起点。
// 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
// 示例 1:

// 输入: [ [1,2], [2,3], [3,4], [1,3] ]

// 输出: 1

// 解释: 移除 [1,3] 后，剩下的区间没有重叠。
// 示例 2:

// 输入: [ [1,2], [1,2], [1,2] ]

// 输出: 2

// 解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
// 示例 3:

// 输入: [ [1,2], [2,3] ]

// 输出: 0

// 解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

// 贪心思路：按照起点排序 起点相同时保留结尾小的 最后算出保留的个数 差值为移除的最小个数
/**
 * @param {number[][]} intervals
 * @return {number}
 */
// 解法 1 ：贪心算法
var eraseOverlapIntervals = function(intervals) {
  // 贪心：按左边界从小到大排序 依次比较右边界是否和前一个左边界重合 如果重合 说明需要舍弃一个 选择舍弃右边界更小的区间
  const n = intervals.length
  if (!n) {
    return 0
  }
  intervals.sort((a, b) => a[0] - b[0])
  let count = 0, end = intervals[0][1]
  for (let i = 1; i < n; i++) {
    // 比较当前的左边界和前一个的右边界是否重合
    if (intervals[i][0] < end) {
      // 重合了 保留较小的
      end = Math.min(intervals[i][1], end)
      count++
    } else {
      // 没重合 更新end
      end = intervals[i][1]
    }
  }
  return count
};

/**
 * @param {number[][]} intervals
 * @return {number}
 */
// 解法 2 ：动态规划 O(n2) 复杂度较高
 var eraseOverlapIntervals = function(intervals) {
  // 定义 dp[i] 为以区间i为结束的不重叠区间数量
  const n = intervals.length
  const dp = new Array(n).fill(1)
  // 对集合排序 左边界从小到大
  intervals.sort((a, b) => a[0] - b[0])
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // 因为已知终点大于起点 所以当区间 j 的右边小于区间 i 的左边 说明不重叠
      if (intervals[j][1] <= intervals[i][0]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return n - Math.max(...dp)
};