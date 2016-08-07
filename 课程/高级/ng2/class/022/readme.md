RouteParams - 路由参数
有时我们希望不同的URL能够路由到同一个组件，比如：


都路由到组件EzAlbum。

在RouteConfig注解中声明路由项的URL时，可以使用:varname来标记一个路由参数：

    @RouteConfig([
        path:"/lg/:title",component:LtsParams,name:"node"
    ])
    class LtsApp{...}


现在需要在LtsParams组件中提取这个参数。

Angular2框架将路由参数封装为一个RouteParams对象，因此，我们在EzAlbum 类的构造函数进行注入即可：

    class LtsParams{
        constructor(@Inject(RouteParams) params){
            this.aid = params.aid;
            //do sth.
        }
    }