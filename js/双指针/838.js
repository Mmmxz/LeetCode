// 838. 推多米诺
// n 张多米诺骨牌排成一行，将每张多米诺骨牌垂直竖立。在开始时，同时把一些多米诺骨牌向左或向右推。

// 每过一秒，倒向左边的多米诺骨牌会推动其左侧相邻的多米诺骨牌。同样地，倒向右边的多米诺骨牌也会推动竖立在其右侧的相邻多米诺骨牌。

// 如果一张垂直竖立的多米诺骨牌的两侧同时有多米诺骨牌倒下时，由于受力平衡， 该骨牌仍然保持不变。

// 就这个问题而言，我们会认为一张正在倒下的多米诺骨牌不会对其它正在倒下或已经倒下的多米诺骨牌施加额外的力。

// 给你一个字符串 dominoes 表示这一行多米诺骨牌的初始状态，其中：

// dominoes[i] = 'L'，表示第 i 张多米诺骨牌被推向左侧，
// dominoes[i] = 'R'，表示第 i 张多米诺骨牌被推向右侧，
// dominoes[i] = '.'，表示没有推动第 i 张多米诺骨牌。
// 返回表示最终状态的字符串。

 
// 示例 1：

// 输入：dominoes = "RR.L"
// 输出："RR.L"
// 解释：第一张多米诺骨牌没有给第二张施加额外的力。
// 示例 2：


// 输入：dominoes = ".L.R...LR..L.."
// 输出："LL.RR.LLRRLL.."
 

// 提示：

// n == dominoes.length
// 1 <= n <= 105
// dominoes[i] 为 'L'、'R' 或 '.'


/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function(dominoes) {
  dominoes = 'L' + dominoes + 'R'
  let l = 0, res = []
  // [l,r)
  for (let r = l; r < dominoes.length; r++) {
    if (dominoes[r] === '.') {
      continue
    }
    // 虚拟的L不放入结果
    if (l !== 0) {
      res.push(dominoes[l])
    }
    let mid = r - l - 1 // 区间有多少个'.'
    if (dominoes[l] === dominoes[r]) {
      // L......L R......R
      for (let i = 0; i < mid; i++) {
        res.push(dominoes[l])
      }
    } else if (dominoes[l] === 'L' && dominoes[r] === 'R') {
      // L......R
      for (let i = 0; i < mid; i++) {
        res.push('.')
      }
    } else {
      // R......L 可能为RRRLLL RRR.LLL
      for (let i = 0; i < Math.floor(mid / 2); i++) {
        res.push('R')
      }
      if (mid % 2 === 1) {
        res.push('.')
      }
      for (let i = 0; i < Math.floor(mid / 2); i++) {
        res.push('L')
      }
    }
    l = r
  }
  return res.join('')
};
