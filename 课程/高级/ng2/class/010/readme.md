使用分支逻辑
如果组件的模板需要根据某个表达式的不同取值展示不同的片段，可以使用NgSwitch系列指令 来动态切分模板。比如右边示例中的广告组件EzPromotion，需要根据来访者性别的不同推送 不同的广告：

    ngswitch

    NgSwitch包含一组指令，用来构造包含多分支的模板：

    NgSwitch

NgSwitch指令可以应用在任何HTML元素上，它评估元素的ngSwitch属性值，并根据这个值 决定应用哪些template的内容（可以同时显示多个分支）：

    <ANY [ngSwitch]="expression">...</ANY>
    NgSwitchWhen

NgSwitchWhen指令必须应用在NgSwitch指令的子template元素上，它通过属性ngSwitchWhen指定一个表达式， 如果该表达式与父节点的NgSwitch指令指定的表达式值一致，那么显示这个template的内容：

    <ANY [ngSwitch]="...">
        <!--与变量比较-->
        <template [ngSwitchWhen]="variable">...</template>
        <!--与常量比较-->
        <template ngSwitchWhen="constant">...</template>
    </ANY>
    NgSwitchDefault

NgSwitchDefault指令必须应用在NgSwitch指令的子template元素上，当没有NgSwitchWhen指令匹配 时，NgSwitch将显示这个template的内容:

    <ANY [ngSwitch]="...">
        <template ngSwitchDefault>...</template>
    </ANY>