/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-12 09:34:00
 * @LastEditTime: 2019-02-12 11:08:34
 * @Description: Array对象
 */

/***一. 构造函数 ***/
// Array是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组。
var arr = new Array(2);
console.log(arr.length); // 2
console.log(arr);        // [ empty x 2 ]

// 如果没有使用new，运行结果也是一样的
var arr = new Array(2);
// 等同于
var arr = Array(2);

// Array构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致:
// 无参数时，返回一个空数组
new Array(); // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1); // [ empty ]
new Array(2); // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2); // RangeError: Invalid array length
new Array(-3); // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc'); // ['abc']
new Array([1]);   // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2);          // [1, 2]
new Array('a', 'b', 'c'); // ['a', 'b', 'c']

// 因此不建议使用Array()生成数组
// bad
var arr = new Array(1, 2);

// good
var arr = [1, 2];




/***二. 静态方法 ***/
// Array.isArray()
// Array.isArray方法返回一个布尔值，表示参数是否为数组。它可以弥补typeof运算符的不足。
var arr = [1, 2, 3];

typeof arr; // "object"
Array.isArray(arr); // true




/***三. 实例方法 ***/
// 1. valueOf(), toString() 
var arr = [1, 2, 3];
arr.valueOf(); // [1, 2, 3]
arr.toString(); // "1,2,3"

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString(); // "1,2,3,4,5,6"
 

// 2. push(), pop()
var arr = [];

arr.push(1); // 1 注: 返回添加新元素后的数组长度
arr.push('a'); // 2
arr.push(true, {}); // 4
console.log(arr); // [1, 'a', true, {}]

var arr = ['a', 'b', 'c'];

arr.pop();        // 'c'
console.log(arr); // ['a', 'b']
[].pop();         // undefined
// push和pop结合使用，就构成了“后进先出”的栈结构（stack）。

// 3. shift(), unshift()
// shift()方法用于删除数组的第一个元素，并返回该元素。
var a = ['a', 'b', 'c'];

a.shift(); // 'a'
console.log(a); // ['b', 'c']

// 利用shift()可以遍历并清空一个数组，前提是数组元素不能是0或任何布尔值等于false的元素
var list = [1, 2, 3, 4];
var item;

while (item = list.shift()) {
  console.log(item);
}

console.log(list); // []
// push()和shift()结合使用，就构成了“先进先出”的队列结构（queue）。

// unshift()方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。
var a = ['a', 'b', 'c'];

a.unshift('x'); // 4
console.log(a); // ['x', 'a', 'b', 'c']

var arr = [ 'c', 'd' ];
arr.unshift('a', 'b'); // 4
console.log(arr); // [ 'a', 'b', 'c', 'd' ]

// 4. join()
// join()方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。
var a = [1, 2, 3, 4];

a.join(' '); // '1 2 3 4'
a.join(' | '); // "1 | 2 | 3 | 4"
a.join(); // "1,2,3,4"

// 如果数组成员是undefined或null或空位，会被转成空字符串。
[undefined, null].join('#');
// '#'

['a',, 'b'].join('-');
// 'a--b'

// 通过call方法，这个方法也可以用于字符串或类似数组的对象。
Array.prototype.join.call('hello', '-');
// "h-e-l-l-o"

var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-');
// 'a-b'


// 5. concat()
// concat方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，※ 原数组不变。
['hello'].concat(['world']);
// ["hello", "world"]

['hello'].concat(['world'], ['!']);
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2});
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1});
// [2, {a: 1}]

// 除了数组作为参数，concat也接受其他类型的值作为参数，添加到目标数组尾部。
[1, 2, 3].concat(4, 5, 6);
// [1, 2, 3, 4, 5, 6]

// 如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝。
var obj = { a: 1 };
var oldArray = [obj];

var newArray = oldArray.concat(1,2,3,4);
//  [{ a: 1 }, 1, 2, 3, 4]

obj.a = 2;
console.log(newArray[0].a); // 2
console.log(newArray);
//  [{ a: 2 }, 1, 2, 3, 4]


