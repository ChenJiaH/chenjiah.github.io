/**
 * @Author: Created By McChen
 * @Date: 2016/1/18
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {

    function DrawCharts(opts) {
        this.canvas = opts.canvas;   // canvas Dom
        this.ctx = opts.canvas.getContext('2d');   // canvas context

        this.data = opts.data;
        this.color = opts.color || ["#ffcf35", "#5bd6ff", "#3c6fa8"];
        this.ringW = opts.canvas.width || 250;
        this.ringH = opts.canvas.height || 250;
        this.lineWidth = opts.lineWidth || 40;               // piechart radius
        this.ringR = (opts.canvas.ringW - opts.lineWidth) / 2 || 104;   // 线宽是两边增宽

        this.init();
    }

    DrawCharts.prototype = {
        init: function () {
            var self = this;
            //self.drawRing(248, 0, 2*Math.PI, "#cccccc", 2);
            //self.drawRing(172, 0, 2*Math.PI, "#cccccc", 2);
            self.RingChart();
        },
        RingChart: function () {

            var self = this;
            var startDeg = 0;
            var deg = 0;
            var endDeg = 0;
            var startRadius = 0;
            var endRadius = 0;                           // end line position
            var currentDeg = 0;   //accumulated degrees for drawing icon
            var total = self.getTotal();
            var length = self.data.ring.length;
            var percent = [];

            for (var i = 0; i < length; i++) {
                percent[i] = self.data.ring[i].asset/total;
                deg = percent[i] * 360;
                endDeg = startDeg + deg;
                startRadius = self.getRadius(startDeg);
                endRadius = self.getRadius(endDeg);
                // 之所以乘以2是解决Retina屏下发虚的问题
                self.drawRing(2 * self.ringR, startRadius, endRadius, self.color[i], 2 * self.lineWidth);

                startDeg = endDeg; // 下一个占比
            }

        },

        drawRing: function (ringR, startRadius, endRadius, color, lineWidth) {
            var self = this;
            // drawing pichart
            self.ctx.beginPath();
            self.ctx.strokeStyle = color;
            self.ctx.arc(self.ringW / 2, self.ringH / 2, ringR, startRadius, endRadius, false);
            self.ctx.lineWidth = lineWidth;
            self.ctx.stroke();
            self.ctx.closePath();
        },

        getRadius: function (deg) {
            return deg / 180 * Math.PI;
        },

        getTotal: function () {
            var self = this;
            var total = 0;
            var length = self.data.ring.length;
            for (var i = 0; i < length; i++) {
                total += self.data.ring[i].asset;
            }
            return total;
        }
    };

    module.exports = DrawCharts;
});