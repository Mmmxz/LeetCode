// 338. 比特位计数
// 给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

// 示例 1:

// 输入: 2
// 输出: [0,1,1]
// 示例 2:

// 输入: 5
// 输出: [0,1,1,2,1,2]
// 进阶:

// 给出时间复杂度为O(n*sizeof(integer))的解答非常容易。但你可以在线性时间O(n)内用一趟扫描做到吗？
// 要求算法的空间复杂度为O(n)。
// 你能进一步完善解法吗？要求在C++或任何其他语言中不使用任何内置函数（如 C++ 中的 __builtin_popcount）来执行此操作。

/**
 * @param {number} num
 * @return {number[]}
 */
// 位运算
var countBits = function(num) {
  let ans = new Array(num + 1).fill(0)
  for (let i = 1; i <= num; i++) {
    ans[i] = ans[i & (i - 1)] + 1
  }
  return ans
};

/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
  // 奇数： 1 的数量等于它前一位数对应的数量 +1 ，因为奇数末位是 1 ，永远比前一位偶数多一个 1 。
  // 偶数： 1 的数量等于它除以 2 的数对应的数量，因为偶数末位是 0 ，除以 2 不影响 1 的数量。
  const ans = new Array(num + 1).fill(0)
  for (let i = 1; i <= num; i++) {
    if (i % 2 === 1) {
      // 奇数
      ans[i] = ans[i - 1] + 1
    } else {
      // 偶数
      ans[i] = ans[i / 2]
    }
  }
  return ans
};