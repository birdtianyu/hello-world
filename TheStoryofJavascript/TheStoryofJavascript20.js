/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-12 14:14:34
 * @LastEditTime: 2019-02-12 14:43:47
 * @Description: 正则表达式: RegExp 对象
 */

// RegExp对象提供正则表示式的功能。
// JavaScript的正则表达式体系是参照Perl 5建立的。

// 新建正则表达式有两种方法。一种是使用字面量，以斜杠表示开始和结束。
var regex = /xyz/;
// 另一种是使用RegExp构造函数。
var regex = new RegExp('xyz');

// 第一种方法在引擎编译代码时，就会新建正则表达式;
// 第二种方法在运行时新建正则表达式，所以前者的效率较高。
// 而且，前者比较便利和直观，所以实际应用中，基本上都采用字面量定义正则表达式。

// RegExp构造函数还可以接受第二个参数，表示修饰符
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;


/* 一.实例属性 */
// A. 修饰符相关，返回一个布尔值，表示对应的修饰符是否设置。(只读)
RegExp.prototype.ignoreCase;  // 返回一个布尔值，表示是否设置了i修饰符。
RegExp.prototype.global;      // 返回一个布尔值，表示是否设置了g修饰符。
RegExp.prototype.multiline;   // 返回一个布尔值，表示是否设置了m修饰符。

// B. 与修饰符无关的属性
RegExp.prototype.lastIndex;   // 返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义。
RegExp.prototype.source;      // 返回正则表达式的字符串形式（不包括反斜杠），该属性只读。


/* 二. 实例方法 */
// 1. RegExp.prototype.test()
// 返回一个布尔值，表示当前模式是否能匹配参数字符串


// 2. RegExp.prototype.exec()
// 返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回null。


/* 三. 字符串对象的实例方法 */
// 字符串的实例方法之中，有4种与正则表达式有关。
String.prototype.match();   // 返回一个数组，成员是所有匹配的子字符串。
String.prototype.search();  // 按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
String.prototype.replace(); // 按照给定的正则表达式进行替换，返回替换后的字符串。
String.prototype.split();   // 按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。


// 1. String.prototype.match()
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

s.match(r1); // ["x"]
s.match(r2); // null

// 如果正则表达式带有g修饰符，则该方法与正则对象的exec方法行为不同，会一次性返回所有匹配成功的结果。
var s = 'abba';
var r = /a/g;

s.match(r); // ["a", "a"]
r.exec(s);  // ["a"]


// 2. String.prototype.search()
'_x_x'.search(/x/);
// 1


// 3. String.prototype.replace()
// 两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容。
// 正则表达式如果不加g修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。 
'aaa'.replace('a', 'b');  // "baa"
'aaa'.replace(/a/, 'b');  // "baa"
'aaa'.replace(/a/g, 'b'); // "bbb"


// replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容。

// replace方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值。
// 第二个参数的替换函数，可以接受多个参数。
// 第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）。
// 此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串。



// 4. String.prototype.split() 
// 非正则分隔
'a,  b,c, d'.split(',');
// [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */);
// [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2);
// [ 'a', 'b' ]



