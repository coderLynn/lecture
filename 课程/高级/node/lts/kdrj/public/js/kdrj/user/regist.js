Fengs.add('kdrj/user/regist', function(S, $,Req, cookie, md5) {

// alert(123)

var register={
    regFn: function () {
        this.aInpt = $('#l_username,#l_pass,#re_l_pass');
        this.aInpt.val('');
        if ($.browser.msie && Number($.browser.version) <= 9) this.pointtxt();

        var submit = false,
            codeOff = false;
        this.aInpt.blur(function () {

            switch (this.id) {
                case "l_username":
                    vali.name($(this));
                    break;
                case "l_pass":
                    vali.password($(this));
                    break;
                case "re_l_pass":
                    vali.passwords($(this));
                    break;
            }
        }).focus(function () {

            if (this.id != 'l_pass') return;
            $(this).keyup(function () {
                var $this = $(this);
                var _r = checkPassword($this);
                var $stren = $this.siblings('.a_span').show();
                if (_r == 1) {
                    $stren.removeClass('st2 st3').addClass('st1');
                } else if (_r == 2) {
                    $stren.removeClass('st1 st3').addClass('st2');
                } else if (_r == 3) {
                    $stren.removeClass('st1 st2').addClass('st3');
                }
            });

            function checkPassword(pwdinput) {
                var off1, off2, off3, num, str = $(pwdinput).val(),
                    len = str.length;
                if (len == 0) return 1;
                if (len > 16) {
                    $(pwdinput).val(str.match(/.{16}/g)[0]);
                }

                off1 = /\d/.test(str);
                off2 = /[a-z]/.test(str);
                off3 = /\W|[A-Z]/.test(str);
                num = off1 + off2 + off3;

                if (len < 6) {
                    return 1;
                }
                if (len >= 6 && len <= 7) {
                    if (num == 1) return 1;
                    if (num >= 2) return 2;
                }
                if (len > 7 && len <= 16) {
                    if (num == 1) return 1;
                    if (num == 2) return 2;
                    if (num == 3) return 3;
                }
            }

        })
        var $check = $(".sel_login");
        var vali = {
            name: function (obj) {
                var val = obj.val(),
                    sibl =$('.error_text');
                if (reg.Email.test(val)) {
                    setTimeout(function() {
                        $(".error_text").fadeOut(200);
                    }, 3000);
                    sibl.show().find(".error_regist_m1").css("background-position","top");
                    submit = true;

                } else {
                    sibl.show().find(".error_regist_m1").css("background-position","bottom");
                    submit = false;
                }
            },
            password: function (obj) {
                var val = obj.val(),
                    sibl =$('.error_text');
                if (val.length < 6 || val.length > 16) {
                    obj.siblings('.stren').hide();
                    sibl.show().find(".error_regist_m2").css("background-position","bottom");
                    submit = false;
                    return false;
                }else{
                    sibl.show().find(".error_regist_m2").css("background-position","top");
                    submit = true;
                    return true;
                }

            },
            passwords: function (obj) {
                var val1 = obj.val(),
                    val2 = $('#l_pass').val(),
                    sibl =$('.error_text');
                if (val1 == val2 && this.password($('#re_l_pass'))) {
                    sibl.show().find(".error_regist_m3").css("background-position","top");
                    submit = true;
                } else {
                    sibl.show().find(".error_regist_m3").css("background-position","bottom");
                    submit = false;
                }
            }

        }
        var reg = {
            Email: /^[^\W|0]\w+@\w+(\.[a-z]{2,3}){1,2}$/
        }

        var regBox = $('#regBox span'),
            meoutTmer = null;
        $('#loginForm input[type="submit"]').click(function () {
            $('#l_username,#l_pass,#re_l_pass').blur();

            if (submit) {
                if (!$check.is('.sel')) {

                    alert("请勾选条款");
                } else {
                    submitSucc();
                }
            }

        });

        function submitSucc() {
            var url = "/es/reg";
            var _user = $("#loginForm #l_username").val(),
                _pass = $("#loginForm #l_pass").val();
            /*判断是否选择了自动登录  如果选择了返回真，否则返回假*/
            var pass = Req.pass(_pass);
            console.log(pass);
            Req.s({
                'url': url, 'type': 'jsonp'   //可以不传入，默认为POST，外网为jsonp
                , 'data': {'username': _user, 'client': '47', 'pass': pass}  //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
                //, 'p': pass    //用户密码，SIGNPASS和SIGNPAYMENT请求时要通过密码计算签名，如果设置为COOKIE中的KEHUDA_PASS值时可以不传入
                , 'success': function (data) {  //请求成功后的回调
                    // console.log(data);  //Object {sududa: Object}
                    if(data.sududa.status==1){
                        alert("注册成功！");
                    }else if(data.sududa.status==0){
                        alert("用户已经存在");
                    }else{
                        alert("注册出错误请重新输入注册信息！");
                    }

                }, 'error': function (data) {   //请求失败后的回调方法
                    console.log(data);
                }
            });
        }

        function meout() {
            clearTimeout(meoutTmer);
            meoutTmer = setTimeout(function () {
                regBox.removeClass('error succ');
            }, 2000);
            return regBox.addClass('error');
        }
    },
    pointtxt: function () {
        var aLi = $('.reg_ul').find('.li_input');
        var poinArr = ['用户名 (邮箱)', '设置密码 (6-16)', '确认密码', '请输入图片中的验证码'];

        for (var i = 0; i < aLi.length; i++) {
            aLi.eq(i).append("<font class='point'>" + poinArr[i] + "</font>");
        }
        ;
        aLi.find('.point').click(function () {
            $(this).siblings('input').focus();
        })
        this.aInpt.focus(function () {
            var v = $(this).val();
            if (v == '') {
                $(this).siblings('.point').hide();
            }
        }).blur(function () {
            var v = $(this).val();
            if (v == '') {
                $(this).siblings('.point').show();
            }
        })
    }

}
    register.regFn();

}, ['kdrj/req','jquery/cookie', 'common/md5']);
