NgForm - 表单指令
NgForm指令为表单元素/form建立一个控件组对象，作为控件的容器；
而NgControlName指令为则为宿主input元素建立一个控件对象，并将该控件加入到NgForm 指令建立的控件组中：
            <form #f="ngForm" (submit)="search(f.value)">
                              <select>
                                    <option value="node">node</option>
                                    <option value="jquery">jquery</option>
                                    <option value="angular">angular</option>
                                    <option value="html5">html5</option>
                              </select>
                              <input type="text"  ngControl="kw">
                              <button  type="submit">search</button>
                        </form>
                        <h1 *ngIf="kw!=''"> 正在搜索...{{kw}}</h1>
局部变量

通过使用#符号，我们创建了一个引用控件组对象（注意，不是form元素！）的局部变量f。
这个变量最大的作用是：它的value属性是一个简单的JSON对象，键对应于input元素的 ng-control属性，值对应于input元素的值：


声明指令依赖

NgForm指令和NgControlName指令都包含在预定义的数组变量FORM_DIRECTIVES中，所以我们在 组件注解的directives属性中直接声明FORM_DIRECTIVES就可以在模板中直接使用这些指令了：

    //angular2/src/common/forms/directives.ts
    export const FORM_DIRECTIVES: Type[] = CONST_EXPR([
      NgControlName,
      NgControlGroup,

      NgFormControl,
      NgModel,
      NgFormModel,
      NgForm,

      NgSelectOption,
      DefaultValueAccessor,
      NumberValueAccessor,
      CheckboxControlValueAccessor,
      SelectControlValueAccessor,
      NgControlStatus,

      RequiredValidator,
      MinLengthValidator,
      MaxLengthValidator
    ]);
