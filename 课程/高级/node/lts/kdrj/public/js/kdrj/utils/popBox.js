Fengs.add('kdrj/utils/popBox', function(S, $) {


	var popBox = {
		init: function() {
			this.footer = $('#footer');
			this.found();
			// this.j_touch = $('#j_touch'); //左侧联系
			// this.j_sign = $('#j_sign'); //右侧报名
			// this.sign_box = $('#sign_box'); //弹出层
			// this.close_sign = $('#close_sign'); //关闭层
			this.gotop();
			this.roll();
			// this.winBox();
			this.submitInfo();
		},
		found: function() {
			// 创建头部导航
			var $body = $('body');
			var $header = $('#header').find('.head1');
			var $headBox = $('<div id="headBox" class="minHead">').append($header.clone())
			$headBox.find('.logo940').attr('src', '/images/min_logo.png')
			$body.prepend($headBox);
			$headBox.find('.nav_ul').append('<li class="consult"><a target="_blank" title="在线咨询" href="tencent://message/?Menu=yes&amp;uin=938172160&amp;Service=58&amp;SigT=A7F6FEA02730C98890BF838BB77E297925DDF3D4EE7956D90E8C05DDEB731E2DF8F0A63D7D3327BD9601795F8EEF4DBA3799849135933444E48DA0FF526DA1D25663728CA5439C00D42BF04219BE3B40896EC4D39F72B10036C14AE245272A4AE087CCCB6CE9A9BE6CD365665DD33699CDBB0B9BDE7AF4EC&amp;SigU=30E5D5233A443AB28B5DCA8C332CB0FE2A58AFAD49112F0D3B958D12966C844C764CEA315D010550DB9AD3858ECC261AC556D1E98D3164B7A663FA4A710D888687C540D26A27EA87">立即咨询</a></li>')
			var qqLink = 'tencent://message/?Menu=yes&amp;uin=938172160&amp;Service=58&amp;SigT=A7F6FEA02730C98890BF838BB77E297925DDF3D4EE7956D90E8C05DDEB731E2DF8F0A63D7D3327BD9601795F8EEF4DBA3799849135933444E48DA0FF526DA1D25663728CA5439C00D42BF04219BE3B40896EC4D39F72B10036C14AE245272A4AE087CCCB6CE9A9BE6CD365665DD33699CDBB0B9BDE7AF4EC&amp;SigU=30E5D5233A443AB28B5DCA8C332CB0FE2A58AFAD49112F0D3B958D12966C844C764CEA315D010550DB9AD3858ECC261AC556D1E98D3164B7A663FA4A710D888687C540D26A27EA87';
/*			var html = "<div id='j_sign'><a class='t' target='new' href='https://item.taobao.com/item.htm?id=532700995580&qq-pf-to=pcqq.c2c'></a><a class='b' target='new' href='" + qqLink + "'></a></div>";

			this.footer.after(html);*/

			$('script[src]').remove();
    		$("#headBox").append("<div class='headBox-line'></div>");
		},
		submitInfo: function() { //报名提交验证

			var reg = {
				name: /^[\u4e00-\u9fa5a-zA-Z]{2,15}$/,
				tel: /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/,
				qq: /^[1-9]\d{4,}$/
			};

			var _this = this;
			var $but_enroll = $('.but_enroll input'),
				$sign_input = $('.sign_input'),
				$hintBox = $('#hintBox span'),
				meoutTmer = null;
			var submitFn = function() {
				var vName = $sign_input.eq(0).find('input').val();
				var vTel = $sign_input.eq(1).find('input').val();
				var vQQ = $sign_input.eq(2).find('input').val();
				var $error = meout();
				// console.log(vName+'-'+vTel+'-'+vQQ)
				if (!reg.name.test(vName)) {
					$error.html('姓名格式有误');
				} else if (!reg.tel.test(vTel)) {
					$error.html('电话号码格式不正确');
				} else if (!reg.qq.test(vQQ)) {
					$error.html('QQ号码格式不正确');
				} else {
					$but_enroll.val('正在加载中...');
					$.getJSON('/enroll?user_name=' + vName + '&phone_number=' + vTel + '&qq=' + vQQ + '&do=add', function(data) {
						try {
							if (data['status'] == 1) {
								$hintBox.removeClass('error').addClass('succ').html(data['tips']);
								setTimeout(function() {
									_this.sign_box.fadeOut(300);
									_this.sign_box.find('.alert_box').animate({
										marginTop: '0px',
										height: '0px'
									}, 200, 'easeOutSine');
									$hintBox.removeClass('error succ');
									$sign_input.find('input').val('');
								}, 1500)
							} else {
								$error.html('服务器繁忙，请稍后再试！');
							}
						} catch (e) {
							$error.html('服务器繁忙，请稍后再试！');
						}

						$but_enroll.val('立即报名');
					})

				}
			}
			$but_enroll.click(submitFn);
			$(document).keydown(function(event) {
				if (!$sign_input.find('input').is(':focus')) return;
				if (event.keyCode == 13) submitFn();
			});


			function meout() {
				clearTimeout(meoutTmer);
				meoutTmer = setTimeout(function() {
					$hintBox.removeClass('error succ');
				}, 2000);
				return $hintBox.addClass('error');
			}

		},
		roll: function() {
			var _this = this;
			var _window = $(window);
			var _header = $('#header'),
				_wrap_head = _header.find('.wrap_head');
			var slooOff = true;
			var $advert = $('#advert');
			var $headBox = $('#headBox');
			_window.on('scroll', function() {
				comSoll();
			});
			comSoll();

			function comSoll() {
				var _top = $(document).scrollTop();
				_top > 700 ? _this.goTop.fadeIn(600) : _this.goTop.fadeOut(400);
/*				_this.j_touch.stop().css({
					top: (_window.height() - _this.j_touch.height()) / 2 + _top
						//top: 220
				}, 300);*/
/*				_this.j_sign.stop().css({
					top: (_window.height() - _this.j_sign.height()) / 2 + _top
						//top: 220
				}, 300);*/

				//minTop

				if (!-[1, ]) {
					$headBox.addClass('ie8');
				};
				if (_top >= 300) {
					if (navigator.userAgent.indexOf("MSIE 9.0") > 0 || !-[1, ]) {
						$headBox.stop(true).animate({
							top: 0
						}, 200);
					} else {
						$headBox.css({
							top: 0
						});
					}
				} else {
					if (navigator.userAgent.indexOf("MSIE 9.0") > 0 || !-[1, ]) {
						$headBox.stop(true).animate({
							top: -65
						}, 200);
					} else {
						$headBox.stop(true).removeAttr('style');
					}
				}
			}
		},
/*		winBox: function() {
			var _this = this,
				$sign_input = $('.sign_input');
			$('.enroll,.v_st').on('click', function() {
				_this.sign_box.fadeIn();
				setTimeout(function() {
					//_this.sign_box.find('.alert_box').css({opacity:'1',transform:'scale(1)'})
					_this.sign_box.find('.alert_box').animate({
						marginTop: '-265px',
						height: '530px'
					}, 'easeOutSine');
					$sign_input.eq(0).find('input').focus();
				}, 100);
			});
			$('#close_sign,.cancel').on('click', function() {
				_this.sign_box.fadeOut();
				_this.sign_box.find('.alert_box').animate({
						marginTop: '0px',
						height: '0px'
					}, 300, 'easeOutSine')
					//_this.sign_box.find('.alert_box').css({opacity:'0',transform:'scale(0.5)'});
			});
			this.exe();
		},*/
/*		exe: function() {
			this.sign_box.find('.r_input input').focus(function() {
				$(this).parents('li').addClass('act')
			});
			this.sign_box.find('.r_input input').blur(function() {
				$(this).parents('li').removeClass('act')
			});


			this.j_touch.on('mouseenter', 'a', function() {
				var _i = $(this).index();
				var width = _i == 2 ? 170 : 150;
				var _span = $(this).find('span'),
					_aI = _span.find('i');

				if (_i < 4) {
					_span.stop().animate({
						opacity: 1
					}, 300);

				} else {
					_span.css({
						'width': '127px'
					}).stop().animate({
						'marginTop': '-75px',
						opacity: 1
					});
				}
				_aI.stop().animate({
					marginLeft: 0
				}, 300);

			}).on('mouseleave', 'a', function() {
				var _i = $(this).index();
				var _span = $(this).find('span'),
					_aI = _span.find('i');
				if (_i < 4) {
					_span.stop().animate({
						left: 0,
						opacity: 0
					}, 300);
				} else {
					_span.css({
						'width': '0px',
						'marginTop': '-100px',
						opacity: 0
					});
				}
				_aI.stop().animate({
					marginLeft: '150px'
				}, 300);

			})


		},*/
		gotop: function() {
			var _top = $(document).scrollTop(),
				$obj = $('html,body');
			this.goTop = $('<div>');
			this.goTop.attr('id', 'goTop').css('display', 'none');
			this.goTop.html('<a href="javascript:void(0);" class="tz"></a>\
					<div class="sd_content">\
					<div class="sd_bd">\
					<ul>\
					<li>\
					<a href="javascript:void(0);">最新上架</a>\
					</li>\
					<li>\
					<a href="javascript:void(0);">今日热卖</a>\
					</li>\
					<li>\
					<a href="javascript:void(0);">人气爆款</a>\
					</li>\
					<li>\
					<a href="javascript:void(0);">长期有货</a>\
					</li>\
					<li class="ten">\
					<a href="javascript:void(0);"><i>9.9</i>包邮</a>\
					</li>\
					<li class="ten">\
					<a href="javascript:void(0);"><i>19.9</i>包邮</a>\
					</li>\
					<li>\
					<a href="javascript:void(0);">特价商品</a>\
					</li>\
					<li>\
					<a href="javascript:void(0);">品牌超市</a>\
					</li>\
					</ul>\
					</div>\
					<div class="sd_line"></div>\
					<div class="sd_bdc">\
					<ul>\
					<li class="nvzhuang">\
					<a href="javascript:void(0);"><i></i>服装</a>\
					</li>\
					<li class="neiyi">\
					<a href="javascript:void(0);"><i></i>美容</a>\
					</li>\
					<li class="nanzhuang">\
					<a href="javascript:void(0);"><i></i>鞋袜</a>\
					</li>\
					<li class="xiepin">\
					<a href="javascript:void(0);"><i></i>数码</a>\
					</li>\
					<li class="ertong">\
					<a href="javascript:void(0);"><i></i>包包</a>\
					</li>\
					<li class="muying">\
					<a href="javascript:void(0);"><i></i>玩具</a>\
					</li>\
					<li class="jiafang">\
					<a href="javascript:void(0);"><i></i>日用</a>\
					</li>\
					<li class="jujia">\
					<a href="javascript:void(0);"><i></i>居家</a>\
					</li>\
					<li class="shipin">\
					<a href="javascript:void(0);"><i></i>食品</a>\
					</li>\
					<li class="yundong">\
					<a href="javascript:void(0);"><i></i>其他</a>\
					</li>\
					</ul>\
					</div>\
					<form class="sd_search" target="_blank" action="">\
					<input type="text" name="keyword" class="sd_txt" placeholder="搜索" autocomplete="off">\
					<input type="submit" value="" class="sd_smt">\
					</form>\
					</div>');

			// this.goTop.on('click', function() {
			// 	$obj.animate({
			// 		scrollTop: 0
			// 	});
			// });
			this.footer.after(this.goTop);
		}
	};
	popBox.init();

    // 页头搜索框
    $(".form .button").hover(function() {
       $(this).addClass('hvr');
       $(".form .text").hover().addClass('hover');
    },
    function() {
        $(this).removeClass('hvr');
        $(".form .text").hover().removeClass('hover');
    });

    // gotop (左侧fixed)
    $(".sd_bdc ul li a").hover(function() {
       $(this).addClass('hvr');
       // $(".form .text").hover().addClass('hover');
    },
    function() {
        $(this).removeClass('hvr');
        // $(".form .text").hover().removeClass('hover');
    });

});