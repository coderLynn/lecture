(event) - 事件绑定
在模板中为元素添加事件监听很简单，使用一对小括号包裹事件名称，并绑定 到表达式即可：

    event-bind

上面的代码实例为DOM对象h1的click事件添加监听函数onClick()。

另一种等效的书写方法是在事件名称前加on-前缀：

    @View({template : `<h1 on-click="onClick()">HELLO</h1>`})