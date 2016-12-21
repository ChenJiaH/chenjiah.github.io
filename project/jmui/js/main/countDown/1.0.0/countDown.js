/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var CountDown = require("CountDown");

    var countDownPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            //实例化倒计时
            new CountDown({
                $day: $(".day"),
                $hour: $(".hour"),
                $min: $(".min"),
                $second: $(".second"),
                totalSecond: 10,
                endFn: function () {
                    alert("终于等到你，还好我没放弃---------然并卵");
                }
            });
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        countDownPage.init();
    });

    module.exports = countDownPage;
});
