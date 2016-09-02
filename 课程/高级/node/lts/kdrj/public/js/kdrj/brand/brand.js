Fengs.add('kdrj/brand/brand', function(S, $, Req, cookie, md5, popBox) {



    /* 签名算法 */
    var index = {
        init: function() {
            var _this = this;
            var paramss = _this.GetRequest("id");
            var id = paramss.id;
            var sorts = paramss.sorts;
            var lines = 20;
            var is = (paramss.is) - 1;
            var js = paramss.js;
            console.log(sorts);
            // 商品
            _this._cdity(sorts, id, lines);
            // a标签点击跳转
            _this._sorts(lines);
        },

        // 商品
        _cdity: function(sorts, id, lines) {
            var _this = this;
            // 接口
            var url = 'kd/product_list';
            Req.s({
                'url': url
                , 'type': 'jsonp' //可以不传入，默认为POST，外网为jsonp
                , 'data': {
                    'username': 'junsheng@sududa.com',
                    'line': lines,
                    'do': 'brand',
                    'param': id,
                    'sort': sorts
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
                                <span class="fl">' + ditydata[i].i + '</span>\
                                <a class="fl" href="javascript:void(0);" title=""></a>\
                                <i class="ic1 fl"></i>\
                                <i class="ic2 fl"></i>\
                                <i class="ic3 fl"></i>\
                                <i class="ic4 fl"></i>\
                                </dd>\
                                </dl>\
                                </div>\
                                <div class="today-commod3 fl">\
                                <div class="select-box fx-99">\
                                <dl class="more-select more-dl select-btn fl">\
                                <dt><i class="select-icon select-i fl"></i><span>' + ditydata[i].style.li[0].b + '</span></dt>\
                                <dd>\
                                <ul>\
                                <li><a href="javascript:void(0);">颜色：白色条纹</a></li>\
                                <li><a href="javascript:void(0);">高中</a></li>\
                                <li><a href="javascript:void(0);">中专/技校</a></li>\
                                <li><a href="javascript:void(0);">大专</a></li>\
                                <li><a href="javascript:void(0);">本科</a></li>\
                                <li><a href="javascript:void(0);">硕士及以上</a></li>\
                                </ul>\
                                </dd>\
                                </dl>\
                                </div>\
                                </div>\
                                <div class="today-commod4 fl">\
                                <div class="heading-cont">\
                                <p><span>财富版：</span><i>¥</i><i class="font">' + ditydata[i].style.li[0].c3 + '</i></p>\
                                <p class="heading-c1"><span>高级版：</span><i>¥</i><i class="num font">' + ditydata[i].style.li[0].c + '</i></p>\
                                <p><span>基础版：</span><i>¥</i> <i class="font">' + ditydata[i].style.li[0].c2 + '</i></p>\
                                </div>\
                                </div>\
                                <div class="today-commod5 fl">\
                                <div class="heading-shic">\
                                <p class="heading-tp"><i>¥</i> <i class="num">' + ditydata[i].style.li[0].p + '</i></p>\
                                <p><i class="baoy">包邮</i></p>\
                                </div>\
                                </div>\
                                <div class="today-commod6 fl">\
                                <div class="heading-caig">\
                                <a href="javascript:void(0);">\
                                <i></i>\
                                <span>采购</span>\
                                </a>\
                                </div>\
                                </div>\
                                </div>';


                        $(".today-shangp").append(_html);

                    }

                    var count = data.sududa.count;
                    var all = data.sududa.all;
                    _this._page(count, all, lines);

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


                },
                'error': function(data) { //请求失败后的回调方法
                    console.log(data);
                }
            });

        },

        // a标签点击跳转
        _sorts: function(lines) {
            //点击降序函数
            _this = this;
            $(".sort_b a").click(
                function() {
                    $(this).toggleClass("cur").siblings().removeClass('cur');
                    // var dhref=$(this).attr('href','');
                    sorts = $(this).data("sort");
                    var paramss = _this.GetRequest("id");
                    id = paramss.id;
                    console.log(sorts);
                    _this._cdity(sorts, id, lines);
                }
            );
        },
        //获取url参数
        GetRequest: function() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        _page: function(count, all, lines) {
            var a = parseInt(parseInt(count) / lines);
            if (a == 0) {
                page = a;
            } else {
                page = a + 1;
            }
            console.log(lines);
            $(".slt-paging span i").first().text(page);
            $(".slt-text span i").first().text(count);
            $(".slt-text span i").last().text(all);
        }



    };
    index.init();



}, ['kdrj/req', 'jquery/cookie', 'common/md5', 'kdrj/utils/popBox']);
