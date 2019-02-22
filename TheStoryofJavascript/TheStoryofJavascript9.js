/*
 * @Author: Xu Hongkun
 * @Date: 2019-02-11 10:34:39
 * @LastEditTime: 2019-02-11 10:37:16
 * @Description: 错误处理
 */


function f() {
    try {
        console.log(0);
        throw 'bug';
    } catch (e) {
        console.log(1);
        return true; // 这句原本会延迟到 finally 代码块结束再执行
        console.log(2); // 不会运行
    } finally {
        console.log(3);
        return false; // 这句会覆盖掉前面那句 return
        console.log(4); // 不会运行
    }

    console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

console.log(result); // false


// 常用操作
openFile();
try {
    writeFile(Data);
} catch (e) {
    console.log(e.name + ": " + e.message);
    console.log(e.stack);
    handleError(e);
} finally {
    closeFile();
}