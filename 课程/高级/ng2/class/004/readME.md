properties - 声明属性
属性是组件暴露给外部世界的调用接口，调用者通过设置不同的属性值来定制 组件的行为与外观：

    prop

在Angular2中为组件增加属性接口非常简单，只需要在Component注解的 properties属性中声明组件的成员变量就可以了：

    //LtsApp
        @Component({
            properties:["name","work"]
        })
上面的代码将组件的成员变量name和country暴露为同名属性，这意味着在EzApp 的模板中，可以直接使用中括号语法来设置EzCard对象的属性：

    //LtsApp
    @Component({
        directives : [LtsApp],
        template : `<ez-card [name]="'未来之光'" [work]="'前端开发'"></ez-card>`
    })
提醒：如果要在模板中使用自定义的指令（组件是一种指令），必须在Component注解的directives 属性中提前声明！