/**
 * @Author: Created By McChen
 * @Date: 2015/12/7
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */
define(function (require, exports, module) {

function FunnyBackground(settings){
    this.canvas = settings.canvas;      // 画布的容器 --- canvas标签，不是jQuery对象!!
    this.usedIn = settings.usedIn || "mobile";      //应用场景，默认参数为"mobile"，可选参数为 "pc"

    this.init();
}

FunnyBackground.prototype = {
    init: function () {
        var self= this;
        var mouseInitMes = {x: null, y: null, max: 20000};  // 鼠标初始化信息
        var surroundings = self.canvas.getContext("2d");    // 画布2D渲染绘制的环境
        var fluency = self.fluency();
        var ArrLines = [];
        self.canvas.getContext("2d");
        self.mouseInit(mouseInitMes);
        self.resizeScreen();
        self.numberByUsed(ArrLines);

        setTimeout(function () {
            self.paint(fluency,surroundings,ArrLines,mouseInitMes);
        }, 100)
    },

    // 鼠标信息初始化
    mouseInit: function (mouseInitMes) {
        window.onmousemove = function (event) {
            event = event || window.event;
            mouseInitMes.x = event.clientX;
            mouseInitMes.y = event.clientY;
        };
        window.onmouseout = function (event) {
            mouseInitMes.x = null;
            mouseInitMes.y = null
        };
    },

    // 重绘边界
    resizeScreen: function () {
        var self = this;
        resize();
        window.onresize = resize;

        function resize(){
            self.canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            self.canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }
    },

    // 绘制图形并持续setTimeout加载
    paint: function (fluency,surroundings,ArrLines,mouseInitMes) {
        var self = this;
        surroundings.clearRect(0, 0,self.canvas.width, self.canvas.height);    //清空矩形区域的给定像素
        var totalArr = [mouseInitMes].concat(ArrLines);    //
        ArrLines.forEach(function (lines) {
            lines.x += lines.xa;
            lines.y += lines.ya;
            lines.xa *= lines.x > self.canvas.width || lines.x < 0 ? -1 : 1;
            lines.ya *= lines.y > self.canvas.height || lines.y < 0 ? -1 : 1;
            surroundings.fillRect(lines.x - 0.5, lines.y - 0.5, 1, 1);
            for (var A = 0; A < totalArr.length; A++) {
                var i = totalArr[A];
                if (lines !== i && null !== i.x && null !== i.y) {
                    var z, disX = lines.x - i.x;
                    var disY = lines.y - i.y;
                    var dis = disX * disX + disY * disY;
                    dis < i.max && (i === mouseInitMes && dis >= i.max / 2 && (lines.x -= 0.03 * disX, lines.y -= 0.03 * disY), z = (i.max - dis) / i.max, surroundings.beginPath(), surroundings.lineWidth = z / 2, surroundings.strokeStyle = "rgba(0,0,0," + (z + 0.2) + ")", surroundings.moveTo(lines.x, lines.y), surroundings.lineTo(i.x, i.y), surroundings.stroke())
                }
            }
            totalArr.splice(totalArr.indexOf(lines), 1)
        });

        fluency(function(){
            self.paint(fluency,surroundings,ArrLines,mouseInitMes)
        })
    },

    // 流畅运行动画
    fluency: function(){
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60)      // 浏览器接受的最低帧为1000/60 ms
            }
    },

    // 根据应用场景决定展示数量
    numberByUsed: function(ArrLines){
        var num, self = this;
        if( self.usedIn == "pc"){
            num = 150;      // pc显示数量设为150
        } else {
            num = 30;       // mobile显示数量设为30
        }
        for (var s = 0; s < num; s++) {    //ArrLines为存放全部数据的数组
            // x表示x坐标 y表示y坐标 xa表示x方向移动距离 ya表示y方向移动距离 max表示最大
            var x = Math.random() * self.canvas.width, v = Math.random() * self.canvas.height, b = 2 * Math.random() - 1, k = 2 * Math.random() - 1;
            ArrLines.push({x: x, y: v, xa: b, ya: k, max: 6000})
        }
    }

};

    module.exports = FunnyBackground;
});

