/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var jm = require("jm");
    var IScroll = require("IScroll");

    var myScroll;
    var lazyLoadPage = {
        init: function () {
            var _this = this;
            _this.useModule();
            jm.lazyLoad();
        },

        useModule: function () {
            var _this = this;
            var myScroll = new IScroll("#wrapper", {mouseWheel: true, probeType: 3});
            var rate = 0;
            myScroll.on("scroll", function () {
                if(!jm.lazyLoad()){
                    rate++;
                    if (rate % 3 == 0) {
                        jm.lazyLoad();
                        rate = 0;
                    }
                }
            });
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        lazyLoadPage.init();
    });

    module.exports = lazyLoadPage;
});
