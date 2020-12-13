// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 说明：你不能倾斜容器。

//  

// 示例 1：

// https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg

// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
// 示例 2：

// 输入：height = [1,1]
// 输出：1
// 示例 3：

// 输入：height = [4,3,2,1,4]
// 输出：16
// 示例 4：

// 输入：height = [1,2,1]
// 输出：2

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/container-with-most-water
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} height
 * @return {number}
 */
// 指针对撞解决此问题
var maxArea = function(height) {
  // 1.初始化左右指针和乘积
  let l = 0, r = height.length - 1, mut = 0
  while (l < r) {
    // 2.计算出当前双指针区域的面积 将其与最大值对比 存储下来
    let minH = Math.min(height[l], height[r])
    mut = Math.max(minH * Math.abs(r - l), mut)
    // 3.移动高度较小的那个指针 因为面积 = 距离 * 高度 缩短距离 如果移动的也是较大的指针 则面积必定变小 所以选择移动高度较小的指针
    if (minH === height[l]) {
      l++
    } else {
      r--
    }
  }
  return mut
};