// 1104. 二叉树寻路
// 在一棵无限的二叉树上，每个节点都有两个子节点，树中的节点 逐行 依次按 “之” 字形进行标记。

// 如下图所示，在奇数行（即，第一行、第三行、第五行……）中，按从左到右的顺序进行标记；

// 而偶数行（即，第二行、第四行、第六行……）中，按从右到左的顺序进行标记。



// 给你树上某一个节点的标号 label，请你返回从根节点到该标号为 label 节点的路径，该路径是由途经的节点标号所组成的。

 

// 示例 1：

// 输入：label = 14
// 输出：[1,3,4,14]
// 示例 2：

// 输入：label = 26
// 输出：[1,2,6,10,26]
 

// 提示：

// 1 <= label <= 10^6

/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function(label) {
  // 第4层的值 从8-15
  // 第i层的值 是从 2^(i-1) 到 2^i-1
  // 先判断在第几层 然后根据奇偶性找父节点
  let row = 1
  while (Math.pow(2, row) <= label) {
    row++
  }
  const ans = new Array(row).fill(0)
  // 找父节点 每个节点的父节点 是它对称位置 / 2
  // 每个位置和它对称位置之和为 2^i-1 + 2^(i-1)
  // 所以label的对称位置为 两位置之和sum - label
  while (row) {
    ans[row - 1] = label
    label = Math.floor((2 ** row - 1 + 2 ** (row - 1) - label) / 2)
    row--
  }
  return ans
};
