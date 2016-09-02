Fengs.add('kdrj/index', function(S, $,Req, cookie, md5, popBox) {



    // 中心区轮播
    $(".core-banner").slide({
        titCell:".core-num ul" ,
        mainCell:".core-bnr" ,
        effect:"fade",
        prevCell:".prev_pic",
        nextCell:".next_pic",
        autoPlay:true,
        interTime:5000,
        delayTime:1000,
        autoPage:true
    });
    $(".core-banner").hover(function(){
            $(this).find(".prev_pic,.next_pic").fadeTo("show",0.2);
        },function(){
            $(this).find(".prev_pic,.next_pic").hide();
    });
    $(".prev_pic,.next_pic").hover(function(){
        $(this).fadeTo("show",0.5);
    },function(){
        $(this).fadeTo("show",0.2);
    });

    // 出租位
    $(".lease").slide({
        mainCell: ".lease-bd ul",
        autoPage: true,
        effect: "fold",
        autoPlay: true,
        delayTime:1200,
        interTime:4000,
    });

    // 商品分类
    $('.commodity-left ul li').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });
    $('.commodity-right ul li').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });




    // 0000000000000000000
    // $(".subcate-cont .xq-cont a").hover(function () {
    //     var _imgsrc = $(this).attr("data-img");
    //     $(".subcate-cont .tp i").css({"background": "url(" + _imgsrc + ") no-repeat center"});
    // });


    //    var url='http://app.kehuda.com:1024/kd/product_list?sort=costdesc&page=1&param=170&line=25&do=tag&ver=4&format=json';
        //var url='/kd/product_type?username=sududa@sudua.com';
    /*    var url = 'kd/product_list'
    Req.s({
        'url':url              //请求的API地址
        , 'type': 'jsonp'
        // ,dataType:'jsonp'
        , 'data': {'username': 'junsheng@sududa.com'}       //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
        , 'p': Req.p    //用户密码，SIGNPASS和SIGNPAYMENT请求时要通过密码计算签名，如果设置为COOKIE中的KEHUDA_PASS值时可以不传入
        , 'success': function(data){                //请求成功后的回调
            console.log(data);
        }
        , 'error': function(data){                  //请求失败后的回调方法
            console.log(data);
        }
    });*/


    /* 签名算法 */
    var index = {
        init: function(){
            var _this = this;
            // 商品分类
            _this._classify();
            // 公告
            _this._gongg();
            // 品牌
            _this._brand();
            // 今日热卖
            _this._hot();
            // 最新上架
            _this._new();
        },

        // 商品分类
        _classify: function(){
            var url = '/kd/product_type';    //请求的API地址
            Req.s({
                'url': url
                , 'type': 'jsonp'   //可以不传入，默认为POST，外网为jsonp
                , 'data': {'do':'all'}  //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
                , 'success': function (data){  //请求成功后的回调
                    console.log(data);  //Object {sududa: Object}
                    // console.log(data.sududa);  //{brand: Object, tips: "获取成功！", status: "1"}
                    // console.log(data.sududa.all);  //undefined
                    // console.log(typeof(data.sududa.all)); //undefined
                    // console.log(data.sududa.brand.li);  //[Object, Object, Obj```]
                    if ((data.sududa.all) !== 0) {   //num !== str  ,true   num 与 str类型不同 意味着其两者不等　非运算自然是true啦
                        var cifyData = data.sududa.taobao.types.type;
                        var clsifyData = data.sududa.taobao.special.data;
                        // console.log(cifyData);
                        if (data.status && data.status == -9){
                            console.log("签名不能为空");
                        } else {
                            // 1-2-3
                            var fenleis ="";
                            for (var j = 0; j < clsifyData.length; j++) {
                                fenleis = '<li class="product">\
                                    <div class="product-fl">\
                                    <i class="core-icon' + (j + 1) + ' fl"></i>\
                                    <span class="fl">' + clsifyData[j].name + '</span>\
                                    </div>\
                                    <div class="subcate">\
                                    <div class="subcate-cont">\
                                    <h3>' + clsifyData[j].name + '</h3>\
                                    <div class="xq">\
                                    <div class="xq-cont">\
                                    <dl>'
                                    for (var k = 0; k < clsifyData[j].list.length; k++) {
                                        fenleis+= '<dd class="xq-dd">\
                                            <a href="/spfl/cdity.jsp?id='+clsifyData[j].list[k].i+'&sorts=&is=' + clsifyData[j].id + '&js='+k+'" target="_blank">' + clsifyData[j].list[k].name + '</a>\
                                            </dd>';
                                    }'</dl>\
                                    </div>\
                                    </div>\
                                    </div>\
                                    </div>\
                                    </li>';

                                $("#core-nav .core-tit").append(fenleis);
                            }

                            var fenlei ="";
                            for (var j = 0; j < cifyData.length; j++) {
                                fenlei = '<li class="product">\
                                    <div class="product-fl">\
                                    <i class="core-icon' + (j + 1) + ' fl"></i>\
                                    <span class="fl">' + cifyData[j].name + '</span>\
                                    </div>\
                                    <div class="subcate">\
                                    <div class="subcate-cont">\
                                    <h3>' + cifyData[j].name + '</h3>\
                                    <div class="xq">\
                                    <div class="xq-cont">\
                                    <dl>'
                                    for (var k = 0; k < cifyData[j].list.l.length; k++) {
                                        fenlei+= '<dd class="xq-dd">\
                                            <a href="/spfl/cdity.jsp?id='+cifyData[j].list.l[k].i+'&sorts=&is=' + cifyData[j].id + '&js='+k+'" target="_blank">' + cifyData[j].list.l[k].n + '</a>\
                                            </dd>';
                                    }'</dl>\
                                    <div class="tp-with tp-xiewa">'
                                    for (var k = 0; k < cifyData[j].list.l.length; k++) {
                                        fenlei+= '<div class="tp-with tp-xiewa" style="display: none;"><a><img src="' + cifyData[j].list.l[k].g + '"></a></div>';
                                    }'</div>\
                                    </div>\
                                    </div>\
                                    </div>\
                                    </div>\
                                    </li>';

                                $("#core-nav .core-tit").append(fenlei);
                            }

                            // 移除第8数据
                            $(".core-tit li").each(
                                function(i){
                                    if (i==3) {
                                        $(this).addClass('product-ic4');
                                    }
                                    if (i==4) {
                                        $(this).addClass('product-ic5');
                                    }
                                    if (i==5) {
                                        $(this).addClass('product-ic6');
                                    }
                                    if (i==6) {
                                        $(this).addClass('product-ic7');
                                    }
                                    if (i==7) {
                                        $(this).addClass('product-ic8');
                                    }
                                    if (i==8) {
                                        $(this).addClass('product-ic9');
                                    }
                                    if (i==9) {
                                        $(this).addClass('product-ic10');
                                    }
                                    if (i==10) {
                                        $(this).addClass('product-ic11');
                                    }
                                    if (i==11) {
                                        $(this).addClass('product-ic12');
                                    }
                                    if (i==12) {
                                        $(this).addClass('product-ic13');
                                    }
                                    // if (i==8) {
                                    //     $(this).remove();
                                    // }
                                }
                            );

                            // 左侧二级菜单
                            $("#core-nav .core-tit").slide({
                                type:"menu",
                                titCell:".product",
                                targetCell:".subcate",
                                delayTime:0,
                                triggerTime:10,
                                defaultPlay:false,
                                returnDefault:true
                            });

                            $(".core-tit li").find(".xq-dd:first a").css('color','#f40');
                            $(".core-tit li").find(".xq-dd").hover(
                                function() {
                                    $(this).find("a").css('color', '#f40');
                                    $(this).siblings().find("a").css('color', '');
                                }
                            );

                            // var $tab_li = $('.xq-dd a');
                            // $tab_li.hover(function() {
                            //     $(this).addClass('selected').siblings().removeClass('selected');
                            //     var index = $tab_li.index(this);
                            //     $('.tp-with a').eq(index).show().siblings().hide();
                            // });

                            $(".core-tit li.product").each(function() {
                                var htmls = $(this).find(".xq .xq-cont .tp-with").clone();
                                $(this).find(".xq .xq-cont dl").append('<div class="tj123"></div>');
                                $(this).find(".xq .xq-cont .tj123").append(htmls);
                                $(this).find(".xq .xq-cont dl .tj123 .tp-with").first().show();
                                $(this).find(".xq .xq-cont dl .xq-dd").hover(
                                    function() {
                                        $(this).addClass('selected').siblings().removeClass('selected');
                                        var index = $(this).index();
                                        $(this).parent().find(".tj123 .tp-with").eq(index).show().siblings().hide();
                                    }
                                );
                            });


                        }

                    }

                }
                , 'error' : function(data){   //请求失败后的回调方法
                    console.log(data);
                }
            });
        },


        // 公告
        _gongg: function(){
            var url = '/es/announce_list';    //请求的API地址
            Req.s({
                'url': url
                , 'type': 'jsonp'   //可以不传入，默认为POST，外网为jsonp
                , 'data': {'username': 'junsheng@sududa.com'}  //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
                , 'success': function (data){  //请求成功后的回调
                    // console.log(data);  //Object {sududa: Object}
                    // console.log(data.sududa);  //{brand: Object, tips: "获取成功！", status: "1"}
                    // console.log(data.sududa.all);  //undefined
                    // console.log(typeof(data.sududa.all)); //undefined
                    // console.log(data.sududa.brand.li);  //[Object, Object, Obj```]

                    if ((data.sududa.all) !== 0) {   //num !== str  ,true   num 与 str类型不同 意味着其两者不等　非运算自然是true啦
                        var gonGs = data.sududa.list.l;
                        if (data.status && data.status == -9){
                            console.log("签名不能为空");
                        } else {
                            // 2
                            var fenles ="";
                            $(".adlet-r").html('');
                            var fenles = '<i class="adlet-icon2 fl"></i>\
                            <div class="adlet-bd fl adlet-ts">\
                            <ul></ul>\
                            </div>';
                            $(".adlet-r").append(fenles);

                            $(".adlet-ts ul").html("");
                            for (var i = 0; i < gonGs.length; i++) {
                                var kuais = '<li>'+ gonGs[i].i +'</li>';
                                $(".adlet-ts ul").append(kuais);
                            }

                            // 公告
                            $('.adlet-fs').FontScroll({time: 5000,num: 1});
                            $('.adlet-ts').FontScrol2({time: 5000,num: 1});


                        }

                    }

                }
                , 'error' : function(data){   //请求失败后的回调方法
                    console.log(data);
                }
            });
        },

        // 品牌
        _brand: function(){
            var url = '/kd/product_type';    //请求的API地址
            Req.s({
                'url': url
                , 'type': 'jsonp'   //可以不传入，默认为POST，外网为jsonp
                , 'data': {'username': 'junsheng@sududa.com', 'do':'brand'}  //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
                , 'success': function (data){  //请求成功后的回调
                    // console.log(data);  //Object {sududa: Object}
                    // console.log(data.sududa);  //{brand: Object, tips: "获取成功！", status: "1"}
                    // console.log(data.sududa.all);  //undefined
                    // console.log(typeof(data.sududa.all)); //undefined
                    // console.log(data.sududa.brand.li);  //[Object, Object, Obj```]
                    if ((data.sududa.all) !== 0) {   //num !== str  ,true   num 与 str类型不同 意味着其两者不等　非运算自然是true啦
                        var ppData = data.sududa.brand.li;
                        if (data.status && data.status == -9){
                            console.log("签名不能为空");
                        } else {
                            $(".brand-right ul").html("");
                            for (var i = 0; i < ppData.length; i++) {
                                var pinpai = '<li>\
                                        <a target="_blank" href="/brand/brand.jsp?id='+ppData[i].i+'&sorts=&js='+i+'">\
                                        <img src="'+ ppData[i].m +'">\
                                        </a>\
                                        </li>';
                                $(".brand-right ul").append(pinpai);
                            }

                            $(".brand-right ul").last().append("<li><a></a></li>");
                        }

                    }

                }
                , 'error' : function(data){   //请求失败后的回调方法
                    console.log(data);
                }
            });
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

                                var remen = '<div class="today-hr">\
                                        <div class="today-pin"></div>\
                                        <div class="today-hvr">\
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
                        }

                    }

                }
                , 'error' : function(data){   //请求失败后的回调方法
                    console.log(data);
                }
            });

        },
        // 最新上架
        _new: function(){
            var url = 'kd/product_list';
            Req.s({
                'url': url
                , 'type': 'jsonp'   //可以不传入，默认为POST，外网为jsonp
                , 'data': {'username': 'junsheng@sududa.com', 'do':'new'}  //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
                , 'success': function (data){  //请求成功后的回调
                    // console.log(data);  //Object {sududa: Object}

                    if ((data.sududa.all) !== 0) {   //num !== str  ,true   num 与 str类型不同 意味着其两者不等　非运算自然是true啦
                        var newData = data.sududa.list.l;
                        if (data.status && data.status == -9){
                            console.log("签名不能为空");
                        } else {
                            $(".newest-cont").html("");
                            for (var i = 0; i < 15; i++) {
                                // 兼容下, 因为只有一条数据就不会是数组
                                newData[i].style.li = newData[i].style.li == "" ? [] : newData[i].style.li;
                                if (!$.isArray(newData[i].style.li)) {  //如果只返回来一个数据需要做处理
                                    newData[i].style.li = [newData[i].style.li];  //[] 数组
                                }

                                var zuixin = '<div class="newest-hr">\
                                        <div class="newest-pin"></div>\
                                        <div class="newest-hvr">\
                                        <div class="newest-leptn">\
                                        <div class="newest-lt"></div>\
                                        <div class="heading">\
                                        <div class="heading-cont">\
                                        <p class="heading-c1">基础版：<i>¥</i><i class="num">'+newData[i].style.li[0].c2+'</i></p>\
                                        <p>高级版：<i>¥</i><i>'+newData[i].style.li[0].c+'</i></p>\
                                        <p>财富版：<i>¥</i><i>'+newData[i].style.li[0].c3+'</i></p>\
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
                                        <div class="newest-top">\
                                        <img class="newest-img" src="'+newData[i].m+'" height="228" width="228">\
                                        </div>\
                                        <div class="newest-btn">\
                                        <div class="xiqin">\
                                        <p class="xiqin-one">\
                                        <span class="fl">'+newData[i].i+'</span>\
                                        <i class="ic1 fl"></i>\
                                        <i class="ic2 fl"></i>\
                                        <i class="ic3 fl"></i>\
                                        <i class="ic4 fl"></i>\
                                        </p>\
                                        <p class="xiqin-two"><a href="javascript:void(0);">'+newData[i].t+'</a></p>\
                                        <p class="xiqin-three">\
                                        <i class="j1">¥</i><i class="j2">'+newData[i].style.li[0].c+'</i>\
                                        </p>\
                                        <p class="xiqin-four">市场价：'+newData[i].style.li[0].p+'</p>\
                                        </div>\
                                        </div>\
                                        </div>\
                                        </div>';

                                $(".newest-cont").append(zuixin);
                            }

                            // js加载问题
                            $(".newest-cont").slide({
                                type:"menu",
                                titCell:".newest-hvr",
                                targetCell:".newest-leptn",
                                delayTime:0,
                                triggerTime:10,
                                defaultPlay:false,
                                returnDefault:true
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










}, ['./req','jquery/cookie', 'common/md5', 'kdrj/utils/popBox']);
