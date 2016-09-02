Fengs.add('kdrj/spfl/spfl', function(S, $,Req, cookie, md5, popBox) {



    //下拉菜单
    $(".more-select").each(function() {
        var y = $(this).find("dt span");
        var s = $(this);
        var z = parseInt(s.css("z-index"));
        var dt = $(this).children("dt");
        var dd = $(this).children("dd");
        var _show = function(e) {
            e.stopPropagation();
            dd.slideDown(0);
            dt.addClass("cur");
            s.css("z-index", z + 1);
            y.css("border", "1px solid #cacaca");
        }; //展开效果
        var _hide = function(e) {
            e.stopPropagation();
            dd.slideUp(0);
            dt.removeClass("cur");
            s.css("z-index", z);
            y.css("border", "1px solid #fff");
        }; //关闭效果
/*                        dt.click(function() {
            dd.is(":hidden") ? _show() : _hide();
        });
        dd.find("a").click(function() {
            dt.html($(this).html());
            _hide();
        }); //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）*/

        var allhide = function() {
            $(".select-box").each(function() {
                $(this).find("dt").removeClass("cur");
                $(this).find("dt span").css("border", "1px solid #fff");
                $(this).find("dl").css("z-index", "0");
                $(this).find("dd").hide();
                $(this).removeAttr("style");
            });
        };

        dt.click(function(e) {
            e.stopPropagation();
            // 0
            if (dd.is(":hidden")) {
                allhide();
            }

            dd.is(":hidden") ? _show(e) : _hide(e);
        });

        $("html,body").click(function(e) {
            e.stopPropagation();
            allhide();
        });

        dd.find("a").click(function() {
            dt.children("span").html($(this).html());
            _hide();
        }); //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）


    });

    /* 签名算法 */
    var index = {
        init: function(){
            var _this = this;
            // 今日热卖
            _this._hot();
        },

        // 今日热卖
        _hot: function(){
            var url = 'kd/product_list';
            Req.s({
                'url': url
                , 'type': 'jsonp'   //可以不传入，默认为POST，外网为jsonp
                , 'data': {'username': 'junsheng@sududa.com', 'do':'hot'}  //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
                , 'success': function (data){  //请求成功后的回调
                    // console.log(data);  //Object {sududa: Object}

                    if ((data.sududa.all) !== 0) {   //num !== str  ,true   num 与 str类型不同 意味着其两者不等　非运算自然是true啦
                        var hotData = data.sududa.list.l;
                        if (data.status && data.status == -9){
                            console.log("签名不能为空");
                        } else {
                            $(".today-cont").html("");
                            for (var i = 0; i < 15; i++) {
                                // 兼容下, 因为只有一条数据就不会是数组
                                hotData[i].style.li = hotData[i].style.li == "" ? [] : hotData[i].style.li;
                                if (!$.isArray(hotData[i].style.li)) {  //如果只返回来一个数据需要做处理
                                    hotData[i].style.li = [hotData[i].style.li];  //[] 数组
                                }

                                var remen = '<div class="today-hvr">\
                                        <i class="today-pin"></i>\
                                        <div class="today-leptn">\
                                        <div class="today-lt"></div>\
                                        <div class="heading">\
                                        <div class="heading-cont">\
                                        <p class="heading-c1">基础版：<i>¥</i><i class="num">'+hotData[i].style.li[0].c2+'</i></p>\
                                        <p>高级版：<i>¥</i><i>'+hotData[i].style.li[0].c+'</i></p>\
                                        <p>财富版：<i>¥</i><i>'+hotData[i].style.li[0].c3+'</i></p>\
                                        </div>\
                                        </div>\
                                        <div class="caption">\
                                        <div class="caption-mar">\
                                        <a href="javascript:void(0);" class="caption-l fl">\
                                        <i class="fl"></i>\
                                        <span class="fl">加入购物车</span>\
                                        </a>\
                                        <a href="javascript:void(0);" class="caption-r fr">铺货</a>\
                                        </div>\
                                        </div>\
                                        </div>\
                                        <div class="today-top">\
                                        <img class="today-img" src="'+hotData[i].m+'" height="228" width="228">\
                                        </div>\
                                        <div class="today-btn">\
                                        <div class="xiqin">\
                                        <p class="xiqin-one">\
                                        <span class="fl">'+hotData[i].i+'</span>\
                                        <i class="ic1 fl"></i>\
                                        <i class="ic2 fl"></i>\
                                        <i class="ic3 fl"></i>\
                                        <i class="ic4 fl"></i>\
                                        </p>\
                                        <p class="xiqin-two"><a href="javascript:void(0);">'+hotData[i].t+'</a></p>\
                                        <p class="xiqin-three">\
                                        <i class="j1">¥</i><i class="j2">'+hotData[i].style.li[0].c+'</i>\
                                        </p>\
                                        <p class="xiqin-four">市场价：'+hotData[i].style.li[0].p+'</p>\
                                        <div class="sel">\
                                        <i class="sect"></i>\
                                        </div>\
                                        </div>\
                                        </div>\
                                        </div>';

                                $(".today-cont").append(remen);
                            }

                            // js加载问题
                            $(".today-cont").slide({
                                type:"menu",
                                titCell:".today-hvr",
                                targetCell:".today-leptn",
                                delayTime:0,
                                triggerTime:10,
                                defaultPlay:false,
                                returnDefault:true
                            });

                            // 打钩
                            $(".today-hvr .sect").bind("click", function () {
                                $(this).parent().parent().toggleClass("select");
                                var selectTag = $(".today-hvr .xiqin.select").length;
                                var allSelect = $('.today-hvr .xiqin').length;
                                if (selectTag === allSelect) {
                                    $('.slt-i').addClass('select'); //.html('全不选');
                                } else {
                                    $('.slt-i').removeClass('select'); //.html('全选');
                                }
                            });

                            // 全选tab
                            $('.slt-i').click(function(){
                                if(!$(this).hasClass('select')) {

                                    $(this).addClass('select');
                                    $(".today-hvr .xiqin").addClass("select");

                                } else {
                                    $(this).removeClass('select');
                                    $(".today-hvr .xiqin").removeClass("select");
                                }
                            });

                            // hvr
                            $(".today-hvr").hover(function() {
                               $(this).addClass('hvr');
                            },
                            function() {
                                $(this).removeClass('hvr');
                            });

                        }

                    }

                }
                , 'error' : function(data){   //请求失败后的回调方法
                    console.log(data);
                }
            });

        },





    };
    index.init();










}, ['kdrj/req','jquery/cookie', 'common/md5', 'kdrj/utils/popBox']);
