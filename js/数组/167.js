// 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

// 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

// 说明:

// 返回的下标值（index1 和 index2）不是从零开始的。
// 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
// 示例:

// 输入: numbers = [2, 7, 11, 15], target = 9
// 输出: [1,2]
// 解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
// 已知数组有序，采用对撞指针来解决此问题
var twoSum = function(numbers, target) {
  let idx1 = 0, idx2 = numbers.length - 1
  // 当两指针相遇时结束循环
  while (idx1 < idx2) {
    if (numbers[idx1] + numbers[idx2] === target) {
      return [idx1 + 1, idx2 + 1]
    } else if (numbers[idx1] + numbers[idx2] < target) {
      // 求和小于目标数 则左指针后移 增大求和
      idx1++
    } else {
      // 求和大于目标书 则右指针前移 减小求和
      idx2--
    }
  }
  return [idx1 + 1, idx2 + 1]
};