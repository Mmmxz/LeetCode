// 1818. 绝对差值和
// 给你两个正整数数组 nums1 和 nums2 ，数组的长度都是 n 。

// 数组 nums1 和 nums2 的 绝对差值和 定义为所有 |nums1[i] - nums2[i]|（0 <= i < n）的 总和（下标从 0 开始）。

// 你可以选用 nums1 中的 任意一个 元素来替换 nums1 中的 至多 一个元素，以 最小化 绝对差值和。

// 在替换数组 nums1 中最多一个元素 之后 ，返回最小绝对差值和。因为答案可能很大，所以需要对 109 + 7 取余 后返回。

// |x| 定义为：

// 如果 x >= 0 ，值为 x ，或者
// 如果 x <= 0 ，值为 -x
 

// 示例 1：

// 输入：nums1 = [1,7,5], nums2 = [2,3,5]
// 输出：3
// 解释：有两种可能的最优方案：
// - 将第二个元素替换为第一个元素：[1,7,5] => [1,1,5] ，或者
// - 将第二个元素替换为第三个元素：[1,7,5] => [1,5,5]
// 两种方案的绝对差值和都是 |1-2| + (|1-3| 或者 |5-3|) + |5-5| = 3
// 示例 2：

// 输入：nums1 = [2,4,6,8,10], nums2 = [2,4,6,8,10]
// 输出：0
// 解释：nums1 和 nums2 相等，所以不用替换元素。绝对差值和为 0
// 示例 3：

// 输入：nums1 = [1,10,4,4,2,7], nums2 = [9,3,5,1,7,4]
// 输出：20
// 解释：将第一个元素替换为第二个元素：[1,10,4,4,2,7] => [10,10,4,4,2,7]
// 绝对差值和为 |10-9| + |10-3| + |4-5| + |4-1| + |2-7| + |7-4| = 20
 

// 提示：

// n == nums1.length
// n == nums2.length
// 1 <= n <= 105
// 1 <= nums1[i], nums2[i] <= 105

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minAbsoluteSumDiff = function(nums1, nums2) {
  // 借助二分法 每次在sorted中找和nums2[i]最接近的元素 记录新的变化
  const sorted = nums1.slice().sort((a, b) => a - b)
  let sum = 0, max = 0
  const len = nums1.length
  for (let i = 0; i < len; i++) {
    const diff = Math.abs(nums1[i] - nums2[i])
    sum += diff
    const newDiff = findNum(sorted, nums2[i])
    // 更新最大的变化
    max = Math.max(max, diff - newDiff)
  }
  // 原本的差值和 减去最大的变化值 即为结果
  return (sum - max) % (Math.pow(10, 9) + 7)
};

// 在有序的arr中找一个和nums2[i]最接近的数 返回两数的最小差值
const findNum = (arr, target) => {
  let left = 0, right = arr.length - 1
  // 小指针指向的值, 大指针指向的值
  let lowval = arr[left], highval = arr[right]
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left
    if (arr[mid] === target) {
      // 相等 差值为0
      return 0
    } else if (arr[mid] > target) {
      right = mid - 1
      highval = arr[mid]
    } else {
      left = mid + 1
      lowval = arr[mid]
    }
  }
  // 因为最接近target的数，可能大于target，也可能小于target
  // 所以求绝对值，并取最小
  const absa = Math.abs(target - lowval), absb = Math.abs(target - highval)
  return Math.min(absa, absb)
}

// 参考题解：https://leetcode-cn.com/problems/minimum-absolute-sum-difference/solution/pai-xu-er-fen-fa-javascriptshi-xian-by-j-v1gw/
