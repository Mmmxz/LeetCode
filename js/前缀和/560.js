// 560. 和为K的子数组
// 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。

// 示例 1 :

// 输入:nums = [1,1,1], k = 2
// 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
// 说明 :

// 数组的长度为 [1, 20,000]。
// 数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。

/**
 * @description 前缀和 + hash 参考题解：https://leetcode-cn.com/problems/binary-subarrays-with-sum/solution/de-liao-yi-wen-ba-qian-zhui-he-miao-sha-mqngx/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  // 前缀和 + hash
  const n = nums.length
  const prefix = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1]
  }
  let ans = 0
  const memo = new Map()
  memo.set(0, 1)
  // hash 存储每个和出现的次数
  for (let i = 0; i < n; i++) {
    // prefix[i + 1] 代表[0,i]的前缀和
    // 对于每个数 找 prefix[i + 1] - k 出现的次数 加到答案中
    if (memo.has(prefix[i + 1] - k)) {
      ans += memo.get(prefix[i + 1] - k)
    }
    memo.set(prefix[i + 1], (memo.get(prefix[i + 1]) || 0) + 1)
  }
  return ans
};