// 6. reverse()
var a = ['a', 'b', 'c'];

a.reverse(); // ["c", "b", "a"]
console.log(a); // ["c", "b", "a"]


// 7. slice()
// slice方法用于提取目标数组的一部分，返回一个新数组，原数组不变。

var a = ['a', 'b', 'c'];

a.slice(0); // ["a", "b", "c"]
a.slice(1); // ["b", "c"]
a.slice(1, 2); // ["b"]
a.slice(2, 6); // ["c"]
a.slice(); // ["a", "b", "c"] 等于返回一个原数组的拷贝
a.slice(-2); // ["b", "c"]
a.slice(-2, -1); // ["b"]

// ※ slice方法的一个重要应用，是将类似数组的对象转为真正的数组。
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 });
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);



// 8. splice()
// splice方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。
// 注意，该方法会改变原数组。
// splice的第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2); // ["e", "f"]
console.log(a); // ["a", "b", "c", "d"]

var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2); // ["e", "f"]
console.log(a); // ["a", "b", "c", "d", 1, 2]

var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2); // ["c", "d"]

// 如果只是单纯地插入元素，splice方法的第二个参数可以设为0。
var a = [1, 1, 1];

a.splice(1, 0, 2); // []
console.log(a); // [1, 2, 1, 1]

// 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。
var a = [1, 2, 3, 4];
a.splice(2); // [3, 4]
console.log(a); // [1, 2]


// 9. sort()
// ※※ sort方法不是按照大小排序，而是按照字典顺序。也就是说，数值会被先转成字符串，再按照字典顺序进行比较，所以101排在11的前面。
['d', 'c', 'b', 'a'].sort();
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort();
// [1, 2, 3, 4]

[11, 101].sort();
// [101, 11]

[10111, 1101, 111].sort();
// [10111, 1101, 111]

// 如果想让sort方法按照自定义方式排序，可以传入一个函数作为参数。
[10111, 1101, 111].sort(function (a, b) {
    return a - b;
  });
// [111, 1101, 10111]
// 这里的参数函数本身接受两个参数，表示进行比较的两个数组成员。
// 如果该函数的返回值大于0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。


[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
});
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]


// 10. map()
// map方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。
var numbers = [1, 2, 3];

numbers.map(function (n) {
  return n + 1;
});
// [2, 3, 4]

console.log(numbers);
// [1, 2, 3]

// map方法接受一个函数作为参数。
// 该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身。
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]
// elem为当前成员的值，index为当前成员的位置，arr为原数组[1, 2, 3]

// map方法还可以接受第二个参数，用来绑定回调函数内部的this变量
var arr = ['a', 'b', 'c'];

[1, 2].map(function (e){ return this[e];}, arr);
// ['b', 'c']
// 上面代码通过map方法的第二个参数，将回调函数内部的this对象，指向arr数组。

// 如果数组有空位，map方法的回调函数在这个位置不会执行，会跳过数组的空位。
var f = function (n) { return 'a'; };

[1, undefined, 2].map(f); // ["a", "a", "a"]
[1, null, 2].map(f); // ["a", "a", "a"]
[1, , 2].map(f); // ["a", , "a"]
//上面代码中，map方法不会跳过undefined和null，但是会跳过空位。


// 11. forEach()
// forEach方法与map方法很相似，也是对数组的所有成员依次执行参数函数。
// 但是，forEach方法不返回值，只用来操作数据。
// 这就是说，如果数组遍历的目的是为了得到返回值，那么使用map方法，否则使用forEach方法。

// forEach的用法与map方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9

// forEach方法也可以接受第二个参数，绑定参数函数的this变量。
var out = [];

[1, 2, 3].forEach(function(elem){this.push(elem * elem);}, out);

console.log(out); // [1, 4, 9]

// ※※ 注意，forEach方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用for循环。
var arr = [1, 2, 3];

