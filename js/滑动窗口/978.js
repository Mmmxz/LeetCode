// 978. 最长湍流子数组
// 当 A 的子数组 A[i], A[i+1], ..., A[j] 满足下列条件时，我们称其为湍流子数组：

// 若 i <= k < j，当 k 为奇数时， A[k] > A[k+1]，且当 k 为偶数时，A[k] < A[k+1]；
// 或 若 i <= k < j，当 k 为偶数时，A[k] > A[k+1] ，且当 k 为奇数时， A[k] < A[k+1]。
// 也就是说，如果比较符号在子数组中的每个相邻元素对之间翻转，则该子数组是湍流子数组。

// 返回 A 的最大湍流子数组的长度。

 

// 示例 1：

// 输入：[9,4,2,10,7,8,8,1,9]
// 输出：5
// 解释：(A[1] > A[2] < A[3] > A[4] < A[5])
// 示例 2：

// 输入：[4,8,12,16]
// 输出：2
// 示例 3：

// 输入：[100]
// 输出：1
 

// 提示：

// 1 <= A.length <= 40000
// 0 <= A[i] <= 10^9

/**
 * @param {number[]} arr
 * @return {number}
 */
// 解法 1 ：滑动窗口
var maxTurbulenceSize = function(arr) {
  let left = 0, right = 0, window = [], max = 0
  while (right < arr.length) {
    const c = arr[right]
    right++
    window.push(c)
    // 窗口中不是湍流数组 应该出第一位 直到当前是湍流数组
    while (!isTurbulence(window)) {
      left++
      window.shift()
    }
    // 此时的数组一定是湍流数组 保存长度的最大值
    max = Math.max(max, right - left)
  }
  return max
};

// 功能函数 返回该数组是不是湍流数组
var isTurbulence = (arr) => {
  const len = arr.length
  // 有0个、1个元素 一定是湍流
  if (len < 2) {
    return true
  }
  // 有2个（非重复）元素时 一定是湍流
  if (len === 2) {
    return arr[0] !== arr[1]
  }
  // 有3个及以上元素时 判断最后两次比较是否湍流
  if (arr[len - 3] > arr[len - 2] && arr[len - 2] < arr[len - 1]) {
    return true
  }
  if (arr[len - 3] < arr[len - 2] && arr[len - 2] > arr[len - 1]) {
    return true
  }
  // 都不符合 则不是湍流
  return false
}

// 解法 2 ：动态规划
// todo