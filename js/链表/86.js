// 86. 分隔链表
// 给你一个链表和一个特定值 x ，请你对链表进行分隔，使得所有小于 x 的节点都出现在大于或等于 x 的节点之前。

// 你应当保留两个分区中每个节点的初始相对位置。

 

// 示例：

// 输入：head = 1->4->3->2->5->2, x = 3
// 输出：1->2->2->4->3->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  // 1.small 是较小数链表的尾部 smallHead 是较小数链表的头部 large 是较大数链表的尾部 largeHead 是较大数链表的头部
  let small = new ListNode(0)
  small.next = head
  let smallHead = small
  let large = new ListNode(0)
  large.next = head
  let largeHead = large
  // 2.循环链表 拆分出较大和较小的链表
  while(head) {
    if (head.val < x) {
      // 2.1.指向当前节点
      small.next = head
      small = small.next
    } else {
      large.next = head
      large = large.next
    }
    head = head.next
  }
  // 3.连接两个链表
  small.next = largeHead.next
  large.next = null
  return smallHead.next
};