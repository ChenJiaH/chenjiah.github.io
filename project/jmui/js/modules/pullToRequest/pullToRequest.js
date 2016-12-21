/**
 * @Author: Created By McChen
 * @Date: 2015/12/18
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */


define(function (require, exports, module) {
/*下拉刷新(目前只能支持全屏幕)*/
function PullToRequest(loadFn, beforeLoadFn) {
    this.pullIng = false;
    this.needLoading = false;
    this.beforeLoadFn = beforeLoadFn || "";
    this.loading = false;
    this.loadFn = loadFn || "";
    this.init();
}

PullToRequest.prototype = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        var startY = 0;
        var scrollTop = 0;
        var disY = 0;
        var moveTimer = null;

        function endFn() {
            if (_this.pullIng && _this.needLoading) {
                _this.loading = true;
                _this.loadFn && _this.loadFn();
            }
            startY = 0;
            disY = 0;
            scrollTop = 0;
            _this.pullIng = false;
            _this.needLoading = false
        }

        $(document).on("touchstart", function (e) {
            if (($(document).height() - ($(window).scrollTop() + $(window).height())) <= 5 && !_this.loading && !_this.pullIng) {
                _this.pullIng = true;
                startY = e.changedTouches[0].clientY;
                scrollTop = $(window).scrollTop();
            }
        })

        $(document).on("touchmove", function (e) {
                if (_this.pullIng) {
                    disY = startY - e.changedTouches[0].clientY;
                    if (disY > 0) {
                        if (_this.beforeLoadFn && !_this.loading) {
                            _this.beforeLoadFn();
                        } else {
                            _this.needLoading = true;
                        }
                    }
                    clearTimeout(moveTimer);
                    moveTimer = setTimeout(function () {
                        if (disY > 50) {
                            endFn();
                        }
                    }, 300)
                }
            }
        )

        $(document).on("touchend", function () {
            clearTimeout(moveTimer);
            endFn();
        })
    }
};
    module.exports = PullToRequest;
});