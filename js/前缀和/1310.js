// 1310. 子数组异或查询
// 有一个正整数数组 arr，现给你一个对应的查询数组 queries，其中 queries[i] = [Li, Ri]。

// 对于每个查询 i，请你计算从 Li 到 Ri 的 XOR 值（即 arr[Li] xor arr[Li+1] xor ... xor arr[Ri]）作为本次查询的结果。

// 并返回一个包含给定查询 queries 所有结果的数组。

 

// 示例 1：

// 输入：arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
// 输出：[2,7,14,8] 
// 解释：
// 数组中元素的二进制表示形式是：
// 1 = 0001 
// 3 = 0011 
// 4 = 0100 
// 8 = 1000 
// 查询的 XOR 值为：
// [0,1] = 1 xor 3 = 2 
// [1,2] = 3 xor 4 = 7 
// [0,3] = 1 xor 3 xor 4 xor 8 = 14 
// [3,3] = 8
// 示例 2：

// 输入：arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
// 输出：[8,0,4,4]
 

// 提示：

// 1 <= arr.length <= 3 * 10^4
// 1 <= arr[i] <= 10^9
// 1 <= queries.length <= 3 * 10^4
// queries[i].length == 2
// 0 <= queries[i][0] <= queries[i][1] < arr.length

/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
 var xorQueries = function(arr, queries) {
  // 前缀异或 00是0本身 33是3本身 03是3处的值0^1^2^3 01是1处的值0^1 23是03^02
  // 1, 1^3, 1^3^4, 1^3^4^8 pre数组
  // [0,1] = pre[1]
  // [1,2] = pre[2] ^ pre[0]
  // [0,3] = pre[3]
  // [3,3] = pre[3] ^ pre[2]
  const n = arr.length
  const prefix = new Array(n).fill(0)
  prefix[0] = arr[0]
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] ^ arr[i]
  }
  let ans = []
  for (const range of queries) {
    if (range[0] === range[1]) {
      // [0,0] [3,3]
      ans.push(arr[range[0]])
    } else if (range[0] === 0) {
      // [0,3] = pre[3]
      ans.push(prefix[range[1]])
    } else {
      // [2,3] = pre[3] ^ pre[1]
      ans.push(prefix[range[1]] ^ prefix[range[0] - 1])
    }
  }
  return ans
};

/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
 var xorQueries = function(arr, queries) {
  //  不用分情况的前缀异或
  const n = arr.length
  // prefix[i] = arr[0] ^ ... arr[i-1]
  const prefix = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] ^ arr[i]
  }
  const m = queries.length, ans = new Array(m).fill(0)
  for (let i = 0; i < m; i++) {
    ans[i] = prefix[queries[i][0]] ^ prefix[queries[i][1] + 1]
  }
  return ans
};