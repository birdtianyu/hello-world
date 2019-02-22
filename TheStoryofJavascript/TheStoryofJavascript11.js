/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-11 10:56:01
 * @LastEditTime: 2019-02-12 08:59:19
 * @Description: Object对象
 */

/*
    Object对象本身的方法 && Object的实例方法
*/
// Object对象本身的方法
Object.print = function (o) {
    console.log(o);
};
var obj = new Object();
obj.print(); // TypeError: obj.print is not a function

// Object的实例方法
Object.prototype.print = function () {
    console.log(this);
};
var obj = new Object();
obj.print(); // Object




/*
 *  1. Object作为普通函数的用法
 */
// Object本身是一个函数，可以当作工具方法使用，将任意值转为对象。
// 这个方法常用于保证某个值一定是对象。
// 如果参数为空（或者为undefined和null），Object()返回一个空对象。
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

obj instanceof Object; // true


// 如果参数是原始类型的值，Object方法将其转为对应的包装对象的实例
var obj = Object(1);
obj instanceof Object // true
obj instanceof Number // true

var obj = Object('foo');
obj instanceof Object // true
obj instanceof String // true

var obj = Object(true);
obj instanceof Object // true
obj instanceof Boolean // true


// 如果Object方法的参数是一个对象，它总是返回该对象，即不用转换。
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true

var value = {};
var obj = Object(value) // 返回原对象
obj === value // true

var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn // true

// 利用这一点，可以写一个判断变量是否为对象的函数。
function isObject(value) {
    return value === Object(value);
}

isObject([]); // true
isObject(true); // false




/*
 * 2. Object作为构造函数的用法
 */
// Object不仅可以当作工具函数使用，还可以当作构造函数使用，即前面可以使用new命令。
// Object构造函数的首要用途是直接通过它来生成新对象
var obj = new Object();
// 等价于
var obj = {};
// 后者只是前者的一种简便写法。

// Object构造函数的用法与工具方法很相似，几乎一模一样。
// 使用时，可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象
var o1 = {
    a: 1
};
var o2 = new Object(o1);
consoloe.log(o1 === o2); // true

var obj = new Object(123);
obj instanceof Number // true

// ※ Object(value)表示将value转成一个对象，而new Object(value)则表示新生成一个对象，它的值是value。




/*
 * 3. Object作为对象本身的方法的用法(静态方法)
 */
// A. 遍历对象的属性名: Object.keys(), Object.getOwnPropertyNames()
var obj = {
    p1: 123,
    p2: 456
};

Object.keys(obj); // ["p1", "p2"]
Object.getOwnPropertyNames(obj); // ["p1", "p2"]

// 计算对象属性个数
Object.keys(obj).length; // 2
Object.getOwnPropertyNames(obj).length; // 2

var a = ['Hello', 'World'];

Object.keys(a); // 只返回可枚举的属性名: ["0", "1"]
Object.getOwnPropertyNames(a); // 还返回不可枚举的属性名: ["0", "1", "length"]




/*
 * 4. Object作为实例方法的用法
 */
// 不少方法定义在Object.prototype对象上。它们称为实例方法，所有Object的实例对象都继承了这些方法。
// Object实例对象的方法，主要有以下六个。
Object.prototype.valueOf(); // 返回当前对象对应的值。
Object.prototype.toString(); // 返回当前对象对应的字符串形式。
Object.prototype.toLocaleString(); // 返回当前对象对应的本地字符串形式。
Object.prototype.hasOwnProperty(); // 判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
Object.prototype.isPrototypeOf(); // 判断当前对象是否为另一个对象的原型。
Object.prototype.propertyIsEnumerable(); // 判断某个属性是否可枚举。


// A. Object.prototype.valueOf()
// valueOf方法的作用是返回一个对象的“值”, 默认情况下返回对象本身, 用于JavaScript的自动类型转换。
var obj = new Object();
console.log(obj.valueOf() === obj); // true
// 用自定义的obj.valueOf()覆盖Object.prototype.valueOf()
obj.valueOf = function () {
    return 2;
};
console.log(1 + obj); // 3


// B. Object.prototype.toString()
// toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。
var o1 = new Object();
o1.toString(); // "[object Object]"

var o2 = {
    a: 1
};
o2.toString(); // "[object Object]"

// 字符串[object Object]本身没有太大的用处，但是通过自定义toString方法，可以让对象在自动类型转换时，得到想要的字符串形式。
var obj = new Object();
obj.toString = function () {
    return 'hello';
};

console.log(obj + ' ' + 'world'); // "hello world"

// 数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法。
[1, 2, 3].toString(); // "1,2,3"

'123'.toString(); // "123"

(function () {
    return 123;
}).toString();
// "function () {
//   return 123;
// }"

(new Date()).toString();
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"

// ※ toString() 的应用: 判断数据类型
// Object.prototype.toString方法返回对象的类型字符串，因此可以用来判断一个值的类型。
// 由于实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法，所以为了得到类型字符串，最好直接使用Object.prototype.toString方法。
// 通过函数的call方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(''); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"

// ※ 利用这个特性，可以写出一个比typeof运算符更准确的类型判断函数。
var type = function (o) {
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"

console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof 5); // "number"
console.log(typeof null); // "object"
console.log(typeof ''); // "string"
console.log(typeof /abcd/); // "object"
console.log(typeof new Date()); // "object"


// 在上面这个type函数的基础上，还可以加上专门判断某种类型数据的方法。
var type = function (o) {
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
    'Undefined',
    'Object',
    'Array',
    'String',
    'Number',
    'Boolean',
    'Function',
    'RegExp'
].forEach(function (t) {
    type['is' + t] = function (o) {
        return type(o) === t.toLowerCase();
    };
});

type.isObject({}); // true
type.isNumber(NaN); // true
type.isRegExp(/abc/); // true



// C. Object.prototype.toLocaleString()
// Object.prototype.toLocaleString方法与toString的返回结果相同，也是返回一个值的字符串形式。
// 主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值。
var person = {
    toString: function () {
        return 'Henry Norman Bethune';
    },
    toLocaleString: function () {
        return '白求恩';
    }
};

person.toString(); // Henry Norman Bethune
person.toLocaleString(); // 白求恩

// 目前，主要有三个对象自定义了toLocaleString方法。
Array.prototype.toLocaleString();
Number.prototype.toLocaleString();
Date.prototype.toLocaleString();

// 日期的实例对象的toLocaleString的返回值跟用户设定的所在地域相关。
var date = new Date();
date.toString(); // "Tue Jan 01 2018 12:01:33 GMT+0800 (CST)"
date.toLocaleString(); // "1/01/2018, 12:01:33 PM"


// D. Object.prototype.hasOwnProperty()
// Object.prototype.hasOwnProperty方法接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性。
var obj = {
    p: 123
};

obj.hasOwnProperty('p'); // true
obj.hasOwnProperty('toString'); // false
// 对象obj自身具有p属性，所以返回true。
// toString属性是继承的，所以返回false。


