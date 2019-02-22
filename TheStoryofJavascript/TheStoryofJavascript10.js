/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-11 10:40:45
 * @LastEditTime: 2019-02-11 10:49:22
 * @Description: console控制台
 */

// 1. 这两个方法用于计时，可以算出一个操作所花费的准确时间。
console.time('Array initialize');

var array = new Array(10000);
for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
}

console.timeEnd('Array initialize'); // label必须和开始相同
// Array initialize: 1.52587890625ms


// 2. console.count方法用于计数，输出它被调用了多少次
function greet(user) {
    console.count();
    return 'hi ' + user;
}

greet('bob')
//  : 1
// "hi bob"

greet('alice')
//  : 2
// "hi alice"

greet('bob')
//  : 3
// "hi bob"


// 3. 对于某些复合类型的数据，console.table方法可以将其转为表格显示。
var languages = [{
        name: "JavaScript",
        fileExtension: ".js"
    },
    {
        name: "TypeScript",
        fileExtension: ".ts"
    },
    {
        name: "CoffeeScript",
        fileExtension: ".coffee"
    }
];

console.table(languages);


// 4. 不同的输出信息类型
console.warn('Warning! Too few nodes');
// Warning! Too few nodes
console.error('Error: %s (%i)', 'Server is not responding', 500);
// Error: Server is not responding (500)

