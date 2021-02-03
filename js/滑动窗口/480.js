// 480. 滑动窗口中位数
// 中位数是有序序列最中间的那个数。如果序列的大小是偶数，则没有最中间的数；此时中位数是最中间的两个数的平均数。

// 例如：

// [2,3,4]，中位数是 3
// [2,3]，中位数是 (2 + 3) / 2 = 2.5
// 给你一个数组 nums，有一个大小为 k 的窗口从最左端滑动到最右端。窗口中有 k 个数，每次窗口向右移动 1 位。你的任务是找出每次窗口移动后得到的新窗口中元素的中位数，并输出由它们组成的数组。

 

// 示例：

// 给出 nums = [1,3,-1,-3,5,3,6,7]，以及 k = 3。

// 窗口位置                      中位数
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       1
//  1 [3  -1  -3] 5  3  6  7      -1
//  1  3 [-1  -3  5] 3  6  7      -1
//  1  3  -1 [-3  5  3] 6  7       3
//  1  3  -1  -3 [5  3  6] 7       5
//  1  3  -1  -3  5 [3  6  7]      6
//  因此，返回该滑动窗口的中位数数组 [1,-1,-1,3,5,6]。

 

// 提示：

// 你可以假设 k 始终有效，即：k 始终小于输入的非空数组的元素个数。
// 与真实值误差在 10 ^ -5 以内的答案将被视作正确答案。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 思路：滑动窗口移动时，保证窗口中的元素一直是从小到大有序的，然后根据 k 的奇偶性求出中位数。
var medianSlidingWindow = function(nums, k) {
  let res = []
  // 定义窗口 [left...right] 左闭右闭
  let left = 0, right = -1, window = []
  const len = nums.length
  while (right < len - 1) {
    // c 每次要加入的元素
    const c = nums[++right]
    // 加入元素时 保证从小到大排序
    window = insertSort(window, c)
    // 当滑动窗口大于要求时 缩小窗口
    if (window.length > k) {
      // d 每次要删除的元素
      const d = nums[left++]
      // 在有序的 window 中删除第一个 d
      window.splice(window.findIndex(item => item === d), 1)
    }
    // 计算当前 window 的中位数 判断 k 奇偶
    if (window.length === k) {
      let ans = 0
      if (k % 2) {
        // 奇数 取中间索引
        ans = window[Math.floor(k / 2)]
      } else {
        // 偶数 取中间两数的平均数
        ans = (window[k / 2] + window[k / 2 - 1]) / 2
      }
      res.push(ans)
    }
  }
  return res
};
// 插入排序
var insertSort = function(arr, num) {
  if (!arr.length) {
    arr.push(num)
    return arr
  }
  let index = 0
  while (index < arr.length) {
    // 循环 当数字小于当前数时 当前索引就是要插入的位置
    if (num < arr[index]) {
      break
    }
    index++
  }
  // 将元素插入指定位置
  arr.splice(index, 0, num)
  return arr
}