/**
 * @Author: Created By McChen
 * @Date: 2016/2/19
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var PageSlider = require("PageSlider");

    var pageSliderPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            var pageSlider = new PageSlider({
                page: $(".page"),
                beginIndex: 0,
                activeClass: "page-active",
                type: "ease-out",
                scaleEffect: false
            });
            pageSlider.slideTo(2);
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        pageSliderPage.init();
    });

    module.exports = pageSliderPage;
});
