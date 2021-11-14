// 677. 键值映射
// 实现一个 MapSum 类，支持两个方法，insert 和 sum：

// MapSum() 初始化 MapSum 对象
// void insert(String key, int val) 插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
// int sum(string prefix) 返回所有以该前缀 prefix 开头的键 key 的值的总和。
 

// 示例：

// 输入：
// ["MapSum", "insert", "sum", "insert", "sum"]
// [[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
// 输出：
// [null, null, 3, null, 5]

// 解释：
// MapSum mapSum = new MapSum();
// mapSum.insert("apple", 3);  
// mapSum.sum("ap");           // return 3 (apple = 3)
// mapSum.insert("app", 2);    
// mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
 

// 提示：

// 1 <= key.length, prefix.length <= 50
// key 和 prefix 仅由小写英文字母组成
// 1 <= val <= 1000
// 最多调用 50 次 insert 和 sum


var MapSum = function() {
  this.root = new Map()
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
  let node = this.root
  for (const char of key) {
    if (!node.has(char)) {
      node.set(char, new Map())
    }
    node = node.get(char)
  }
  node.set('#', val)
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
  let node = this.root
  for (const char of prefix) {
    if (!node.has(char)) {
      return 0
    }
    node = node.get(char)
  }
  return this.dfs(node)
};

MapSum.prototype.dfs = function(node) {
  let ans = 0
  for (const key of node.keys()) {
    if (key === '#') {
      ans += node.get(key)
    } else {
      ans += this.dfs(node.get(key))
    }
  }
  return ans
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */


var MapSum = function() {
  this.memo = new Map()
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
  this.memo.set(key, val)
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
  let sum = 0
  for (const [key, val] of this.memo.entries()) {
    if (key.startsWith(prefix)) {
      sum += val
    }
  }
  return sum
};

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
