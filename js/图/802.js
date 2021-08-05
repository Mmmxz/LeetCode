// 802. 找到最终的安全状态
// 在有向图中，以某个节点为起始节点，从该点出发，每一步沿着图中的一条有向边行走。如果到达的节点是终点（即它没有连出的有向边），则停止。

// 对于一个起始节点，如果从该节点出发，无论每一步选择沿哪条有向边行走，最后必然在有限步内到达终点，则将该起始节点称作是 安全 的。

// 返回一个由图中所有安全的起始节点组成的数组作为答案。答案数组中的元素应当按 升序 排列。

// 该有向图有 n 个节点，按 0 到 n - 1 编号，其中 n 是 graph 的节点数。图以下述形式给出：graph[i] 是编号 j 节点的一个列表，满足 (i, j) 是图的一条有向边。

 

// 示例 1：

// Illustration of graph
// 输入：graph = [[1,2],[2,3],[5],[0],[5],[],[]]
// 输出：[2,4,5,6]
// 解释：示意图如上。
// 示例 2：

// 输入：graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
// 输出：[4]
 

// 提示：

// n == graph.length
// 1 <= n <= 104
// 0 <= graph[i].length <= n
// graph[i] 按严格递增顺序排列。
// 图中可能包含自环。
// 图中边的数目在范围 [1, 4 * 104] 内。

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
  // graph[0]为节点0可以到达的点有[1,2]，表示可以到达1和2； graph[1] : [2, 3] ;可以到达节点2,3. 一次类推， 完整画出来就如图了
  // 从所有节点出发 如果有环 则不安全
  const n = graph.length
  const visited = new Set()
  const dfs = (i) => {
    if (visited.has(i)) return false
    visited.add(i)
    for (const neibor of graph[i]) {
      // 遍历这个点能到达的地方
      if (!dfs(neibor)) return false
    }
    // 此时说明i一定是安全的 所以别的点如果能遍历到i 也是安全的
    graph[i] = []
    visited.delete(i)
    return true
  }
  const ans = []
  for (let i = 0; i < n; i++) {
    if (dfs(i)) {
      ans.push(i)
    }
  }
  return ans
};
