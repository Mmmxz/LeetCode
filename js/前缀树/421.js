// 421. 数组中两个数的最大异或值
// 给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。

// 进阶：你可以在 O(n) 的时间解决这个问题吗？

 

// 示例 1：

// 输入：nums = [3,10,5,25,2,8]
// 输出：28
// 解释：最大运算结果是 5 XOR 25 = 28.
// 示例 2：

// 输入：nums = [0]
// 输出：0
// 示例 3：

// 输入：nums = [2,4]
// 输出：6
// 示例 4：

// 输入：nums = [8,10,2]
// 输出：10
// 示例 5：

// 输入：nums = [14,70,53,83,49,91,36,80,92,51,66,70]
// 输出：127
 

// 提示：

// 1 <= nums.length <= 2 * 104
// 0 <= nums[i] <= 231 - 1

/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法 1 ：暴力 不推荐
 var findMaximumXOR = function(nums) {
  const n = nums.length
  let ans = 0
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      ans = Math.max(nums[i] ^ nums[j], ans)
    }
  }
  return ans
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 解法 2 ：前缀树
 var findMaximumXOR = function(nums) {
  const n = nums.length
  let trie = new Trie(), max = 0
  for (let i = 0; i < n; i++) {
    trie.add(nums[i])
    max = Math.max(trie.maxXOR(nums[i]), max)
  }
  return max
};

class Trie {
  constructor() {
    this.head = []
  }
  add(num) {
    let cur = this.head
    for (let move = 31; move >= 0; move--) {
      // 从高到低进行 拿到每一位上的值是0还是1
      let path = this.path(num, move)
      cur[path] = cur[path] === undefined ? [] : cur[path]
      cur = cur[path]
    }
  }
  maxXOR(num) {
    let cur = this.head, res = 0
    for (let move = 31; move >= 0; move--) {
      let path = this.path(num, move)
      // 最高位符号位来说，希望和最高位一样，如果不是最高位，就希望走值本身相反的路。
      // 负数是一样的，负数的值是后面的值取反+1，最高位变1之后取反为0，负数的绝对值越小值越大。
      let wantPath = move === 31 ? path : path ^ 1
      // 当前节点下有值吗? 不为空就能走，为空就得走另一边
      wantPath = cur[wantPath] !== undefined ? wantPath : wantPath ^ 1
      res |= (path ^ wantPath) << move
      cur = cur[wantPath]
    }
    return res
  }
  // 获取数字当前位置是 0 还是 1
  path(num, move) {
    return (num >> move) & 1
  }
}