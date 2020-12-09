// 给定两个数组，编写一个函数来计算它们的交集。

//  

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2,2]
// 示例 2:

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[4,9]
//  

// 说明：

// 输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
// 我们可以不考虑输出结果的顺序。
// 进阶：

// 如果给定的数组已经排好序呢？你将如何优化你的算法？
// 如果 nums1 的大小比 nums2 小很多，哪种方法更优？
// 如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/intersection-of-two-arrays-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  // 1.hash 存储 nums1 每个数字出现的次数
  let m1 = new Map()
  let result = []
  for (let num of nums1) {
    if (m1.has(num)) {
      m1.set(num, m1.get(num) + 1)
    } else {
      m1.set(num, 1)
    }
  }
  for (let num of nums2) {
    // 2.遍历 nums2 查到重复的数字 将其放入结果中 出现的次数 -1 当出现次数为 0 时 表示出现的最小次数已放入结果
    if (m1.has(num) && m1.get(num)) {
      // 查到了重复的数字 并且出现次数大于0
      result.push(num)
      m1.set(num, m1.get(num) - 1)
    }
  }
  return result
};