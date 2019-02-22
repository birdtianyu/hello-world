/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-12 11:24:23
 * @LastEditTime: 2019-02-12 11:33:40
 * @Description: 包装对象
 */

/*
 * 所谓“包装对象”，就是分别与数值、字符串、布尔值相对应的Number、String、Boolean三个原生对象。
 * 这三个原生对象可以把原始类型的值变成（包装成）对象。 
 */

var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

console.log(typeof v1); // "object"
console.log(typeof v2); // "object"
console.log(typeof v3); // "object"

console.log(v1 === 123);   // false
console.log(v2 === 'abc'); // false
console.log(v3 === true);  // false

new Number(123).valueOf();  // 123
new String('abc').valueOf(); // "abc"
new Boolean(true).valueOf(); // true

new Number(123).toString(); // "123"
new String('abc').toString(); // "abc"
new Boolean(true).toString(); // "true"


// 原始类型与实例对象的自动转换。
var str = 'abc';
console.log(str.length); // 3

// 等同于
var strObj = new String(str);
// String {
//   0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"
// }
console.log(strObj.length); // 3

// 上面代码中，abc是一个字符串，本身不是对象，不能调用length属性。
// JavaScript 引擎自动将其转为包装对象，在这个对象上调用length属性。
// 调用结束后，这个临时对象就会被销毁。


// 自定义方法
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double();
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double();
// 246


