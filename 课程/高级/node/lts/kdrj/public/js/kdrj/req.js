Fengs.add('kdrj/req', function(S, $, BaseReq){
    var Req = new BaseReq(47, 'KD_');
    Req['compile'] = function(data, callback){
        if(!data || data === ''){
            //alert('[ERROR]没有返回任何数据');
            return false;
        };
        if(typeof data === 'string'){
            try{
                data = $.parseJSON(data).sududa;
            }catch(e){
                //alert('[ERROR]数据无法解析');
                return false;
            };
        }else{
            data = data.sududa;
        };
        if(data.status === '-9' && data.tips.indexOf('\u65f6\u95f4\u6233\u5df2\u8fc7\u671f') > -1){
            callback && callback();
            //alert('[ERROR]请求过期,系统将重新请求');
            return false;
        };
        return true;
    };
    return Req;
}, ['common/base-require']);