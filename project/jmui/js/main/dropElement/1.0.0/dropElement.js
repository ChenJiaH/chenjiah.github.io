/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var DropElement = require("DropElement");

    var dropElementPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            // 元素掉落效果
            new DropElement({
                sizeArr: [[10, 24], [13, 15], [16, 19], [12, 14], [10, 15]],
                count: 15,
                during: 3000,
                splitTime: 300,
                loop: true
            });
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        dropElementPage.init();
    });

    module.exports = dropElementPage;
});
