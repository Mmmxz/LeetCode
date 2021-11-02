// 234. 回文链表
// 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

 

// 示例 1：


// 输入：head = [1,2,2,1]
// 输出：true
// 示例 2：


// 输入：head = [1,2]
// 输出：false
 

// 提示：

// 链表中节点数目在范围[1, 105] 内
// 0 <= Node.val <= 9
 

// 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  if (!head) return true
  // 快慢指针 找到中点 将head到慢指针反转 然后从快慢指针同时开始比较即可

  // 找到前半部分链表的尾节点并反转后半部分链表
  const firstHalfEnd = endOfFirstHalf(head)
  const secondHalfStart = reverseLinked(firstHalfEnd.next);
  // 判断是否回文
  let p1 = head, p2 = secondHalfStart
  while (p2) {
    if (p1.val !== p2.val) return false
    p1 = p1.next
    p2 = p2.next
  }
  return true
};

const endOfFirstHalf = (head) => {
  let dummy = new ListNode(-1, head)
  let slow = dummy, fast = dummy
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}

const reverseLinked = (head) => {
  let cur = head, prev = null
  while (cur) {
    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}



// 分割线

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  if (!head) return true
  // 快慢指针 找到中点 将head到慢指针反转 然后从快慢指针同时开始比较即可

  // 找到前半部分链表的尾节点并反转后半部分链表
  const firstHalfEnd = endOfFirstHalf(head)
  const secondHalfStart = reverseLinked(firstHalfEnd.next);
  // 判断是否回文
  let p1 = head, p2 = secondHalfStart
  let result = true;
  while (result && p2) {
    if (p1.val !== p2.val) result = false
    p1 = p1.next
    p2 = p2.next
  }
  // 恢复链表
  firstHalfEnd.next = reverseLinked(secondHalfStart)
  return result
};

const endOfFirstHalf = (head) => {
  let dummy = new ListNode(-1, head)
  let slow = dummy, fast = dummy
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}

const reverseLinked = (head) => {
  let cur = head, prev = null
  while (cur) {
    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}
