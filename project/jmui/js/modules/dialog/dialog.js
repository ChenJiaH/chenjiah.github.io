/**
 * @Author: Created By McChen
 * @Date: 2015/12/14
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {

    function Dialog(settings) {
        this.title = settings.title || "";
        this.content = settings.content;
        this.sureUrl = settings.sureUrl || "javascript:;";
        this.sureFn = settings.sureFn || null;      // 确定之后回调函数
        this.cancelFn = settings.cancelFn || null;  // 取消之后回调函数
        this.singleBtn = settings.singleBtn || false;   // 当为true的时候只显示确定按钮
        this.init();
    }

    Dialog.prototype = {
        init: function () {
            var _this = this;
            _this.initDialog();
            _this.bindEvent();
        },
        initDialog: function() {
            var _this = this;
            if (_this.title == "") {
                $(".jm-dialog-title").remove();
            }else{
                $(".jm-dialog-title").text(_this.title);
            }
            if (!!_this.singleBtn) {
                $(".jm-dialog-btnCancel").remove();
            }
            $(".jm-dialog-content").text(_this.content);
            $(".jm-dialog-btnSure").attr("href", _this.sureUrl);
        },
        bindEvent: function () {
            var _this = this;
            $(".jm-dialog").on("click", ".jm-dialog-btnSure", function () {
                _this.sureFn && _this.sureFn();
            }).on("click", ".jm-dialog-btnCancel", function () {
                _this.cancelFn && _this.cancelFn();
            });
        }
    };

    module.exports = Dialog;

});