// 12. 整数转罗马数字
// 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。

// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// 给你一个整数，将其转为罗马数字。

 

// 示例 1:

// 输入: num = 3
// 输出: "III"
// 示例 2:

// 输入: num = 4
// 输出: "IV"
// 示例 3:

// 输入: num = 9
// 输出: "IX"
// 示例 4:

// 输入: num = 58
// 输出: "LVIII"
// 解释: L = 50, V = 5, III = 3.
// 示例 5:

// 输入: num = 1994
// 输出: "MCMXCIV"
// 解释: M = 1000, CM = 900, XC = 90, IV = 4.
 

// 提示：

// 1 <= num <= 3999

/**
 * @param {number} num
 * @return {string}
 */
 var intToRoman = function(num) {
  // 生成重复个相同的字符可以用array的join方法 将字符作为分隔符加入 分隔符的数量等于数组长度-1 比如生成5个'a' new Array(6).join('a')
  let map = ['I', 'X', 'C', 'M'], map5 = ['V', 'L', 'D']
  // 从个位依次向上循环数字 0代表个位 1代表十位..
  let ans = '', digit = 0
  while (num) {
    let cur = num % 10
    num = Math.trunc(num / 10)
    if (cur < 4) {
      ans = new Array(cur + 1).join(map[digit]) + ans
    } else if (cur === 4) {
      ans = map[digit] + map5[digit] + ans
    } else if (cur === 5) {
      ans = map5[digit] + ans
    } else if (cur < 9) {
      ans = map5[digit] + new Array(cur + 1 - 5).join(map[digit]) + ans
    } else {
      ans = map[digit] + map[digit + 1] + ans
    }
    digit++
  }
  return ans
};