// 实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。

// 注意：本题相对原题稍作改动

// 示例：

// 输入： 1->2->3->4->5 和 k = 2
// 输出： 4
// 说明：

// 给定的 k 保证是有效的。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci
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
 * @param {number} k
 * @return {number}
 */
var kthToLast = function(head, k) {
  // 两次遍历
  let length = 0
  let cur = head
  while (cur) {
      cur = cur.next
      length++
  }
  let curNode = head
  for (let i = 0; i < length - k; i++) {
    curNode = curNode.next
  }
  return curNode.val
};