Fengs.add('940/utils/qq_login', function(S, $) {
	var domain = host;
	QC.Login.signOut();
	console.log(QC.Login.check())

	function accounts_correlation(openId, oInfo) {
		layer.closeAll();
		layer.open({
			type: 1,
			title: '账户关联',
			area: ['310px', '410px'],
			shadeClose: false, //点击遮罩关闭
			moveType: 1,
			content: '<div class="qq_correlation">\
	        			<dl class="qq_info">\
		        			<dt><img src="' + oInfo.figureurl_1 + '"/></dt>\
		        			<dd class="qq_nickname">' + oInfo.nickname + '</dd>\
		        			<dd class="qq_text">您的QQ尚未关联940帐号，请关联</dd>\
	        			</dl>\
	        			<ul class="accounts_940">\
	        				<li><input class="inp_acco" placeholder="用户名 (邮箱)" type="text"/></li>\
	        				<li><input class="inp_pass" placeholder="密码" type="password"/></li>\
	        				<li><input class="inp_qq" placeholder="QQ号" type="text"/></li>\
	        				<li class="btn_li"><input class="inp_corr" value="立即关联" type="button"/></li>\
	        				<li class="reg_li"><a href="/reg">还没有940账户？ 点此注册</a></li>\
	        			</ul>\
	        		 </div>',
			success: function() {
				var $accounts_940 = $('.accounts_940');
				var $inp_acco = $accounts_940.find('.inp_acco').focus();
				var $inp_pass = $accounts_940.find('.inp_pass');
				var $inp_qq = $accounts_940.find('.inp_qq');
				var $btn_li = $accounts_940.find('.btn_li');

				$btn_li.click(function() {
					//layer.msg('开发中...！', {time: 2000});
					if ($inp_acco.val() == '') {
						layer.msg('请输入帐号！', {
							time: 2000
						});
						$inp_acco.focus();
						return;
					} else if ($inp_pass.val() == '') {
						layer.msg('请输入密码！', {
							time: 2000
						});
						$inp_pass.focus();
						return;
					}

					layer.load();
					$.post('/qq_bind?do=add&bindcode=' + openId + '&qq=' + $inp_qq.val() + '&pwd=' + $inp_pass.val() + '&account=' + $inp_acco.val(), function(data) {
						layer.closeAll('loading');
						var d = $.parseJSON(data);
						if (d.status == 0) {
							layer.msg(d.tips, {
								time: 2000
							});
						} else {
							layer.closeAll();
							$.cookie('940_CODE', openId, {
								domain: domain,
								expires: 1000,
								path: '/'
							});
							$.cookie('940_COM_USER', d.u, {
								domain: domain,
								expires: 1000,
								path: '/'
							});
							$.cookie('940_COM_PASS', d.p, {
								domain: domain,
								expires: 1000,
								path: '/'
							});
							window.userData = data;
							console.log(data)
							window.location.reload()
						}

					})
				})
			}
		});
	}

	QC.Login({
		btnId: "qqLoginBtn"
	}, function(oInfo, oOpts) {
		//document.getElementById('qqLoginBtn').style.display = 'none';
		QC.Login.getMe(function(openId, accessToken) {

			//{"status":0,"tips":"该账号未绑定！"}

			$.post('/qq_bind?do=check&bindcode=' + openId, function(data) {
				//layer.closeAll('loading');
				var d = $.parseJSON(data)
					// console.log(d)
					// console.log(d.status==0)
				if (d.status == 0) {
					accounts_correlation(openId, oInfo);
				} else {
					layer.closeAll();
					$.cookie('940_CODE', openId, {
						expires: 1000,
						path: '/'
					});
					$.cookie('940_COM_USER', d.u, {
						expires: 1000,
						path: '/'
					});
					$.cookie('940_COM_PASS', d.p, {
						expires: 1000,
						path: '/'
					});
					window.userData = data;
					window.location.reload();
					console.log(data);
				}
			})
			console.log(1111111111111)
		});
		console.log(oInfo)
	}, function() {
		console.log("注销成功!");
	});
})