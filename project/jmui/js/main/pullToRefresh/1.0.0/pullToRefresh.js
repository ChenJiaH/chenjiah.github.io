/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var PullToRefresh = require("PullToRefresh");
    var IScroll = require("IScroll");

    var pullToRefreshPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            var myScroll = new IScroll("#wrapper");
            var myAddrPicker = new PullToRefresh({
                moveEle: $(".mainBox"),
                loadingTop: 0,
                maxMove: 30,
                callback: function() {
                    this.moveEle.find(".list-box").append('<li><a href="javascript:;" class="list-link"><span>list-1</span></a></li><li><a href="javascript:;" class="list-link"><span>list-2</span></a></li><li><a href="javascript:;" class="list-link"><span>list-3</span></a></li><li><a href="javascript:;" class="list-link"><span>list-4</span></a></li>');
                    myScroll.refresh();
                }
            })
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        pullToRefreshPage.init();
    });

    module.exports = pullToRefreshPage;
});
