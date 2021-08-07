// 457. 环形数组是否存在循环
// 存在一个不含 0 的 环形 数组 nums ，每个 nums[i] 都表示位于下标 i 的角色应该向前或向后移动的下标个数：

// 如果 nums[i] 是正数，向前 移动 nums[i] 步
// 如果 nums[i] 是负数，向后 移动 nums[i] 步
// 因为数组是 环形 的，所以可以假设从最后一个元素向前移动一步会到达第一个元素，而第一个元素向后移动一步会到达最后一个元素。

// 数组中的 循环 由长度为 k 的下标序列 seq ：

// 遵循上述移动规则将导致重复下标序列 seq[0] -> seq[1] -> ... -> seq[k - 1] -> seq[0] -> ...
// 所有 nums[seq[j]] 应当不是 全正 就是 全负
// k > 1
// 如果 nums 中存在循环，返回 true ；否则，返回 false 。

 

// 示例 1：

// 输入：nums = [2,-1,1,2,2]
// 输出：true
// 解释：存在循环，按下标 0 -> 2 -> 3 -> 0 。循环长度为 3 。
// 示例 2：

// 输入：nums = [-1,2]
// 输出：false
// 解释：按下标 1 -> 1 -> 1 ... 的运动无法构成循环，因为循环的长度为 1 。根据定义，循环的长度必须大于 1 。
// 示例 3:

// 输入：nums = [-2,1,-1,-2,-2]
// 输出：false
// 解释：按下标 1 -> 2 -> 1 -> ... 的运动无法构成循环，因为 nums[1] 是正数，而 nums[2] 是负数。
// 所有 nums[seq[j]] 应当不是全正就是全负。
 

// 提示：

// 1 <= nums.length <= 5000
// -1000 <= nums[i] <= 1000
// nums[i] != 0
 

// 进阶：你能设计一个时间复杂度为 O(n) 且额外空间复杂度为 O(1) 的算法吗？

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var circularArrayLoop = function(nums) {
  // 快慢指针
  const n = nums.length
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) continue
    let slow = i, fast = next(nums, i)
    while (nums[slow] * nums[fast] > 0 && nums[slow] * nums[next(nums, fast)] > 0) {
      if (slow === fast) {
        // 不能是自环
        if (slow !== next(nums, slow)) {
          return true
        } else {
          break
        }
      }
      slow = next(nums, slow)
      fast = next(nums, next(nums, fast))
    }
    // 将访问过的位置设置为0
    let add = i
    while (nums[add] * nums[next(nums, add)] > 0) {
      let temp = add
      add = next(nums, add)
      nums[temp] = 0
    }
  }
  return false
};
const next = (nums, cur) => {
  const n = nums.length
  return ((nums[cur] + cur) % n + n) % n
}


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var circularArrayLoop = function(nums) {
  // hash
  const len = nums.length
  const seen = new Array(len).fill(0)
  for (let i = 0; i < len; i++) {
    if (seen[i]) continue
    seen[i] = 1
    const memo = new Map()
    let pos = i
    while (true) {
      let nextPos = ((pos + nums[pos]) % len + len) % len
      // 什么时候不符合题意 当环长度为1或移动方向不同时
      if (pos === nextPos || nums[pos] * nums[nextPos] < 0) {
        break
      }
      // memo 中已经访问过下一个位置 说明成环
      if (memo.has(nextPos)) return true
      // 没成环 继续往下访问
      memo.set(pos, nextPos)
      pos = nextPos
      // 访问过了pos 设置为1 如果最终break了循环 说明pos一定没有成环 后面for循环可以直接跳过
      seen[pos] = 1
    }
  }
  return false
};
