/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var PreLoad = require("PreLoad");

    var preLoadPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            //实例化预加载
            new PreLoad({
                tasks:[
                    "http://demo.jr.jd.com/finance/mobile/payment/shortPassword/images/successIcon.png",
                    "http://demo.jr.jd.com/finance/mobile/payment/shortPassword/images/successIcon.png",
                    "http://demo.jr.jd.com/finance/mobile/payment/shortPassword/images/successIcon.png"
                ],
                finishedFn:function(total){
                    console.log("已经加载完成了，共加载"+total+"个资源");
                }
            });
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        preLoadPage.init();
    });

    module.exports = preLoadPage;
});
