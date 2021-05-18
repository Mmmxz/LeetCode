// 1442. 形成两个异或相等数组的三元组数目
// 给你一个整数数组 arr 。

// 现需要从数组中取三个下标 i、j 和 k ，其中 (0 <= i < j <= k < arr.length) 。

// a 和 b 定义如下：

// a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
// b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
// 注意：^ 表示 按位异或 操作。

// 请返回能够令 a == b 成立的三元组 (i, j , k) 的数目。

 

// 示例 1：

// 输入：arr = [2,3,1,6,7]
// 输出：4
// 解释：满足题意的三元组分别是 (0,1,2), (0,2,2), (2,3,4) 以及 (2,4,4)
// 示例 2：

// 输入：arr = [1,1,1,1,1]
// 输出：10
// 示例 3：

// 输入：arr = [2,3]
// 输出：0
// 示例 4：

// 输入：arr = [1,3,5,7,9]
// 输出：3
// 示例 5：

// 输入：arr = [7,11,12,9,5,2,7,17,22]
// 输出：8
 

// 提示：

// 1 <= arr.length <= 300
// 1 <= arr[i] <= 10^8

/**
 * @description 解法 1 ：前缀 三重循环
 * @param {number[]} arr
 * @return {number}
 */
 var countTriplets = function(arr) {
  const n = arr.length
  // 定义前缀异或 prefix[0] = 0 prefix[i] = arr[0]^arr[1]...arr[i-1]
  const prefix = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] ^ arr[i - 1]
  }
  // 当 i < j 时， prefix[i]=arr[0]...arr[i-1], prefix[j]=arr[0]...arr[j-1]
  // 则 prefix[i]^prefix[j]=arr[i]...arr[j-1] 即区间[i,j]的前缀异或可表示为 prefix[i]^prefix[j+1]
  // 由ab定义可知 a=prefix[i]^prefix[j], b=prefix[j]^prefix[k+1]
  // 则 a == b 可推导 prefix[i]==prefix[k+1]
  let ans = 0
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j; k < n; k++) {
        if (prefix[i] === prefix[k + 1]) {
          ans++
        }
      }
    }
  }
  return ans
};

/**
 * @description 解法 2 ：前缀 二重循环
 * @param {number[]} arr
 * @return {number}
 */
 var countTriplets = function(arr) {
  const n = arr.length
  const prefix = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] ^ arr[i - 1]
  }
  let ans = 0
  // 优化 当 prefix[i]==prefix[k+1] 时，区间[i+1, k]中的 j 都满足题意，有 k-i 个 j，双重循环即可
  for (let i = 0; i < n; i++) {
    for (let k = i + 1; k < n; k++) {
      if (prefix[i] === prefix[k + 1]) {
        ans += k - i
      }
    }
  }
  return ans
};