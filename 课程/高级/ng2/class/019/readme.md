enderer - 使用渲染器
在EzHilight指令的实现中，我们是直接通过ElementRef对象的nativeElement 属性来直接操作浏览器DOM的，不过Angular2其实不希望我们这么做，因为这将使 我们的代码与浏览器纠缠不清，有违Angular2的跨平台本意 —— 换句话说，这么直接 操作DOM的做法，是反模式的。

在Angular2中，引入了渲染器/renderer的概念，它定义了一组规范的接口Renderer， 对于不同的平台，有不同的实现。比如，对于浏览器，对应的Renderer实现是DomRenderer。

在指令的构造函数中，我们可以要求Angular2框架注入当前使用的渲染器对象：

    class EzHilight{
        constructor(@Inject(ElementRef) el,@Inject(Renderer) renderer){
            this.el = el;
            this.renderer = renderer;
        }
    }
Angular2希望我们使用Renderer来代替直接的DOM操作，这将保证我们的代码获得 跨平台特性。现在我们使用Renderer的setElementStyle()方法来修改样式：

    class EzHilight{
        set bgColor(v){
            this.renderer.setElementStyle(this.el,"background",v);
        }
    }