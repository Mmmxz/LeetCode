// 239. 滑动窗口最大值
// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

// 返回滑动窗口中的最大值。

 

// 示例 1：

// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]
// 解释：
// 滑动窗口的位置                最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7
// 示例 2：

// 输入：nums = [1], k = 1
// 输出：[1]
// 示例 3：

// 输入：nums = [1,-1], k = 1
// 输出：[1,-1]
// 示例 4：

// 输入：nums = [9,11], k = 2
// 输出：[11]
// 示例 5：

// 输入：nums = [4,-2], k = 2
// 输出：[4]
 

// 提示：

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104
// 1 <= k <= nums.length

// 实际难点在于，数据量比较大，查找滑动窗口最大值时如果不是 O(1) 的时间复杂度，就会超时，需要借助【单调队列】

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
class signleQueue{
  constructor() {
    this.list = []
  }
  push_queue(num) {
    // 入队时 在队尾添加元素 但要把前面比新元素小的元素都删掉
    while (this.list.length && this.list[this.list.length - 1] < num) {
      this.list.pop()
    }
    this.list.push(num)
  }
  pop_queue(num) {
    // 删除队首元素时 num 代表当前滑动窗口的最左侧元素 需要判断相等时才从队列删除 是因为窗口最左侧元素较小时 已经在入队时删掉了 不需要再进行删除操作
    if (this.list.length && this.list[0] === num) {
      this.list.shift()
    }
  }
  max() {
    // 单调队列的队首元素永远是最大的
    return this.list[0]
  }
}
var maxSlidingWindow = function(nums, k) {
  let queue = new signleQueue()
  let res = []
  for (let i = 0; i < nums.length; i++) {
    // 1.先填满窗口的前 k-1
    if (i < k - 1) {
      queue.push_queue(nums[i])
    } else {
      // 2.窗口符合要求 获得最大值放入结果
      queue.push_queue(nums[i])
      res.push(queue.max())
      // 3.删除窗口的最左侧元素
      queue.pop_queue(nums[i - k + 1])
    }
  }
  return res
};