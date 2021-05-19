// 1738. 找出第 K 大的异或坐标值
// 给你一个二维矩阵 matrix 和一个整数 k ，矩阵大小为 m x n 由非负整数组成。

// 矩阵中坐标 (a, b) 的 值 可由对所有满足 0 <= i <= a < m 且 0 <= j <= b < n 的元素 matrix[i][j]（下标从 0 开始计数）执行异或运算得到。

// 请你找出 matrix 的所有坐标中第 k 大的值（k 的值从 1 开始计数）。

 

// 示例 1：

// 输入：matrix = [[5,2],[1,6]], k = 1
// 输出：7
// 解释：坐标 (0,1) 的值是 5 XOR 2 = 7 ，为最大的值。
// 示例 2：

// 输入：matrix = [[5,2],[1,6]], k = 2
// 输出：5
// 解释：坐标 (0,0) 的值是 5 = 5 ，为第 2 大的值。
// 示例 3：

// 输入：matrix = [[5,2],[1,6]], k = 3
// 输出：4
// 解释：坐标 (1,0) 的值是 5 XOR 1 = 4 ，为第 3 大的值。
// 示例 4：

// 输入：matrix = [[5,2],[1,6]], k = 4
// 输出：0
// 解释：坐标 (1,1) 的值是 5 XOR 2 XOR 1 XOR 6 = 0 ，为第 4 大的值。
 

// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 1000
// 0 <= matrix[i][j] <= 106
// 1 <= k <= m * n

/**
 * @description 前缀 + 堆排序
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
 var kthLargestValue = function(matrix, k) {
  const m = matrix.length, n = matrix[0].length
  const prefix = new Array(m).fill(0).map(() => new Array(n).fill(0))
  const mh = new MaxHeap()
  // prefix 存每个位置的异或结果
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        prefix[i][j] = matrix[i][j]
      }
      if (i === 0 && j > 0) {
        prefix[i][j] = matrix[i][j] ^ prefix[i][j - 1]
      }
      if (i > 0 && j === 0) {
        prefix[i][j] = matrix[i][j] ^ prefix[i - 1][j]
      }
      if (i > 0 && j > 0) {
        prefix[i][j] = matrix[i][j] ^ prefix[i - 1][j] ^ prefix[i][j - 1] ^ prefix[i - 1][j - 1]
      }
      // 元素插入堆中
      mh.insert(prefix[i][j])
    }
  }
  // 元素出堆 保证堆中有k个元素
  for (let i = 0; i < k - 1; i++) {
    mh.extract()
  }
  return mh.top()
};

class MaxHeap {
  constructor() {
    this.heap = [0]
    this.count = 0
  }
  insert(num) {
    // 入堆 加到最后 上浮操作
    this.heap.push(num)
    this.count++
    this.shiftUp(this.count)
  }
  shiftUp(index) {
    while (index > 1 && this.heap[index] > this.heap[this.parent(index)]) {
      // 交换index和父节点
      this.swap(index, this.parent(index))
      index = this.parent(index)
    }
  }
  extract() {
    // 出堆 交换堆顶和最后一个元素 然后堆顶下沉
    this.swap(1, this.count)
    this.count-- // 堆中数量-1
    this.shiftDown(1)
    return this.heap.pop()
  }
  shiftDown(index) {
    // 当没有子节点时
    while (index <= this.count && this.left(index) <= this.count) {
      // 找到左右子节点中 较大的那个
      let max = this.left(index)
      if (this.right(index) <= this.count && this.heap[this.right(index)] > this.heap[max]) {
        max = this.right(index)
      }
      // 比较较大值
      if (this.heap[index] < this.heap[max]) {
        this.swap(index, max)
        index = max
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
  swap(x, y) {
    let temp = this.heap[x]
    this.heap[x] = this.heap[y]
    this.heap[y] = temp
  }
  top() {
    return this.heap[1]
  }
}