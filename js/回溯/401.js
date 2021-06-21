// 401. 二进制手表
// 二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。每个 LED 代表一个 0 或 1，最低位在右侧。

// 例如，下面的二进制手表读取 "3:25" 。


// （图源：WikiMedia - Binary clock samui moon.jpg ，许可协议：Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) ）

// 给你一个整数 turnedOn ，表示当前亮着的 LED 的数量，返回二进制手表可以表示的所有可能时间。你可以 按任意顺序 返回答案。

// 小时不会以零开头：

// 例如，"01:00" 是无效的时间，正确的写法应该是 "1:00" 。
// 分钟必须由两位数组成，可能会以零开头：

// 例如，"10:2" 是无效的时间，正确的写法应该是 "10:02" 。
 

// 示例 1：

// 输入：turnedOn = 1
// 输出：["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
// 示例 2：

// 输入：turnedOn = 9
// 输出：[]
 

// 提示：

// 0 <= turnedOn <= 10

/**
 * @description 回溯
 * @param {number} turnedOn
 * @return {string[]}
 */
var readBinaryWatch = function(turnedOn) {
  const ans = []
  // 看灯有多少种方法亮 0000:000000 上面最多3个 下面最多5个
  // nums-当前亮灯个数 cur-当前需要点亮path中的哪个位置的灯 path-存储10个灯的点亮情况
  const dfs = (nums, cur, path) => {
    if (nums === turnedOn) {
      let hour = path[0] + path[1] * 2 + path[2] * 4 + path[3] * 8
      let min = path[4] + path[5] * 2 + path[6] * 4 + path[7] * 8 + path[8] * 16 + path[9] * 32
      if (hour < 12 && min < 60) {
        ans.push(hour + ':' + (min < 10 ? '0' : '') + min)
      }
      return
    }
    // 从 cur 开始 点亮后面的灯
    for (let i = cur; i < 10; i++) {
      path[i] = 1
      dfs(nums + 1, i + 1, path)
      path[i] = 0
    }
  }
  // 初始都不亮 准备点亮第0个灯
  dfs(0, 0, new Array(10).fill(0))
  return ans
};

/**
 * @param {number} turnedOn
 * @return {string[]}
 */
var readBinaryWatch = function(turnedOn) {
  const ans = []
  for (let i = 0; i < 1024; i++) {
    // 高4位是小时 低6位是分钟
    let hour = i >> 6, min = i & 63
    if (hour < 12 && min < 60 && i.toString(2).split('0').join('').length === turnedOn) {
      ans.push(hour + ':' + (min < 10 ? '0' : '') + min)
    }
  }
  return ans
};

/**
 * @param {number} turnedOn
 * @return {string[]}
 */
var readBinaryWatch = function(turnedOn) {
  let ans = []
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 60; j++) {
      if (i.toString(2).split('0').join('').length + j.toString(2).split('0').join('').length === turnedOn) {
        ans.push(`${i}:${j < 10 ? `0${j}` : j}`)
      }
    }
  }
  return ans
};
