// 912. 排序数组
// 给你一个整数数组 nums，请你将该数组升序排列。

 

// 示例 1：

// 输入：nums = [5,2,3,1]
// 输出：[1,2,3,5]
// 示例 2：

// 输入：nums = [5,1,1,2,0,0]
// 输出：[0,0,1,1,2,5]
 

// 提示：

// 1 <= nums.length <= 50000
// -50000 <= nums[i] <= 50000

/**
 * @description 解法 1 ：堆排序
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  // 堆排序 升序 创建小根堆 将nums入堆 然后出堆即可
  const mh = new MinHeap()
  const n = nums.length
  for (let i = 0; i < n; i++) {
    mh.insert(nums[i])
  }
  const ans = []
  while (!mh.isEmpty()) {
    ans.push(mh.extract())
  }
  return ans
};

class MinHeap {
  constructor() {
    this.heap = [0]
    this.count = 0
  }
  isEmpty() {
    return this.count === 0
  }
  insert(num) {
    this.heap.push(num)
    this.count++
    this.shiftUp(this.count)
  }
  shiftUp(i) {
    // 上浮节点 当前节点有父节点 且当前值小于父节点值时上浮
    while (i > 1 && this.heap[i] < this.heap[this.parent(i)]) {
      // 将i与其父的值交换
      this.swap(i, this.parent(i))
      i = this.parent(i)
    }
  }
  extract() {
    // 出堆 将堆顶和最后一个元素交换 然后对堆顶进行下沉操作
    this.swap(1, this.count)
    this.count--
    this.shiftDown(1)
    return this.heap.pop()
  }
  shiftDown(i) {
    // 下沉节点 将i与左右子节点中较小的交换
    while (this.left(i) <= this.count) {
      // 说明有左节点
      let index = this.left(i)
      // 判断是否有右节点 如果有 需要将index设置为较小值的索引
      if (this.right(i) <= this.count && this.heap[this.right(i)] < this.heap[this.left(i)]) {
        index = this.right(i)
      }
      // 比较index对应的值与当前值的大小 看是否需要交换
      if (this.heap[index] < this.heap[i]) {
        this.swap(index, i)
        i = index
      } else {
        // 不需要交换 则直接退出循环
        break
      }
    }
  }
  parent(i) {
    // 当前节点的父节点
    return Math.floor(i / 2)
  }
  left(i) {
    return i * 2
  }
  right(i) {
    return i * 2 + 1
  }
  swap(i, j) {
    // 交换ij节点的值
    let temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }
}

/**
 * @description 解法 2 ：快速排序
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  // 快速排序
  quickSort(nums, 0, nums.length - 1)
  return nums
};

const quickSort = (nums, low, high) => {
  if (low < high) {
    const index = partition(nums, low, high)
    quickSort(nums, low, index - 1)
    quickSort(nums, index + 1, high)
  }
}

const partition = (nums, low, high) => {
  // 分块 选索引0作为基准 将小于基准的放在左边 大于基准的放在右边 返回基准的索引
  let base = nums[low], start = low // 基准值
  // 将大于基准值的数放在右侧 小于基准值的数放在左侧
  while (low < high) {
    // 从后往前遍历 当大于基准值时 保持位置不变
    while (low < high && nums[high] >= base) high--
    // 从前往后遍历 当小于基准值时 保持位置不变
    while (low < high && nums[low] <= base) low++
    if (low >= high) {
      break
    }
    swap(nums, low, high)
  }
  // 交换基准值和当前的low
  swap(nums, start, low)
  return low
}

const swap = (nums, i, j) => {
  let temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  const heap = new Heap((a, b) => a < b)
  for (const num of nums) {
    heap.insert(num)
  }
  let ans = []
  for (let i = 0; i < nums.length; i++) {
    ans.push(heap.extract())
  }
  return ans
};

class Heap {
  constructor(compare = (a, b) => a < b) {
    this.heap = [0]
    this.count = 0
    this.compare = compare
  }
  insert(num) {
    this.heap.push(num)
    this.count++
    this.shiftUp(this.count)
  }
  shiftUp(i) {
    // 当前节点有父节点且小于它的父节点时 上浮
    while (i > 1 && this.compare(this.heap[i], this.heap[this.parent(i)])) {
    // while (i > 1 && this.heap[i] < this.heap[this.parent(i)]) {
      // 交换位置
      this.swap(i, this.parent(i))
      i = this.parent(i)
    }
  }
  extract() {
    this.swap(1, this.count)
    this.count--
    this.shiftDown(1)
    return this.heap.pop()
  }
  shiftDown(i) {
    // 下沉 直到它小于左右孩子 或 没有左右孩子
    while (this.left(i) <= this.count) {
      // 有左孩子 找出左右孩子里较小的
      let min = this.left(i)
      if (this.right(i) <= this.count && this.compare(this.heap[this.right(i)], this.heap[this.left(i)])) {
      // if (this.right(i) <= this.count && this.heap[this.left(i)] > this.heap[this.right(i)]) {
        min = this.right(i)
      }
      // 比较当前值和min的大小 看是否需要交换
      if (this.compare(this.heap[min], this.heap[i])) {
      // if (this.heap[i] > this.heap[min]) {
        this.swap(i, min)
        i = min
      } else {
        break
      }
    }
  }
  swap(i, j) {
    let temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }
  parent(i) {
    return Math.floor(i / 2)
  }
  left(i) {
    return i * 2
  }
  right(i) {
    return i * 2 + 1
  }
}


// todo 归并排序


