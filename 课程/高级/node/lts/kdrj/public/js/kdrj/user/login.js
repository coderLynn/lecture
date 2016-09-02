Fengs.add('kdrj/user/login', function(S, $,Req, cookie, md5) {

  var login = {
    lguser: function() {
      this.inptb = $("#l_username,#l_pass")
      this.inptb.val('');
      var submit = false;
      var checked = false;
      /*验证邮箱正则*/
      var reg = {
        Email: /^[^\W|0]\w+@\w+(\.[a-z]{2,3}){1,2}$/
      }


      var lg = {
        username: function(obj) {
          var val = $("#l_username").val();

          if (val == '') {
            $("#error_login").show().find("#error_login_msg").text("邮箱不能为空！");
            setTimeout(function() {
              $("#error_login").fadeOut(200);
            }, 2000);
            submit = false;
            checked = false;
          } else if (val && reg.Email.test(val)) {
            checked = true;
            submit = true;
          } else {
            $("#error_login").show().find("#error_login_msg").text("邮箱填写错误！");
            setTimeout(function() {
              $("#error_login").fadeOut(200);
            }, 2000);
            checked = false;
            submit = false;
          }
        },
        password: function() {
          var val = $("#l_pass").val();
          if (val.length < 6 || val.length > 12) {
            $("#error_login").show().find("#error_login_msg").text("密码6~16个字符，区分大小写！");
            setTimeout(function() {
              $("#error_login").fadeOut(200);
            }, 2000);
            submit = false;
            return false;
          } else {
            $("#error_login").hide().find("#error_login_msg").text("填写正确");
            setTimeout(function() {
              $("#error_login").fadeOut(200);
            }, 2000);
            submit = true;
            return true;
          }

        }
      };



      $("#loginForm input[type='submit']").click(function() {
        lg.username();
        if (checked) {
          lg.password();
        }

        if (submit) {
          logins();
        }
      });


      //junsheng@sududa.com 123456

      function logins() {
        var url = "/es/login";
        var _user = $("#loginForm #l_username").val(),
          _pass = $("#loginForm #l_pass").val();
        /*判断是否选择了自动登录  如果选择了返回真，否则返回假*/
        var auto_lg = $(".sel_login").hasClass("sel");

        var pass = Req.pass(_pass);
        console.log(pass);
        Req.p({
          'url': url,
          'type': 'jsonp' //可以不传入，默认为POST，外网为jsonp
            ,
          'data': {
            'username': _user
          } //传入的参数，如果设置为COOKIE中的KEHUDA_USER值时可以不传入，默认会自动加入client,format,timestamp,ver等值
          ,
          'p': pass //用户密码，SIGNPASS和SIGNPAYMENT请求时要通过密码计算签名，如果设置为COOKIE中的KEHUDA_PASS值时可以不传入
            ,
          'success': function(data) { //请求成功后的回调
            // console.log(data);  //Object {sududa: Object}
            if (data.sududa.status == 1) {
              /*如果为真写入cookie为auto=1*/
              if (auto_lg == true) {
                var auto = 1;
              }
              alert("登录成功！");
              $.cookie('KD_USER', _user, {
                path: '/'
              });
              $.cookie('KD_PASS', pass, {
                path: '/'
              });
              $.cookie('AUTO_LOGIN', auto, {
                path: '/'
              });
              setTimeout(function() {
                window.location.href = '/';
              }, 2000)

            } else if (data.sududa.status == -9) {
              $("#error_login").show().find("#error_login_msg").text(data.sududa.tips);
            }

          },
          'error': function(data) { //请求失败后的回调方法
            console.log(data);
          }
        });


      }
    }

  };
  login.lguser();


}, ['kdrj/req', 'jquery/cookie', 'common/md5']);
