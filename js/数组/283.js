// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 示例:

// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 说明:

// 必须在原数组上操作，不能拷贝额外的数组。
// 尽量减少操作次数。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/move-zeroes
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 方法 1 先把非 0 元素放在数组前面 再补 0
var moveZeroes = function(nums) {
  var k = 0 // nums 中， [0...k) 的元素均为非 0 元素
  // 遍历到第 i 个元素后，保证 [0...i] 中所有非 0 元素都按照顺序排列在 [0...k) 中
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      nums[k++] = nums[i]
    }
  }
  // 将 nums 剩余的位置放置为 0
  for (let i = k; i < nums.length; i++) {
    nums[i] = 0
  }
  return nums
};
// 方法 2 一次交换实现 0 元素后置
var moveZeroes = function(nums) {
  // 1.定义指针 p
  var p = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      var temp = nums[i]
      nums[i] = nums[p]
      nums[p] = temp
      p++
    }
  }
  return nums
};
