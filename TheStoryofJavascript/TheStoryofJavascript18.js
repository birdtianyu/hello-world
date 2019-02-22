/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-12 14:00:30
 * @LastEditTime: 2019-02-12 14:06:50
 * @Description: Math 对象
 */


/*
 * Math是 JavaScript 的原生对象，提供各种数学功能。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在Math对象上调用。 
 */

// 静态属性
Math.E       // 常数e。
Math.LN2     // 2 的自然对数。
Math.LN10    // 10 的自然对数。
Math.LOG2E   // 以 2 为底的e的对数。
Math.LOG10E  // 以 10 为底的e的对数。
Math.PI      // 常数π。
Math.SQRT1_2 //0.5 的平方根。
Math.SQRT2   //2 的平方根。

// 静态方法
Math.abs();    // 绝对值
Math.ceil();   // 向上取整（天花板值）
Math.round();  // 四舍五入
Math.floor();  // 向下取整（地板值）
Math.max();    // 最大值
Math.min();    // 最小值
Math.pow();    // 指数运算
Math.sqrt();   // 平方根
Math.log();    // 自然对数
Math.exp();    // e的指数
Math.random(); // 随机数

// Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。

Math.sin();    // 返回参数的正弦（参数为弧度值）
Math.cos();    // 返回参数的余弦（参数为弧度值）
Math.tan();    // 返回参数的正切（参数为弧度值）
Math.asin();   // 返回参数的反正弦（返回值为弧度值）
Math.acos();   // 返回参数的反余弦（返回值为弧度值）
Math.atan();   // 返回参数的反正切（返回值为弧度值）