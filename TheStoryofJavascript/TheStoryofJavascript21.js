/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-12 14:44:15
 * @LastEditTime: 2019-02-20 11:27:48
 * @Description: JSON 对象
 */

// JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式
// 2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式。

/*
    JSON 对值的类型和格式有严格的规定:

        1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

        2. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。

        3. 字符串必须使用双引号表示，不能使用单引号。

        4. 对象的键名必须放在双引号里面。

        5. 数组或对象最后一个成员的后面，不能加逗号。

 */

/*
例:
{ name: "张三", 'age': 32 }  // 属性名必须使用双引号

[32, 64, 128, 0xFFF] // 不能使用十六进制值

{ "name": "张三", "age": undefined } // 不能使用 undefined

{ "name": "张三",
  "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
   "getName": function () {
      return this.name;
  }
} // 属性值不能使用函数和日期对象

*/


// JSON对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。
// 它有两个静态方法：JSON.stringify()和JSON.parse()。


/* JSON.stringify() */
// JSON.stringify方法用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被JSON.parse方法还原。
JSON.stringify('abc'); // ""abc""
JSON.stringify(1); // "1"
JSON.stringify(false); // "false"
JSON.stringify([]); // "[]"
JSON.stringify({}); // "{}"

JSON.stringify([1, "false", false]);
// '[1,"false",false]'

JSON.stringify({
    name: "张三"
});
// '{"name":"张三"}'

// 注意，对于原始类型的字符串，转换结果会带双引号。
console.log(JSON.stringify('foo') === "foo"); // false
console.log(JSON.stringify('foo') === "\"foo\""); // true

// 如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify过滤。
var obj = {
    a: undefined,
    b: function () {}
};

JSON.stringify(obj); // "{}"

// 如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。
var arr = [undefined, function () {}];
JSON.stringify(arr); // "[null,null]"

// JSON.stringify方法会忽略对象的不可遍历的属性。
var obj = {};
Object.defineProperties(obj, {
    'foo': {
        value: 1,
        enumerable: true
    },
    'bar': {
        value: 2,
        enumerable: false
    }
});

JSON.stringify(obj); // "{"foo":1}"




// JSON.stringify方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性。
var obj = {
    'prop1': 'value1',
    'prop2': 'value2',
    'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties);
// "{"prop1":"value1","prop2":"value2"}"

// 第二个参数只对对象的属性有效，对数组无效。
JSON.stringify(['a', 'b'], ['0']);
// "["a","b"]"

JSON.stringify({
    0: 'a',
    1: 'b'
}, ['0']);
// "{"0":"a"}"

// 第二个参数还可以是一个函数，用来更改JSON.stringify的返回值。
function f(key, value) {
    if (typeof value === "number") {
        value = 2 * value;
    }
    return value;
}

JSON.stringify({
    a: 1,
    b: 2
}, f);
// '{"a": 2,"b": 4}'
// 上面的f函数，接受两个参数，分别是被转换的对象的键名和键值。

// 注意，这个处理函数是递归处理所有的键。
var o = {
    a: {
        b: 1
    }
};

function f(key, value) {
    console.log("[" + key + "]:" + value);
    return value;
}

JSON.stringify(o, f);
// []:[object Object] 第一次键名为空，键值是整个对象o
// [a]:[object Object]
// [b]:1
// 输出: '{"a":{"b":1}}'




// JSON.stringify还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性。
// 如果是数字，表示每个属性前面添加的空格（最多不超过10个）;
// 如果是字符串（不超过10个字符），则该字符串会添加在每行前面。
JSON.stringify({
    p1: 1,
    p2: 2
}, null, 2);
/*
"{
  "p1": 1,
  "p2": 2
}"
*/

JSON.stringify({
    p1: 1,
    p2: 2
}, null, '|-');
/*
"{
|-"p1": 1,
|-"p2": 2
}"
*/


// 如果参数对象有自定义的toJSON方法，那么JSON.stringify会使用这个方法的返回值作为参数，而忽略原对象的其他属性。
// 未定义toJSON方法
var user = {
    firstName: '三',
    lastName: '张',

    get fullName() {
        return this.lastName + this.firstName;
    }
};

JSON.stringify(user)
// "{"firstName":"三","lastName":"张","fullName":"张三"}"


// 定义了toJSON方法
var user = {
    firstName: '三',
    lastName: '张',

    get fullName() {
        return this.lastName + this.firstName;
    },

    toJSON: function () {
        return {
            name: this.lastName + this.firstName
        };
    }
};

JSON.stringify(user)
// "{"name":"张三"}"

// Date对象就有一个自己的toJSON方法。
var date = new Date('2015-01-01');
date.toJSON(); // "2015-01-01T00:00:00.000Z"
JSON.stringify(date); // ""2015-01-01T00:00:00.000Z""


/* JSON.parse() */
// JSON.parse方法用于将 JSON 字符串转换成对应的值。
JSON.parse('{}'); // {}
JSON.parse('true'); // true
JSON.parse('"foo"'); // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null'); // null

var o = JSON.parse('{"name": "张三"}');
console.log(o.name); //"张三"

// JSON.parse方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify方法类似。
function f(key, value) {
    if (key === 'a') {
        return value + 10;
    }
    return value;
}

JSON.parse('{"a": 1, "b": 2}', f);
// {a: 11, b: 2}


