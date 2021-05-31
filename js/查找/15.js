// 15. 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

 

// 示例 1：

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 示例 2：

// 输入：nums = []
// 输出：[]
// 示例 3：

// 输入：nums = [0]
// 输出：[]
 

// 提示：

// 0 <= nums.length <= 3000
// -105 <= nums[i] <= 105

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
  // 思路：用排序来解决重复，并且可用二分来查找
  // 对于每个数 如果和前一个相等 直接跳过；如果大于0 直接跳过 因为不可能后面有加起来大于0
  // 在每个数后面找两个数的和 等于 -nums[i]
  // 找的时候也要排除重复元素
  const n = nums.length
  if (n < 2) {
    return []
  }
  nums.sort((a, b) => a - b)
  let ans = []
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      continue
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    let left = i + 1, right = n - 1
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum === 0) {
        ans.push([nums[i], nums[left], nums[right]])
        // 继续判断相同的数字要略过
        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--
        }
        left++
        right--
      } else if (sum > 0) {
        right--
      } else {
        left++
      }
    }
  }
  return ans
};