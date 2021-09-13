// 447. 回旋镖的数量
// 给定平面上 n 对 互不相同 的点 points ，其中 points[i] = [xi, yi] 。回旋镖 是由点 (i, j, k) 表示的元组 ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。

// 返回平面上所有回旋镖的数量。

 
// 示例 1：

// 输入：points = [[0,0],[1,0],[2,0]]
// 输出：2
// 解释：两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
// 示例 2：

// 输入：points = [[1,1],[2,2],[3,3]]
// 输出：2
// 示例 3：

// 输入：points = [[1,1]]
// 输出：0
 

// 提示：

// n == points.length
// 1 <= n <= 500
// points[i].length == 2
// -104 <= xi, yi <= 104
// 所有点都 互不相同

/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function(points) {
  const n = points.length
  let ans = 0
  for (let i = 0; i < n; i++) {
    const memo = new Map() // {dis: point-count}
    for (let j = 0; j < n; j++) {
      if (i === j) continue
      const dis = computedDistance(points[i], points[j])
      if (memo.has(dis)) {
        memo.set(dis, memo.get(dis) + 1)
      } else {
        memo.set(dis, 1)
      }
    }
    for (const v of memo.values()) {
      ans += (v * (v - 1))
    }
  }
  return ans
};

const computedDistance = (p1, p2) => {
  return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)
}
