mini-expression-interpreter
=================

**mini-expression-interpreter** 是一个 JavaScript 表达式解释器，支持以下表达式子集：

- 基本数据类型：number string boolean
- 属性访问符，如 obj.value obj[index]
- 基本数学运算，如 `+ - * /`
- 逻辑运算 `> < === >= <= !== && ||`
- 三目运算符

适合因安全原因，表达式必须运行在沙箱内的场景，具有以下特性：
- 避免动态执行：表达式中不支持方法调用、new 运算符、访问/修改全局对象（如 location、DOM）
- 避免宿主环境干扰：不允许访问/修改原型链（通过禁止访问 __proto__、prototype）、属性访问符 [] 内仅支持数字字面量索引

Installation
------------

```shell
tnpm install mini-expression-interpreter --save-dev
```

Usage
-----

```js
const assert = require('assert');
const Interpreter = require('../lib/mini-expression-interpreter');
// 需要执行的表达式代码
const code = '0 ? 1 : 2 ? ($[0].values[0] > $[1].values[0] ? 3 : 4 ) : 5';
// 需要参与计算的上下文变量
const context = {
  $: [
   {
     values: [100]
   },
   {
     values: [200]
   }
 ],
};
const interpreter = new Interpreter(code);

assert.equal(
  interpreter.exec(context),
  4,
  'should be calculated accurately'
);
```

License
-------

Licensed under MIT
