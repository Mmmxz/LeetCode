// 423. 从英文中重建数字
// 给你一个字符串 s ，其中包含字母顺序打乱的用英文单词表示的若干数字（0-9）。按 升序 返回原始的数字。

 

// 示例 1：

// 输入：s = "owoztneoer"
// 输出："012"
// 示例 2：

// 输入：s = "fviefuro"
// 输出："45"
 

// 提示：

// 1 <= s.length <= 105
// s[i] 为 ["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"] 这些字符之一
// s 保证是一个符合题目要求的字符串

/**
 * @param {string} s
 * @return {string}
 */
var originalDigits = function(s) {
  // s有若干个上面的单词 需要转换为数字
  // 依次判断s是否包含0-9
  let memo = new Array(26).fill(0)
  for (const char of s) {
    memo[char.charCodeAt() - 'a'.charCodeAt()]++
  }
  const zeros = memo['z'.charCodeAt() - 'a'.charCodeAt()], twos = memo['w'.charCodeAt() - 'a'.charCodeAt()], 
        fours = memo['u'.charCodeAt() - 'a'.charCodeAt()], sixs = memo['x'.charCodeAt() - 'a'.charCodeAt()], 
        eights = memo['g'.charCodeAt() - 'a'.charCodeAt()];
  const fives = memo['f'.charCodeAt() - 'a'.charCodeAt()] - fours,
        sevens = memo['s'.charCodeAt() - 'a'.charCodeAt()] - sixs,
        ones = memo['o'.charCodeAt() - 'a'.charCodeAt()] - zeros - twos - fours, 
        threes = memo['h'.charCodeAt() - 'a'.charCodeAt()] - eights;
  const nines = memo['i'.charCodeAt() - 'a'.charCodeAt()] - fives - sixs - eights;
  return "0".repeat(zeros) + "1".repeat(ones) + "2".repeat(twos) + "3".repeat(threes) + "4".repeat(fours) + "5".repeat(fives) + "6".repeat(sixs) + "7".repeat(sevens) + "8".repeat(eights) + "9".repeat(nines);
};
