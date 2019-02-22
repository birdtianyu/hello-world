/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-07 15:50:50
 * @LastEditTime: 2019-02-11 08:50:11
 * @Description: 数值: null -> 0, undefined -> NaN
 */

/*
1.null表示该处的值暂时为空
2.undefined表示“未定义”
*/

// null是一个表示“空”的对象，转为数值时为0
Number(null); // 0
console.log(5 + null); // 5

// undefined是一个表示"此处无定义"的原始数值，转为数值时为NaN
Number(undefined); // NaN
console.log(5 + undefined); // NaN
console.log(typeof NaN); // 'number'

// NaN是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。
// NaN不等于任何值，包括它本身
console.log(NaN === NaN);

/*
False:
    undefined
    null
    false
    0
    NaN
    ""或''（空字符串）
*/

// 注意，空数组（[]）和空对象（{}）对应的布尔值，都是true
if ([]) {
    console.log('true');
}
// true

if ({}) {
    console.log('true');
}
// true


// JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）
// 某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算
console.log(1 === 1.0); // true
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2)  // 0.30000000000000004
console.log(0.3 / 0.1); // 2.9999999999999996
console.log((0.3 - 0.2) === (0.2 - 0.1));

console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
console.log(Number.MIN_VALUE);  // 5e-324

// Infinity表示正的无穷，-Infinity表示负的无穷。
console.log(Infinity === -Infinity); // false

// parseInt方法用于将字符串转为整数。
parseInt('123'); // 123

// parseFloat方法用于将一个字符串转为浮点数。
parseFloat('3.14'); // 3.14

// isNaN方法可以用来判断一个值是否为NaN。
isNaN(NaN); // true
isNaN(123); // false

// isNaN只对数值有效，如果传入其他值，会被先转成数值。
isNaN('Hello'); // true
// 相当于
isNaN(Number('Hello'));        // true
console.log(Number('Hello'))   // NaN
// 这一点要特别引起注意。也就是说，isNaN为true的值，有可能不是NaN，而是一个字符串。

// 出于同样的原因，对于对象和数组，isNaN也返回true。
isNaN({}); // true
// 等同于
isNaN(Number({})); // true

isNaN(['xzy']); // true
// 等同于
isNaN(Number(['xzy'])); // true

// 但是，对于空数组和只有一个数值成员的数组，isNaN返回false。
isNaN([]); // false
isNaN([123]); // false
isNaN(['123']); // false

// 因此，使用isNaN之前，最好判断一下数据类型。
function myIsNaN(value) {
    return typeof value === 'number' && isNaN(value);
}

// 判断NaN更可靠的方法是，利用NaN为唯一不等于自身的值的这个特点，进行判断。
function myIsNaN(value) {
    return value !== value;
}

// isFinite方法返回一个布尔值，表示某个值是否为正常的数值。
isFinite(Infinity);   // false
isFinite(-Infinity);  // false
isFinite(NaN);        // false
isFinite(undefined);  // false
isFinite(null);       // true
isFinite(-1);         // true


