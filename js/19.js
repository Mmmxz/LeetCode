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
  // 思路：定义一个结点 p 指向要删除结点的前一个结点（方便删除操作），再定义一个结点 q 固定指向 null ，可知两结点的距离固定为 n+1 从头开始循环链表 首先将 q 右移，当 pq 距离为 n+1 时， 两结点同时向右移 直到 q 结点指向 null ，此时 p 结点指向要删除结点的前一个结点，做删除操作即可
  // 1.创建虚拟头指针 指向头节点 head
  let dummyNode = new ListNode(0, head)
  // 2.创建指针 p 和 q ， p 是左指针 q 是右指针
  let p = dummyNode
  let q = dummyNode
  // 3.循环 n+1 次， q 向右移，直到 pq 之间的距离 == n+1 ，即 p 指向 null 节点时 q 是要删除节点的前一个结点
  for (let i = 0; i < n + 1; i++) {
      q = q.next
  }
  // 4.同时往后移 直到 q 指向 null 此时 p 是要删除结点的前一个结点
  while (q) {
      p = p.next
      q = q.next
  }
  // 5.删除目标结点
  p.next = p.next.next
  return dummyNode.next
};

var removeNthFromEnd = function(head, n) {
  // 基础解法 需要两趟扫描
  // 思路：第一趟扫描得知链表总长度，第二趟扫描 length-n 找到倒数第 n 个结点 将其删除
  // 1.循环链表 得到链表长度
  let length = 0
  let curNode = head
  while (curNode) {
      curNode = curNode.next
      length++
  }
  // 2.创建虚拟头结点
  let dummyNode = new ListNode(0, head)
  // 3.循环 length-n 次使得 cur 结点移动到要删除结点的前一位
  let cur = dummyNode
  for (let i = 0; i < length - n; i++) {
      cur = cur.next
  }
  // 4.删除目标结点
  cur.next = cur.next.next
  return dummyNode.next
};