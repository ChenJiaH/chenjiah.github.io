/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var CheckBox = require("CheckBox");

    var checkBoxPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            //实例化
            new CheckBox({
                obj: $(".jm-checkBox"),
                checkedClass: "jm-checkBox-checked",
                checkcb: function () {
                    alert("被选中")
                },
                uncheckcb: function () {
                    alert("取消选中")
                },
                initChecked: false
            });
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        checkBoxPage.init();
    });

    module.exports = checkBoxPage;
});
