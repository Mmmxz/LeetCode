// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

// 说明:
// 1 ≤ m ≤ n ≤ 链表长度。

// 示例:

// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reverse-linked-list-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  // 1.创建虚拟头结点
  let dummyNode = new ListNode(0)
  dummyNode.next = head
  let prev = dummyNode
  // 2.循环 m-1 次 使 cur 指向 m 处结点， prev 指向 m-1 处结点
  for (let i = 1; i < m; i++) {
    prev = prev.next
  }
  let cur = prev.next
  // 3.循环 n-m 次
  for (let i = m; i < n; i++) {
    // 第一次循环 next(3) 第二次循环 next(4)
    let next = cur.next
    // 第一次循环 cur(2)->next(3).next(4) 第二次循环 cur(2)->next(4).next(5)
    cur.next = next.next
    // 下句只有第一次循环时等同于 next.next = cur(2) 因为反转后的结点应该指向 prev 之后 所以 next.next 应该指向 prev.next
    // 第一次循环 next(3)->prev(1).next(2) 第二次循环 next(4)->prev(1).next(3)
    next.next = prev.next
    // 第一次循环 prev(1)->next(3) 第二次循环 prev(1)->next(4)
    prev.next = next
    // 第一次循环 1->3->2->4->5 第二次循环 1->4->3->2->5
  }
  return dummyNode.next
};

// 实现思路：头插法 以1->2->3->4->5, m = 2, n=4 为例:

// 定位到要反转部分的头节点 2，head = 2；前驱结点 1，pre = 1；
// 当前节点的下一个节点3调整为前驱节点的下一个节点 1->3->2->4->5
// 当前结点仍为2， 前驱结点依然是1，重复上一步操作...
// 1->4->3->2->5.