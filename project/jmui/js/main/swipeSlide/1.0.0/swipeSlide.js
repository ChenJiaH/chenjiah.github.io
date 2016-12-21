/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    require("SwipeSlide");

    var swipeSlidePage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            var $viewPort = $(".slider-wrapper");
            var $tabContainer = $(".slider-wrapper .slider_touch");
            var $dots = $(".slider-wrapper ol").find("li");

            var sliderObj = $viewPort.swipeSlide({
                container: $tabContainer,           // 滚动的容器 -- 必选项！！！
                speed: 2000,                              // 滚动的时间间隔，默认4000ms
                dots: $dots,                                // 和滚动项目对应的点 dot
                dotActiveClass: "active",            // 点激活状态的class
                autoScroll: true,                        // 是否自动滚，默认true
                continuousScroll: false,               // 是否连续滚动，默认false
                dir: "x",                                         // 运动的方向，默认x-水平滚动，y-竖直滚动
                transitionType: "ease",                // 运动方式，默认cubic-bezier(0.22, 0.69, 0.72, 0.88)
                callback: function (index) {

                }                                   // 每项滚动完后的回调函数
            });
            $dots.on("click", function () {
                sliderObj.goTo($(this).index());
            });
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        swipeSlidePage.init();
    });

    module.exports = swipeSlidePage;
});
