NgControlName - 命名控件指令
如前所述，NgControlName指令必须作为NgForm或NgFormModel的后代使用， 因为这个指令需要将创建的控件对象添加到祖先（NgForm或NgFormModel）所创建 的控件组中。

NgControlName指令的选择符是[ngControl]，这意味着你必须在一个HTML元素上 定义ngControl属性，这个指令才会起作用。

属性：ngControl

NgControlName指令为宿主的DOM对象创建一个控件对象，并将这个对象以ngControl属性 指定的名称绑定到DOM对象上：

    <form #f="ngForm">
        <input type="text" ngControl="user">
        <input type="password" ngControl="pass">
    </form>
在上面的代码中，将创建两个Control对象，名称分别为user和pass。

属性/方法：ngModel

除了使用控件组获得输入值，NgControlName指令可以通过ngModel实现模型 与表单的双向绑定：

    <form>
        <input type="text" ngControl="user" [(ngModel)]="data.user">
        <input type="password" ngControl="pass" [(ngModel)]="data.pass">
    </form>`
ngModel即是NgControlName指令的属性，也是它的事件，所以下面 的两种写法是等价的：

    <input type="text" ngControl="user" [(ngModel)]="data.user">
    //等价于
    <input type="text" ngControl="user" [ngModel]="data.user" (ngModel)="data.user">