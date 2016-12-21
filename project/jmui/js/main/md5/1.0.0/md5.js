/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var MD5 = require("MD5");

    var md5Page = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            new MD5({
                $btn:$(".jm-md5-btnTransform"),
                str:$(".jm-md5-str").text(),
                endFn: function (str) {
                    $(".jm-md5-str").text(str);
                }
            })
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        md5Page.init();
    });

    module.exports = md5Page;
});
