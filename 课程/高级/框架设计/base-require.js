Fengs.add('common/base-require', function(S, $, COOKIE, MD5){
	//三种签名方式
	var gt = ["sign","signpass","signpayment"];
	var win = window
		, doc = document;
	var req = function(__client, __prefix, __host, undefined){
		__client = __client === undefined ? 50 : __client;
		__prefix = __prefix === undefined ? 'ZX_KEHUDA_' : __prefix;
		var u = {
			'url': __host === undefined ? S.remote.api[0] : __host
			//是否已请求服务器时间
			, 'b':false
			//signpass提交方式
			, 'p':function(options, s){
				//if(this.n()){
					return u.send(options,1,s);
				//};
			}
			//sign提交方式
			, 's':function(options, s){
				return u.send(options,0,s);
			}
			//signpayment提交方式
			, 'm':function(options, s){
				//if(this.n()){
					return u.send(options,2,s);
				//};
			}
			, 'pay': function(key){
				return MD5(key + "#@$*)!");
			}
			, 'pass': function(key){
				return MD5(key + ",vs/..~");
			}
			, 'loadJs': function(src, fun, error){ 
				var script = doc.createElement("script")
					, loaded = false;
				script.type = "text/javascript";
				script.src = src; 
				script.onload = function(){
					loaded = true; 
					doc.getElementsByTagName("head")[0].removeChild(script);
				};
				if(error){
					script.onerror = error;
				};
				doc.getElementsByTagName("head")[0].appendChild(script); 
			}
			//发送请求
			, 'get':function(options, time, type, backstr){
				var o = $.extend({
						url:""
						, host: '/'
						, type: "POST"
						, dataType: 'JSON'
						, data: {}
						, escape: true
						, success:function(){}
						, p: null
						, error:function(){
							//n.l.h();
							//openWarn("no",g(0));
						}
					},options)
					, signKey
					, argument
					, ckey;
				o.data = u.replace(o.data);
				o.data.timestamp = time;
				if(type == 1){
					o.p = !o.p ? $.cookie(u.prefix +"PASS") : o.p;
				}else if(type == 2){
					ckey = "SUDUDA_COM_"+ o.data.username.toUpperCase();
					o.data.cert = $.cookie(ckey + "_CERT");
				};
				/*if(!o.data.username){
					o.data.username = $.cookie(u.prefix +"USER");
				};*/
				var sortobj = u.sort(o.data, o.escape);
				o.url = o.url.replace(/^\//,'');
				o.data = sortobj[0];
				argument = "/"+ o.url + "?"+ u.emnu(sortobj[1], o.data.sign0).join("&");
				signKey = md5(encodeURIComponent(type != 0 ? argument + "&" + o.p : argument));
				var typestr = gt[type];
				o.data[typestr] = signKey;
				if(backstr){
					return argument +'&'+ typestr +'='+ signKey;
				};
				if(o.host !== '/' && $.browser && $.browser.msie && $.browser.version <= '9.0'){
					return u.xhr(o.host + o.url, u.emnu(sortobj[1], o.data.sign0).join("&") +'&'+ typestr +'='+ signKey, o)
				};
				return $.ajax({
					'url': o.host + o.url
					, 'type': o.type
					, 'dataType': o.dataType[$ === win.jquery ? toUpperCase : 'toLowerCase']()
					, 'data': o.data
					, 'success': function(d){
						//
						console.log(u.compile);
						if(!!u.compile){
							var result = u.compile(d, function(){
								u.syscTime(function(){
									u.send(options, type);
								});
							});
							if(!result){
								return;
							}
						};
						o.success(d);
					}
					, error: o.error
				});
			}
			, 'xhr': function(url, args, opt){
				var xmlhttp = false
					, method = opt.type.toUpperCase();
				try{
					xmlhttp = new win.ActiveXObject("Msxml2.XMLHTTP"); // ie msxml3.0+（IE7.0及以上）  
				}catch (e){  
					try{  
						xmlhttp = new win.ActiveXObject("Microsoft.XMLHTTP"); //ie msxml2.6（IE5/6）  
					}catch (e2){
						xmlhttp = false;  
					};
				};
				if (!xmlhttp && typeof win.XMLHttpRequest != 'undefined'){// Firefox, Opera 8.0+, Safari  
					xmlhttp = new win.XMLHttpRequest();  
				}; 
				xmlhttp.onreadystatechange = function(){ 
					if (xmlhttp.readyState == 4){
						var s = xmlhttp.status;
						if (s >= 200 && s < 300){
							var text = xmlhttp.responseText;
							if(opt.dataType.toUpperCase() === 'JSON'){
								try{
									text = $.parseJSON(text);
								}catch(e){
									text = {};
								};
								opt.success && opt.success(text);
							}else{
								opt.success && opt.success(text);
							}
						}else if(s == 413){
							alert('图片太大，无法上传。')
						}else{
							opt.error && opt.error();
						};
					};
				};
				xmlhttp.open(method, url, true);
				if(method == "POST"){
					xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				};
				xmlhttp.send(args);
				return xmlhttp;
			}
			, 'sort': function(inObj, escape){
				var array = new win.Array(),
					array2 = new win.Array(),
					obj = new win.Object(),
					obj2 = new win.Object(),
					str,str2;
				for(var i in inObj){
					if(escape){
						str = win.String(inObj[i]).replace(/\)/g, "）").replace(/\(/g, "（").replace(/\{/g, "｛").replace(/\}/g, "｝").replace(/\\/g, "＼").replace(/\</g, "＜").replace(/\>/g, "＞").replace(/\'/g, "＇").replace(/\!/g, "！").replace(/\~/g, "～").replace(/\ /g, "　").replace(/\%/g, "　").replace(/\ /g, "　");
						str2 = str.replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/&/g, "%26");
					}else{
						str2 = str = win.String(inObj[i]);
					};
					array2.push({"name":i,"value":str});
					array.push({"name":i,"value":str2});
				};
				array.sort(function(a,b){return a["name"] < b["name"] ? -1 : 1;});
				array2.sort(function(a,b){return a["name"] < b["name"] ? -1 : 1;});
				for(var i = 0; i< array.length; i++){
					obj[array[i].name] = array[i].value;
					obj2[array2[i].name] = array2[i].value;
				};
				return [obj,obj2];//obj转过的,obj2是没转的
			}
			, 'syscTime': function(callback){
				var now = new win.Date().getTime();
				u.s({
					url:"/api/sys_now"
					, type: 'jsonp'
					, data:{format:"json",rnd:now}
					, success:function(d){
						d = d.sududa;
						var _time = 0;
						if(d.status == "1"){
							_time = win.parseInt(now / 1000) - d.time;
						};
						$.cookie(u.prefix +"TIMESTAMP", _time);
						callback();
					}
				});
			}
			, 'getid': function(){
				var d = new win.Date(),
					o = {
						"y" : win.String(d.getFullYear()),
						"M" : win.String(d.getMonth() + 1),
						"d" : win.String(d.getDate()),
						"h" : win.String(d.getHours()),
						"m" : win.String(d.getMinutes()),
						"s" : win.String(d.getSeconds())
					};
				for(var i in o){
					if(o[i].length == 1){
						o[i] = "0"+o[i];
					};
				};
				o.t = win.String(d.getMilliseconds());
				for(var i = 0; i < 3 - o.t.length; i++){
					o.t = "0" + o.t;
				};
				return o.y + o.M + o.d + o.h + o.m + o.s + o.t;
			}
			, 'covertArray': function(inArr){
				if(!inArr || inArr == ""){
					return [];
				}else if($.isArray(inArr)){
					return inArr;
				}else{
					return [inArr];
				}
			}
		};
		u.jsonp = function(options, time, type, backstr){
			var o = $.extend({ 
					url:"",
					data:null
					, escape: true
					, success:function(){},
					p:null,
					error:function(){
						//n.l.h();
						//openWarn("no",g(0));
					}
				},options)
				, signKey
				, argument
				, ckey;
			var cb = 'JSONP'+ new win.Date().getTime().toString(36);
			o.data.callback = cb;
			win[cb] = function(d){
				try{
					if((typeof d === 'string' && d.indexOf('\u65f6\u95f4\u6233\u5df2\u8fc7\u671f')>=0) || (d.sududa.status === '-9' && d.sududa.tips.indexOf('\u65f6\u95f4\u6233\u5df2\u8fc7\u671f')>=0)){
						u.syscTime(function(){
							u.send(options, type);
						});
						return;
					}
				}catch(e){
					return o.success(d);
				};
				//提示用户登录
				if(d.status === -1 && !!o.login){
					return o.login();
				};
				o.success(d);
			};
			o.data = u.replace(o.data);
			o.data.timestamp = time;
			if(type == 1){
				o.p = !o.p ? $.cookie(u.prefix +"PASS") : o.p;
			}else if(type == 2){
				ckey = "SUDUDA_COM_"+ o.data.username.toUpperCase();
				o.data.cert = $.cookie(ckey + "_CERT");
			};
			o.url = o.url.replace(/^\//,'');
			var sortobj = u.sort(o.data, o.escape);
			o.data = sortobj[0];
			argument = "/"+ o.url + "?"+ u.emnu(sortobj[1], o.data.sign0).join("&");
			signKey = md5(encodeURIComponent(type != 0 ? argument + "&" + o.p : argument));
			var typestr = gt[type];
			o.data[typestr] = signKey;
			u.loadJs(u.jsonpHost.replace(/\/$/,'') + argument +"&"+ typestr +"="+ signKey, function(){}, o.error);
		};
		u.prefix = __prefix//document.domain.replace(/\./ig,'_') +'_'
		u.jsonpHost = S.remote.api[0];
		u.emnu = function(inObj, sign0){
			var a = new win.Array();
			var aSign = !!sign0 && typeof sign0 === 'string' ? sign0.split(',') : false;
			for(var i in inObj){
				if(!!aSign && $.inArray(i, aSign) >= 0){

				}else{
					a.push(i +"="+ inObj[i]);
				}
			};
			return a;
		};
		u.replace = function(data){
			data.client = __client;
			if(!data.format){
				data.format = "json";
			}
			data.ver = "4";
			if(!data.username){
				var cookieUser = $.cookie(u.prefix +"USER");
				if(cookieUser === null){
					cookieUser = $.cookie(u.prefix +"MARK");
				};
				if(cookieUser === null){
					cookieUser = 'null';
				};
				data.username = cookieUser;
			}
			//o.data.username = "1@1.com";
			/*else if(type == 2){
				ckey = "SUDUDA_COM_"+ o.data.username.toUpperCase();
				o.data.cert = $.cookie(ckey + "_CERT");
			};*/
			return data;
		};
		//生成时间戳
		u.send = function(o,t,s){
			var now = win.parseInt(new win.Date().getTime() / 1000),
				self = arguments.callee;
			try{
				u.b = win.parseInt($.cookie(u.prefix +"TIMESTAMP"));
				u.b = !u.b ? 0 : u.b;
			}catch(e){
				u.b = 0;
			};
			return u[o.type === 'jsonp' ? 'jsonp' : 'get'](o,(now - u.b),t,s);
		};
		return u;
	};
	//u.syscTime();
	return req;
},["jquery/cookie","./md5"]);