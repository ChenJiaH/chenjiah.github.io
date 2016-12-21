/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var Dialog = require("Dialog");

    var dialogPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            new Dialog({
                title: "我是标题",
                content: "singleBtn若设置为true,则只显示确定按钮",
                //sureUrl: "http://www.jd.com",
                singleBtn: false,
                sureFn: function () {
                    new Dialog({content: "你点击了确定"});
                },
                cancelFn: function () {
                    new Dialog({content: "你点击了取消"});
                }
            });
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        dialogPage.init();
    });

    module.exports = dialogPage;
});
