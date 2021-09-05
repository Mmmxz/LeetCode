// 470. 用 Rand7() 实现 Rand10()
// 已有方法 rand7 可生成 1 到 7 范围内的均匀随机整数，试写一个方法 rand10 生成 1 到 10 范围内的均匀随机整数。

// 不要使用系统的 Math.random() 方法。

 

// 示例 1:

// 输入: 1
// 输出: [7]
// 示例 2:

// 输入: 2
// 输出: [8,4]
// 示例 3:

// 输入: 3
// 输出: [8,1,10]
 

// 提示:

// rand7 已定义。
// 传入参数: n 表示 rand10 的调用次数。
 

// 进阶:

// rand7()调用次数的 期望值 是多少 ?
// 你能否尽量少调用 rand7() ?

/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
var rand10 = function() {
  let res = rand2()
  for (let i = 0; i < 3; i++) {
    res <<= 1
    res ^= rand2()
  }
  // res可能生成0000 0001 ... 1111 即 0-15 的结果 需要筛选在[1,10]范围内的结果
  return (res <= 10 && res > 0) ? res : rand10()
};

const rand2 = () => {
  // 123456 返回0或1
  let res = rand7()
  return res === 7 ? rand2() : res % 2
}
