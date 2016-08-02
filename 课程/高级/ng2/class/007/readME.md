NgStyle - 内联样式
我们可以使用样式绑定的方法设置单一样式。但如果要同时设置多个样式值，可以使用 NgStyle指令，将内联样式绑定到组件的属性上。

NgStyle指令的选择符是[ngStyle]，下面的示例将div元素的样式绑定到组件的 styles属性：

    <div [ngStyle]="styles">...</div>
styles属性应当一个JSON对象，其键为样式名，值为样式值：

    //EzApp class
    this.styles = {
        "color" : "red",
        "font-style" : "italic",
        "background-color" : "black"
    }
样式名可以使用HTML语法中的属性名写法（如上），也可以使用JS语法中的驼峰/camelCase 书写方法：

    //EzApp class
    this.styles = {
        color: "red"
        fontStyle : "italic",
        backgroundColor : "black"
    }
通常来讲，在JavaScript中设置DOM元素的CSS样式，都会使用驼峰名称，因此，建议 采用后一种写法。