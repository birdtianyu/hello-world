/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-12 11:34:44
 * @LastEditTime: 2019-02-12 11:37:15
 * @Description: 三大包装对象之: Boolean对象
 */

// 所有对象对应的布尔值都是true
if (new Boolean(false)) {
  console.log('true');
} // true

if (new Boolean(false).valueOf()) {
  console.log('true');
} // 无输出

