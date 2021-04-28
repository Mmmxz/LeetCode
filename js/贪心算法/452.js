// 452. 用最少数量的箭引爆气球
// 在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以纵坐标并不重要，因此只要知道开始和结束的横坐标就足够了。开始坐标总是小于结束坐标。

// 一支弓箭可以沿着 x 轴从不同点完全垂直地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

// 给你一个数组 points ，其中 points [i] = [xstart,xend] ，返回引爆所有气球所必须射出的最小弓箭数。

 
// 示例 1：

// 输入：points = [[10,16],[2,8],[1,6],[7,12]]
// 输出：2
// 解释：对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球
// 示例 2：

// 输入：points = [[1,2],[3,4],[5,6],[7,8]]
// 输出：4
// 示例 3：

// 输入：points = [[1,2],[2,3],[3,4],[4,5]]
// 输出：2
// 示例 4：

// 输入：points = [[1,2]]
// 输出：1
// 示例 5：

// 输入：points = [[2,3],[2,3]]
// 输出：1
 

// 提示：

// 0 <= points.length <= 104
// points[i].length == 2
// -231 <= xstart < xend <= 231 - 1

/**
 * @param {number[][]} points
 * @return {number}
 */
// 解法 1 ：贪心 右边界排序
 var findMinArrowShots = function(points) {
  // 找重叠的区间有多少个
  const n = points.length
  if (!n) {
    return 0
  }
  // 右端点从小到大排序
  points.sort((a, b) => a[1] - b[1])
  // 依次对右端点射箭 去掉重合的区间
  let end = points[0][1], count = 1
  for (let i = 1; i < n; i++) {
    if (points[i][0] > end) {
      // 没重合 需要增加数量
      end = points[i][1]
      count++
    }
  }
  return count
};

// 贪心法 每个气球只少需要一支箭 先按照右端点排序 然后每次从最小的右端点射出一支箭 去掉被射爆的气球 重复该过程

/**
 * @param {number[][]} points
 * @return {number}
 */
// 解法 2 ：贪心 左边界排序
 var findMinArrowShots = function(points) {
  // 按左边从小到大排序 然后在右边界射箭
  // 如果下一个和当前这个有交集 则不用继续射箭 但要更新这一箭为两者右边界的较小值 防止前一个范围包裹着当前范围的情况
  // 如果没有交集 则继续射箭
  const n = points.length
  if (!n) {
    return 0
  }
  points.sort((a, b) => a[0] - b[0])
  // 初始化时 在右边界射一箭
  let end = points[0][1], count = 1
  for (let i = 1; i < n; i++) {
    // 如果没重合 射一箭
    if (points[i][0] > end) {
      count++
      end = points[i][1]
    } else {
      // 有交集 如果新的右边界小于旧的又边界 则射箭位置要选较小的右边界 否则新的无法被射中
      // 如[1,4] [2,3] 第一箭在4处 则[2,3]有交集 但无法射中 要更新到3处
      end = Math.min(end, points[i][1])
    }
  }
  return count
};