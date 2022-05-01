// 1305. 两棵二叉搜索树中的所有元素
// 给你 root1 和 root2 这两棵二叉搜索树。请你返回一个列表，其中包含 两棵树 中的所有整数并按 升序 排序。.

 

// 示例 1：



// 输入：root1 = [2,1,4], root2 = [1,0,3]
// 输出：[0,1,1,2,3,4]
// 示例 2：



// 输入：root1 = [1,null,8], root2 = [8,1]
// 输出：[1,1,8,8]
 

// 提示：

// 每棵树的节点数在 [0, 5000] 范围内
// -105 <= Node.val <= 105

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function(root1, root2) {
    let temp = []
    const mid = (node) => {
        if (!node) return null
        mid(node.left)
        temp.push(node.val)
        mid(node.right)
    }
    mid(root1)
    let arr1 = temp
    temp = []
    mid(root2)
    let arr2 = temp
    // 合并两个有序数组
    const n1 = arr1.length, n2 = arr2.length
    const n = n1 + n2
    let arr = new Array(n).fill(0)
    let i = 0, j = 0, k = 0
    while (i < n1 || j < n2) {
        if (i < n1 && j < n2) {
            if (arr1[i] < arr2[j]) {
                arr[k] = arr1[i]
                i++
            } else {
                arr[k] = arr2[j]
                j++
            }
        } else if (i < n1) {
            arr[k] = arr1[i]
            i++
        } else if (j < n2) {
            arr[k] = arr2[j]
            j++
        }
        k++
    }
    return arr
};
