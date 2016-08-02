NgClass - 样式类
在Web App中，我们通常采用动态添加或删除样式类的方法，来改变DOM元素的外观表现。

当然，我们可以HTML元素的class属性绑定到组件实例的属性上，然后通过改变实例的属性， 实现动态修改HTML元素的样式类：

<div [class]="cls">...</div>
不过，如果一次要删除或添加多个样式类，Angular2内置的NgClass指令会更简单。NgClass 指令的选择符是ngClass，下面的示例将div元素的class属性绑定到组件的cns属性：

<div [ngClass]="cns">...</div>
cns属性是一个JSON对象，每个键代表样式类名，对应的值为true时表示向HTML元素 添加该样式类，为false时表示删除该样式类。如果cns的值如下：

    //EzApp class
    this.cns = {
        light:true,
        future : false,
        tj : true
    }
那么示例模板渲染后的结果是：

<div class="colorful bold">...</div>