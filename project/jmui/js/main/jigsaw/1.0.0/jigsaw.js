/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var Jigsaw = require("Jigsaw");

    var jigsawPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            new Jigsaw({
                totalTime: 10,
                begin: $(".jm-begin"),
                again: $(".jm-again"),
                successFn: function () {
                    console.log("你成功了~Yeah!");
                },
                failFn: function () {
                    console.log("你失败了~wuwu~");
                }
            });
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        jigsawPage.init();
    });

    module.exports = jigsawPage;
});
