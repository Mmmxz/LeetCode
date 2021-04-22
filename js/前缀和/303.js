// 303. 区域和检索 - 数组不可变
// 给定一个整数数组  nums，求出数组从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点。

// 实现 NumArray 类：

// NumArray(int[] nums) 使用数组 nums 初始化对象
// int sumRange(int i, int j) 返回数组 nums 从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点（也就是 sum(nums[i], nums[i + 1], ... , nums[j])）
 

// 示例：

// 输入：
// ["NumArray", "sumRange", "sumRange", "sumRange"]
// [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
// 输出：
// [null, 1, -1, -3]

// 解释：
// NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
// numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
// numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
// numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
 

// 提示：

// 0 <= nums.length <= 104
// -105 <= nums[i] <= 105
// 0 <= i <= j < nums.length
// 最多调用 104 次 sumRange 方法

/**
 * @param {number[]} nums
 */
// 前缀和
var NumArray = function(nums) {
  const len = nums.length
  // 前缀和 计算任意 [i~j] 的和 可以转化为 [0~j] 的和减去 [0~i) 的和
  // 方便处理边界情况 转化为 j+1 存储前 j 个数的和
  const arr = new Array(len + 1).fill(0)
  // arr[i] 存储[0...i)的和
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += nums[i]
    arr[i + 1] = sum
  }
  this.list = arr
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  const ans = this.list[j + 1] - this.list[i]
  return ans
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */