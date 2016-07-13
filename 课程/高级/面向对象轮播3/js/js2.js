$(document).ready(function () {
    //下拉导航
    $(".stmenu").hover(function () {
        $(this).find(".child").animate({
            opacity: 'show',
            height: 'show'
        }, 200);
    }, function () {
        $(".stmenu>.child").stop().hide();
    });
    
    
    //banner轮播
    var  scroll = function(obj,l_btn,r_btn){
        this.timer = null;//定时器
        this.iNow = 0;//当前第几张图片
        this.isRun = false;
        
        //box容器
        this.box = $(obj);
        this.boxUl = this.box.find("ul");//获取ul
        this.boxLen = this.box.find("ul li").length;//获取li长度
        this.boxLiWidth = this.box.find("ul li").width();//获取li宽度
        this.width = this.boxLen * this.boxLiWidth + "px";//计算ul容器总宽度
        this.box.find("ul").css("width",this.width);//设置ul容器总宽度
        
        //按钮
        this.l_btn = $(l_btn);//左按钮
        this.r_btn = $(r_btn);//右按钮
        this.l_btn.css("top",(this.box.height() - this.l_btn.height())/2);//设置按钮位置居中
        this.r_btn.css("top",(this.box.height() - this.l_btn.height())/2);
        
        this.init();//初始化
    }
    scroll.prototype.init = function(){
        var _this = this;//鼠标移入
        _this.mouse();//动态添加掉圆点
        _this.add();//动态添加小圆点，及点击事件
        _this.btnClick();//左右按钮点击
        _this.change();//初始化滚动
    }
    
    scroll.prototype.btnClick = function(){
        var _this = this;
        _this.l_btn.click(function(){
            if(_this.isRun){
                return;
            }
            _this.isRun = true;
            _this.iNow--;
            if(_this.iNow < 0){
                _this.iNow = _this.boxLen - 1;
            }
            _this.animation2();  
        });
        
        _this.r_btn.click(function(){
            if(_this.isRun){
                return;
            }
            _this.isRun = true;
            _this.iNow++;
            if(_this.iNow > _this.boxLen - 1){
                _this.iNow = 0;
            }
            _this.animation2(); 
        });
    }
    
    scroll.prototype.add = function(){
        var _this = this;
        var ol = _this.box.find("ol");
        for(var i = 0; i < _this.boxLen; i++){
            ol.append("<li>");
        }
        ol.find("li").eq(0).addClass("on");
        
        for(var i = 0; i < ol.find("li").length; i++){
            ol.find("li").click(function(){
                clearInterval(_this.timer);
                _this.iNow = $(this).index();
                _this.animation2();
            });
        }
    }
    
    scroll.prototype.mouse = function(){
        var _this = this;
        _this.box.mouseover(function(){
            clearInterval(_this.timer);
        });
        _this.box.mouseout(function(){
            _this.change();
        });
    }
    
    scroll.prototype.animation2 = function(){
        var _this = this;
        _this.box.find("ol li").eq(_this.iNow).addClass("on").siblings().removeClass("on");
        _this.boxUl.stop();
        _this.boxUl.animate({
            "left":-_this.iNow*_this.boxLiWidth
        },600,function(){
            _this.isRun = false;
        })   
    }
    
    scroll.prototype.change = function(){
        var _this = this;
        _this.timer = setInterval(function(){
            _this.isRun = true;
            _this.iNow++;
            if(_this.iNow > _this.boxLen - 1){
                _this.iNow = 0;
            }
            _this.boxUl.animate({
                "left":-_this.boxLiWidth * _this.iNow
            },600,function(){
                _this.isRun = false;
            });
            _this.box.find("ol li").eq(_this.iNow).addClass("on").siblings().removeClass("on");
        },5000);
    }
    
    new scroll("#box","#l_btn","#r_btn");
    new scroll("#box2","#l_btn2","#r_btn2");
});