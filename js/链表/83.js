// 83. 删除排序链表中的重复元素
// 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

// 示例 1:

// 输入: 1->1->2
// 输出: 1->2
// 示例 2:

// 输入: 1->1->2->3->3
// 输出: 1->2->3

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  const dummyNode = new ListNode(0, head)
  let cur = dummyNode.next
  while(cur) {
    const next = cur.next
    if (next && next.val === cur.val) {
      // 删除 next 继续与下一个节点比较
      cur.next = next.next
    } else {
      // 没有删除时 cur 右移
      cur = cur.next
    }
  }
  return dummyNode.next
};