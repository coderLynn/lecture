;
(function (window, docuemnt) {
    var w = window,
        doc = document;
    var tj = function (selector) {
        return new tj.prototype.init(selector);
    }
    tj.prototype={
        constructor:tj,
        length:0,
        splice:[].splice,
        selector:"",
        init:function(selector){
            if(!selector) { return this; }

            var selector = selector.trim(),
                elm;

            if (selector.charAt(0) == '#' && !selector.match('\\s')) {
                selector = selector.substring(1);
                this.selector = selector;
                elm = document.getElementById(selector);

                this[0] = elm;
                this.length = 1;
                return this;
            } else {
                elm = document.querySelectorAll(selector);
                for (var i = 0; i < elm.length; i++) {
                    this[i] = elm[i];
                }

                this.selector = selector;
                this.length = elm.length;
                return this;
            }
        },
        css : function(attr,val) {//链式测试
            console.log(this.length);
            for(var i = 0;i < this.length; i++) {
                if(arguments.length == 1) {
                    return getComputedStyle(this[i],null)[attr];
                }
                this[i].style[attr] = val;
            }
            return this;
        },
        hasClass : function(cls) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            for (var i = 0; i < this.length; i++) {
                if (this[i].className.match(reg)) return true;
                return false;
            }
            return this;
        },
        addClass : function(cls) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            for (var i = 0; i < this.length; i++) {
                if(!this[i].className.match(reg))
                    this[i].className += ' ' + cls;
            }
            return this;
        },
        removeClass : function(cls) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            for (var i = 0; i < this.length; i++) {
                if (this[i].className.match(reg))
                    this[i].className = this[i].className.replace(cls,'');
            }
            return this;
        }
        };
    tj.prototype.init.prototype=tj.prototype;
    tj.ajax=function(){
        console.log(this);
    }
    w.f= tj;
})(window, document);