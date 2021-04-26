// 75. 颜色分类
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

 

// 示例 1：

// 输入：nums = [2,0,2,1,1,0]
// 输出：[0,0,1,1,2,2]
// 示例 2：

// 输入：nums = [2,0,1]
// 输出：[0,1,2]
// 示例 3：

// 输入：nums = [0]
// 输出：[0]
// 示例 4：

// 输入：nums = [1]
// 输出：[1]
 

// 提示：

// n == nums.length
// 1 <= n <= 300
// nums[i] 为 0、1 或 2
 

// 进阶：

// 你可以不使用代码库中的排序函数来解决这道题吗？
// 你能想出一个仅使用常数空间的一趟扫描算法吗？

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 解法 1 ：双指针
 var sortColors = function(nums) {
  // 0挪到前面 2挪到后面即可
  let p0 = 0, p2 = nums.length - 1
  for (let i = 0; i <= p2; i++) {
    // 为什么要先判断等于2 因为换过来的可能还是2 所以要用while 直到不等于2 还可能是0 接下来再把0移到前面去 如果判断0写在上面 此处就会漏掉i处的值
    while (i <= p2 && nums[i] === 2) {
      let temp = nums[i]
      nums[i] = nums[p2]
      nums[p2] = temp
      p2--
    }
    if (nums[i] === 0) {
      let temp = nums[i]
      nums[i] = nums[p0]
      nums[p0] = temp
      p0++
    }
  }
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 解法 2 ：单指针
 var sortColors = function(nums) {
  const n = nums.length
  // 指针代表要放数字的位置
  let p = 0
  // 循环第一次 把0放到指针处
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      [nums[p], nums[i]] = [nums[i], nums[p]]
      p++
    }
  }
  // 循环第二次 把1放到指针处
  for (let i = p; i < n; i++) {
    if (nums[i] === 1) {
      [nums[p], nums[i]] = [nums[i], nums[p]]
      p++
    }
  }
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 解法 3 ：计数
 var sortColors = function(nums) {
  const n = nums.length
  let redCount = nums.filter(item => item === 0).length
  let whiteCount = nums.filter(item => item === 1).length
  for (let i = 0; i < n; i++) {
    if (i < redCount) {
      nums[i] = 0
    } else if (i < whiteCount + redCount) {
      nums[i] = 1
    } else {
      nums[i] = 2
    }
  }
};