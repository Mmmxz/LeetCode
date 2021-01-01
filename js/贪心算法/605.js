// 605. 种花问题
// 假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

// 给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

// 示例 1:

// 输入: flowerbed = [1,0,0,0,1], n = 1
// 输出: True
// 示例 2:

// 输入: flowerbed = [1,0,0,0,1], n = 2
// 输出: False
// 注意:

// 数组内已种好的花不会违反种植规则。
// 输入的数组长度范围为 [1, 20000]。
// n 是非负整数，且不会超过输入数组的大小。

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
// 贪心算法：求出最多能种植的数量，然后与 n 比较。
var canPlaceFlowers = function(flowerbed, n) {
  let len = flowerbed.length
  let count = 0
  for (let i = 0; i < len; i++) {
    if (flowerbed[i] === 0) {
      // 1.当前位置为 0 判断相邻位置 看能否种花
      if (i === 0) {
        // 2.第一位 判断第二位 如果为 0 则能种 或者只有第一位则能种
        if (i + 1 < len && flowerbed[i + 1] === 0 || i + 1 === len) {
          flowerbed[i] = 1
          count++
        }
      } else if (i === len - 1) {
        // 3.最后一位 判断前一位 如果为 0 则能种
        if (flowerbed[i - 1] === 0) {
          flowerbed[i] = 1
          count++
        }
      } else {
        // 4.中间位置 需要判断前后
        if (flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0) {
          flowerbed[i] = 1
          count++
        }
      }
    }
  }
  // 5.能种花的数量与 n 比较 返回结果
  return count >= n
};