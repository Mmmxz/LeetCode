// 743. 网络延迟时间
// 有 n 个网络节点，标记为 1 到 n。

// 给你一个列表 times，表示信号经过 有向 边的传递时间。 times[i] = (ui, vi, wi)，其中 ui 是源节点，vi 是目标节点， wi 是一个信号从源节点传递到目标节点的时间。

// 现在，从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1 。

 

// 示例 1：



// 输入：times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
// 输出：2
// 示例 2：

// 输入：times = [[1,2,1]], n = 2, k = 1
// 输出：1
// 示例 3：

// 输入：times = [[1,2,1]], n = 2, k = 2
// 输出：-1
 

// 提示：

// 1 <= k <= n <= 100
// 1 <= times.length <= 6000
// times[i].length == 3
// 1 <= ui, vi <= n
// ui != vi
// 0 <= wi <= 100
// 所有 (ui, vi) 对都 互不相同（即，不含重复边）

/**
 * @description 解法 1：bfs
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
  const map = {} // key-src value-[dest,value]组成的数组
  for (const time of times) {
    const arr = map[time[0]] || []
    arr.push([time[1], time[2]])
    map[time[0]] = arr
  }
  // 保存从k点到1-n点的最小到达时间
  const memo = new Array(n + 1).fill(-1)
  memo[k] = 0
  const queue = []
  queue.push([k, 0])
  while (queue.length) {
    const [node, time] = queue.pop()
    const arr = map[node] || []
    for (let i = 0; i < arr.length; i++) {
      const [n, t] = arr[i]
      if (memo[n] !== -1 && memo[n] <= time + t) continue
      memo[n] = time + t
      queue.push([n, memo[n]])
    }
  }
  let max = 0
  for (let i = 1; i <= n; i++) {
    if (memo[i] === -1) return -1
    if (memo[i] > max) max = memo[i]
  }
  return max
};


/**
 * description 解法2：dijkstra
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
  const MAX = Number.MAX_SAFE_INTEGER
  const graph = new Array(n).fill(MAX).map(() => new Array(n).fill(MAX))
  for (const t of times) {
    const src = t[0] - 1, dest = t[1] - 1
    graph[src][dest] = t[2]
  }
  // 保存从k到每个点的最小距离 MAX代表不可到达
  const dist = new Array(n).fill(MAX)
  dist[k - 1] = 0
  const used = new Array(n).fill(false)
  for (let i = 0; i < n; i++) {
    let x = -1
    for (let y = 0; y < n; y++) {
      if (!used[y] && (x === -1 || dist[y] < dist[x])) {
        x = y
      }
    }
    used[x] = true
    for (let y = 0; y < n; y++) {
      dist[y] = Math.min(dist[y], dist[x] + graph[x][y])
    }
  }
  let ans = Math.max(...dist)
  return ans === MAX ? -1 : ans
};
