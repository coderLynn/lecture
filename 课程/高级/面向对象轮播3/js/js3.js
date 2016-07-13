function scrollBox(obj) {
    this.obj = obj || {};

    this.oId = $(this.obj.id); //容器id
    this.l_btn = $(this.obj.l_btn); //左按钮
    this.r_btn = $(this.obj.r_btn); //右按钮
    this.autobottom = this.obj.autobottom || false;
    this.trigger = this.obj.trigger || "click";
    this.autoPlay = this.obj.autoPlay || false;
    this.interTime = this.obj.interTime || 5000; //自动播放间隔时间，
    this.delayTime = this.obj.interTime || 600;

    this.timer = null; //定时器
    this.iNow = 0; //当前第几张
    this.isRun = false;

    this.boxUl = this.oId.find("ul");
    this.boxLen = this.oId.find("ul li").length; //li长度
    this.boxLiWidth = this.oId.find("ul li").width(); //li宽
    this.witdh = this.boxLen * this.boxLiWidth + "px";
    this.boxUl.css("width", this.witdh);

    this.l_btn.css("top", (this.oId.height() - this.l_btn.height()) / 2);
    this.r_btn.css("top", (this.oId.height() - this.l_btn.height()) / 2);

    this.init();
}
scrollBox.prototype.init = function () {
    this.scrollAnimate(); //初始化自动播放
    this.scrollmouseEvent(); //鼠标移入移出事件
    this.scrollbottomEvent(); //左右按钮事件
    this.scrolladdBoxOl(); //添加小圆点及事件
}

scrollBox.prototype.scrolladdBoxOl = function () {
    if (this.autobottom === false) {
        return;
    }
    var _this = this;
    var ol = this.oId.find("ol");
    for (var i = 0; i < this.boxLen; i++) {
        ol.append("<li>")
    }
    var li = ol.find("li");
    li.eq(0).addClass("on");
    for (var i = 0; i < this.boxLen; i++) {
        li.eq(i).on(_this.trigger, function () {
            if (_this.isRun) {
                return;
            }
            _this.iNow = $(this).index();
            _this.scrollboxAnimate();
        });
    }
}

scrollBox.prototype.scrollbottomEvent = function () {
    var _this = this;
    //左按钮
    this.l_btn.click(function () {
        if (_this.isRun) {
            return;
        }
        _this.isRun = true;
        _this.iNow--;
        if (_this.iNow < 0) {
            _this.iNow = _this.boxLen - 1;
        }
        _this.scrollboxAnimate();
    });
    //右按钮
    this.r_btn.click(function () {
        if (_this.isRun) {
            return;
        }
        _this.iNow++;
        if (_this.iNow > _this.boxLen - 1) {
            _this.iNow = 0;
        }
        _this.scrollboxAnimate();
    });
}

scrollBox.prototype.scrollboxAnimate = function () {
    var _this = this;
    _this.isRun = true;
    this.boxUl.animate({
        "left": -_this.boxLiWidth * _this.iNow
    }, _this.delayTime, function () {
        _this.isRun = false;
    });
    this.oId.find("ol li").eq(this.iNow).addClass("on").siblings().removeClass("on");
}

scrollBox.prototype.scrollmouseEvent = function () {
    var _this = this;
    this.oId.hover(function () {
        clearInterval(_this.timer);
    }, function () {
        _this.scrollAnimate();
    });
}

scrollBox.prototype.scrollAnimate = function () {
    var _this = this;
    this.timer = setInterval(function () {
        console.log(_this.autoPlay);
        if (_this.autoPlay === false) {
            return;
        }

        _this.isRun = true;
        _this.iNow++;
        if (_this.iNow > _this.boxLen - 1) {
            _this.iNow = 0;
        }
        _this.boxUl.animate({
            "left": -_this.boxLiWidth * _this.iNow
        }, _this.delayTime, function () {
            _this.isRun = false;
        })
        _this.oId.find("ol li").eq(_this.iNow).addClass("on").siblings().removeClass("on");
    }, _this.interTime);
}


$(function () {
    new scrollBox({
        id: "#box", //容器id
        l_btn: "#l_btn", //左按钮
        r_btn: "#r_btn", //右按钮
        autobottom: true, //是否添加小圆点
        trigger: 'mouseover', //小圆点事件，默认click
        autoPlay: true, //是否自动播放
        interTime: "2000", //自动播放间隔时间，默认5000
        delayTime: "" //切换效果时间,默认600
    });
});