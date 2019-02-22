/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-08 13:14:10
 * @LastEditTime: 2019-02-13 11:16:37
 * @Description: new命令
 */

function foo(params) {
    if (!new.target) {
        console.log('请使用new关键字');
    }
    this.params = params;
    this.run = function () {
        console.log('I am fun.');
    };
}

var person1 = {
    name: '张三',
    age: 38,
    greeting: function () {
        console.log('Hi! I\'m ' + this.name + '.');
    }
};

var person2 = Object.create(person1);

person2.name // 张三
person2.greeting(); // Hi! I'm 张三.