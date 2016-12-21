/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    require("base64");

    var base64Page = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            $(".jm-base64-btnTransform").on("click", function () {
                var oldStr = $(".jm-base64-str").text();
                var newStr = $.base64.encode(oldStr);
                $(".jm-base64-str").html(newStr);

            })
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        base64Page.init();
    });

    module.exports = base64Page;
});
