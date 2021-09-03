// 面试题 17.14. 最小K个数
// 设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

// 示例：

// 输入： arr = [1,3,5,7,2,4,6,8], k = 4
// 输出： [1,2,3,4]
// 提示：

// 0 <= len(arr) <= 100000
// 0 <= k <= min(100000, len(arr))

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
  const n = arr.length
  // 从小到大排序 返回前k个
  const minHeap = new MinHeap(), ans = []
  for (let i = 0; i < n; i++) {
    minHeap.insert(arr[i])
  }
  for (let i = 0; i < k; i++) {
    ans.push(minHeap.extract())
  }
  return ans
};

class MinHeap{
  constructor() {
    this.list = [0]
    this.count = 0
  }
  shiftUp(i) {
    // 什么时候需要交换 有父节点 且小于父节点
    while (this.parent(i) > 0 && this.list[i] < this.list[this.parent(i)]) {
      this.swap(i, this.parent(i))
      i = this.parent(i)
    }
  }
  insert(num) {
    this.list.push(num)
    this.count++
    this.shiftUp(this.count)
  }
  extract() {
    this.swap(1, this.count)
    this.count--
    this.shiftDown(1)
    return this.list.pop()
  }
  shiftDown(i) {
    // 节点与左右子节点对比 与最小值交换
    while (this.left(i) <= this.count) {
      // 找到左右子节点的较小值对应索引
      let min = this.left(i)
      if (this.right(i) <= this.count && this.list[this.right(i)] < this.list[this.left(i)]) {
        min = this.right(i)
      }
      // 比较当前节点和子节点较小值的大小
      if (this.list[i] > this.list[min]) {
        this.swap(i, min)
        i = min
      } else {
        break
      }
    }
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
  swap(i, j) {
    let temp = this.list[i]
    this.list[i] = this.list[j]
    this.list[j] = temp
  }
}
