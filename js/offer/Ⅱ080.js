// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

 

// 示例 1:

// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
// 示例 2:

// 输入: n = 1, k = 1
// 输出: [[1]]
 

// 提示:

// 1 <= n <= 20
// 1 <= k <= n
 

// 注意：本题与主站 77 题相同： https://leetcode-cn.com/problems/combinations/

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/uUsW3B
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  // [1,2] [2,1] 是一组答案 需要 start
  const ans = []
  const dfs = (start, path) => {
    if (path.length === k) {
      ans.push(path.slice())
      return
    }
    for (let i = start; i <= n; i++) {
      path.push(i)
      dfs(i + 1, path)
      path.pop()
    }
  }
  dfs(1, [])
  return ans
};
