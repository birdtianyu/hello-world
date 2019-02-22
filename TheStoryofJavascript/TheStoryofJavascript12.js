/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-11 11:43:21
 * @LastEditTime: 2019-02-12 09:24:05
 * @Description: 属性描述对象
 */



/*
 * JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。
 * 这个内部数据结构称为“属性描述对象”（attributes object）。
 * 每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。 
 * 
 * 属性描述对象提供6个元属性:

    value:        该属性的属性值，默认为undefined。
    writable:     布尔值，表示属性值（value）是否可改变（即是否可写），默认为true。
    enumerable:   布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性。
    configurable: 布尔值，表示可配置性，控制了属性描述对象的可写性。默认为true。如果设为false，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value属性除外）。
    get:          函数，表示该属性的取值函数（getter），默认为undefined。
    set:          函数，表示该属性的存值函数（setter），默认为undefined。
    
 */



// A. Object.getOwnPropertyDescriptor()
// Object.getOwnPropertyDescriptor()方法可以获取属性描述对象。
// 第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名。
var obj = {
   p: 'a'
};
Object.getOwnPropertyDescriptor(obj, 'p');
// {value: "a", writable: true, enumerable: true, configurable: true}

// ※ 注意，Object.getOwnPropertyDescriptor()方法只能用于对象自身的属性，不能用于继承的属性。
Object.getOwnPropertyDescriptor(obj, 'toString');
// undefined



// B. Object.getOwnPropertyNames()
// Object.getOwnPropertyNames方法返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历。
var obj = Object.defineProperties({}, {
   p1: {
      value: 1,
      enumerable: true
   },
   p2: {
      value: 2,
      enumerable: false
   }
});

Object.getOwnPropertyNames(obj);
// ["p1", "p2"]

// 这跟Object.keys的行为不同，Object.keys只返回对象自身的可遍历属性的全部属性名。
Object.keys([]); // []
Object.getOwnPropertyNames([]); // [ 'length' ]

Object.keys(Object.prototype); // []
Object.getOwnPropertyNames(Object.prototype);
// ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]



// C. Object.defineProperty() && Object.defineProperties()
// Object.defineProperty()方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，它的用法如下:
Object.defineProperty(object, propertyName, attributesObject);
/*
 * 参数:
    object:           属性所在的对象
    propertyName:     字符串，表示属性名
    attributesObject: 属性描述对象
 */
var obj = Object.defineProperty({}, 'p', {
   value: 123,
   writable: false,  // obj.p属性不可写
   enumerable: true,
   configurable: false
});

console.log(obj.p); // 123

obj.p = 246;
console.log(obj.p); // 123
// ※ 注意，这里的Object.defineProperty方法的第一个参数是{}（一个新建的空对象），p属性直接定义在这个空对象上面，然后返回这个对象。
// 这是Object.defineProperty()的常见用法。
// 如果属性已经存在，Object.defineProperty()方法相当于更新该属性的属性描述对象。

// Object.defineProperties()方允许通过属性描述对象，定义或修改多个属性，然后返回修改后的对象。
var obj = Object.defineProperties({}, {
   p1: { value: 123, enumerable: true },
   p2: { value: 'abc', enumerable: true },
   p3: { get: function () { return this.p1 + this.p2 },
     enumerable:true,
     configurable:true
   }
 });
 
console.log(obj.p1); // 123
console.log(obj.p2); // "abc"
console.log(obj.p3); // "123abc"

// ※ 注意，一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，或者同时定义value属性，否则会报错。
var obj = {};

Object.defineProperty(obj, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value

Object.defineProperty(obj, 'p', {
  writable: true,
  get: function() { return 456; }
});
// TypeError: Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute

// writable、configurable、enumerable这三个属性的默认值都为false。
var obj = {};
Object.defineProperty(obj, 'foo', {});
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }



// D. Object.prototype.propertyIsEnumerable()
// 实例对象的propertyIsEnumerable()方法返回一个布尔值，用来判断某个属性是否可遍历。
var obj = {};
obj.p = 123;

obj.propertyIsEnumerable('p'); // true
obj.propertyIsEnumerable('toString'); // false

// ※ 注意: 只能用于判断对象自身的属性，对于继承的属性一律返回false。

/*
 * 元属性:
 *    属性描述对象的各个属性称为“元属性”(控制属性的属性)。 
 */

var obj = {
   get p(){
      return 'getter';
   },
   set p(val){
      console.log('setter: ' + val);
   }
};

console.log(obj.p); // "getter"






