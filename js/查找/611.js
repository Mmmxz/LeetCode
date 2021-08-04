// 611. 有效三角形的个数
// 给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。

// 示例 1:

// 输入: [2,2,3,4]
// 输出: 3
// 解释:
// 有效的组合是: 
// 2,3,4 (使用第一个 2)
// 2,3,4 (使用第二个 2)
// 2,2,3
// 注意:

// 数组长度不超过1000。
// 数组里整数的范围为 [0, 1000]。

/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
  // 任意两边之和大于第三边 任意两边之差小于第三边
  // 从小到大排序时 a<=b<=c 可知 a+c>b b+c>a 只要再让 a+b>c 就可以成为三角形
  const n = nums.length
  nums.sort((a, b) => a - b)
  let ans = 0
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // i j 已确定 再找一个 k 满足 i+j>k
      let left = j + 1, right = n - 1
      // 二分法找 i+j>k的最大k 即 i+j<=k+1 [j,k]之间的数符合题意
      while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left
        if (nums[i] + nums[j] > nums[mid]) {
          // 符合题意 继续找一个符合题意的最大的 此时left有可能不是符合的索引
          left++
        } else {
          // mid太大了 要找个小的
          right--
        }
      }
      // 此时[j+1, right]符合题意
      ans += right - j
    }
  }
  return ans
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let ans = 0
  for (let i = n - 1; i >= 2; i--) {
    let left = 0, right = i - 1
    while (left < right) {
      if (nums[left] + nums[right] > nums[i]) {
        // 此时符合题意 且nums[left+1]+nums[right]...nums[right-1]+nums[right]均符合题意
        // 即固定right 共有[left, right-1]个左侧数 right-1-left+1 => right-left种答案
        ans += right - left
        right-- // 移动right
      } else {
        left++ // 不符合题意 增大left
      }
    }
  }
  return ans
};
