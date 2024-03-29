// 2034. 股票价格波动
// 给你一支股票价格的数据流。数据流中每一条记录包含一个 时间戳 和该时间点股票对应的 价格 。

// 不巧的是，由于股票市场内在的波动性，股票价格记录可能不是按时间顺序到来的。某些情况下，有的记录可能是错的。如果两个有相同时间戳的记录出现在数据流中，前一条记录视为错误记录，后出现的记录 更正 前一条错误的记录。

// 请你设计一个算法，实现：

// 更新 股票在某一时间戳的股票价格，如果有之前同一时间戳的价格，这一操作将 更正 之前的错误价格。
// 找到当前记录里 最新股票价格 。最新股票价格 定义为时间戳最晚的股票价格。
// 找到当前记录里股票的 最高价格 。
// 找到当前记录里股票的 最低价格 。
// 请你实现 StockPrice 类：

// StockPrice() 初始化对象，当前无股票价格记录。
// void update(int timestamp, int price) 在时间点 timestamp 更新股票价格为 price 。
// int current() 返回股票 最新价格 。
// int maximum() 返回股票 最高价格 。
// int minimum() 返回股票 最低价格 。
 

// 示例 1：

// 输入：
// ["StockPrice", "update", "update", "current", "maximum", "update", "maximum", "update", "minimum"]
// [[], [1, 10], [2, 5], [], [], [1, 3], [], [4, 2], []]
// 输出：
// [null, null, null, 5, 10, null, 5, null, 2]

// 解释：
// StockPrice stockPrice = new StockPrice();
// stockPrice.update(1, 10); // 时间戳为 [1] ，对应的股票价格为 [10] 。
// stockPrice.update(2, 5);  // 时间戳为 [1,2] ，对应的股票价格为 [10,5] 。
// stockPrice.current();     // 返回 5 ，最新时间戳为 2 ，对应价格为 5 。
// stockPrice.maximum();     // 返回 10 ，最高价格的时间戳为 1 ，价格为 10 。
// stockPrice.update(1, 3);  // 之前时间戳为 1 的价格错误，价格更新为 3 。
//                           // 时间戳为 [1,2] ，对应股票价格为 [3,5] 。
// stockPrice.maximum();     // 返回 5 ，更正后最高价格为 5 。
// stockPrice.update(4, 2);  // 时间戳为 [1,2,4] ，对应价格为 [3,5,2] 。
// stockPrice.minimum();     // 返回 2 ，最低价格时间戳为 4 ，价格为 2 。
 

// 提示：

// 1 <= timestamp, price <= 109
// update，current，maximum 和 minimum 总 调用次数不超过 105 。
// current，maximum 和 minimum 被调用时，update 操作 至少 已经被调用过 一次 。

var StockPrice = function() {
  // 维护一个map 存储时间对应的价格
  this.memo = new Map()
  // 维护一个最大时间 在current时直接返回其对应的价格
  this.maxTime = 0
  // 维护两个优先队列 返回堆顶元素 堆中元素的格式按[price, time]存储
  this.maxHeap = new Heap((a, b) => a[0] > b[0])
  this.minHeap = new Heap()
};

/** 
 * @param {number} timestamp 
 * @param {number} price
 * @return {void}
 */
StockPrice.prototype.update = function(timestamp, price) {
  this.memo.set(timestamp, price)
  this.maxTime = Math.max(timestamp, this.maxTime)
  this.maxHeap.insert([price, timestamp])
  this.minHeap.insert([price, timestamp])
};

/**
 * @return {number}
 */
StockPrice.prototype.current = function() {
  return this.memo.get(this.maxTime)
};

/**
 * @return {number}
 */
StockPrice.prototype.maximum = function() {
  // 取堆顶元素，需要考虑当前时间的价格有过更新，所以辅以memo校验
  while (true) {
    const cur = this.maxHeap.peek()
    if (cur[0] === this.memo.get(cur[1])) {
      return cur[0]
    }
    this.maxHeap.extract()
  }
};

/**
 * @return {number}
 */
StockPrice.prototype.minimum = function() {
  while (true) {
    const cur = this.minHeap.peek()
    if (cur[0] === this.memo.get(cur[1])) {
      return cur[0]
    }
    this.minHeap.extract()
  }
};

class Heap {
  constructor(compare = (a, b) => a[0] < b[0]) {
    this.list = [0]
    this.count = 0
    this.compare = compare
  }
  insert(item) {
    // [price, time]
    this.list.push(item)
    this.count++
    this._shiftUp(this.count)
  }
  _shiftUp(i) {
    while (i > 1 && this.compare(this.list[i], this.list[this.parent(i)])) {
      this.swap(i, this.parent(i))
      i = this.parent(i)
    }
  }
  extract() {
    this.swap(1, this.count)
    this.count--
    // 先减去元素 再下沉
    this._shiftDown(1)
    return this.list.pop()
  }
  _shiftDown(i) {
    // 什么时候可以下沉 当有左孩子且compare()
    while (this.left(i) <= this.count) {
      let index = this.left(i)
      if (this.right(i) <= this.count && this.compare(this.list[this.right(i)], this.list[index])) {
        index = this.right(i)
      }
      if (this.compare(this.list[index], this.list[i])) {
        this.swap(i, index)
        i = index
      } else {
        break
      }
    }
  }
  peek() {
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
  swap(i, j) {
    let temp = this.list[i]
    this.list[i] = this.list[j]
    this.list[j] = temp
  }
}

/**
 * Your StockPrice object will be instantiated and called as such:
 * var obj = new StockPrice()
 * obj.update(timestamp,price)
 * var param_2 = obj.current()
 * var param_3 = obj.maximum()
 * var param_4 = obj.minimum()
 */
