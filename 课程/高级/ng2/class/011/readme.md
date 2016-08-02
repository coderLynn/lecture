NgFor- 循环逻辑
如果希望利用一组可遍历的数据动态构造模板，那么应当使用NgFor指令。 例如右边示例中的EzStar组件，用来展示演员的作品列表：

    ngfor

迭代

NgFor指令应用在template元素上，对ngForOf属性指定的数据集中的每一项 实例化一个template的内容：

    <template ngFor [ngForOf]="items" >
        <li>----------</li>
    </template>
如果items数据集有3条记录，那么会生成3个li对象，就像这样：

    <li>----------</li>
    <li>----------</li>
    <li>----------</li>
不过这没多大用。

使用数据项

好在我们还可以为数据集的每一项声明一个局部变量，以便在模板内引用：

    <template ngFor [ngForOf]="items" #item>
        <li>{{item}}</li>
    </template>
假如items数据集是一个数组：["China","India","Russia"]，那么 现在生成的结果就有点用了：

    <li>China</li>
    <li>India</li>
    <li>Russia</li>
使用数据项索引

有时还需要数据项在数据集中的索引，我们也可以为数据集的每一项的索引声明一个 局部变量，以便在模板内引用：

    <template ngFor [ngForOf]="items" #item #i="index">
        <li>[{{i+1}}] {{item}}</li>
    </template>
现在生成的结果更规矩了：

    <li>[1] China</li>
    <li>[2] India</li>
    <li>[3] Russia</li>
语法糖

与NgIf类似，Angular2也为NgFor提供了两种语法糖：

    //使用template attribute
    <ANY template="ngFor #item of items;#i=index">...</ANY>
    //使用*前缀
    <ANY *ngFor="#item of items;#i=index">...</ANY>
毫无疑问，应当尽量使用*ngFor的简便写法，这可以提高模板的可读性