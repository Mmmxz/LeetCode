// 46. 全排列
// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

// 示例:

// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  // 1.res 存储结果 used 存储每个元素是否使用
  let res = []
  let used = new Array(nums).fill(false)
  // 3.nums 是要排列得原数组 index 是当前处理到的索引 p 是存储每组结果的数组 如 [1,2,3] [1,3,2]
  var findPermute = function (nums, index, p) {
    // 4.index 与原数组长度相等时 代表处理完成所有数字
    if (index === nums.length) {
      // 5.此时需要深拷贝 函数参数都是值传递 但是数组存储的是引用地址 后续递归时会将 p 设置为 [] 所以需要在此时深拷贝一份 放入结果中
      let list = JSON.parse(JSON.stringify(p))
      res.push(list)
      return
    }
    // 6.循环处理 nums
    for (let i = 0; i < nums.length; i++) {
      // 7.当前数字未使用时 将其加入 p 中 递归下一位数字 直到 p 的长度与 nums 的长度相等
      if (!used[i]) {
        p.push(nums[i])
        used[i] = true
        findPermute(nums, index + 1, p)
        // 8.回溯 将加入的最后一位元素弹出 并且重置为未使用 继续循环处理
        p.pop()
        used[i] = false
      }
    }
  }
  // 2.初次调用时 从 0 开始
  let p = []
  findPermute(nums, 0, p)
  return res
};