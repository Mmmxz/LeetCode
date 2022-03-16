// 剑指 Offer 30. 包含min函数的栈
// 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

 

// 示例:

// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.min();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.min();   --> 返回 -2.
 

// 提示：

// 各函数的调用总次数不超过 20000 次
 

// 注意：本题与主站 155 题相同：https://leetcode-cn.com/problems/min-stack/

/**
 * initialize your data structure here.
 */
 var MinStack = function() {
  // stack 存储元素 min 存储元素对应的最小值
  this.stack = []
  this.mins = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (this.stack.length) {
    // 要进入的值和当前的最小值比较 如果x更小 则新的对应最小值是x
    if (x < this.mins[this.mins.length - 1]) {
      this.mins.push(x)
    } else {
      this.mins.push(this.mins[this.mins.length - 1])
    }
  } else {
    this.mins.push(x)
  }
  this.stack.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop()
  this.mins.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
  return this.mins[this.mins.length - 1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
