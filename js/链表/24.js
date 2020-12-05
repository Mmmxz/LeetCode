// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

//  

// 示例 1：https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg


// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]
// 示例 2：

// 输入：head = []
// 输出：[]
// 示例 3：

// 输入：head = [1]
// 输出：[1]
//  

// 提示：

// 链表中节点的数目在范围 [0, 100] 内
// 0 <= Node.val <= 100

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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
var swapPairs = function(head) {
  // 1.创建虚拟头结点指向 head
  let dummyNode = new ListNode(0, head)
  let prev = dummyNode
  // 2.由于要交换2个结点 所以判空需要判断两次 都存在才会进行交换操作
  while (prev.next && prev.next.next) {
    let node1 = prev.next
    let node2 = node1.next
    let next = node2.next // 可能为null
    // 3.exchange 交换结点指向 交换前 prev->node1->node2->next
    // node2->node1
    node2.next = node1
    // node1->next
    node1.next = next
    // prev->node2
    prev.next = node2
    // 交换完毕后 prev->node2->node1->next
    // 4.右移 prev 到 node1 的位置
    prev = node1
  }
  return dummyNode.next
};