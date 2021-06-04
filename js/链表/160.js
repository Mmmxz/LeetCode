// 160. 相交链表
// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

// 图示两个链表在节点 c1 开始相交：



// 题目数据 保证 整个链式结构中不存在环。

// 注意，函数返回结果后，链表必须 保持其原始结构 。

 

// 示例 1：



// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
// 输出：Intersected at '8'
// 解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
// 在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
// 示例 2：



// 输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
// 输出：Intersected at '2'
// 解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。
// 在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
// 示例 3：



// 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
// 输出：null
// 解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
// 由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
// 这两个链表不相交，因此返回 null 。
 

// 提示：

// listA 中节点数目为 m
// listB 中节点数目为 n
// 0 <= m, n <= 3 * 104
// 1 <= Node.val <= 105
// 0 <= skipA <= m
// 0 <= skipB <= n
// 如果 listA 和 listB 没有交点，intersectVal 为 0
// 如果 listA 和 listB 有交点，intersectVal == listA[skipA + 1] == listB[skipB + 1]
 

// 进阶：你能否设计一个时间复杂度 O(n) 、仅用 O(1) 内存的解决方案？

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @description hash表来查找
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  // 相交的含义是节点完全相等
  let memo = new Set()
  while (headA) {
    memo.add(headA)
    headA = headA.next
  }
  while (headB) {
    if (memo.has(headB)) {
      return headB
    }
    headB = headB.next
  }
  return null
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @description 朴素解法
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  // 计算链表的长度 让较长先移动一定距离 保持和较短的相等 然后同时移动 比较节点是否相等
  // 注意 计算长度时不能用 headA 因为节点会一直移动到末尾
  let lenA = 0, lenB = 0, curA = headA, curB = headB
  while (curA) {
    lenA++
    curA = curA.next
  }
  while (curB) {
    lenB++
    curB = curB.next
  }
  // 较大的节点移动diff长度
  let diff = Math.abs(lenB - lenA)
  while (diff--) {
    if (lenB > lenA) {
      headB = headB.next
    } else {
      headA = headA.next
    }
  }
  // 对比节点
  while (headA && headB) {
    if (headA === headB) {
      return headA
    }
    headA = headA.next
    headB = headB.next
  }
  return null
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @description 双指针
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
  // 两个指针 走各自链表 走完之后 继续走另一个链表 即一个是 headA->headB 一个是 headB->headA 走第二段时 比较pq相等 即是相交节点
  if (headA === null || headB === null) {
    return null
  }
  let p = headA, q = headB
  while (p !== q) {
    if (p) {
      p = p.next
    } else {
      p = headB
    }
    if (q) {
      q = q.next
    } else {
      q = headA
    }
  }
  return p
};