host - 声明事件监听
如果指令的实现需要监听所在DOM元素的事件，可以使用Directive注解的host属性。

下面的示例中，指令将监听所在DOM元素的两个事件 - click和mouseover：

    @Directive({
        selector : "[ez-h]",
        host : {
            '(click)':'onMyClick()',
            '(mouseover)':'onMyMouseOver()'
        }
    })
class EzHilight{...}
你看到，host属性的值应当是一个JSON对象，其键为一对小括号包裹的事件名称，书写 方法与在模板中一致；值为事件处理表达式，通常是对指令类中方法的调用。例如：

    class EzHilight{
        onMyClick(){...}
        onMyMouseOver(){...}
    }

鼠标移入字体加粗