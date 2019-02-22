/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-08 10:05:36
 * @LastEditTime: 2019-02-11 10:20:16
 * @Description: 运算符
 */


// 除了加法运算符，其他算术运算符（比如减法、除法和乘法）都不会发生重载。
// 它们的规则是：所有运算子一律转为数值，再进行相应的数学运算。
console.log(1 - '2'); // -1
console.log(1 * '2'); // 2
console.log(1 / '2'); // 0.5


console.log(
    '%cThis text is styled!',
    'color: red; background: yellow; font-size: 24px;'
);

// 如果运算子是对象，必须先转成原始类型的值，然后再相加。
var obj = {
    p: 1
};
console.log(obj + 2); // "[object Object]2"

/* 
    1) 首先，自动调用对象的valueOf方法。
        一般来说，对象的valueOf方法总是返回对象自身。
*/
var obj = {
    p: 1
};
obj.valueOf(); // { p: 1 }

/*
    2) 再自动调用对象的toString方法，将其转为字符串。
*/
obj.valueOf().toString(); // 默认值:"[object Object]"


// 自定义valueOf()方法
var obj = {
    valueOf: function () {
        return 1;
    }
};
console.log(obj + 2); // 3

// 自定义toString方法
var obj = {
    toString: function () {
        return 'hello';
    }
};
console.log(obj + 2); // "hello2"


// 两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址。
console.log({} === {}); // false
console.log([] === []); // false
console.log((function () {} === function () {})); // false

var v1 = {};
var v2 = v1;
console.log(v1 === v2); // true


// 对象与数值比较时，对象转为数值
console.log([1] == 1); // true
// 等同于 Number([1]) == 1

// 对象与字符串比较时，对象转为字符串
console.log([1] == '1'); // true
// 等同于 String([1]) == '1'
console.log([1, 2] == '1,2'); // true
// 等同于 String([1, 2]) == '1,2'

// 对象与布尔值比较时，两边都转为数值
console.log([1] == true); // true
// 等同于 Number([1]) == Number(true)
console.log([2] == true); // false
// 等同于 Number([2]) == Number(true)


false == null // false
false == undefined // false

0 == null // false
0 == undefined // false

undefined == null // true



/*
    对于非布尔值，取反运算符会将其转为布尔值。
    以下六个值取反后为true，其他值都为false:
        undefined
        null
        false
        0
        NaN
        空字符串（''）
*/

console.log(!undefined); // true
console.log(!null); // true
console.log(!0); // true
console.log(!NaN); // true
console.log(!""); // true

console.log(!54); // false
console.log(!'hello'); // false
console.log(![]); // false
console.log(!{}); // false

// 不管x是什么类型的值，经过两次取反运算后，变成了与Boolean函数结果相同的布尔值。
// 所以，两次取反就是将一个值转为布尔值的简便写法。
console.log(!!x);
// 等同于
console.log(Boolean(x));


// 或运算符常用于为一个变量设置默认值。
function saveText(text) {
    text = text || '';
    // ...
}

// 或者写成
saveText(this.text || '');


// void运算符的作用是执行一个表达式，然后不返回任何值，或者说返回undefined。
console.log(void 0);  // undefined
console.log(void(0)); // undefined






