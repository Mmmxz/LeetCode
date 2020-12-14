// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

 

// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: s = "bbbbb"
// 输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// 示例 4:

// 输入: s = ""
// 输出: 0
 

// 提示：

// 0 <= s.length <= 5 * 104
// s 由英文字母、数字、符号和空格组成

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 滑动窗口
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // 1.定义闭区间 [l...r] res 存储最长子串长度
    let l = 0, r = -1, res = 0
    // 2.Set 结构用于判断窗口对应子串中是否包含指定的字符
    let freq = new Set()
    // 3.当左边界到达字符串末尾时终止
    while(l < s.length) {
        // 4.r 向后移动一位 增加窗口大小
        if (r + 1 < s.length && !freq.has(s[r + 1])) {
            // 5.1.当窗口对应子串不包含下一位字符时 将其纳入窗口 指针后移
            freq.add(s[++r])
        } else {
            // 5.2.当窗口对应子串包含下一位字符时 l 向前移动一位 窗口长度减一
            freq.delete(s[l++])
        }
        // 6. 结果取当前子串长度和之前存储长度的最大值
        res = Math.max(res, r-l+1)
    }
    return res
};
