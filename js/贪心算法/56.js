// 56. 合并区间
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

 

// 示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2：

// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 

// 提示：

// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function(intervals) {
  const n = intervals.length
  // 按左区间从小到大排序 左区间相同时 右区间从小到大排序
  intervals.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
  let ans = [intervals[0]]
  for (let i = 1; i < n; i++) {
    // 判断当前区间是否和ans的区间重叠 重叠则更新 不重叠则加入
    if (ans[ans.length - 1][1] >= intervals[i][0]) {
      // 重叠了 更新时要注意存在区间包裹的情况 右边界需要更新为较大值
      ans[ans.length - 1][1] = Math.max(intervals[i][1], ans[ans.length - 1][1])
    } else {
      ans.push(intervals[i])
    }
  }
  return ans
};