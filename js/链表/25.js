// 25. K 个一组翻转链表
// 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

// k 是一个正整数，它的值小于或等于链表的长度。

// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

// 进阶：

// 你可以设计一个只使用常数额外空间的算法来解决此问题吗？
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 

// 示例 1：


// 输入：head = [1,2,3,4,5], k = 2
// 输出：[2,1,4,3,5]
// 示例 2：


// 输入：head = [1,2,3,4,5], k = 3
// 输出：[3,2,1,4,5]
// 示例 3：

// 输入：head = [1,2,3,4,5], k = 1
// 输出：[1,2,3,4,5]
// 示例 4：

// 输入：head = [1], k = 1
// 输出：[1]
// 提示：

// 列表中节点的数量在范围 sz 内
// 1 <= sz <= 5000
// 0 <= Node.val <= 1000
// 1 <= k <= sz

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
 var reverseKGroup = function(head, k) {
  // 虚拟头结点
  const dummyNode = new ListNode(-1, head)
  // 每组翻转需要一个start 一个end 还需要一个prev 一个next
  let prev = dummyNode, start = head, end = dummyNode
  while (start) {
    let count = k
    // end移动到这组的末尾
    while (count--) {
      end = end.next
      // 如果移动时 end为空了 说明这组不够k个 直接返回结果 无需翻转
      if (end === null) {
        return dummyNode.next
      }
    }
    // 翻转 start-end 注意，记得将翻转部分的末尾设置为null 断开后续的链表
    let next = end.next
    end.next = null
    reverse(start)
    // 翻转后 start指向结束 end指向开始 [end, start] 将他们和之前连起来
    prev.next = end
    start.next = next
    // 连起来后 将prev移动到[end, start]的start，end初始化到prev，start移动到next 继续下一轮
    prev = start
    end = prev
    start = next
  }
  return dummyNode.next
};

const reverse = (node) => {
  let cur = node, prev = null
  while (cur) {
    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}

// 思路
// 1.定义虚拟头结点，方便结束后返回结果
// 2.k个一组，一组一组来翻转，然后连接起来即可
// 3.定义start指向要反转的开头，end指向start前一个，end向后移动k次，[start,end]是这组要翻转的部分
// 4.定义prev指向start，定义next，end指向next，方便翻转一组后，将原先的链表连接起来
// 5.翻转[start,end]部分，变成[end,start]，然后将prev.next=end;start.next=next;此时第一组翻转完成
// 6.继续下一组翻转，将prev移动到start位置(重要！)，start移动到next位置，end初试到prev位置，继续循环……直到start为空或者end为空
// 7.返回虚拟头结点的next即可