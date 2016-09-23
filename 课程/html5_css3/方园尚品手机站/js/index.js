// JavaScript Document
//工程范围选项卡
(function() {
	var tab = $(".c-5 .tab").find("li");
	tab.each(function(i) {
		
		$(this).on("hover",function() {
			$(this).addClass("active").siblings().removeClass("active");
			$(".c-5 .rr").hide().eq(i).show();
		});		
	});
})();
$(document).ready(function() { 
$(".c-5 .tab li:eq(0)").addClass('active');
$(".c-5 .rr").eq(0).show()
});






//左侧导航
$(function(){
	$(".topline p .s2 a").bind("click",function(){
	 $(".menu").show(1000);

	 $(".screen").stop().animate({"left":"180px"},1000).css("cursor","pointer");
        $(".screen").click(function(e){
            e.stopPropagation();
        })
	 return false;
	})
	$(".screen").bind("click",function(){
	var a=$(".menu").css("display");
	if(a=='block'){
	$(".menu").hide(1000);

	$(this).stop().animate({"left":"0px"},1000).css("cursor","default");

        return false;
	}

	})
})
