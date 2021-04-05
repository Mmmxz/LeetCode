// 88. 合并两个有序数组
// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。

 

// 示例 1：

// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 示例 2：

// 输入：nums1 = [1], m = 1, nums2 = [], n = 0
// 输出：[1]
 

// 提示：

// nums1.length == m + n
// nums2.length == n
// 0 <= m, n <= 200
// 1 <= m + n <= 200
// -109 <= nums1[i], nums2[i] <= 109

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
  // 双指针 逆向 curP指向当前要放数字的位置
  let p1 = m - 1, p2 = n - 1, curP = m + n - 1
  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      // 此时p2是合法下标
      nums1[curP] = nums2[p2--]
    } else if (p2 === -1) {
      // 此时p1是合法下标
      nums1[curP] = nums1[p1--]
    } else {
      // p1 p2 都合法 比较大小 谁大放谁
      if (nums1[p1] > nums2[p2]) {
        nums1[curP] = nums1[p1--]
      } else {
        nums1[curP] = nums2[p2--]
      }
    }
    curP--
  }
};


/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
  //  把nums2放入nums1后面 然后排序
  for (let i = m; i < m + n; i++) {
    nums1[i] = nums2.shift()
  }
  nums1.sort((a, b) => a - b)
};