// 面试题 17.10. 主要元素
// 数组中占比超过一半的元素称之为主要元素。给你一个 整数 数组，找出其中的主要元素。若没有，返回 -1 。请设计时间复杂度为 O(N) 、空间复杂度为 O(1) 的解决方案。

 

// 示例 1：

// 输入：[1,2,5,9,5,9,5,5,5]
// 输出：5
// 示例 2：

// 输入：[3,2]
// 输出：-1
// 示例 3：

// 输入：[2,2,1,1,1,2,2]
// 输出：2

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  const len = nums.length
  // 如果有主要元素 则只能有一个 因为它出现次数超过了len/2
  // 摩尔投票法
  let count = 0, main = -1
  for (const num of nums) {
    if (count === 0) {
      main = num
    }
    if (main === num) {
      count++
    } else {
      count--
    }
  }
  count = 0
  // 因为存在没有主要元素的情况 所以需要判断main的出现次数
  for (const num of nums) {
    if (main === num) {
      count++
    }
  }
  return count > len / 2 ? main : -1
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  // 占比超过一半 即count>n/2
  const n = nums.length, target = Math.floor(n / 2)
  const memo = new Map()
  for (const num of nums) {
    memo.set(num, memo.has(num) ? memo.get(num) + 1 : 1)
  }
  // 找出memo中出现次数最大的集合
  const maxCount = Math.max(...[...memo.values()])
  // 最大出现次数是否大于2/n
  if (maxCount <= target) {
    return -1
  }
  for (const [num, count] of memo) {
    if (count === maxCount) {
      return num
    }
  }
};
