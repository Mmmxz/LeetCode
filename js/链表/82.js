// 82. 删除排序链表中的重复元素 II
// 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中 没有重复出现 的数字。

// 返回同样按升序排列的结果链表。

 

// 示例 1：


// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]
// 示例 2：


// 输入：head = [1,1,1,2,3]
// 输出：[2,3]
 

// 提示：

// 链表中节点数目在范围 [0, 300] 内
// -100 <= Node.val <= 100
// 题目数据保证链表已经按升序排列

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
// 思路 1 ：定义前置的prev节点来删除与cur重复的节点
 var deleteDuplicates = function(head) {
  let dummy = new ListNode(0)
  dummy.next = head
  let prev = dummy
  let cur = prev.next
  while (cur) {
    let flag = false // 是否有重复节点
    let next = cur.next
    // 重复节点 前一个直接指向next的next while之后next指向下一个非重复节点
    while (next && next.val === cur.val) {
      flag = true
      next = next.next
    }
    if (flag) {
      // 删除重复节点
      prev.next = next
      cur = prev.next
    } else {
      // 非重复节点
      prev = cur
      cur = cur.next
    }
  }
  return dummy.next
};


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
// 思路 2 ：删除cur之后的节点
 var deleteDuplicates = function(head) {
  let dummy = new ListNode(0)
  dummy.next = head
  let cur = dummy
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      // 发现重复节点 不能直接删 要继续往后找
      const x = cur.next.val
      while (cur.next && cur.next.val === x) {
        // 在while中删除cur.next
        cur.next = cur.next.next
      }
    } else {
      // 不需要删除
      cur = cur.next
    }
  }
  return dummy.next
};