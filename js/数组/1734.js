// 1734. 解码异或后的排列
// 给你一个整数数组 perm ，它是前 n 个正整数的排列，且 n 是个 奇数 。

// 它被加密成另一个长度为 n - 1 的整数数组 encoded ，满足 encoded[i] = perm[i] XOR perm[i + 1] 。比方说，如果 perm = [1,3,2] ，那么 encoded = [2,1] 。

// 给你 encoded 数组，请你返回原始数组 perm 。题目保证答案存在且唯一。

 

// 示例 1：

// 输入：encoded = [3,1]
// 输出：[1,2,3]
// 解释：如果 perm = [1,2,3] ，那么 encoded = [1 XOR 2,2 XOR 3] = [3,1]
// 示例 2：

// 输入：encoded = [6,5,4,6]
// 输出：[2,4,1,5,3]
 

// 提示：

// 3 <= n < 105
// n 是奇数。
// encoded.length == n - 1

/**
 * @param {number[]} encoded
 * @return {number[]}
 */
 var decode = function(encoded) {
  const n = encoded.length + 1
  // 1-n的排列
  let res = 0 // ans所有数的异或结果
  for (let i = 1; i <= n; i++) {
    res ^= i
  }
  let temp = 0 // 假设n为5 偶数位的异或结果 即 ans[1] ^ ans[2] ^ ans[3] ^ ans[4]
  for (let i = 1; i < n - 1; i += 2) {
    // 取偶数位
    temp ^= encoded[i]
  }
  const first = res ^ temp // 异或可得ans的第一位
  const ans = [first]
  for (let i = 0; i < n - 1; i++) {
    ans.push(ans[ans.length - 1] ^ encoded[i])
  }
  return ans
};