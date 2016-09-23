$(function(){
	/*navBtn*/
	$("#listCloseBtn").click(function(){
		$(".list").stop(false,true).animate({
			"top":"-800px",
			"opacity":"0"
		},500);
	});
	navBtnBool=true;
	$(".navBtn").click(function(){
		$(this).toggleClass("wapBtnAn");
		var screenWidth=$(window).width();
		if(screenWidth>=1024){
			if(navBtnBool){
				$(".list").stop(false,true).animate({
					"top":"0px",
					"opacity":"1"
				},500);
			}else{
				$(".list").stop(false,true).animate({
					"top":"-800px",
					"opacity":"0"
				},500);
			}
			
		}else{
			
			if(navBtnBool){
				
				$(".nav").css("height",$(document.body).height()).show();
				$(".nav").animate({
					"right":"0px"	
				},500);
				navBtnBool=false;
			}else{
				$(".nav").hide();
				$(".nav").animate({
					"right":"-125px"	
				},500);
				
				navBtnBool=true;
			}
		}
		
	});

	$("#listName").focus(function(){	
		if($(this).val()=="您的姓名"){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("您的姓名");
		}
	});
	$("#listCompany").focus(function(){	
		if($(this).val()=="公司名称"){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("公司名称");
		}
	});
	$("#listEmail").focus(function(){	
		if($(this).val()=="您的电话"){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("您的电话");
		}
	});
	$("#listTitle").focus(function(){	
		if($(this).val()=="项目主题"){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("项目主题");
		}
	});
	$("#listInfo").focus(function(){	
		if($(this).val()=="告诉我们您的项目基本信息"){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("告诉我们您的项目基本信息");
		}
	});
});


/*animateClassAdd*/
function anClasAdd(e,keyframes,stime,dtime,an,status){
	$(e).css({
		"animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
		"-moz-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
		"-webkit-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
		"-o-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
	});
}


