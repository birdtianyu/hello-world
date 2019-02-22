/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-08 09:23:45
 * @LastEditTime: 2019-02-11 09:33:57
 * @Description: 函数2
 */


/*
   1.JavaScript 允许函数有不定数目的参数，
   arguments对象包含了函数运行时的所有参数，arguments[0]就是第一个参数，arguments[1]就是第二个参数，以此类推。这个对象只有在函数体内部，才可以使用。
*/
var f = function (one) {
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
    console.log(arguments.length);
};

f(1, 2, 3);
// 1
// 2
// 3
// 3


// 正常模式下，arguments对象可以在运行时修改。
var f1 = function (a, b) {
    arguments[0] = 3;
    arguments[1] = 2;
    return a + b;
};

console.log(f1(1, 1)); // 5


// 严格模式下，arguments对象与函数参数不具有联动关系。
var f2 = function (a, b) {
    'use strict'; // 开启严格模式
    arguments[0] = 3;
    arguments[1] = 2;
    return a + b;
};

console.log(f2(1, 1)); // 2


/*
    2. 闭包
        闭包的最大用处有两个:
            1) 一个是可以读取函数内部的变量;
            2) 另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。
*/
function createIncrementor(start) {
    return function () {
        return start++;
    };
}

var inc = createIncrementor(5);

console.log('inc:', inc()); // 5
console.log('inc:', inc()); // 6
console.log('inc:', inc()); // 7


// 闭包的另一个用处，是封装对象的私有属性和私有方法。(※消耗内存)
function Person(name) {
    var _age;

    function setAge(n) {
        _age = n;
    }

    function getAge() {
        return _age;
    }

    return {
        name: name,
        getAge: getAge,
        setAge: setAge
    };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge(); // 25
console.log(p1._age) // undefined


// 3. “立即调用的函数表达式”（Immediately-Invoked Function Expression），简称 IIFE
// 语句
function f() {}

// 表达式
var f = function f() {}

// JavaScript 引擎规定，如果function关键字出现在行首，一律解释成语句。
// 因此，JavaScript 引擎看到行首是function关键字之后，认为这一段都是函数的定义
// 不要让function出现在行首，让引擎将其理解成一个表达式即可。
(function () {
    /* code */
}());
// 或者
(function () {
    /* code */
})(); // 如果省略分号，遇到连着两个 IIFE，可能就会报错。

var i = function () {
    return 10;
}();
console.log(true && function () {
    /* code */
}());
console.log(0, function () {
    /* code */
}());


/*
    “立即调用的函数表达式”的目的有两个: 
        一是不必为函数命名，避免了污染全局变量; 
        二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。
*/
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function () {
    var tmp = newData;
    processData(tmp);
    storeData(tmp);
}());
// 上面代码中，写法二比写法一更好，因为完全避免了污染全局变量。


/* 
    4. eval 命令:(一般不推荐使用, 使用原生的JSON.parse方法解析JSON)
        eval命令接受一个字符串作为参数，并将这个字符串当作语句执行。
*/
eval('var a = 1;');
console.log(a); // 1

// 如果eval的参数不是字符串，那么会原样返回。
eval(123); // 123

// eval没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。
var a = 1;
eval('a = 2');

console.log(a); // 2

// 使用严格模式，eval内部声明的变量，不会影响到外部作用域。
(function f() {
    'use strict';
    eval('var foo = 123');
    console.log(foo); // ReferenceError: foo is not defined
})()

// 不过，即使在严格模式下，eval依然可以读写当前作用域的变量。
(function f() {
    'use strict';
    var foo = 1;
    eval('foo = 2');
    console.log(foo); // 2
})()

