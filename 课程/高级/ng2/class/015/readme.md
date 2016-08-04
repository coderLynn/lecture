NgFormControl - 绑定已有控件对象
与NgControlName指令不同，NgFormControl将已有的控件/Control对象绑定到DOM元素 上。当需要对输入的值进行初始化时，可以使用NgFormControl指令。

下面的代码中，使用NgFormControl指令将DOM元素绑定到组件EzComp的成员 变量movie上，我们需要在构造函数中先创建这个Control对象：

    @View({
        //将输入元素绑定到已经创建的控件对象上
        template : `<input type="text" [ngFormControl]="movie">`
    })
    class EzComp{
        constructor(){
            //创建控件对象
            this.movie = new Control("Matrix II - Reload");
        }
    }
控件/Control是Angular2中对表单输入元素的抽象，我们使用其value属性，就可以获得对应的 输入元素的值。

与NgControlName指令的另一个区别是，NgFormControl不需要NgForm或NgFormModel的祖先。