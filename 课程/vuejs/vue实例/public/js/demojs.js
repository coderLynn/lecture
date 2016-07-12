new Vue({
    el:"#app",
    data:{
        message:"hello vue.js"
    }
});

new Vue({
    el:"#chanche",
    data:{
        msg:"hello vue"
    }
});
new Vue({
    el:"#list",
    data:{
        dolist:[
            {name:"john"},
            {name:"same"},
            {name:"zhangsan"},
            {name:"lisi"}
        ]
    }
});

//class and style绑定

new Vue({
    el:"#_class",
    data:{
        classObj:{
            "classa":true,
            "classb":false
        }
    }
});

//绑定style


new Vue({
    el:"#_style",
    data:{
        ostyle:{
            color:"blue",
            fontSize:30
        }
    }
});

//方法与事件处理器

new Vue({
   el:"#_fun",
    data:{
        name:"hello vue.js"
    },
   methods:{
        greet:function(){
            alert("弹出"+this.name);
            console.log("hello vue.js");
        }
   }
});