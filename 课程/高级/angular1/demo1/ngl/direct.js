/**
 * Created by Administrator on 2016/9/20.
 */
var direct={
    hotCourse:function(){
        return{
            restrict:'E',
            template:'<div class="container"></div>',
            replace:true,
            link:function($scope,$element,$attr){
                $element.append('插入内容');
                $element.css('background','red');
            }
        }
    }
}