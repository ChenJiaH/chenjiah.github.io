/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var IScroll = require("IScroll");

    var myScroll;
    var iscrollPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            myScroll = new IScroll("#wrapper", {mouseWheel: true, probeType: 3});
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        iscrollPage.init();
    });

    module.exports = iscrollPage;
});