for (var i = 0; i < arr.length; i++) {
  if (arr[i] === 2) break;
  console.log(arr[i]);
}
// 1

// forEach方法也会跳过数组的空位。
var log = function (n) {
  console.log(n + 1);
};

[1, undefined, 2].forEach(log);
// 2
// NaN
// 3

[1, null, 2].forEach(log);
// 2
// 1
// 3

[1, , 2].forEach(log);
// 2
// 3


// 12. filter()
// filter方法用于过滤数组成员，满足条件的成员组成一个新数组返回。
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
});
// [4, 5]

var arr = [0, 1, 'a', false];
arr.filter(Boolean);   // 返回数组arr里面所有布尔值为true的成员。
// [1, "a"]

// filter方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组。
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});
// [1, 3, 5]

// filter方法还可以接受第二个参数，用来绑定参数函数内部的this变量。
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};

var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj); // [8, 4, 9]

// 13. some(), every()
// 这两个方法返回一个布尔值，表示判断数组成员是否符合某种条件。
// 它们接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true

arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false

// 注意，对于空数组，some方法返回false，every方法返回true，回调函数都不会执行。
function isEven(x) { return x % 2 === 0; }

[].some(isEven);  // false
[].every(isEven); // true

// some和every方法还可以接受第二个参数，用来绑定参数函数内部的this变量。


// 14. reduce(), reduceRight()
// reduce方法和reduceRight方法依次处理数组的每个成员，最终累计为一个值。
// 它们的差别是，reduce是从左到右处理（从第一个成员到最后一个成员），reduceRight则是从右到左（从最后一个成员到第一个成员）
[1, 2, 3, 4, 5].reduce(function (a, b) {
  console.log(a, b);
  return a + b;
});
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15

// 第一次执行，a是数组的第一个成员1，b为第二个成员2。
// 第二次执行，a为上一轮的返回值3，b为第三个成员3。
// ...


/*
  reduce方法和reduceRight方法的第一个参数都是一个函数。该函数接受以下四个参数:

    累积变量，默认为数组的第一个成员
    当前变量，默认为数组的第二个成员
    当前位置（从0开始）
    原数组

  这四个参数之中，只有前两个是必须的，后两个则是可选的。
 */

// 如果要对累积变量指定初值，可以把它放在reduce方法和reduceRight方法的第二个参数。
[1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
}, 10);  // 累积变量初值为10, 注意，这时b是从数组的第一个成员开始遍历。
// 25

// 上面的第二个参数相当于设定了默认值，处理空数组时尤其有用。
function add(prev, cur) {
  return prev + cur;
}

[].reduce(add);
// TypeError: Reduce of empty array with no initial value
[].reduce(add, 1);
// 1


function subtract(prev, cur) {
  return prev - cur;
}

[3, 2, 1].reduce(subtract);      // 0
[3, 2, 1].reduceRight(subtract); // -4

// 找出字符长度最长的数组成员
function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
    return entry.length > longest.length ? entry : longest;
  }, '');
}

findLongest(['aaa', 'bb', 'c']); // "aaa"


// 15. indexOf(), lastIndexOf()
// indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。
var a = ['a', 'b', 'c'];

a.indexOf('b'); // 1
a.indexOf('y'); // -1

// indexOf方法还可以接受第二个参数，表示搜索的开始位置。
['a', 'b', 'c'].indexOf('a', 1); // -1

// lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。
var a = [2, 5, 9, 2];
a.lastIndexOf(2); // 3
a.lastIndexOf(7); // -1

// 注意，这两个方法不能用来搜索NaN的位置，即它们无法确定数组成员是否包含NaN。
[NaN].indexOf(NaN); // -1
[NaN].lastIndexOf(NaN); // -1
// 这是因为这两个方法内部，使用严格相等运算符（===）进行比较，而NaN是唯一一个不等于自身的值。


// 16. 链式使用
var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
})
.filter(function (email) {
  return /^t/.test(email);
})
.forEach(function (email) {
  console.log(email);
});
// "tom@example.com"
