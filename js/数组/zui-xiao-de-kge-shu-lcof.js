// 剑指 Offer 40. 最小的k个数
// 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

 

// 示例 1：

// 输入：arr = [3,2,1], k = 2
// 输出：[1,2] 或者 [2,1]
// 示例 2：

// 输入：arr = [0,1,2,1], k = 1
// 输出：[0]
 

// 限制：

// 0 <= k <= arr.length <= 10000
// 0 <= arr[i] <= 10000

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
// 解法 1 ： sort （面试不会给过）
var getLeastNumbers = function(arr, k) {
  // 从小到大排序
  arr.sort((a, b) => a - b)
  let res = []
  // 取出前 k 个数
  res = arr.slice(0, k)
  return res
};

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
// 解法 2 ：快排
var getLeastNumbers = function(arr, k) {
  const quickSort = (arr, left, right, k) => {
    if (left >= right) return arr
    let low = left, high = right - 1
    while (low <= high) {
      if (arr[low] > arr[right]) {
        [arr[low], arr[high]] = [arr[high], arr[low]]
        high--
      } else {
        low++
      }
    }
    high++
    [arr[high], arr[right]] = [arr[right], arr[high]]
    if (high === k - 1) return arr
    else if (high > k - 1) return quickSort(arr, left, high - 1, k)
    else return quickSort(arr, high + 1, right, k)
  }
  quickSort(arr, 0, arr.length - 1, k)
  return arr.slice(0, k)
};