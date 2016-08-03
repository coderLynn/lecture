NgControlGroup - 命名控件组
NgControlGroup指令的选择符是[ng-control-group]，如果模板中的某个元素具有这个属性， Angular2框架将自动创建一个控件组对象，并将这个对象以指定的名称与DOM对象绑定。

控件组可以嵌套，方便我们在语义上区分不同性质的输入：

    ngcontrolgroup

和NgControlName指令一样，NgControlGroup指令也必须作为NgForm或NgFormModel的 后代使用，因为这个指令需要将创建的控件组对象添加到祖先（NgForm或NgFormModel）所创建 的控件组中。