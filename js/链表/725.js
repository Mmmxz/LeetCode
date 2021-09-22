// 725. 分隔链表
// 给你一个头结点为 head 的单链表和一个整数 k ，请你设计一个算法将链表分隔为 k 个连续的部分。

// 每部分的长度应该尽可能的相等：任意两部分的长度差距不能超过 1 。这可能会导致有些部分为 null 。

// 这 k 个部分应该按照在链表中出现的顺序排列，并且排在前面的部分的长度应该大于或等于排在后面的长度。

// 返回一个由上述 k 部分组成的数组。

 
// 示例 1：


// 输入：head = [1,2,3], k = 5
// 输出：[[1],[2],[3],[],[]]
// 解释：
// 第一个元素 output[0] 为 output[0].val = 1 ，output[0].next = null 。
// 最后一个元素 output[4] 为 null ，但它作为 ListNode 的字符串表示是 [] 。
// 示例 2：


// 输入：head = [1,2,3,4,5,6,7,8,9,10], k = 3
// 输出：[[1,2,3,4],[5,6,7],[8,9,10]]
// 解释：
// 输入被分成了几个连续的部分，并且每部分的长度相差不超过 1 。前面部分的长度大于等于后面部分的长度。
 

// 提示：

// 链表中节点的数目在范围 [0, 1000]
// 0 <= Node.val <= 1000
// 1 <= k <= 50

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function(head, k) {
  // 如何分 计算链表的长度n
  // 分成k份 如果n>k 每份的长度n/k 再将余数依次加到前面
  // 如果n<k 则不足的设置为null
  let len = 0, temp = head
  while (temp) {
    len++
    temp = temp.next
  }
  const ans = new Array(k).fill(null)
  temp = head
  // 无需比较 len 和 k
  let avg = Math.floor(len / k) // 平均每份几个 如果len<k 则为0
  let mod = len % k // 求余 有mod个答案的长度需要从前往后依次增加1
  let arr = new Array(k).fill(avg) // [3,3,3] 保存每个答案的长度
  for (let i = 0; i < mod; i++) {
    arr[i] += 1
  }
  // arr -> [4, 3, 3]
  for (let i = 0; i < k; i++) {
    // ans[i]的长度为arr[i]
    let dummy = new ListNode(), cur = dummy
    while (arr[i]) { // 4 3 3
      const node = new ListNode(temp.val)
      temp = temp.next
      cur.next = node
      cur = cur.next
      arr[i]--
    }
    ans[i] = dummy.next
  }
  return ans
};
