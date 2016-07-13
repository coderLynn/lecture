$(document).ready(function () {
    //下拉导航
    $(".stmenu").hover(function () {
        $(this).find(".child").animate({
            opacity: 'show',
            height: 'show'
        }, 200);
    }, function () {
        $(".stmenu .child").stop().hide();
    });


    //banner轮播
    var timer = null;
    var iNow = 0;
    var isRun = false;

    var oBox = $("#box");
    var oUl = oBox.find(".box ul");
    var len = oBox.find(".box li").length;
    var liW = oBox.find(".box li").width();
    var boxLen = len * liW; //计算ul宽度
    oUl.css("width", boxLen); //获取ul宽度
    
    var ol = oBox.find("ol");
    for(var i = 0; i < len; i++){
        ol.append("<li>");
    }
    ol.find("li").eq(0).addClass("on");

    var ulH = oBox.find(".box ul").height();
    var ulW = oBox.find(".box ul").width();
    var btnH = oBox.find("#l_btn").height();
    $("#l_btn").css("top", (ulH - btnH) / 2);
    $("#r_btn").css("top", (ulH - btnH) / 2);

    for(var i = 0; i < ol.find("li").length; i++){
        ol.find("li").eq(i).hover(function(){
            clearInterval(timer);
            iNow = $(this).index();
            animate();
        }); 
    }

    //ul移入停止定时器，移出开启定时器
    oBox.on({
        "mouseover": function () {
            clearInterval(timer);
        },
        "mouseout": function () {
            change();
        }
    });
    //右按钮
    $("#r_btn").click(function () {
        if (isRun) {
            return;
        }
        isRun = true;
        iNow++;
        if (iNow > len - 1) {
            iNow = 0;
        }
        animate();

    });
    //左按钮
    $("#l_btn").click(function () {
        if (isRun) {
            return;
        }
        isRun = true;
        iNow--;
        if (iNow < 0) {
            iNow = len - 1;
        }
        animate();

    });
    function animate(){
        ol.find("li").eq(iNow).addClass("on").siblings().removeClass("on");
        oUl.stop(true);
        oUl.animate({
            "left": -liW * iNow
        }, 600, function () {
            isRun = false;
        }); 
    }
    function change() {
        //isRun = true;
        if(isRun)return;
        timer = setInterval(function () {
            isRun = true;
            iNow++;
            if (iNow > len - 1) {
                iNow = 0;
            }
            oUl.animate({
                "left": -liW * iNow
            }, 600,function(){
                isRun = false;
            });
            ol.find("li").eq(iNow).addClass("on").siblings().removeClass("on");
        }, 5000);
    }
    change();
});