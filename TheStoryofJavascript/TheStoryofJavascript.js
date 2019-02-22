/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-07 14:50:44
 * @LastEditTime: 2019-02-15 09:01:49
 * @Description: 重新开始学Javascript
 */

/*JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。*/

// 变量提升（hoisting）不报错
console.log(a);
var a = 1; // undefined

// 等同于
var a;
console.log(a);
a = 1;

// 中文字符也可以做变量名
var 我 = 1;
console.log(我);

// 作用域对var声明不起作用
var i = 1;
if (i >= 1) {
    var j = 100;
}
console.log(j);

/* if else 语句 */
if (a === 3) {
    // 满足条件时，执行的语句
} else {
    // 不满足条件时，执行的语句
}

/* switch 语句 */
switch (a) {
    case 1:
        console.log('x 等于1');
        break;
    case 2:
        console.log('x 等于2');
        break;
    default:
        console.log('x 等于其他值');
}

/* 三元运算符 */
var even = (n % 2 === 0) ? true : false;
var myVar;
console.log(
    myVar ?
    'myVar has a value' :
    'myVar does not have a value'
);
var n = 3;
var msg = '数字' + n + '是' + (n % 2 === 0 ? '偶数' : '奇数');
console.log(msg);

/* while语句 */
while (a > 100) {
    console.log('Hello, world');
}

/* for语句 */
var r = 3;
for (var i = 0; i < r; i++) {
    i++;
}


/*三种变量声明方式*/
// 1.let
// let 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。
let z;
let name = 'Simon';

// myLetVariable1 is *not* visible out here
for (let myLetVariable1 = 0; myLetVariable1 < 5; myLetVariable1++) {
    // myLetVariable1 is only visible in here
}
// myLetVariable1 is *not* visible out here

// 2.const
// const 允许声明一个不可变的常量。这个常量在定义域内总是可见的。
const Pi = 3.14; // 设置 Pi 的值  
/*Pi = 1; // 将会抛出一个错误因为你改变了一个常量的值。*/

// 3.var
/* 
var 是最常见的声明变量的关键字。
它没有其他两个关键字的种种限制。
这是因为它是传统上在 JavaScript 声明变量的唯一方法。
使用 var 声明的变量在它所声明的整个函数都是可见的。
*/

// myVarVariable2 *is* visible out here 
console.log(myVarVariable2);  // undefined
for (var myVarVariable2 = 0; myVarVariable2 < 5; myVarVariable2++) { 
    // myVarVariable2 is visible to the whole function 
} 
// myVarVariable2 *is* visible out here
console.log(myVarVariable2);

var array = [1,2,3,4,5,6,7];
array.push(39);  // 向数组末尾添加元素
var object = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
// for循环
// 方式1：
for (var i = 0; i < 5; i++) {
    // 将会执行五次
}
// 方式2:
for (let value of array) {
    // do something with value
    console.log(value);  //数组循环
}
// 方式3:
for (let property in object) {
    // do something with object property
    if (object.hasOwnProperty(property))  // 过滤掉对象继承的属性，用hasOwnProperty()来实现
    {
        console.log(property); // 'name', 'age', 'city'
    }
}

["dog", "cat", "hen"].forEach(function(currentValue, index, array) {
    // Do something with currentValue or array[index]
    console.log(array[index]); // "dog", "cat", "hen"
    console.log(currentValue); // "dog", "cat", "hen"
});
