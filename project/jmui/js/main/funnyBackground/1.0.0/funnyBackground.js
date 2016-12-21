/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var FunnyBackground = require("FunnyBackground");

    var funnyBackgroundPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            //实例化有趣背景
            new FunnyBackground({
                canvas : document.getElementById("jm-funnyBackground"),
                usedIn : "mobile"
            });
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        funnyBackgroundPage.init();
    });

    module.exports = funnyBackgroundPage;
});
