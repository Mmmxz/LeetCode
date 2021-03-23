// 341. 扁平化嵌套列表迭代器
// 给你一个嵌套的整型列表。请你设计一个迭代器，使其能够遍历这个整型列表中的所有整数。

// 列表中的每一项或者为一个整数，或者是另一个列表。其中列表的元素也可能是整数或是其他列表。

 

// 示例 1:

// 输入: [[1,1],2,[1,1]]
// 输出: [1,1,2,1,1]
// 解释: 通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,1,2,1,1]。
// 示例 2:

// 输入: [1,[4,[6]]]
// 输出: [1,4,6]
// 解释: 通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,4,6]。

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
// 解法 1 ：深度优先搜索 初始化时扁平化操作
 var NestedIterator = function(nestedList) {
  this.list = []
  const dfs = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].isInteger()) {
        this.list.push(data[i].getInteger())
      } else {
        dfs(data[i].getList())
      }
    }
  }
  dfs(nestedList)
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
  return this.list.length
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
  return this.list.shift()
};

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
// 解法 2 ：栈 hasNext时扁平化操作（推荐）
 var NestedIterator = function(nestedList) {
  this.stack = []
  // 逆序放入栈中
  for (let i = nestedList.length - 1; i >= 0; i--) {
    this.stack.push(nestedList[i])
  }
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
  // 判断栈顶 如果是数字 返回true 否则拆开逆序入栈
  while (this.stack.length) {
    const top = this.stack[this.stack.length - 1]
    if (top.isInteger()) {
      // 是数字
      return true
    } else {
      // 是数组 出栈 摊开 逆序入栈
      const list = this.stack.pop().getList()
      for (let i = list.length - 1; i >= 0; i--) {
        this.stack.push(list[i])
      }
    }
  }
  return false
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
  // 返回栈顶元素
  const top = this.stack.pop()
  return top.getInteger()
};

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/