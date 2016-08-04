Directive - 定义指令元数据
指令是Angular对HTML进行扩展的基本手段。与Angular1.x不同，在Angular2中， 指令被明确地划分为三种类型：

组件 - 组件其实就是带有模板的指令
属性指令 - 属性指令用来改变所在元素的外观或行为，例如NgClass和NgStyle指令
结构指令 - 结构指令用来向DOM中添加或删除元素，例如NgIf和NgFor指令。
组件使用Component注解来装饰组件类，而属性指令和结构指令则使用Directive注解 来装饰指令类。

1.Directive注解 - 声明指令元数据

Directive注解最重要的属性是selector，它指定了触发Angular2框架生成指令实例 的CSS选择符。下面的示例定义了一个指令EzDirective：

    @Directive({selector:"[ez-h]"})
    class EzHilight{...}
模板中具有ez-h的元素，Angular2框架都将为其生成一个EzDirective类实例。例如， 下面的模板中，框架姜维div元素实例化EzHilight：

    <div ez-h>...</div>
2.ElementRef - 获取指令所在DOM对象

很显然，我们需要在EzDirective类的实现中进行DOM操作，这需要告诉Angular2框架向我们 注入ElementRef对象，其nativeElement属性就是对应的DOM对象：

    class EzHilight{
        constructor(@Inejct(ElementRef) elref){
            this.el = elref.nativeElement; //获取指令所在的DOM元素
            this.el.styles.color = "red";  //进行DOM操作
        }
    }
3.使用自定义指令

如果要在组件中使用自定义指令，需要在Component注解中设置directives属性：

    @Component({
        selector : "ez-app",
        template : "<div ez-h>...</div>",
        directives : [EzHilight]
    })
    class EzApp{}