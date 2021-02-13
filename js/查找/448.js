// 448. 找到所有数组中消失的数字
// 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。

// 找到所有在 [1, n] 范围之间没有出现在数组中的数字。

// 您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

// 示例:

// 输入:
// [4,3,2,7,8,2,3,1]

// 输出:
// [5,6]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 解法 1 ：原数组操作 空间复杂度 O(1)
var findDisappearedNumbers = function(nums) {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    // 把当前值的绝对值 减去 1 得到对应下标的值 将其变成负数
    // 取绝对值是因为当前值可能已经成为负数了 此时将其作为下标是非法的
    const index = Math.abs(nums[i]) - 1
    if (nums[index] > 0) {
      nums[index] *= -1
    }
  }
  const res = []
  // 循环数组 值为正数代表这个位置没有被访问过 即没出现过该下标对应的数字 下标从 0 开始 故将其 +1 后返回
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) {
      res.push(i + 1)
    }
  }
  return res
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 解法 2 ： set 空间复杂度 O(n)
var findDisappearedNumbers = function(nums) {
  const len = nums.length
  // [1...len]
  const s1 = new Set(nums)
  let res = []
  for (let i = 1; i <= len; i++) {
    if (!s1.has(i)) {
      res.push(i)
    }
  }
  return res
};