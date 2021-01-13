// 2. 两数相加
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

// 请你将两个数相加，并以相同形式返回一个表示和的链表。

// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

 

// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.
// 示例 2：

// 输入：l1 = [0], l2 = [0]
// 输出：[0]
// 示例 3：

// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]
 

// 提示：

// 每个链表中的节点数在范围 [1, 100] 内
// 0 <= Node.val <= 9
// 题目数据保证列表表示的数字不含前导零

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  // 1.创建 sumHead 存储结果 sumNode 用于相加时依次移动到要处理的位置 ten 存储进位值
  let sumHead = new ListNode(0, null)
  let sumNode = sumHead
  let ten = 0
  // 2.循环链表 依次相加
  while(l1 || l2) {
    // 3.tempNode 存储当前和的节点
    let tempNode = new ListNode(0, null)
    // 4.求和 并将链表指针右移
    let sum = 0
    if (l1 && l2) {
      sum = l1.val + l2.val
      l1 = l1.next
      l2 = l2.next
    } else if (l1) {
      sum = l1.val
      l1 = l1.next
    } else {
      sum = l2.val
      l2 = l2.next
    }
    // 5.进位存在时 代表上一次的和超过 10 此时将当前值加上进位
    if (ten) {
      sum += ten
      // 6.进位用一次后 重置为0
      ten = 0
    }
    // 7.两数之和是两位数时 分别取出个位和十位
    let unit = sum % 10
    if (sum > 9) {
      // 十位有多种取法
      // ten = sum - unit - 9
      ten = Math.trunc(sum / 10)
    }
    // 8.将计算的个位赋给当前节点 将其拼接在结果链表后面
    tempNode.val = unit
    sumNode.next = tempNode
    sumNode = sumNode.next
  }
  // 9.最后计算完 如果最后一次产生了进位 要将其加入结果中
  if (ten) {
    let end = new ListNode(ten, null)
    sumNode.next = end
  }
  return sumHead.next
};