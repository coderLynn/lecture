// JavaScript Document
//新闻资讯
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

