/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var NumKeyboard = require("NumKeyboard");

    var numKeyboardPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            //实例化模拟键盘
            new NumKeyboard({
                $board: $("#jm-keyBoard").find("li"),       //组件键盘
                $targetInput: $("#jm-targetInput").find("li"),  //组件input
                codeType: "num",                        //组件显示方式
                ajaxUrl:"../../data/password.json",
                checkFn: function(pwd,callback){
                    this.getAjaxData(this.ajaxUrl,pwd,returnData);

                    function returnData(data){
                        var flag = (pwd == data.password);
                        callback && callback(flag);
                    }
                }
            });
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        numKeyboardPage.init();
    });

    module.exports = numKeyboardPage;
});
