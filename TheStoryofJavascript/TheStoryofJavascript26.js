/*
 * @Author: Xu Hongkun
 * @Description: 严格模式（strict mode）
 * @Date: 2019-02-21 14:41:42
 * @LastEditTime: 2019-02-21 15:15:20
 */

// use strict放在脚本文件的第一行，整个脚本都将以严格模式运行。
// 如果这行语句不在第一行就无效，整个脚本会以正常模式运行。
// (严格地说，只要前面不是产生实际运行结果的语句，use strict可以不在第一行，比如直接跟在一个空的分号后面，或者跟在注释后面。)
// 严格模式必须从代码一开始就生效。

// use strict放在函数体的第一行，则整个函数以严格模式运行。
function strict() {
    'use strict';
    return '这是严格模式';
}

function strict2() {
    'use strict';

    function f() {
        return '这也是严格模式';
    }
    return f();
}

function notStrict() {
    return '这是正常模式';
}

// 有时，需要把不同的脚本合并在一个文件里面。
// 如果一个脚本是严格模式，另一个脚本不是，它们的合并就可能出错。
// 严格模式的脚本在前，则合并后的脚本都是严格模式；如果正常模式的脚本在前，则合并后的脚本都是正常模式。
// 这两种情况下，合并后的结果都是不正确的。
// 这时可以考虑把整个脚本文件放在一个立即执行的匿名函数之中。
(function () {
    'use strict';
    // some code here
})();


// 1. 只读属性不可写
'use strict';
'abc'.length = 5;
// TypeError: Cannot assign to read only property 'length' of string 'abc'
// 正常模式下，改变length属性是无效的，但不会报错。

// 对只读属性赋值会报错
'use strict';
Object.defineProperty({}, 'a', {
    value: 37,
    writable: false
});
obj.a = 123;
// TypeError: Cannot assign to read only property 'a' of object #<Object>

// 删除不可配置的属性会报错
'use strict';
var obj = Object.defineProperty({}, 'p', {
    value: 1,
    configurable: false
});
delete obj.p
// TypeError: Cannot delete property 'p' of #<Object>

// 2. 只设置了取值器的属性不可写
// 严格模式下，对一个只有取值器（getter）、没有存值器（setter）的属性赋值，会报错。
'use strict';
var obj = {
    get v() {
        return 1;
    }
};
obj.v = 2;
// Uncaught TypeError: Cannot set property v of #<Object> which has only a getter

// 3. 禁止扩展的对象不可扩展
'use strict';
var obj = {};
Object.preventExtensions(obj); // 禁止扩展
obj.v = 1;
// Uncaught TypeError: Cannot add property v, object is not extensible

// 4. 禁止八进制的前缀0表示法
// 正常模式下，整数的第一位如果是0，表示这是八进制数，比如0100等于十进制的64。
// 严格模式禁止这种表示法，整数第一位为0，将报错。
'use strict';
var n = 0100;
// Uncaught SyntaxError: Octal literals are not allowed in strict mode.

// 5. 全局变量显式声明
// 正常模式中，如果一个变量没有声明就赋值，默认是全局变量。
// 严格模式禁止这种用法，全局变量必须显式声明。
'use strict';

v = 1; // 报错，v未声明

for (i = 0; i < 2; i++) { // 报错，i 未声明
    // ...
}

function f() {
    x = 123;
}
f(); // 报错，未声明就创建一个全局变量


// 6. 禁止this关键字指向全局对象
// 正常模式下，函数内部的this可能会指向全局对象，严格模式禁止这种用法，避免无意间创造全局变量。
// 正常模式
function f() {
    console.log(this === window);
}
f(); // true

// 严格模式
function f() {
    'use strict';
    console.log(this === undefined);
}
f(); // true

// 这种限制对于构造函数尤其有用。使用构造函数时，有时忘了加new，这时this不再指向全局对象，而是报错。
function f() {
    'use strict';
    this.a = 1;
}

f(); // 报错，this 未定义

// 正常模式下，this指向全局对象，如果绑定的值是非对象，将被自动转为对象再绑定上去，而null和undefined这两个无法转成对象的值，将被忽略。
// 正常模式
function fun() {
    return this;
}

fun(); // window
fun.call(2); // Number {2}
fun.call(true); // Boolean {true}
fun.call(null); // window
fun.call(undefined); // window

// 严格模式
'use strict';

function fun() {
    return this;
}

fun(); //undefined
fun.call(2); // 2
fun.call(true); // true
fun.call(null); // null
fun.call(undefined); // undefined


// 7. 禁止删除变量
// 严格模式下无法删除变量，如果使用delete命令删除一个变量，会报错。
// 只有对象的属性，且属性的描述对象的configurable属性设置为true，才能被delete命令删除。
'use strict';
var x;
delete x; // 语法错误

var obj = Object.create(null, {
    x: {
        value: 1,
        configurable: true
    }
});
delete obj.x; // 删除成功

/*
    JavaScript 语言的一个特点，就是允许“动态绑定”，即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在运行时（runtime）确定的。
    严格模式对动态绑定做了一些限制。
    某些情况下，只允许静态绑定。
    也就是说，属性和方法到底归属哪个对象，必须在编译阶段就确定。
    这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外。
*/
// a. 禁止使用 with 语句


// b. 创设 eval 作用域
// 正常模式下，JavaScript 语言有两种变量作用域（scope）：全局作用域和函数作用域。
// 严格模式创设了第三种作用域：eval作用域。
// 严格模式下，eval语句本身就是一个作用域，不再能够在其所运行的作用域创设新的变量了，也就是说，eval所生成的变量只能用于eval内部。
(function () {
    'use strict';
    var x = 2;
    console.log(eval('var x = 5; x')); // 5
    console.log(x); // 2
})();
// 上面代码中，由于eval语句内部是一个独立作用域，所以内部的变量x不会泄露到外部。

// 如果希望eval语句也使用严格模式，有两种方式。
// 方式一
function f1(str) {
    'use strict';
    return eval(str);
}
f1('undeclared_variable = 1'); // 报错

// 方式二
function f2(str) {
    return eval(str);
}
f2('"use strict";undeclared_variable = 1'); // 报错
// 上面两种写法，eval内部使用的都是严格模式。



