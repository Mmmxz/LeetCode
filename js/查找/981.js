// 981. 基于时间的键值存储
// 创建一个基于时间的键值存储类 TimeMap，它支持下面两个操作：

// 1. set(string key, string value, int timestamp)

// 存储键 key、值 value，以及给定的时间戳 timestamp。
// 2. get(string key, int timestamp)

// 返回先前调用 set(key, value, timestamp_prev) 所存储的值，其中 timestamp_prev <= timestamp。
// 如果有多个这样的值，则返回对应最大的  timestamp_prev 的那个值。
// 如果没有值，则返回空字符串（""）。
 

// 示例 1：

// 输入：inputs = ["TimeMap","set","get","get","set","get","get"], inputs = [[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]
// 输出：[null,null,"bar","bar",null,"bar2","bar2"]
// 解释：  
// TimeMap kv;   
// kv.set("foo", "bar", 1); // 存储键 "foo" 和值 "bar" 以及时间戳 timestamp = 1   
// kv.get("foo", 1);  // 输出 "bar"   
// kv.get("foo", 3); // 输出 "bar" 因为在时间戳 3 和时间戳 2 处没有对应 "foo" 的值，所以唯一的值位于时间戳 1 处（即 "bar"）   
// kv.set("foo", "bar2", 4);   
// kv.get("foo", 4); // 输出 "bar2"   
// kv.get("foo", 5); // 输出 "bar2"   

// 示例 2：

// 输入：inputs = ["TimeMap","set","set","get","get","get","get","get"], inputs = [[],["love","high",10],["love","low",20],["love",5],["love",10],["love",15],["love",20],["love",25]]
// 输出：[null,null,null,"","high","high","low","low"]
 

// 提示：

// 所有的键/值字符串都是小写的。
// 所有的键/值字符串长度都在 [1, 100] 范围内。
// 所有 TimeMap.set 操作中的时间戳 timestamps 都是严格递增的。
// 1 <= timestamp <= 10^7
// TimeMap.set 和 TimeMap.get 函数在每个测试用例中将（组合）调用总计 120000 次。

// 两种解法区别在于二分法查找的维度不同
// 解法1
/**
 * Initialize your data structure here.
 */
var TimeMap = function() {
  // 需要存储key对应的多个值和时间戳
  // 取的时候 取出key对应的时间戳比传入的小的最大时间戳对应的值 不存在则返回''
  this.memo = new Map()
  // {key: [[value1, timestamp1], [value2, timestamp2]]}
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
  if (!this.memo.has(key)) {
    this.memo.set(key, [])
  }
  this.memo.get(key).push([value, timestamp])
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
  if (!this.memo.has(key)) {
    return ''
  }
  const arr = this.memo.get(key)
  let left = 0, right = arr.length - 1
  // 通过二分找target或比target小的最大时间戳
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left
    if (arr[mid][1] === timestamp) {
      // 等于 直接返回
      return arr[mid][0]
    } else if (arr[mid][1] > timestamp) {
      // 大于 mid有可能是第一个比target大的元素
      right = mid - 1
    } else if (arr[mid][1] < timestamp) {
      // 小于
      left = mid + 1
    }
  }
  // 得到[left, right] left=right+1 此时该用left还是right?
  if (left > 0) {
    return arr[left - 1][0]
  }
  return ''
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */



// 解法2
/**
 * Initialize your data structure here.
 */
var TimeMap = function() {
  this.memo = new Map()
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
  if (!this.memo.has(key)) {
    this.memo.set(key, [])
  }
  this.memo.get(key).push([value, timestamp])
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
  if (!this.memo.has(key)) {
    return ''
  }
  const arr = this.memo.get(key)
  // 用二分找第一个比target大的元素 将其索引-1就是要找的元素
  let left = 0, right = arr.length - 1
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left
    if (arr[mid][1] > timestamp) {
      right = mid - 1
    } else if (arr[mid][1] < timestamp) {
      left = mid + 1
    } else {
      left = mid + 1
    }
  }
  // left=right+1 此时该使用left还是right?
  // 应该用left 因为当等于target时 left=mid+1 此时left就代表比目标大的元素
  if (left > 0) {
    return arr[left - 1][0]
  }
  return ''
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
