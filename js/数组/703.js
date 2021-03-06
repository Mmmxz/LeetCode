// 703. 数据流中的第 K 大元素
// 设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。

// 请实现 KthLargest 类：

// KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
// int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。
 

// 示例：

// 输入：
// ["KthLargest", "add", "add", "add", "add", "add"]
// [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
// 输出：
// [null, 4, 5, 5, 8, 8]

// 解释：
// KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
// kthLargest.add(3);   // return 4
// kthLargest.add(5);   // return 5
// kthLargest.add(10);  // return 5
// kthLargest.add(9);   // return 8
// kthLargest.add(4);   // return 8
 

// 提示：
// 1 <= k <= 104
// 0 <= nums.length <= 104
// -104 <= nums[i] <= 104
// -104 <= val <= 104
// 最多调用 add 方法 104 次
// 题目数据保证，在查找第 k 大元素时，数组中至少有 k 个元素

/**
 * @param {number} k
 * @param {number[]} nums
 */
// 解法 1 ：排序
var KthLargest = function(k, nums) {
  this.k = k
  // 从大到小排序
  this.nums = nums.sort((a, b) => b - a)
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  // 加入新数字
  this.nums.push(val)
  const len = this.nums.length
  // this.nums.sort((a, b) => b - a)
  // 在一个降序的有序数组中插入数字
  let index = 0
  while (index < len - 1) {
    // index 位置大于当前值 继续后移
    if (this.nums[index] <= val) {
      break
    }
    index++
  }
  // 在 index 处插入 val
  this.nums.splice(index, 0, val)
  // 返回第 k 大的元素
  return this.nums[this.k - 1]
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// 解法 2 ：小顶堆
/**
 * @param {number} k
 * @param {number[]} nums
 */
 var KthLargest = function(k, nums) {
  this.k = k
  // 构建堆
  this.heap = new minHeap()
  for (let num of nums) {
    this.heap.insert(num)
  }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  this.heap.insert(val)
  // 堆容量为k
  while (this.heap.getCount() > this.k) {
    this.heap.extract()
  }
  return this.heap.top()
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
class minHeap {
  constructor() {
    this.list = [0]
    this.count = 0
  }
  insert(num) {
    // 入堆时，加到末尾，执行上浮操作
    this.count++
    this.list.push(num)
    // 上浮 传入索引
    this.shiftUp(this.count)
  }
  shiftUp(i) {
    // 如果大于父元素 或到达顶点 就停止
    while (i > 1 && this.list[i] < this.list[this.parent(i)]) {
      this.swap(i, this.parent(i))
      i = this.parent(i)
    }
  }
  extract() {
    // 出堆顶 将最后一个元素放到堆顶 然后执行下沉操作
    this.swap(1, this.count)
    this.count--
    this.shiftDown(1)
    return this.list.pop()
  }
  shiftDown(i) {
    // 下沉 和子元素中更小的交换 直到不能交换或者没有子元素
    while (this.left(i) <= this.count) {
      let min = this.left(i)
      if (this.right(i) <= this.count && this.list[this.right(i)] < this.list[this.left(i)]) {
        min = this.right(i)
      }
      // 如果根节点小于较小的子节点 说明满足小根堆 此时不继续循环
      if (this.list[i] <= this.list[min]) {
        break
      }
      // 否则交换
      this.swap(i, min)
      i = min
    }
  }
  parent(node) {
    return Math.floor(node / 2)
  }
  left(node) {
    return node * 2
  }
  right(node) {
    return node * 2 + 1
  }
  swap(i, j) {
    let temp = this.list[i]
    this.list[i] = this.list[j]
    this.list[j] = temp
  }
  getCount() {
    return this.count
  }
  top() {
    return this.list[1]
  }
}