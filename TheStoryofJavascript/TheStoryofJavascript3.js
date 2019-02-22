/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-07 16:27:56
 * @LastEditTime: 2019-02-11 08:56:43
 * @Description: 对象
 */

// 对象的所有键名都是字符串，所以加不加引号都可以。
var obj = {
    foo: 'Hello',
    bar: 'World'
};

// 对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。
var obj = {
    m: 123,
    p: function (x) {
        return 2 * x;
    }
};
obj.p(1); // 2

// 读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符。
var obj1 = {
    p: 'Hello World'
};

console.log(obj1.p);     // "Hello World" 推荐这种写法
console.log(obj1['p']);  // "Hello World"


// 请注意，如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理。
var foo = 'bar';
var obj = {
    foo: 1,
    bar: 2
};

console.log(obj.foo);  // 1
console.log(obj[foo]); // 2  等同于obj['bar']

// 查看一个对象本身的所有属性，可以使用Object.keys方法。
console.log(Object.keys(obj));


// in运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回true，否则返回false。
console.log('p' in obj);
console.log('toString' in obj);



/* for...in循环用来遍历一个对象的全部属性。 */
var obj = {
    a: 1,
    b: 2,
    c: 3
};

for (var i in obj) {
    console.log('键名：', i);
    console.log('键值：', obj[i]);
}





