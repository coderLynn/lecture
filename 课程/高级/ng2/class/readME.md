初识Angular2
===================================
写一个Angular2的Hello World应用相当简单，分三步走：

1. 引入Angular2预定义类型
------------------------------
import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import是ES6的关键字，用来从模块中引入类型定义。在这里，我们从angular2模块库中引入了两个类型： Component类和bootstrap函数。

2. 实现一个Angular2组件
------------------------------
实现一个Angular2组件也很简单，定义一个类，然后给这个类添加注解：

@Component({
    selector:"ez-app",
    template:"<h1>Hello,Angular2</h1>"
})
class EzApp{}
class也是ES6的关键字，用来定义一个类。@Component是给类EzApp附加的元信息， 被称为注解/Annotation。

@Component最重要的作用是：

通过selector属性（值为CSS选择符），告诉Angular2框架，这个组件渲染到哪个DOM对象上。
通过template属性，告诉Angular2框架，使用什么模板进行渲染。
在alpha版本中的注解@View依然存在并可以使用，比如，这样的写法也是支持的：

@Component({selector:"ez-app"}
@View({template:"<h1>Hello,Angular2</h1>"}
class EzApp{}
不过在beta版本中，Component注解类（间接）继承自View注解类，因此，现在只用 Component注解就可以了。

3. 渲染组件到DOM
------------------------------
将组件渲染到DOM上，需要使用自举/bootstrap函数：

bootstrap(EzApp);
这个函数的作用就是通知Angular2框架将EzApp组件渲染到DOM树上。

简单吗？我知道你一定还有疑问，别着急，我们慢慢把缺失的知识点补上！