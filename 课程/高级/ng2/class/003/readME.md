styles/styleUrls - 设置样式
组件既然处于UI层，就应当好看些，好看是构造良好用户体验的一部分。Angular2的 组件模板基于HTML，那么显然，我们需要通过样式表/CSS来调整组件的外观。

和模板类似，我们有两种方法为组件设置CSS样式：

1. 内联样式
-------------------
可以使用组件Component注解的styles属性来设置内联样式：

@Component({
    styles:[`
        h1{background:#4dba6c;color:#fff}
    `]
})
2. 外部样式
-------------------
也可以把样式定义在单独的文件中：

/*ez-greeting.css*/
h1{background:#4dba6c;color:#fff}
然后使用Component注解的styleUrls属性来引入外部样式：

@Component({
    styleUrls:["ez-greeting.css"]
})