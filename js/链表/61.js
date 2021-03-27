// 61. 旋转链表
// 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

 

// 示例 1：


// 输入：head = [1,2,3,4,5], k = 2
// 输出：[4,5,1,2,3]
// 示例 2：


// 输入：head = [0,1,2], k = 4
// 输出：[2,0,1]
 

// 提示：

// 链表中节点的数目在范围 [0, 500] 内
// -100 <= Node.val <= 100
// 0 <= k <= 2 * 109

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
 * @return {ListNode}
 */
 var rotateRight = function(head, k) {
  // 1.先计算链表长度 调用k%n次即可 同时保存链表的最后一个元素 方便后面旋转使用
  let length = 0
  let prevEnd = new ListNode(0, head)
  let end = prevEnd.next
  while (end) {
    length++
    prevEnd = prevEnd.next
    end = end.next
  }
  const sliceLen = k % length
  // ps.如果移动位置和长度相等 直接返回原链表即可
  if (sliceLen === 0) {
    return head
  }
  // 2.截取倒数第sliceLen长度的链表
  let prev = new ListNode(0, head)
  for (let i = 0; i < length - sliceLen; i++) {
    prev = prev.next
  }
  // 3.循环之后 prev指向要截取的前一个节点 prev.next指向截取部分的开头 记得将要截取部分之前的链表指向null 代表结束
  let trueHead = prev.next
  prev.next = null
  // 4.将截取部分的结尾指向开头 并返回新的链表即可
  prevEnd.next = head
  return trueHead
};