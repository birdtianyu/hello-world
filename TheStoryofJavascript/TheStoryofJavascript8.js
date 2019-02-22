/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-11 10:23:04
 * @LastEditTime: 2019-02-11 10:32:02
 * @Description: 类型转换
 */


// 数值：转换后还是原来的值
Number(324); // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324'); // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc'); // NaN

// 空字符串转为0
Number(''); // 0

// 布尔值：true 转成 1，false 转成 0
Number(true); // 1
Number(false); // 0

// undefined：转成 NaN
Number(undefined); // NaN

// null：转成0
Number(null); // 0


// Number函数将字符串转为数值，要比parseInt函数严格很多。
// 基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。
parseInt('42 cats'); // 42
Number('42 cats'); // NaN

// Number方法的参数是对象时，将返回NaN，除非是包含单个数值的数组。
Number({
    a: 1
}); // NaN
Number([1, 2, 3]); // NaN
Number([5]); // 5


var obj = {
    x: 1
};
Number(obj); // NaN

// 等同于
if (typeof obj.valueOf() === 'object') {
    Number(obj.toString());
} else {
    Number(obj.valueOf());
}


String(123); // "123"
String('abc'); // "abc"
String(true); // "true"
String(undefined); // "undefined"
String(null); // "null"

// String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。
String({a: 1});     // "[object Object]"
// 等同于
String({a: 1}.toString());

String([1, 2, 3]);  // "1,2,3"


Boolean(undefined); // false
Boolean(null); // false
Boolean(0); // false
Boolean(NaN); // false
Boolean(''); // false


