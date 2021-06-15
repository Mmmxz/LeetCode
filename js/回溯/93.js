// 93. 复原 IP 地址
// 给定一个只包含数字的字符串，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址 。你可以按任何顺序返回答案。

// 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。

 

// 示例 1：

// 输入：s = "25525511135"
// 输出：["255.255.11.135","255.255.111.35"]
// 示例 2：

// 输入：s = "0000"
// 输出：["0.0.0.0"]
// 示例 3：

// 输入：s = "1111"
// 输出：["1.1.1.1"]
// 示例 4：

// 输入：s = "010010"
// 输出：["0.10.0.10","0.100.1.0"]
// 示例 5：

// 输入：s = "101023"
// 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 

// 提示：

// 0 <= s.length <= 3000
// s 仅由数字组成

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  const len = s.length
  if (len < 4 || len > 12) {
    return []
  }
  let ans = []
  const temp = new Array(4)
  /**
   * @param {number} cur 找第几段 [0, 3]
   * @param {number} start 从什么索引处开始找
   */
  const dfs = (cur, start) => {
    // 找完了4段地址 就不需要继续找了
    if (cur === 4) {
      // 此时遍历到s的末尾 说明是一组答案
      if (start === len) {
        ans.push(temp.join('.'))
      }
      return
    }
    // 没找完4段地址 但是已经到s的末尾了 不是答案
    if (start === len) {
      return
    }
    // 从 start 往后找下一个符合的数字
    // 如果当前位是0 则直接找下一位置
    if (s[start] === '0') {
      temp[cur] = 0
      dfs(cur + 1, start + 1)
    }
    // 如果当前位不是0 则找 (0,255]范围的所有情况
    let next = 0
    for (let i = start; i < len; i++) {
      next = next * 10 + Number(s[i])
      if (next > 0 && next <= 255) {
        temp[cur] = next
        dfs(cur + 1, i + 1)
      } else {
        // 当next为0时 不能继续拼接 否则会导致前导0的情况
        break
      }
    }
  }
  dfs(0, 0)
  return ans
};
