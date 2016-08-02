template/templateUrl - 声明模板
组件的Component注解最重要的属性两个属性之一就是template - 模板。 Angular2的模板是兼容HTML语法的，这意味着你可以使用任何标准的HTML标签编写 组件模板。

所以，在最简单的情况下，一个Angular2组件的模板由标准的HTML元素构成，看起来就是 一段HTML码流。Angular2将原封不同地渲染这段模板：

html-template

有两种方法为组件指定渲染模板：

1. 内联模板
----------------------
可以使用组件的View注解中的template属性直接指定内联模板：

    @Component({
        template : `<h1>hello</h1>
                    <div>...</div>`
    })
在ES6中，使用一对`符号就可以定义多行字符串，这使得编写内联的模板轻松多了。

2. 外部模板
----------------------
也可以将模板写入一个单独的文件：

    <!--ezcomp-tpl.html-->
    <h1>hello</h1>
    <div>...</div>
然后在定义组件时，使用templateUrl引用外部模板：

    @Component({
        templateUrl : "ezcomp-tpl.html"
    })