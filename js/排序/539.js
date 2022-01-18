// 539. 最小时间差
// 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。

 

// 示例 1：

// 输入：timePoints = ["23:59","00:00"]
// 输出：1
// 示例 2：

// 输入：timePoints = ["00:00","23:59","00:00"]
// 输出：0
 

// 提示：

// 2 <= timePoints.length <= 2 * 104
// timePoints[i] 格式为 "HH:MM"

/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
  const max = 24 * 60, len = timePoints.length
  if (len > max) return 0 // 最多只有1440种不重复的分钟数
  const nums = new Array(len)
  for (let i = 0; i < len; i++) {
    const h = parseInt(timePoints[i].substring(0, 3)),
          m = parseInt(timePoints[i].substring(3, 5))
    nums[i] = h * 60 + m
  }
  nums.sort((a, b) => a - b)
  let ans = nums[0] + max - nums[len - 1]
  for (let i = 0; i < len - 1; i++) {
    ans = Math.min(ans, nums[i + 1] - nums[i])
  }
  return ans
};
