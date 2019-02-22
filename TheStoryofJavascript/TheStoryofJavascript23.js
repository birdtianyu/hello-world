/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-08 13:22:11
 * @LastEditTime: 2019-02-20 08:41:36
 * @Description: this关键字
 */



function f() {
    console.log('姓名：' + this.name);
}

var A = {
    name: '张三',
    describe: f
};

var B = {
    name: '李四',
    describe: f
};

A.describe(); // "姓名：张三"
B.describe(); // "姓名：李四"


// 由于this的指向是不确定的，所以切勿在函数中包含多层的this。
var o = {
    f1: function () {
        console.log(this);     // this
        var f2 = function () {
            console.log(this); // this
        }();
    }
};

o.f1();
// Object
// Window

// 上面的代码等同于
var temp = function () {
    console.log(this);
};

var o = {
    f1: function () {
        console.log(this);
        var f2 = temp();
    }
};


// 正确写法
var o = {
    v: 'hello',
    p: ['a1', 'a2'],
    f: function f() {
        var that = this;
        this.p.forEach(function (item) {
            console.log(that.v + ' ' + item);
        });
    }
};

o.f();
// hello a1
// hello a2

// 事实上，使用一个变量固定this的值，然后内层函数调用这个变量，是非常常见的做法，请务必掌握。

// 严格模式下，如果函数内部的this指向顶层对象，就会报错。
var counter = {
    count: 0
};
counter.inc = function () {
    'use strict';
    this.count++;
};
var f = counter.inc;
f();
// TypeError: Cannot read property 'count' of undefined



// 数组的map和foreach方法，允许提供一个函数作为参数。这个函数(回调函数)内部不应该使用this。
var o = {
    v: 'hello',
    p: ['a1', 'a2'],
    f: function f() {
        this.p.forEach(function (item) {
            console.log(this.v + ' ' + item);
        });
    }
};

o.f();
// undefined a1
// undefined a2

// 上面代码中，foreach方法的回调函数中的this，其实是指向window对象，因此取不到o.v的值。


// 正确写法1
var o = {
    v: 'hello',
    p: ['a1', 'a2'],
    f: function f() {
        var that = this;
        this.p.forEach(function (item) {
            console.log(that.v + ' ' + item);
        });
    }
};

o.f();
// hello a1
// hello a2

// 另一种方法是将this当作foreach方法的第二个参数，固定它的运行环境。
// 正确写法2
var o = {
    v: 'hello',
    p: ['a1', 'a2'],
    f: function f() {
        this.p.forEach(function (item) {
            console.log(this.v + ' ' + item);
        }, this);
    }
};

o.f();
// hello a1
// hello a2

// ※避免回调函数中的 this
// 回调函数中的this往往会改变指向，最好避免使用。
var o = new Object();
o.f = function () {
    console.log(this === o);
};

// jQuery 的写法
$('#button').on('click', o.f);
// 上面代码中，点击按钮以后，控制台会显示false。
// 原因是此时this不再指向o对象，而是指向按钮的 DOM 对象，因为f方法是在按钮对象的环境中被调用的。



// JavaScript 提供了call、apply、bind这三个方法，来切换/固定this的指向。
// A. Function.prototype.call()
// call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。
var n = 123;
var obj = {
    n: 456
};

function a() {
    console.log(this.n);
}

a.call(); // 123
a.call(null); // 123
a.call(undefined); // 123
a.call(window); // 123
a.call(obj); // 456

// call方法还可以接受多个参数。
// call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。
function add(a, b) {
    return a + b;
}

add.call(this, 1, 2); // 3
add.call(window, 1, 2); // 3
// 上面代码中，call方法指定函数add内部的this绑定当前环境（对象），并且参数为1和2


// call方法的一个应用是调用对象的原生方法。
var obj = {};
obj.hasOwnProperty('toString'); // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
    return true;
};
obj.hasOwnProperty('toString'); // true

Object.prototype.hasOwnProperty.call(obj, 'toString'); // false
// 上面的代码将hasOwnProperty方法的原始定义放到obj对象上执行，这样无论obj上有没有同名方法，都不会影响结果。
// 即让原始的Object.prototype.hasOwnProperty()方法在obj环境内执行



// B. Function.prototype.apply()
// apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。
// 唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。
func.apply(thisValue, [arg1, arg2, ...]);

function f(x, y) {
    console.log(x + y);
}

f.call(null, 1, 1); // 2
f.apply(null, [1, 1]); // 2

// 利用这一点，可以做一些有趣的应用。
// 1) 找出数组最大元素
// JavaScript 不提供找出数组最大元素的函数。结合使用apply方法和Math.max方法，就可以返回数组的最大元素。
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a); // 15

// 2) 将数组的空元素变为undefined
Array.apply(null, ['a', , 'b']);
// [ 'a', undefined, 'b' ]

// 空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined。
// 因此，遍历内部元素的时候，会得到不同的结果。
var a = ['a', , 'b'];

function print(i) {
    console.log(i);
}

a.forEach(print);
// a
// b

Array.apply(null, a).forEach(print);
// a
// undefined
// b

// 3) 转换类似数组的对象
// 利用数组对象的slice方法，可以将一个类似数组的对象（比如arguments对象）转为真正的数组。
Array.prototype.slice.apply({
    0: 1,
    length: 1
}); // [1]
Array.prototype.slice.apply({
    0: 1
}); // []
Array.prototype.slice.apply({
    0: 1,
    length: 2
}); // [1, undefined]
Array.prototype.slice.apply({
    length: 1
}); // [undefined]
// 参数都是对象，但是返回结果都是数组
// 这个方法起作用的前提是，被处理的对象必须有length属性，以及相对应的数字键。


// 4) 绑定回调函数的对象
var o = new Object();

o.f = function () {
    console.log(this === o);
};

var f = function () {
    o.f.apply(o);
    // 或者 o.f.call(o);
};

// jQuery 的写法
$('#button').on('click', f);


// C. Function.prototype.bind()
// bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。
var d = new Date();
d.getTime(); // 1481869925657

var print = d.getTime;
print(); // Uncaught TypeError: this is not a Date object.

var print = d.getTime.bind(d);
print(); // 1481869925657


// bind方法的参数就是所要绑定this的对象，下面是一个更清晰的例子。
var counter = {
    count: 0,
    inc: function () {
        this.count++;
    }
};

var func = counter.inc.bind(counter);
func();
console.log(counter.count); // 1

// this绑定到其他对象也是可以的。
var counter = {
    count: 0,
    inc: function () {
        this.count++;
    }
};

var obj = {
    count: 100
};
var func = counter.inc.bind(obj);
func();
console.log(obj.count); // 101

// bind还可以接受更多的参数，将这些参数绑定原函数的参数。
var add = function (x, y) {
    return x * this.m + y * this.n;
};

var obj = {
    m: 2,
    n: 2
};

var newAdd = add.bind(obj, 5);
newAdd(5); // 20
// bind方法除了绑定this对象，还将add函数的第一个参数x绑定成5，
// 然后返回一个新函数newAdd，这个函数只要再接受一个参数y就能运行了。

// 如果bind方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window）。
function add(x, y) {
    return x + y;
}

var plus5 = add.bind(null, 5);
plus5(10); // 15
// 函数add内部并没有this，使用bind方法的主要目的是绑定参数x，以后每次运行新函数plus5，就只需要提供另一个参数y就够了。
// 而且因为add内部没有this，所以bind的第一个参数是null，不过这里如果是其他对象，也没有影响。



