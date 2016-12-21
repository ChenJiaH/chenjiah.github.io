/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var jm = require("jm");

    var requestAnimationFrameAndTweenPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            jm.requestAnimationFrame();
            jm.tween();
            var startTime = 0;
            var ending = 500;
            var during = 100;
            var $obj = $(".jm-requestAnimationFrameAndTween");

            function _run() {
                startTime++;
                var top = Math.tween.Bounce.easeOut(startTime, 0, ending, during);
                $obj.css("top", top);

                if (startTime < during) requestAnimationFrame(_run);
            }

            _run();
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        requestAnimationFrameAndTweenPage.init();
    });

    module.exports = requestAnimationFrameAndTweenPage;
});
