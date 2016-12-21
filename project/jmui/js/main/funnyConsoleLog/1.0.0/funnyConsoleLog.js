/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var FunnyConsoleLog = require("FunnyConsoleLog");

    var funnyConsoleLogPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            new FunnyConsoleLog({
                title:"",
                announce:"",
                email:"jrshenduxian@jd.com "
            });
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        funnyConsoleLogPage.init();
    });

    module.exports = funnyConsoleLogPage;
});
