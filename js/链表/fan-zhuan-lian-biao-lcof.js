// 剑指 Offer 24. 反转链表
// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

 

// 示例:

// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
 

// 限制：

// 0 <= 节点个数 <= 5000

 

// 注意：本题与主站 206 题相同：https://leetcode-cn.com/problems/reverse-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let dummyNode = new ListNode(0)
  dummyNode.next = head
  let prev = null
  let cur = dummyNode.next
  while(cur) {
    let next = cur.next
    cur.next = prev

    prev = cur
    cur = next
  }
  return prev
};