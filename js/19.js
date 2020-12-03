// 19. 删除链表的倒数第N个节点
// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

// 示例：

// 给定一个链表: 1->2->3->4->5, 和 n = 2.

// 当删除了倒数第二个节点后，链表变为 1->2->3->5.
// 说明：

// 给定的 n 保证是有效的。

// 进阶：

// 你能尝试使用一趟扫描实现吗？

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  // 双指针解法 只需要一趟扫描
  // 创建虚拟头指针 指向头节点 head
  let dummyNode = new ListNode(0, head)
  // 创建指针 p 和 q ， p 是左指针 q是右指针
  let p = dummyNode
  let q = dummyNode
  // 循环 n+1 次， q 向右移，直到 pq 之间的距离 == n+1 ，即 p 指向 null 节点时 q 是要删除节点的前一个结点
  for (let i = 0; i < n + 1; i++) {
      q = q.next
  }
  // 同时往后移 直到 q 指向 null 此时 p 是要删除结点的前一个结点
  while (q) {
      p = p.next
      q = q.next
  }
  // 删除 p 结点的后一个结点
  p.next = p.next.next
  // 返回真正的头结点
  return dummyNode.next
};