inputs - 声明属性值映射
很显然，在定义组件模板时，我们通常会给属性设定一个值，比如，我们希望 以下的模板片段中，将指令所在的DOM对象的背景设置为指定颜色：

    <div [ez-h]="'black'">...</div>
通过使用Directive注解的inputs属性，我们可以将DOM对象的属性映射到指令 对象的属性，例如，对于下面定义的指令：

    @Directive({
        selector : "[ez-h]",
        inputs : ["bgColor:ez-h"]
    })
    class EzHilight{...}
当在模板中使用这个指令时，EzHilight对象的bgColor属性自动绑定到模板中div 元素的ez-h属性的值。对于指令而言，这是一个输入，每当ez-h发生变化，Angular2 将自动设置EzHilight的bgColor属性。

我们可以使用ES6中的setter，在EzHilight中捕捉每个变化的时刻：

    class EzHilight{
        set bgColor(v){
            this.el.style.background = v;
        }
    }