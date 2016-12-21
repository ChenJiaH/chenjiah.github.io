/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var DrawCharts = require("DrawCharts");

    var drawChartsPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            // 画环形的数据格式
            // 按产品要求顺序从高到低
            var data = {
                "ring":[
                    {"asset": 45244.96},
                    {"asset": 5054.94},
                    {"asset": 5053.75}
                ]
            };
            // color 对应数组
            var myChart = new DrawCharts({
                canvas: document.getElementById("circular"),
                data: data,
                color: ["#3c6fa8", "#ffcf35", "#5bd6ff"]
            });
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        drawChartsPage.init();
    });

    module.exports = drawChartsPage;
});
