/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-08 14:00:49
 * @LastEditTime: 2019-02-21 10:21:21
 * @Description: prototype 继承
 */

//// 同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function () {
    console.log('喵喵');
  };
}

var cat1 = new Cat('大毛', '白色');
var cat2 = new Cat('二毛', '黑色');

console.log(cat1.meow === cat2.meow);
// false


//// JavaScript 规定，每个*函数*都有一个prototype属性，指向一个对象。
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

console.log(cat1.color); // 'white'
console.log(cat2.color); // 'white'
// 构造函数Animal的prototype属性，就是实例对象cat1和cat2的原型对象。


//// prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。
function Person(name) {
  this._name = name;
  this.say = function () {
    console.log(this._name);
  };
}

someone = new Person("Akira");
someone.say();

console.log(Object.getPrototypeOf(someone));  // 等同于someone.__proto__
console.log(Object.getPrototypeOf(Person));
console.log(Object.getPrototypeOf(Person.prototype));

// instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。
var v = new Vehicle();
console.log(v instanceof Vehicle); // true
// 等同于
console.log(Vehicle.prototype.isPrototypeOf(v));

// instanceof的原理是检查右边构造函数的prototype属性，是否在左边对象的原型链上。
// 有一种特殊情况，就是左边对象的原型链上，只有null对象。这时，instanceof判断会失真。
var obj = Object.create(null);
console.log(typeof obj); // "object"
console.log(Object.create(null) instanceof Object); // false


//// 回溯原型链上的属性
var MyArray = function () {};

MyArray.prototype = new Array();
// 此时MyArray.prototype.constructor为function Array()
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length; // 3
mine instanceof Array; // true


//// 继承
function Shape() {
  this.x = 0;
  this.y = 0;
  function trys(){}
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this); // 调用父类构造函数
}
// 另一种写法
function Rectangle() {
  this.base = Shape;
  this.base();
}

// 第二步，子类继承父类的原型，这样move()方法被继承了
Rectangle.prototype = Object.create(Shape.prototype);  // Shape.prototype是Object { }
Rectangle.prototype.constructor = Rectangle;
// Rectangle.prototype = new Shape();  // new Shape()是Object { x: 0, y: 0 }
// Rectangle.prototype.constructor = Rectangle;
// 上面这种写法也有继承的效果，但是子类会具有父类实例的方法。
// 有时，这可能不是我们需要的，所以不推荐使用这种写法。？？？？


// 
var o1 = {}; 
var o2 = new Object();
var o3 = new f1();

function f1(){}; 
var f2 = function(){};
var f3 = new Function('str','console.log(str)');

console.log(typeof Object);    //function 
console.log(typeof Function);  //function  

console.log(typeof f1);        //function 
console.log(typeof f2);        //function 
console.log(typeof f3);        //function   

console.log(typeof o1);        //object 
console.log(typeof o2);        //object 
console.log(typeof o3);        //object