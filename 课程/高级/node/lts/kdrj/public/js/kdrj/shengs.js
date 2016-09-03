$(function() {

    // 页头下拉菜单
    $(".notice-down li").hover(function() {
        $(this).addClass("hover").find(".hidebox").show();
    },
    function() {
        $(this).removeClass("hover").find(".hidebox").hide();
    });

    // 侧边栏
    $(".prism_icon_wrap").hover(
        function() {
            $(this).addClass("prism_icon_hover");
        },
        function() {
            $(this).removeClass("prism_icon_hover");
        }
    );
    $(".prism_cart_tab").click(
        function() {
            $(this).parent().toggleClass("prism_tab_select");
            $("#prismWrap").toggleClass("yhd_prism_wrap_open yhd_prism_wrap_wider");
        }
    );
    $('.yhd_prism_nav a.prism_cart_tab').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });
    $(".yhd_prism_nav a").hover(function() {
        $(this).find(".prism_icon_tab").addClass('hover');
    }, function() {
        $(this).find(".prism_icon_tab").removeClass('hover');
    });

    // 二维码
    $('.prism_icon_wrap .prism_icon9').hover(function() {
        $('.prism_icon_wrap .prism_dn-pop').removeClass('dn');
    }, function() {
        $('.prism_icon_wrap .prism_dn-pop').addClass('dn');
    });

    // 点击，返回顶部
    var topFile = $(".yhd_prism_nav .prism_top_text");
    topFile.on('click', function() {
        $("html,body").animate({
            scrollTop: 0
        }, 200);
    });

    /*切换肤色*/
    $("#taobaos").click(function() {
        $(".changes").remove();
        localStorage.changecss = 1;
        $("#changeCss").attr('href', "../../style/index.css");
        if (localStorage.changecss == 1) {
            $("#logochange i").addClass("icon1").removeClass("icon2");
            $("#logochange span").html("淘宝货源");
        }
    });
    $("#wechats").click(function() {
        localStorage.changecss = 0;
        // $("#changeCss").attr('href', "../../style/weishang.css");

        $(".changes").remove();
        $("head").append("<link>");
        css = $("head").children(":last");
        css.attr({
            class: "changes",
            rel: "stylesheet",
            type: "text/css",
            href: "../../style/weishang.css"
        });

        if (localStorage.changecss == 0) {
            $("#logochange i").addClass("icon2").removeClass("icon1");
            $("#logochange span").html("微商货源");
        }
    });

});