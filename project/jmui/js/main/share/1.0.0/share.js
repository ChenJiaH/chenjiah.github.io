/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
   var share = require("share");

    var sharePage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            share.refreshWxshareInfo({
                "title": "【再次更新】分享文案数据已经更新了呢~~"
            })
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        sharePage.init();
    });

    module.exports = sharePage;
});
