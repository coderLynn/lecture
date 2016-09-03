Fengs.add('kdrj/spfl/cdity', function(S, $, Req, cookie, md5, popBox) {



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
            var count=paramss.count;
            var all=paramss.all;
            var page = page?$("#pages").find("ul li a").text():1;
            // 所有分类
            _this._datalist(is, js);
            // 商品
            _this._cdity(sorts, id, lines, page);
            // a标签点击跳转
            _this._sorts(lines);
            // 下拉菜单点击多少页
            _this._actionPage(sorts, id, lines, page);
            _this.pageclick();
        },

        // 所有分类
        _datalist: function(is, js) {
            var url = 'kd/product_type';
            Req.s({
                'url': url,
                'type': 'jsonp' //可以不传入，默认为POST，外网为jsonp
                    ,
                'data': {
                    'username': 'junsheng@sududa.com',
                    'do': 'all'
                } //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
                ,
                'success': function(data) { //请求成功后的回调
                    console.log(data);

                    if ((data.sududa.all) !== 0) { //num !== str  ,true   num 与 str类型不同 意味着其两者不等　非运算自然是true啦
                        var hotData = data.sududa.taobao.types.type;
                        console.log(hotData);
                        if (data.status && data.status == -9) {
                            console.log("签名不能为空");
                        } else {
                            /*console.log(hotData.length);*/

                            var lists = "";
                            $(".suofen").html('');
                            lists = '<div class="xunxg">\
                                    <a class="clr1">所有分类</a>\
                                    <i class="pot1"></i>\
                                    <a class="font">' + hotData[is].name + '</a>\
                                    <i class="pot2"></i>\
                                    <a class="font font-clr">' + hotData[is].list.l[js].n + '</a>\
                                    </div>\
                                            <div class="suofen-cots">\
                                            <div class="suofen-tltle">\
                                            <ul class="tltle-ul" id="submenu"></ul>\
                                            </div>\
                                            </div>\
                                            <div class="suofen-cont">\
                                            <div class="suofen-left fl">\
                                            <div class="kuais">\
                                            <h3>款式</h3>\
                                            <ul></ul>\
                                            </div>\
                                            <div class="caiz">\
                                            <h3>材质</h3>\
                                            <ul></ul>\
                                            </div>\
                                            <div class="fenge">\
                                            <h3>风格</h3>\
                                            <ul></ul>\
                                            </div>\
                                            </div>\
                                            <div class="suofen-right fr">\
                                            <div class="suofen-img">\
                                            <i><img src="' +hotData[is].list.l[js].g+ '"></i>\
                                            </div>\
                                            </div>\
                                            </div>';

                            $(".suofen").append(lists);

                            // 大标题
  /*                          $(".tltle-ul").html("");
                            var fenles="";
                                for (var j = 0; j < hotData[is-1].list.l.length; j++) {
                                    fenles+='<li><a href="/spfl/cdity.html?id='+hotData[is-1].list.l[j].i+'&sorts=costasc&is='+hotData[is-1].id+'&js='+j+'">'+hotData[is-1].list.l[j].n+'</a></li>';
                                }
                            $(".tltle-ul").append(fenles);*/

                            $.each(hotData[is].list.l, function(i, val) {
                                // hover(a)
                                $(".tltle-ul").append('<li>' +
                                    '<a href="cdity?id=' + hotData[is].list.l[i].i + '&sorts=&is=' + hotData[is].id + '&js=' + i + '">' + val.n + '</a>' +
                                    '</li>');
                            });

                            // hover(a)
                            $(".tltle-ul li a").each(function() {
                                $this = $(this);
                                // alert(123)
                                if ($this[0].href == String(window.location)) {
                                    $this.addClass("hover");
                                }
                            });

                            // 款式
/*                            for (var i = 0; i < 23; i++) {
                                var kuais = '<li><a href="javascript:void(0);" target="_blank">' + hotData[0].list.l[0].tags.tag[0].list.l[i].tn + '</a></li>';
                                $(".kuais ul").append(kuais);
                            }*/
//                                console.log( hotData[is].list.l[0].i);
                            try {
                                $.each(hotData[is].list.l[js].tags.tag[0].list.l, function(i, val) {
//                                    console.log(val);
                                    $(".kuais ul").append('<li>' +
                                        '<a href="cdity?id=' + hotData[is].list.l[i].i + '&sorts=&is=' + hotData[is].id + '&js=' + i + '" target="_blank">' + val.tn + '</a>' +
                                        '</li>');
                                });
                            } catch (e) {
                                try{
                                    $.each(hotData[is].list.l[js].tags.tag.list.l, function(i, val) {
//                                    console.log(val);
                                        $(".kuais ul").append('<li>' +
                                            '<a href="cdity?id=' + hotData[is].list.l[i].i + '&sorts=&is=' + hotData[is].id + '&js=' + i + '" target="_blank">' + val.tn + '</a>' +
                                            '</li>');
                                    });
                                }catch(e){
                                    console.log(e);
                                }
                            }

                            // 材质
/*                            for (var i = 0; i < hotData[0].list.l[0].tags.tag[1].list.l.length; i++) {
                                var caiz = '<li><a href="javascript:void(0);" target="_blank">' + hotData[0].list.l[0].tags.tag[1].list.l[i].tn + '</a></li>';
                                $(".caiz ul").append(caiz);
                            }*/

                            try {
                                $.each(hotData[is].list.l[js].tags.tag[1].list.l, function(i, val) {
                                    $(".caiz ul").append('<li>' +
                                        '<a href="cdity?id=' + hotData[is].list.l[i].i + '&sorts=&is=' + hotData[is].id + '&js=' + i + '" target="_blank">' + val.tn + '</a>' +
                                        '</li>');
                                });
                            } catch (e) {
                                console.log(e);
                            }

                            // 风格
/*                            for (var i = 0; i < hotData[0].list.l[0].tags.tag[2].list.l.length; i++) {
                                var fenge = '<li><a href="javascript:void(0);" target="_blank">' + hotData[0].list.l[0].tags.tag[2].list.l[i].tn + '</a></li>';
                                $(".fenge ul").append(fenge);
                            }*/

                            try {
                                $.each(hotData[is].list.l[js].tags.tag[2].list.l, function(i, val) {
                                    $(".fenge ul").append('<li>' +
                                        '<a href="cdity?id=' + hotData[is].list.l[i].i + '&sorts=&is=' + hotData[is].id + '&js=' + i + '" target="_blank">' + val.tn + '</a>' +
                                        '</li>');
                                });
                            } catch (e) {
                                console.log(e);
                            }

                        }

                    }



                },
                'error': function(data) { //请求失败后的回调方法
                    console.log(data);
                }
            });
            return false;
        },



        // 商品
        _cdity: function(sorts, id, lines, page) {
            var _this = this;
            // 接口
            var url = 'kd/product_list';
            Req.s({
                'url': url
                , 'type': 'jsonp' //可以不传入，默认为POST，外网为jsonp
                , 'data': {
                    'username': 'junsheng@sududa.com',
                    'line': lines,
                    'do': 'type',
                    'param': id,
                    'sort': sorts,
                    'page': page
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

                        var _html = '<div class="today-commodity">'+
                                '<div class="today-commod1 fl">'+
                                '<i class="sels"></i>'+
                                '</div>'+
                                '<div class="today-commod2 fl">'+
                                '<dl class="fl">'+
                                '<dt>'+
                                '<img src="' + ditydata[i].m + '" height="78" width="78">'+
                               '</dt>'+
                                '<dd class="today-dd1">'+
                                '<a href="javascript:void(0);">' + ditydata[i].t + '</a>'+
                                '</dd>'+
                                '<dd class="today-dd2">'+
                                '<span class="fl">' + ditydata[i].i + '</span>'+
                                '<a class="fl" href="javascript:void(0);" title=""></a>'+
                                '<i class="ic1 fl"></i>'+
                                '<i class="ic2 fl"></i>'+
                                '<i class="ic3 fl"></i>'+
                                '<i class="ic4 fl"></i>'+
                                '</dd>'+
                                '</dl>'+
                                '</div>'+
                                '<div class="today-commod3 fl">'+
                                '<div class="select-box fx-99">'+
                                '<dl class="more-select more-dl select-btn fl">'+
                                '<dt><i class="select-icon select-i fl"></i><span>' + ditydata[i].style.li[0].b + '</span></dt>'+
                                '<dd>'+
                               '<ul>'
                                for(var k=i;k<ditydata[i].style.li.length;k++){
                                	if(typeof(ditydata[i].style.li[k].b)==undefined){
                                        _html+='<li><a href="javascript:void(0);">如图色</a></li>';
                                    }else{
                                        _html+='<li><a href="javascript:void(0);">' + ditydata[i].style.li[k].b + '</a></li>';
                                    }
                                }
                                /*$.each(ditydata[i].style.li, function (index, vals) {
                                    //获取不重复的颜色
                                    var  val=vals.b;
                                    var color, result = {};
                                    for( var i = 0; i < val.length; i++ ){
                                        color = val.split(';')[0];
                                        result[color] = result[color] || true;
                                    }
                                    //转换成数组
                                    var resultArr = [];
                                    for( var color in result){
                                        resultArr.push(color);
                                    }
                                      if(resultArr==undefined){
                                          _html+='<li><a href="javascript:void(0);">如图</a></li>';
                                      }else{
                                          _html+='<li><a href="javascript:void(0);">' + resultArr + '</a></li>';
                                      }
                                });*/
                        _html+='</ul>'+
                                '</dd>'+
                                '</dl>'+
                                '</div>'+
                                '</div>'+
                                '<div class="today-commod4 fl">'+
                                '<div class="heading-cont">'+
                                '<p><span>财富版：</span><i>¥</i><i class="font">' + ditydata[i].style.li[0].c3 + '</i></p>'+
                                '<p class="heading-c1"><span>高级版：</span><i>¥</i><i class="num font">' + ditydata[i].style.li[0].c + '</i></p>'+
                                '<p><span>基础版：</span><i>¥</i> <i class="font">' + ditydata[i].style.li[0].c2 + '</i></p>'+
                                '</div>'+
                                '</div>'+
                                '<div class="today-commod5 fl">'+
                                '<div class="heading-shic">'+
                                '<p class="heading-tp"><i>¥</i> <i class="num">' + ditydata[i].style.li[0].p + '</i></p>'+
                                '<p><i class="baoy">包邮</i></p>'+
                                '</div>'+
                                '</div>'+
                                '<div class="today-commod6 fl">'+
                                '<div class="heading-caig">'+
                                '<a href="javascript:void(0);">'+
                                '<i></i>'+
                                '<span>采购</span>'+
                                '</a>'+
                                '</div>'+
                                '</div>'+
                                '</div>';


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
                        var _hide = function() {
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
                            $(".more-select").each(function() {
                                $(this).find("dt").removeClass("cur");
                                $(this).find("dt span").css("border", "1px solid #fff");
                                $(this).find("dl").css("z-index", "0");
                                $(this).find("dd").hide();
                                $(this).removeAttr("style");
                            });
                        };
                        dt.unbind("click");
                        dt.click(function(e) {
                            e.stopPropagation();
                            // 0
                            if (dd.is(":hidden")) {
                                allhide();
                            }

                            dd.is(":hidden") ? _show(e) : _hide();
                        });

                        $("html,body").click(function(e) {
                            e.stopPropagation();
                           if(dd.is(":hidden")){
                        	   return;
                           }else{
                        	   _hide();
                           }
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
            var a = parseInt(parseInt(all) / 10);
            if (a == 0) {
                page = a;
            } else {
                page = a + 1;
            }
            // 下拉菜单点击多少页（点击）
            $("#pages .more-select dd ul").html("");
            if(page>a){
            	var k=a+2;
            }else{
            	var k=page
            }
            for (var i = 1; i <k; i++) {
                $("#pages .more-select dd ul").append('<li><a>' + i + '</a></li>');
            }
            $("#pages .more-select dt").css({"width":"60px"});
//            console.log(lines);
            $(".slt-paging span i").first().text(page);
            $(".slt-text span i").first().text(count);
            $(".slt-text span i").last().text(all);
            this.pageclick();

        },

        _actionPage: function(sorts, id, lines, page) {
            var _this = this;
            var page = page;
            $(".pag1").unbind("click");
            $(".pag1").click(function(e) {
                e.stopPropagation();
                if (page > 1) {
                    page--
                } else {
                    page = 1
                }
                _this._cdity(sorts, id, lines, page);
                $("#pages .more-select dt span").text(page);
                $(".slt-paging .fansir").text(page);
                return false;
            });
            $(".pag2").unbind("click");
            $(".pag2").click(function(e) {
                var pa=($(".slt-text span i").last().text())/10;
                console.log(pa);
                e.stopPropagation();
                if(page>pa) {
                    page;
                }else{
                    page++;
                }
                _this._cdity(sorts, id, lines, page);
                $("#pages .more-select dt span").text(page);
                return false;
            });
           
        },
        pageclick:function(){
            var paramss = _this.GetRequest("id");
            var id = paramss.id;
            var sorts = paramss.sorts;
            var lines = 20;
            var is = (paramss.is) - 1;
            var js = paramss.js;
            $("#pages").find("ul li a").unbind("click");
            $("#pages").find("ul li a").click(function(e){
                e.stopPropagation()
                var page=$(this).text();
                _this._cdity(sorts, id, lines, page);
                _this._actionPage(sorts, id, lines, page);
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
                    var _hide = function() {
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
                        $(".more-select").each(function() {
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

                        dd.is(":hidden") ? _show(e) : _hide();
                    });

                    $("html,body").click(function(e) {
                        e.stopPropagation();
                        if(dd.is(":hidden")){
                            return;
                        }else{
                            _hide();
                        }
                    });
                    dd.find("a").click(function() {
                        dt.children("span").html($(this).html());
                        _hide();
                    }); //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）


                });
            });
        }

    };
    index.init();



}, ['kdrj/req', 'jquery/cookie', 'common/md5', 'kdrj/utils/popBox']);
