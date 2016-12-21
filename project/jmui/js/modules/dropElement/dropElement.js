/**
 * @Author: Created By McChen
 * @Date: 2015/12/8
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    function DropElement(settings) {
        this.sizeArr = settings.sizeArr || [];                  // Array 掉落元素的尺寸数组，必选
        this.count = settings.count || 15;                      // Number 同时出现的最大数
        this.during = settings.during || 3000;                  // Number 完成一个掉落行为的周期
        this.splitTime = settings.splitTime || 300;             // Number 每个子元素出现的时间间隔
        this.width = settings.width || $(window).width();       // Value 可掉落的区域
        this.loop = settings.loop || false;                    // Bool 是否循环掉落,默认值执行一次
        this.init();
    }

    DropElement.prototype = {
        init: function () {
            var self = this;
            var time = self.during + self.splitTime * (self.count - 1) + self.during;       // 出现一组新的掉落元素的时间：第一个元素掉落周期+最后一个出现的时间+最后一个掉落周期
            var len = self.sizeArr.length;

            self.main(len);

            var timer = setInterval(function () {
                self.main(len);
            }, time);
            self.noLoop(timer);
        },

        main: function (len) {
            var self = this;
            for (var i = 0; i <= self.count; i++) {
                (function (i) {
                    setTimeout(function () {
                        self.createDropEle(i, len);
                    }, self.splitTime * i)
                })(i)
            }
        },

        createDropEle: function (i, len) {
            var self = this;
            var idx = parseInt(Math.floor(Math.random() * len));    // 下标
            var posLeft = parseInt(Math.random() * this.width);     // 到容器左侧的距离
            var size = this.sizeArr[idx];       // 元素尺寸
            var str = '<div class="fix-mt jm-dropElement dropElement' + idx + '"></div>';
            var $ele = $(str);
            $ele.css({"width": size[0], "height": size[1], "left": posLeft});
            $("#jm-dropElement").append($ele);
            if (i == self.count) {
                $ele.eq(0).on("animationend webkitAnimationEnd msAnimationEnd oAnimationEnd", function () {
                    $(".jm-dropElement").remove();
                });
            }
        },

        noLoop: function (timer) {
            var self = this
            if (!self.loop) {
                clearInterval(timer);
            }
        }
    };

    module.exports = DropElement;

});