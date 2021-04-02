// 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

 

// 示例 1：



// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
// 示例 2：

// 输入：height = [4,2,0,3,2,5]
// 输出：9
 

// 提示：

// n == height.length
// 0 <= n <= 3 * 104
// 0 <= height[i] <= 105

/**
 * @param {number[]} height
 * @return {number}
 */
// 解法 1 ：暴力 循环两次求左右侧的最大值
 var trap = function(height) {
  // 找到每个位置存储的水量 即该位置左右侧的最小值减去该位置 如果小于0则不积水
  const n = height.length
  let ans = 0
  for (let i = 1; i < n - 1; i++) {
    let maxleft = height[i], maxright = height[i]
    // 找左边最大值
    for (let j = 0; j < i; j++) {
      maxleft = Math.max(maxleft, height[j])
    }
    for (let j = i; j < n; j++) {
      maxright = Math.max(maxright, height[j])
    }
    ans += Math.min(maxleft, maxright) - height[i]
  }
  return ans
};

/**
 * @param {number[]} height
 * @return {number}
 */
// 解法 2 ：动态规划 将求左侧最小值和右侧最大值存储下来
 var trap = function(height) {
  const n = height.length
  // 初始化为0 方便依次求最大值
  const maxleft = new Array(n).fill(0)
  const maxright = new Array(n).fill(0)
  for (let i = 1; i < n; i++) {
    // 左侧最大值是在上一个左侧的最大值和上一个左侧值比较
    maxleft[i] = Math.max(maxleft[i - 1], height[i - 1])
  }
  for (let i = n - 2; i >= 0; i--) {
    maxright[i] = Math.max(maxright[i + 1], height[i + 1])
  }
  let ans = 0
  for (let i = 1; i < n - 1; i++) {
    // 取木桶的短板
    const min = Math.min(maxleft[i], maxright[i])
    if (min > height[i]) {
      ans += min - height[i]
    }
  }
  return ans
};