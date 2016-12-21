/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var AnalogKeyboard = require("AnalogKeyboard");

    var analogKeyboard = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            var analogKeyboard = new AnalogKeyboard({
                $board: $(".jm-analogKeyboard"),
                $key: $(".jm-analogKeyboard").find("li[data-key]"),
                $input: $(".jm-analogKeyboard-input"),
                completeFn: function (result) {
                    alert("您输入的密码为："+ result)
                },
                codeType: "hidden"
            });
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        analogKeyboard.init();
    });

    module.exports = analogKeyboard;
});
