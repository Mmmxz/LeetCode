// 503. 下一个更大元素 II
// 给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），输出每个元素的下一个更大元素。数字 x 的下一个更大的元素是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1。

// 示例 1:

// 输入: [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2；
// 数字 2 找不到下一个更大的数； 
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
// 注意: 输入数组的长度不会超过 10000。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 暴力解法
var nextGreaterElements = function(nums) {
  const n = nums.length, ans = []
  // 循环数组
  for (let i = 0; i < n; i++) {
    // 定义要比较的索引值，超过数组长度，则重置为 0
    let index = i + 1
    if (index >= n) {
      index = 0
    }
    // 当索引值不等于该索引时，循环判断
    while (index !== i) {
      // 比较下一位和当前值的大小，符合题意则加入答案
      if (nums[index] > nums[i]) {
        ans.push(nums[index])
        break
      }
      // 索引增加，如果超过数组长度，则重置为 0
      index++
      if (index >= n) {
        index = 0
      }
    }
    // 如果索引值等于该索引，说明没有比这个数大的值，将 -1 加入答案
    if (index === i) {
      ans.push(-1)
    }
  }
  return ans
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 单调栈
var nextGreaterElements = function(nums) {
  // 栈中存放索引 i ，方便更新答案，从栈底到栈顶 nums[i] 单调递减； ans 存储答案，如果没找到比它大的数，将不会从栈中出来，所以初始化值为 -1
  const stack = [], n = nums.length, ans = new Array(n).fill(-1)
  // 循环 2 轮即可，根据求余得到索引
  for (let i = 0; i < n * 2; i++) {
    // 栈顶元素于当前比较，栈顶大于等于当前，当前答案与栈顶元素相同，入栈，等待后续更新；栈顶小于当前，得到答案，出栈并且更新
    while (stack.length && nums[stack[stack.length - 1]] < nums[i % n]) {
      // 出栈并更新
      ans[stack.pop()] = nums[i % n]
    }
    // 将索引入栈
    stack.push(i % n)
  }
  return ans
};