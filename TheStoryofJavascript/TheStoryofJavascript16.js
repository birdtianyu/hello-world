/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-12 11:38:21
 * @LastEditTime: 2019-02-12 11:59:51
 * @Description: 三大包装对象之: Number对象
 */

var n = new Number(1);
console.log(typeof n); // "object"

// 1. Number对象的静态属性
Number.POSITIVE_INFINITY // 正的无限，指向Infinity
Number.NEGATIVE_INFINITY // 负的无限，指向-Infinity
Number.NaN               // 表示非数值，指向NaN

Number.MAX_VALUE
// 1.7976931348623157e+308
Number.MAX_VALUE < Infinity
// true

Number.MIN_VALUE         // 最小的正数（即最接近0的正数）
// 5e-324
Number.MIN_VALUE > 0
// true

Number.MAX_SAFE_INTEGER // 能够精确表示的最大整数: 9007199254740991
Number.MIN_SAFE_INTEGER // 能够精确表示的最小整数: -9007199254740991


// 2. 实例方法
// Number对象有4个实例方法，都跟将数值转换成指定格式有关。

// A. Number.prototype.toString()
// Number对象部署了自己的toString方法，用来将一个数值转为字符串形式。
(10).toString();   // "10"  默认十进制
(10).toString(2);  // "1010" 二进制
(10).toString(8);  // "12"   八进制
(10).toString(16); // "a"   十六进制

// 如果不加括号，这个点会被 JavaScript 引擎解释成小数点，从而报错。
10.toString(2);
// SyntaxError: Unexpected token ILLEGAL
// 只要能够让 JavaScript 引擎不混淆小数点和对象的点运算符，各种写法都能用。
// JavaScript 会把第一个点理解成小数点（即10.0）
10..toString(2);  // "1010"
10 .toString(2);  // "1010"
10.0.toString(2); // "1010"

// 这实际上意味着，可以直接对一个小数使用toString方法。
10.5.toString(); // "10.5"
10.5.toString(2); // "1010.1"
10.5.toString(8); // "12.4"
10.5.toString(16); // "a.8"
// toString方法只能将十进制的数，转为其他进制的字符串。如果要将其他进制的数，转回十进制，需要使用parseInt方法。


// B. Number.prototype.toFixed()
// toFixed方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。
(10).toFixed(2); // "10.00"
10.005.toFixed(2); // "10.01"
// toFixed方法的参数为小数位数，有效范围为0到20，超出这个范围将抛出 RangeError 错误。



// C. Number.prototype.toExponential()
// toExponential方法用于将一个数转为科学计数法形式。
(10).toExponential();  // "1e+1"
(10).toExponential(1); // "1.0e+1"
(10).toExponential(2); // "1.00e+1"

(1234).toExponential();  // "1.234e+3"
(1234).toExponential(1); // "1.2e+3"
(1234).toExponential(2); // "1.23e+3"
// 参数是小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个 RangeError 错误。

// D. Number.prototype.toPrecision()
// toPrecision方法用于将一个数转为指定位数的有效数字。
(12.34).toPrecision(1); // "1e+1"
(12.34).toPrecision(2); // "12"
(12.34).toPrecision(3); // "12.3"
(12.34).toPrecision(4); // "12.34"
(12.34).toPrecision(5); // "12.340"


// 自定义方法
Number.prototype.iterate = function () {
    var result = [];
    for (let index = 0; index < this.valueOf(); index++) {
        result.push(index);
    }
    return result;
};

(8).iterate();
// [0, 1, 2, 3, 4, 5, 6, 7]
