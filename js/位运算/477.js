// 477. 汉明距离总和
// 两个整数的 汉明距离 指的是这两个数字的二进制数对应位不同的数量。

// 计算一个数组中，任意两个数之间汉明距离的总和。

// 示例:

// 输入: 4, 14, 2

// 输出: 6

// 解释: 在二进制表示中，4表示为0100，14表示为1110，2表示为0010。（这样表示是为了体现后四位之间关系）
// 所以答案为：
// HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.
// 注意:

// 数组中元素的范围为从 0到 10^9。
// 数组的长度不超过 10^4。
/**
 * @param {number[]} nums
 * @return {number}
 */
 var totalHammingDistance = function(nums) {
  const n = nums.length
  let ans = 0
  // 所有位置 0的个数乘1的个数即可
  // 推理过程：某个数的第i位是1 则在i的汉明和是1与当前位的0异或 一共是count0的汉明和
  // 另一个数的第i位也是1 则汉明和也是count0
  // 即在第i位的汉明和是：1 * count0 + 1 * count0 + …… = count1 * count0
  for (let i = 0; i < 32; i++) {
    let count1 = 0
    for (const num of nums) {
      count1 += num >> i & 1
    }
    let count0 = n - count1
    ans += count1 * count0
  }
  return ans
};