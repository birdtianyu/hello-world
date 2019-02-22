/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-08 09:45:39
 * @LastEditTime: 2019-02-11 09:50:53
 * @Description: 数组
 */

// 1. 任何类型的数据，都可以放入数组。
var arr = [{
        a1: 1
    },
    [1, 2, 3],
    function () {
        return true;
    }
];

console.log(arr[0]); // Object {a1: 1}
console.log(arr[1]); // [1, 2, 3]
console.log(arr[2]); // function (){return true;}



// for...in不仅会遍历数组所有的数字键，还会遍历非数字键。
// 所以，不推荐使用for...in遍历数组。
var a = [1, 2, 3];
a.foo = true;

for (var key in a) {
    console.log(key);
}
// 0
// 1
// 2
// foo

console.log(a); // Array(3) [1, 2, 3]


// 数组的遍历可以考虑使用for循环或while循环。
// for循环
for (var i = 0; i < a.length; i++) {
    console.log(a[i]);
}

// while循环
var i = 0;
while (i < a.length) {
    console.log(a[i]);
    i++;
}

var l = a.length;
while (l--) {
    console.log(a[l]);
}


// 数组的forEach方法，也可以用来遍历数组(推荐)
var colors = ['red', 'green', 'blue'];
colors.forEach(function (color) {
    console.log(color);
});
// red
// green
// blue

// 回调函数语法:可使用最多三个参数来声明回调函数。
function callbackfn(value, index, array1) {};
// 回调参数 	定义
// value 	  数组元素的值。
// index 	  数组元素的数字索引。
// array1  	  包含该元素的数组对象。



// length属性不过滤空位。所以，使用length属性进行数组遍历，一定要非常小心。
// 数组的某个位置是空位，与某个位置是undefined，是不一样的。
// 如果是空位，使用数组的forEach方法、for...in结构、以及Object.keys方法进行遍历，空位都会被跳过。
var a = [, , , ];

console.log(a.length); // 3
console.log(a[0]); // 数组的空位是可以读取的，返回undefined。

a.forEach(function (x, i) {
    console.log(i + '. ' + x);
})
// 不产生任何输出

for (var i in a) {
    console.log(i);
}
// 不产生任何输出

Object.keys(a);
// []


// 如果某个位置是undefined，遍历的时候就不会被跳过。
var a = [undefined, undefined, undefined];

a.forEach(function (x, i) {
    console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined

for (var i in a) {
    console.log(i);
}
// 0
// 1
// 2

Object.keys(a);
// ['0', '1', '2']


/*
“类似数组的对象”（array-like object）:
    如果一个对象的所有键名都是正整数或零，并且有length属性，那么这个对象就很像数组，语法上称为“类似数组的对象”（array-like object）。
 */
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};

obj[0]; // 'a'
obj[1]; // 'b'
obj.length; // 3
// obj.push('d'); // TypeError: obj.push is not a function


// 典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串。
// arguments对象
function args() {
    return arguments;
}
var arrayLike = args('a', 'b');

arrayLike[0]; // 'a'
arrayLike.length; // 2
arrayLike instanceof Array; // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length; // 3
elts instanceof Array; // false

// 字符串
'abc' [1]; // 'b'
'abc'.length; // 3
'abc'
instanceof Array; // false


/*
    ※数组的slice方法可以将“类似数组的对象”变成真正的数组。
*/
var arr = Array.prototype.slice.call(arrayLike);

// 除了转为真正的数组，“类似数组的对象”还有一个办法可以使用数组的方法，就是通过call()把数组的方法放到对象上面。
function print(value, index) {
    console.log(index + ' : ' + value);
}

Array.prototype.forEach.call(arrayLike, print);

// forEach 方法
function logArgs() {
    Array.prototype.forEach.call(arguments, function (elem, i) {
        console.log(i + '. ' + elem);
    });
}

// 等同于 for 循环
function logArgs() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(i + '. ' + arguments[i]);
    }
}

// 字符串也是类似数组的对象
Array.prototype.forEach.call('abc', function (chr) {
    console.log(chr);
});
// a
// b
// c

// ※注意，这种方法比直接使用数组原生的forEach要慢，
// 所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的forEach方法。
