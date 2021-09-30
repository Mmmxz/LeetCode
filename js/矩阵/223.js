// 223. 矩形面积
// 给你 二维 平面上两个 由直线构成的 矩形，请你计算并返回两个矩形覆盖的总面积。

// 每个矩形由其 左下 顶点和 右上 顶点坐标表示：

// 第一个矩形由其左下顶点 (ax1, ay1) 和右上顶点 (ax2, ay2) 定义。
// 第二个矩形由其左下顶点 (bx1, by1) 和右上顶点 (bx2, by2) 定义。
 

// 示例 1：

// Rectangle Area
// 输入：ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
// 输出：45
// 示例 2：

// 输入：ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
// 输出：16
 

// 提示：

// -104 <= ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 <= 104

/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  // 两个矩形面积和 - 相交部分的面积 S=width*height
  // 如何判断形成矩形：ay2>ay1 && ax2>ax1
  // 如何找相交部分：左下-max(ax1,bx1) max(ay1,by1) 右上-min(ax2,bx2) min(ay2,by2)
  let w1 = ax2 - ax1, w2 = bx2 - bx1, h1 = ay2 - ay1, h2 = by2 - by1
  let s1 = w1 * h1, s2 = w2 * h2
  // 求相交部分的左下和右上坐标，并判断是否形成矩形 lb-left_bottom rt-right_top
  let lb_x = Math.max(ax1, bx1), lb_y = Math.max(ay1, by1)
  let rt_x = Math.min(ax2, bx2), rt_y = Math.min(ay2, by2)
  // 判断是否形成矩形
  let s = 0
  if (rt_x > lb_x && rt_y > lb_y) {
    s = (rt_x - lb_x) * (rt_y - lb_y)
  }
  return s1 + s2 - s
};
