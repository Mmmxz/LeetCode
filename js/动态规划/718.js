// 718. 最长重复子数组
// 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。

 

// 示例：

// 输入：
// A: [1,2,3,2,1]
// B: [3,2,1,4,7]
// 输出：3
// 解释：
// 长度最长的公共子数组是 [3, 2, 1] 。
 

// 提示：

// 1 <= len(A), len(B) <= 1000
// 0 <= A[i], B[i] < 100

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function(nums1, nums2) {
  // 定义dp[i][j] nums1以i结尾[0,i) nums2以j结尾[0,j)的最长公共子数组长度
  // base case dp[0][0] = 0
  // 转移方程 if (nums1[i] === nums2[j]) dp[i+1][j+1] = dp[i][j] + 1
  const len1 = nums1.length, len2 = nums2.length
  const dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0))
  let ans = 0
  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      if (nums1[i] === nums2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1
        ans = Math.max(dp[i + 1][j + 1], ans)
      }
    }
  }
  return ans
};
