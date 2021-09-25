// 583. 两个字符串的删除操作
// 给定两个单词 word1 和 word2，找到使得 word1 和 word2 相同所需的最小步数，每步可以删除任意一个字符串中的一个字符。

 

// 示例：

// 输入: "sea", "eat"
// 输出: 2
// 解释: 第一步将"sea"变为"ea"，第二步将"eat"变为"ea"
 

// 提示：

// 给定单词的长度不超过500。
// 给定单词中的字符只含有小写字母。

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  // 找s1 s2的最长子序列
  // dp[i][j]代表s1从[0,i-1]结束与s2从[0,j-1]结束的最长子序列长度
  // return sum(len) - dp[len1][len2] * 2
  // s1[i]==s2[j],dp[i][j]=dp[i-1][j-1]+1; s1[i]!=s2[j],dp[i][j]=max(dp[i-1][j], dp[i][j-1])
  const len1 = word1.length, len2 = word2.length
  const dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0))
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return len1 + len2 - dp[len1][len2] * 2
};
