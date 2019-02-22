/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-12 13:05:47
 * @LastEditTime: 2019-02-12 13:59:55
 * @Description: 三大包装对象之: String对象
 */

var s1 = 'abc';
var s2 = new String('abc');

console.log(typeof s1); // "string"
console.log(typeof s2); // "object"

s2.valueOf(); // "abc"




/*一. 静态方法 */
// String.fromCharCode()
// 该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。
String.fromCharCode(); // ""
String.fromCharCode(97); // "a"
String.fromCharCode(104, 101, 108, 108, 111); // "hello"

// ※注意，该方法不支持 Unicode 码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）。
String.fromCharCode(0x20BB7);     // 0x20BB7大于0xFFFF
// "ஷ"
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7);
// true

// 0x20BB7对应的字符是汉字𠮷，但是返回结果却是另一个字符（码点0x0BB7）。
// 这是因为String.fromCharCode发现参数值大于0xFFFF，就会忽略多出的位（即忽略0x20BB7里面的2）。
// 这种现象的根本原因在于，码点大于0xFFFF的字符占用四个字节，而JavaScript默认支持两个字节的字符。
// 这种情况下，必须把0x20BB7拆成两个字符表示。
// 码点大于0xFFFF的字符的四字节表示法，由 UTF-16 编码方法决定。
String.fromCharCode(0xD842, 0xDFB7);
// "𠮷"




/*二. 实例属性 */
console.log('abc'.length); // 3




/*三. 实例方法 */
// 1. String.prototype.charAt()
// charAt方法返回指定位置的字符，参数是从0开始编号的位置。
var s = new String('abc');

s.charAt(1); // "b"
s.charAt(s.length - 1); // "c"

// 这个方法完全可以用数组下标替代。
console.log('abc'.charAt(1)); // "b"
console.log('abc'[1]); // "b

// 如果参数为负数，或大于等于字符串的长度，charAt返回空字符串。
'abc'.charAt(-1); // ""
'abc'.charAt(3); // ""


// 2. String.prototype.charCodeAt()
// charCodeAt方法返回字符串指定位置的Unicode码点（十进制表示），相当于String.fromCharCode()的逆操作。
'abc'.charCodeAt(1); // 98
// 字符b的Unicode码点是98

// 如果没有任何参数，charCodeAt返回首字符的 Unicode 码点。
'abc'.charCodeAt(); // 97

'abc'.charCodeAt(-1); // NaN
'abc'.charCodeAt(4); // NaN


// 3. String.prototype.concat()
// concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串。
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2);    // "abcdef"
console.log(s1);  // "abc"

// 如果参数不是字符串，concat方法会将其先转为字符串，然后再连接。
var one = 1;
var two = 2;
var three = '3';

''.concat(one, two, three);     // "123"
console.log(one + two + three); // "33"


// 4. String.prototype.slice()
// slice方法用于从原字符串取出子字符串并返回，不改变原字符串。
// 它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
'JavaScript'.slice(0, 4);   // "Java"
'JavaScript'.slice(-6);     // "Script"
'JavaScript'.slice(0, -6);  // "Java"
'JavaScript'.slice(-2, -1); // "p"

// 如果第一个参数大于第二个参数，slice方法返回一个空字符串。
'JavaScript'.slice(2, 1);   // ""


// 5. String.prototype.substring()
// 不建议使用
// substring方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像。
// 它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
'JavaScript'.substring(0, 4); // "Java"

// 如果第一个参数大于第二个参数，substring方法会自动更换两个参数的位置。
'JavaScript'.substring(10, 4); // "Script"
// 等同于
'JavaScript'.substring(4, 10); // "Script"

// 如果参数是负数，substring方法会自动将负数转为0。
'JavaScript'.substring(-3); // "JavaScript"
'JavaScript'.substring(4, -3); // "Java"
// 等同于
'JavaScript'.substring(0, 4);

// 由于这些规则违反直觉，因此不建议使用substring方法，应该优先使用slice。


// 6. String.prototype.substr()
// substr方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice和substring方法的作用相同。
// substr方法的第一个参数是子字符串的开始位置（从0开始计算）
// ※第二个参数是子字符串的长度。
'JavaScript'.substr(4, 6);  // "Script"
'JavaScript'.substr(4);  // "Script"

// 如果第一个参数是负数，表示倒数计算的字符位置。
'JavaScript'.substr(-6);  // "Script"
// 如果第二个参数是负数，将被自动转为0，因此会返回空字符串。
'JavaScript'.substr(4, -1);  // ""


// 7. String.prototype.indexOf(), String.prototype.lastIndexOf()
// lastIndexOf从尾部开始匹配，indexOf则是从头部开始匹配。
'hello world'.indexOf('o'); // 4
'JavaScript'.indexOf('script'); // -1 返回-1，就表示不匹配

// indexOf方法还可以接受第二个参数，表示从该位置开始向后匹配。
// lastIndexOf的第二个参数表示从该位置起向前匹配。
'hello world'.indexOf('o', 6); // 7
'hello world'.lastIndexOf('o', 6); // 4


// 8. String.prototype.trim()
// trim方法用于去除字符串两端的空格，返回一个新字符串，不改变原字符串。
'  hello world  '.trim();
// "hello world"

// 该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）。
'\r\nabc \t'.trim();
// 'abc'


// 9. String.prototype.toLowerCase(), String.prototype.toUpperCase()
// 返回一个新字符串，不改变原字符串。
'Hello World'.toLowerCase();
// "hello world"

'Hello World'.toUpperCase();
// "HELLO WORLD"


// 10. String.prototype.match()
// match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。
// 如果没有找到匹配，则返回null。
'cat, bat, sat, fat'.match('at'); // ["at"]
'cat, bat, sat, fat'.match('xt'); // null

// match方法还可以使用正则表达式作为参数

// 返回的数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串。
var matches = 'cat, bat, sat, fat'.match('at');
console.log(matches.index); // 1
console.log(matches.input); // "cat, bat, sat, fat"


// 11. String.prototype.search(), String.prototype.replace()
// 正则表达式
// search方法的用法基本等同于match，但是返回值为匹配的第一个位置。
// 如果没有找到匹配，则返回-1
'cat, bat, sat, fat'.search('at');  // 1

// replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）。
'aaa'.replace('a', 'b'); // "baa"


// 12. String.prototype.split()
// 正则表达式
// split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
'a|b|c'.split('|'); // ["a", "b", "c"]
// 如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。
'a|b|c'.split('');  // ["a", "|", "b", "|", "c"]
// 如果省略参数，则返回数组的唯一成员就是原字符串。
'a|b|c'.split(); // ["a|b|c"]

'a||c'.split('|'); // ['a', '', 'c']
'|b|c'.split('|'); // ["", "b", "c"]
'a|b|'.split('|'); // ["a", "b", ""]

// split方法还可以接受第二个参数，限定返回数组的最大成员数。
'a|b|c'.split('|', 0); // []
'a|b|c'.split('|', 1); // ["a"]
'a|b|c'.split('|', 2); // ["a", "b"]
'a|b|c'.split('|', 3); // ["a", "b", "c"]
'a|b|c'.split('|', 4); // ["a", "b", "c"]


// 13. String.prototype.endsWith(), String.prototype.startsWith()
'Javascript'.startsWith('Java');  // true
'Javascript'.endsWith('scrip');   // false












