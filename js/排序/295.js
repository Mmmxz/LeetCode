// 295. 数据流的中位数
// 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

// 例如，

// [2,3,4] 的中位数是 3

// [2,3] 的中位数是 (2 + 3) / 2 = 2.5

// 设计一个支持以下两种操作的数据结构：

// void addNum(int num) - 从数据流中添加一个整数到数据结构中。
// double findMedian() - 返回目前所有元素的中位数。
// 示例：

// addNum(1)
// addNum(2)
// findMedian() -> 1.5
// addNum(3) 
// findMedian() -> 2
// 进阶:

// 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
// 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？

/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
  // 两个堆 最大堆维护较小的一半元素+最小堆维护较大的一半元素
  this.maxHeap = new Heap()
  this.minHeap = new Heap(false)
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  this.maxHeap.insert(num)
  this.minHeap.insert(this.maxHeap.extract())
  if (this.maxHeap.count < this.minHeap.count) {
    this.maxHeap.insert(this.minHeap.extract())
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  if (this.maxHeap.count > this.minHeap.count) {
    return this.maxHeap.top()
  }
  return (this.maxHeap.top() + this.minHeap.top()) / 2
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

class Heap {
  constructor(isMax = true) {
    this.list = [0]
    this.count = 0
    // 默认大根堆
    this.isMax = isMax
  }
  insert(num) {
    // 入堆 上浮
    this.list.push(num)
    this.count++
    this.shiftUp(this.count)
  }
  shiftUp(i) {
    if (this.isMax) {
      // 和父节点比较 如果大于父节点 则交换 直到到达堆顶
      while (i > 1) {
        let parent = this.parent(i)
        if (this.list[parent] < this.list[i]) {
          this.swap(this.list, i, parent)
        } else {
          break
        }
        i = parent
      }
    } else {
      while (i > 1) {
        let parent = this.parent(i)
        if (this.list[parent] > this.list[i]) {
          this.swap(this.list, i, parent)
        } else {
          break
        }
        i = parent
      }
    }
  }
  extract() {
    // 堆顶与最后一位交换 下沉堆顶
    this.swap(this.list, 1, this.count)
    this.count--
    this.shiftDown(1)
    return this.list.pop()
  }
  shiftDown(i) {
    // 和两个子节点中较大的比较 如果小于较大的子节点 则交换 直到到达堆底
    while (this.left(i) <= this.count) {
      // 右子节点存在 比较大小
      let child = this.left(i)
      if (this.isMax) {
        if (this.right(i) <= this.count && this.list[this.left(i)] < this.list[this.right(i)]) {
          child = this.right(i)
        }
        if (this.list[i] < this.list[child]) {
          this.swap(this.list, i, child)
        } else {
          break
        }
        i = child
      } else {
        if (this.right(i) <= this.count && this.list[this.left(i)] > this.list[this.right(i)]) {
          child = this.right(i)
        }
        if (this.list[i] > this.list[child]) {
          this.swap(this.list, i, child)
        } else {
          break
        }
        i = child
      }
    }
  }
  top() {
    return this.list[1]
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
  swap(list, i, j) {
    let temp = list[i]
    list[i] = list[j]
    list[j] = temp
  }
}


/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
  this.nums = []
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  // 插入排序
  const n = this.nums.length
  if (n) {
    let pos = -1 // 代表要插入位置的索引
    // 要从小到大排序 则找到比目标小的最大位置 +1就是要插入的索引
    for (let i = 0; i < n; i++) {
      if (this.nums[i] <= num) {
        pos = i
      } else {
        break
      }
    }
    this.nums.splice(pos + 1, 0, num)
  } else {
    this.nums.push(num)
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  const n = this.nums.length
  // [1,3,5,6]
  // [1,3,5,6,7]
  let mid = Math.floor(n / 2)
  if (n % 2) {
    return this.nums[mid]
  } else {
    return (this.nums[mid] + this.nums[mid - 1]) / 2
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
