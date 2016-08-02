[property] - 属性绑定
在模板中，也可以使用一对中括号将HTML元素或组件的属性绑定到组件模型的某个表达式， 当表达式的值变化时，对应的DOM对象将自动得到更新：

    property bind

等价的，你也可以使用bind-前缀进行属性绑定：

    @Component({template:`<h1 bind-textContent="title"></h1>`})
很容易理解，通过属性，应用相关的数据流入组件，并影响组件的外观与行为。

需要注意的是，属性的值总是被当做调用者模型中的表达式进行绑定，当表达式变化时，被 调用的组件自动得到更新。如果希望将属性绑定到一个常量字符串，别忘了给字符串加引号，或者， 去掉中括号：

    //错误，Angular2将找不到表达式 Hello,Angular2
    @Component({template:`<h1 [textContent]="Hello,Angular2"></h1>`})
    //正确，Angular2识别出常量字符串表达式 'Hello,Angular2'
    @Component({template:`<h1 [textContent]="'Hello,Angular2'"></h1>`})
    //正确，Angular2识别出常量字符串作为属性textContent的值
    @Component({template:`<h1 textContent="Hello,Angular2"></h1>`})