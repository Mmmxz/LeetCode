// 215. 数组中的第K个最大元素
// 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

// 示例 1:

// 输入: [3,2,1,5,6,4] 和 k = 2
// 输出: 5
// 示例 2:

// 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
// 输出: 4
// 说明:

// 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 库函数
var findKthLargest = function(nums, k) {
  nums.sort((a, b) => b - a)
  return nums[k - 1]
};

// 优先队列/最大堆/二叉堆
// 把 len 个元素都放入一个最大堆中，然后再 pop() 出 k - 1 个元素，因为前 k - 1 大的元素都被弹出了，此时最大堆的堆顶元素就是数组中的第 k 个最大元素。
var findKthLargest = function(nums, k) {
  // 创造一个最大堆，将元素都入堆
  const mh = new MaxHeap()
  for (let i = 0; i < nums.length; i++) {
    mh.insert(nums[i])
  }
  for (let i = 0; i < k - 1; i++) {
    mh.extract()
  }
  return mh.top()
};

class MaxHeap {
  constructor() {
    // 堆的索引从 1 开始，方便获取子节点 (i*2, i*2+1) 和父节点 (i/2)
    this.list = [0]
    this.count = 0
  }
  insert(num) {
    // 入堆时，加到末尾，执行上浮操作
    this.list.push(num)
    this.count++
    this.shiftUp(this.count)
  }
  extract() {
    // 出堆时，从堆顶出元素并返回，将尾部元素放到堆顶，执行下沉操作
    this.swap(1, this.count) // 堆顶元素与最后一个元素交换
    this.count--
    this.shiftDown(1)
    return this.list.pop() // 将交换到末尾的原堆顶的元素弹出并返回
  }
  shiftUp(i) {
    // 上浮操作，保证根节点大于子节点，与它的根节点比较，如果小于根节点则交换，直到到达堆顶
    while (i > 1 && this.list[i] > this.list[this.parent(i)]) {
      this.swap(i, this.parent(i))
      i = this.parent(i)
    }
  }
  shiftDown(i) {
    // 下沉操作，保证根节点大于子节点，将子节点较大的值与根节点交换，有可能只存在左子节点
    while (this.left(i) <= this.count) {
      // 假设左边节点较大
      let j = this.left(i)
      // 如果右节点存在，比较左右的大小
      if (this.right(i) <= this.count && this.list[this.right(i)] > this.list[this.left(i)]) {
        j = this.right(i)
      }
      // 如果根节点大于较大的子节点，就不需要循环了
      if (this.list[i] >= this.list[j]) {
        break
      }
      // 否则交换
      this.swap(i, j)
      i = j
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
  getCount() {
    return this.count
  }
  top() {
    return this.list[1]
  }
  swap(i, j) {
    let temp = this.list[i]
    this.list[i] = this.list[j]
    this.list[j] = temp
  }
}
