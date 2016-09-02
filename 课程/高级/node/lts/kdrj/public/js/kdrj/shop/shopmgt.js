Fengs.add('kdrj/shop/shopmgt', function(S, $, Req, cookie, md5, popBox) {



    // hover(a)
    $(".tltle-ul li a").each(function() {
        $this = $(this);
        // alert(123)
        if ($this[0].href == String(window.location)) {
            $this.addClass("hover");
        }
    });

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
            // y.css("border", "1px solid #cacaca");
        };
        //展开效果
        var _hide = function(e) {
            e.stopPropagation();
            dd.slideUp(0);
            dt.removeClass("cur");
            s.css("z-index", z);
            // y.css("border", "1px solid #fff");
        };

        var allhide = function() {
            $(".select-box").each(function() {
                $(this).find("dt").removeClass("cur");
                // $(this).find("dt span").css("border", "1px solid #fff");
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
        });

    });


    /* 签名算法 */
    var index = {
        init: function(){
            var _this = this;
            // 今日热卖
            _this._cdity();
        },

        // 商品
        _cdity: function() {
            var url = 'kd/product_list';
            Req.s({
                'url': url
                , 'type': 'jsonp' //可以不传入，默认为POST，外网为jsonp
                , 'data': {
                    'username': 'junsheng@sududa.com',
                    'do': 'hot',
                } //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
                , 'success': function(data) { //请求成功后的回调
                    console.log(data);

                    var ditydata = data.sududa.list.l;
                    $(".today-shangp").html('');

                    for (var i = 0; i < 10; i++) {
                        // 兼容下, 因为只有一条数据就不会是数组
                        ditydata[i].style.li = ditydata[i].style.li == "" ? [] : ditydata[i].style.li;
                        if (!$.isArray(ditydata[i].style.li)) { //如果只返回来一个数据需要做处理
                            ditydata[i].style.li = [ditydata[i].style.li]; //[] 数组
                        }

                        var _html = '<div class="today-commodity">\
                                <div class="today-commod1 fl">\
                                <i class="sels"></i>\
                                </div>\
                                <div class="today-commod2 fl">\
                                <dl class="fl">\
                                <dt>\
                                <img src="' + ditydata[i].m + '" height="78" width="78">\
                                </dt>\
                                <dd class="today-dd1">\
                                <a href="javascript:void(0);">' + ditydata[i].t + '</a>\
                                </dd>\
                                <dd class="today-dd2">\
                                <a class="fl">商家编码：</a>\
                                <a class="fl bm" href="javascript:void(0);">\
                                <span class="fl">' + ditydata[i].i + '</span>\
                                <i class="fl"></i>\
                                </a>\
                                </dd>\
                                </dl>\
                                </div>\
                                <div class="today-commod3 fl">\
                                <div class="heading-shic">\
                                <p class="heading-tp">已失效</p>\
                                <p class="heading-cw"><i class="baoy"></i><span>客户达供货商已下架</span></p>\
                                </div>\
                                </div>\
                                <div class="today-commod4 fl">\
                                <div class="heading-cont">\
                                <p class="heading-c1"><span>售价：</span><i>¥</i> <i class="num font">' + ditydata[i].style.li[0].c2 + '</i></p>\
                                <p><span>进价：</span><i>¥</i><i class="font">' + ditydata[i].style.li[0].c + '</i></p>\
                                <p><span>利润：</span><i>¥</i><i class="font">' + ditydata[i].style.li[0].c3 + '</i></p>\
                                </div>\
                                </div>\
                                <div class="today-commod5 fl">\
                                <div class="heading-shic">\
                                <p class="heading-tp">等待上架</p>\
                                <p class="heading-cw">2016-08-06 13:47:49</p>\
                                </div>\
                                </div>\
                                <div class="today-commod6 fl">\
                                <div class="cmd1">\
                                <a class="shangjia"></a>\
                                <span>上架</span>\
                                </div>\
                                <div class="cmd2">\
                                <a></a>\
                                <span>删除</span>\
                                </div>\
                                </div>\
                                <div class="today-commod7 fl"><a target="_blank" href="http://www.lieliu.com/">推广此宝贝</a></div>\
                                </div>';


                        $(".today-shangp").append(_html);

                    }

                    // 打钩
                    $(".today-commodity .sels").bind("click", function() {
                        $(this).parent().parent().toggleClass("select");
                        var selectTag = $(".today-commodity.select").length;
                        var allSelect = $('.today-commodity').length;
                        if (selectTag === allSelect) {
                            $('.slt-i').addClass('select'); //.html('全不选');
                        } else {
                            $('.slt-i').removeClass('select'); //.html('全选');
                        }
                    });

                    // 全选tab
                    $('.slt-i').click(function() {
                        if (!$(this).hasClass('select')) {

                            $(this).addClass('select');
                            $(".today-commodity").addClass("select");

                        } else {
                            $(this).removeClass('select');
                            $(".today-commodity").removeClass("select");
                        }
                    });

                },
                'error': function(data) { //请求失败后的回调方法
                    console.log(data);
                }
            });

        },





    };
    index.init();



}, ['kdrj/req', 'jquery/cookie', 'common/md5', 'kdrj/utils/popBox']);
