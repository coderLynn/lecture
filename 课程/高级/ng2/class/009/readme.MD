使用条件逻辑
有时我们需要模板的一部分内容在满足一定条件时才显示，比如右边示例中的EzReader组件， 对于试用用户，它将在正文之上额外显示一个广告：

    ngif

这是指令NgIf发挥作用的场景，它评估属性ngIf的值是否为真，来决定是否渲染 template元素的内容：

    @Component({
        template : `
            <!--根据变量trial的值决定是否显示广告图片-->
              <template [ngIf]="trial==true">
                   <img src="ad.jpg">
               </template>
               <!--以下是正文-->
            <pre>...
    ` })
Angular2同时提供了两种语法糖，让NgIf写起来更简单，下面的两种书写方法和上面 的正式语法是等效的：

    //使用template attribute
    <img src="ad.jpg" template="ngIf tiral==true">
    //使用*前缀
    <img src="ad.jpg" *ngIf="tiral==true">
看起来，显然*ngIf的书写方法更加有人情味儿，不过无论采用哪种书写方法，都将转换 成上面的正式写法，再进行编译。