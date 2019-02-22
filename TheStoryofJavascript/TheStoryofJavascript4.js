/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-07 16:48:40
 * @LastEditTime: 2019-02-11 09:05:09
 * @Description: 函数1
 */

 /*
    函数名的提升:
        JavaScript引擎将函数名视同变量名，所以采用function命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。
*/

f();
function f() {}

f();
var f = function (){};  // TypeError: undefined is not a function
// 等同于
var f;
f();
f = function () {};


// 1. 如果同时采用function命令和赋值语句声明同一个函数，最后总是采用赋值语句的定义。
var f = function () {
    console.log('1');
};

function f() {
    console.log('2');
}

f(); // 1


// 2. 函数的name属性返回函数的名字。
function f1() {}
console.log(f1.name); // "f1"
var f2 = function () {};
console.log(f2.name); // "f2"


// 3. 函数的length属性返回函数预期传入的参数个数，即函数定义之中的参数个数。
function f3(a, b) {}
console.log(f3.length); // 2


// 4. 函数的toString方法返回一个字符串，内容是函数的源码。
function f4() {
    a();
    b(); // 注释
    c();
}

console.log(f4.toString());
// function f() {
//  a();
//  b(); // 注释
//  c();
// }


/* 
    5. 在 ES5 的规范中，JavaScript 只有两种作用域：
        一种是全局作用域，变量在整个程序中一直存在，所有地方都可以读取；
        另一种是函数作用域，变量只在函数内部存在。 
*/
var v = 1;

function f5() {
    console.log(v);
}

f5(); // 1

// 在函数内部定义的变量，外部无法读取，称为“局部变量”（local variable）。
// 注意，对于var命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量。

// 6. 函数内部的变量提升
function foo(x) {
    if (x > 100) {
        var tmp = x - 100;
    }
}

// 等同于
function foo(x) {
    var tmp;
    if (x > 100) {
        tmp = x - 100;
    }
}

// 7. 函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。
var a = 1;
var x = function () {
    console.log(a);
};

function f6() {
    var a = 2;
    x();
}

f6(); // 1

// 同样的，函数体内部声明的函数，作用域绑定函数体内部。
function foo2() {
    var x = 1;

    function bar() {
        console.log(x);
    }
    return bar;
}

var x = 2;
var f7 = foo2();
f7(); // 1


// 8. 函数参数不是必需的，JavaScript允许省略参数。
function g(a, b) {
    return a, b; // JS只能返回一个值, 逗号运算符返回后一个表达式的值
    // return [a, b];
}

console.log("new", g(1, 8, 3)); // 8 返回后者
console.log(g(1)); // undefined
console.log(g());  // undefined

console.log(g.length); // 2


// 9. Javascript没有办法只省略靠前的参数，而保留靠后的参数。如果一定要省略靠前的参数，只有显式传入undefined。
function t(a, b) {
    return a;
}
t(undefined, 1); // undefined


/*
    10. 函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value）。
        在函数体内修改参数值，不会影响到函数外部。
 */
var val = 2;

function V(val) {
    val = 3;
}
V(val);

console.log(val); // 2


/*
    如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference）。
    也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。
 */
var obj = {
    p: 1
};

function B(o) {
    o.p = 2;
}
B(obj);

console.log(obj.p); // 2

