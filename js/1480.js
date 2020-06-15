// 给你一个数组 nums 。数组「动态和」的计算公式为：runningSum[i] = sum(nums[0]…nums[i]) 。

// 请返回 nums 的动态和。

//  

// 示例 1：

// 输入：nums = [1,2,3,4]
// 输出：[1,3,6,10]
// 解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 。
// 示例 2：

// 输入：nums = [1,1,1,1,1]
// 输出：[1,2,3,4,5]
// 解释：动态和计算过程为 [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1] 。
// 示例 3：

// 输入：nums = [3,1,2,10,1]
// 输出：[3,4,6,16,17]
//  

// 提示：

// 1 <= nums.length <= 1000
// -10^6 <= nums[i] <= 10^6

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/running-sum-of-1d-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 解题思路：用累加器计算和，给出reduce初始值，以便index包含下标为0的项，将累加的和存储在obj中，组装结果数组。
var runningSum = function(nums) {
  let result = [], obj = {}
  nums.reduce((acc, cur, index) => {
    obj[index] = acc + cur
    return acc + cur
  }, 0)
  // obj {0: xx, 1: xx}
  nums.forEach((item, index) => {
    result[index] = obj[index]
  })
  return result
};

console.log(runningSum([3,1,2,10,1]))