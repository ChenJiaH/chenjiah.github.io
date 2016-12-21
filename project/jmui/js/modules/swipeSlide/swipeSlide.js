/**
 * swipeSlide
 * http://ons.me/500.html
 */
/*
 用法：
 $viewPort -- 视口
 var sliderObj = $viewPort.swipeSlide({
 container: $tabContainer,           // 滚动的容器 -- 必选项！！！
 speed : 2000,                              // 滚动的时间间隔，默认4000ms
 dots : $dots,                                // 和滚动项目对应的点 dot
 dotActiveClass: "active",            // 点激活状态的class
 autoScroll : false,                        // 是否自动滚，默认true
 continuousScroll: true,               // 是否连续滚动，默认false
 dir: "y",                                         // 运动的方向，默认x-水平滚动，y-竖直滚动
 transitionType: "ease",                // 运动方式，默认cubic-bezier(0.22, 0.69, 0.72, 0.88)
 callback: fn                                   // 每项滚动完后的回调函数
 });

 sliderObj.goTo(index);                 // 跳转到哪一页，这个用于外部切换事件，比如dots的点击、hover中，随意切换；index--页数的下标

 html结构：
 <div class="viewport">
 <div class="container">
 <div class="item"></div>
 <div class="item"></div>
 <div class="item"></div>
 </div>
 <ol class="dot-box">
 <li></li>
 <li></li>
 <li></li>
 </ol>
 </div>
 <!--
 viewport  可见区
 container 滚动的容器，其可见的直接子元素是每个轮播的项目，所以dot-box不要放在这里边；
 item          轮播的项目，布局的时候尽量不要用定位，用float来处理；
 dot-box   不一定要放在viewport里边；
 -->
 * */
define(function(require, exports, module) {
    (function (win, $) {
        'use strict';
        // 触摸事件
        var events = ['touchstart', 'touchmove', 'touchend'];
        // 检测
        var support = {
            // 触摸
            touch: (win.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in win) || win.DocumentTouch && document instanceof DocumentTouch);
            })()
        };
        // 触摸赋值
        var touchEvents = {
            touchStart: events[0],
            touchMove: events[1],
            touchEnd: events[2]
        };
        // 绑定swipeSlide
        $.fn.swipeSlide = function (options) {
            var s = "swipeslide";
            if ($(this).length > 1) console.log("暂不支持多个轮播效果一块儿绑定");
            if ($(this).data(s)) console.log("已经初始化过了");
            //$(this).data(s, true);
            return new sS(this, options);
        };
        var sS = function (element, options) {
            var me = this;
            me.$viewPort = $(element);
            me._index = 0;
            me._distance = 50;
            me.allowSlideClick = true;
            me._time = .3;
            me.mapping = [2, 0, 1, 2, 0];
            me.init(options);
        };
        // 初始化
        sS.prototype.init = function (options) {
            var me = this;
            me.opts = $.extend({}, {
                continuousScroll: false,               // 连续滚动
                autoScroll: true,                       // 自动切换
                speed: 4000,                           // 切换速度
                dir: "x",                           // 水平还是垂直滚动，默认水平，X轴
                transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',                // 过渡类型
                callback: function () {
                },                 // 回调方法
                moving: function () {
                },
                touchend: function () {
                }
            }, options);
            var $container = me.opts.container;
            if (!$container || $container.length == 0) {
                console.error("请传入滚动的容器");
                return false;
            }
            var $li = $container.children(":visible");
            me.opts.li = $li;
            // 轮播数量
            me._liLength = me.opts.li.length;
            // 如果轮播小于等于1个，跳出
            if (me._liLength <= 1) {
                console.error("滚动项目的个数是" + me._liLength + "个，不需要调用该插件；滚动容器是:", $container);
                return false;
            }
            // 连续滚动，复制dom
            if (me.opts.continuousScroll) {
                $container.prepend(me.opts.li.last().clone()).append(me.opts.li.first().clone());
            }
            // 轮播的宽度
            fnGetSlideDistance($li);
            // 调用轮播
            fnAutoSlide(me);
            // 绑定触摸
            me.$viewPort.off(touchEvents.touchStart).on(touchEvents.touchStart, function (e) {
                me.isMove = false;
                fnTouches(e);
                fnTouchstart(e, me);
            });
            me.$viewPort.off(touchEvents.touchMove).on(touchEvents.touchMove, function (e) {
                me.isMove = true;
                fnTouches(e);
                fnTouchmove(e, me);
            });
            me.$viewPort.off(touchEvents.touchEnd).on(touchEvents.touchEnd, function () {
                if (!me.isMove) return;
                fnTouchend(me);
            });
            var endName = "webkitTransitionEnd MSTransitionEnd transitionend";
            $container.off(endName).on(endName, function () {
                fnAutoSlide(me);
                // 回调
                me.opts.callback && me.opts.callback(me._index, me._liLength);
            });
            // 横竖屏、窗口调整
            var resizeEvent = 'onorientationchange' in win ? 'orientationchange' : 'resize';
            $(win).off(resizeEvent).on(resizeEvent, function () {
                clearTimeout(me.timer);
                me.timer = setTimeout(fnGetSlideDistance, 150);
            });
            // 获取轮播宽度
            function fnGetSlideDistance($li) {
                var width = me.$viewPort.width();
                var len = $li.length;
                $container.width(width * len);
                //$container.width(len + "00%");
                //var w = $container.width();
                //var c = roundWidth(w, len);
                //c && $container.width(c);
                me._slideDistance = isHorizontal(me) ? width : me.opts.li.height();
                if (me.opts.continuousScroll)    me._index = 1;
                // 定位
                fnTransition(me, $container, 0);
                fnTranslate(me, $container, -me._slideDistance * me._index);
            }

            // 调整容器的width，使每个子元素的宽度不带小数
            function roundWidth(w, len) {
                var a = parseInt(w % len);
                if (a != 0) {
                    w += len - a;
                    return w;
                }
                return false;
            }
        };
        // 指定轮播
        sS.prototype.goTo = function (i) {
            var me = this;
            i = parseInt(i);
            if (me.opts.continuousScroll)   i += 1;
            fnSlide(me, i, me._time);
        };
        function isHorizontal(me) {
            return me.opts.dir == "x";
        }

        // css过渡
        function fnTransition(me, dom, num) {
            me.opts.touchend && me.opts.touchend(num, me);
            dom.css({
                '-webkit-transition': 'all ' + num + 's ' + me.opts.transitionType,
                'transition': 'all ' + num + 's ' + me.opts.transitionType
            });
        }

        // css位移
        function fnTranslate(me, dom, distance) {
            me.opts.moving && me.opts.moving(distance, me);
            var result = isHorizontal(me) ? distance + 'px,0,0' : '0,' + distance + 'px,0';
            dom.css({
                '-webkit-transform': 'translate3d(' + result + ')',
                'transform': 'translate3d(' + result + ')'
            });
        }

        // touches
        function fnTouches(e) {
            if (support.touch && !e.touches) {
                e.touches = e.originalEvent.touches;
            }
        }

        // touchstart
        function fnTouchstart(e, me) {
            me.isScrolling = undefined;
            // 按下时的坐标
            me._startX = support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
            me._startY = support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
        }

        // touchmove
        function fnTouchmove(e, me) {
            var $container = me.opts.container;
            me._moveDistance = me._moveDistanceIE = 0;
            // 如果自动切换，move的时候清除autoSlide自动轮播方法
            if (me.opts.autoScroll) fnStopSlide(me);
            me.allowSlideClick = false;
            // 触摸时的坐标
            me._curX = support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
            me._curY = support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
            // 触摸时的距离
            me._moveX = me._curX - me._startX;
            me._moveY = me._curY - me._startY;
            // 优化触摸禁止事件
            if (typeof me.isScrolling == 'undefined') {
                if (isHorizontal(me)) {
                    me.isScrolling = !!(Math.abs(me._moveX) >= Math.abs(me._moveY));
                } else {
                    me.isScrolling = !!(Math.abs(me._moveY) >= Math.abs(me._moveX));
                }
            }
            // 距离
            if (me.isScrolling) {
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                // 触摸时跟手
                fnTransition(me, $container, 0);
                me._moveDistance = me._moveDistanceIE = isHorizontal(me) ? me._moveX : me._moveY;
            }
            if (!me.opts.continuousScroll) {
                // 如果是第一屏，并且往下滚动，就不让滚动 || 如果是最后一屏，并且往上滚动，就不让滚动
                if (me._index == 0 && me._moveDistance > 0 || (me._index + 1) >= me._liLength && me._moveDistance < 0) {
                    me._moveDistance = 0;
                }
            }
            // 触摸时跟手滚动
            fnTranslate(me, $container, -(me._slideDistance * me._index - me._moveDistance));
        }

        // touchend
        function fnTouchend(me) {
            // 优化触摸禁止事件
            if (!me.isScrolling) {
                fnAutoSlide(me);
            }
            // 距离小
            if (Math.abs(me._moveDistance) <= me._distance) {
                fnSlide(me, '', me._time);
                // 距离大
            } else {
                // 手指触摸上一屏滚动
                if (me._moveDistance > me._distance) {
                    fnSlide(me, 'prev', me._time);
                    // 手指触摸下一屏滚动
                } else {
                    fnSlide(me, 'next', me._time);
                }
            }
        }

        // 自动轮播
        function fnAutoSlide(me) {
            if (me.opts.autoScroll) {
                fnStopSlide(me);
                me.autoSlide = setInterval(function () {
                    fnSlide(me, 'next', me._time);
                }, me.opts.speed);
            }
        }

        // 停止轮播
        function fnStopSlide(me) {
            clearInterval(me.autoSlide);
        }

        // 轮播方向判断
        function fnSlide(me, go, num) {
            // 判断方向
            if (typeof go === 'number') {
                me._index = go;
            } else if (go == 'next') {
                me._index++;
            } else if (go == 'prev') {
                me._index--;
            }
            // 如果是连续滚动
            if (me.opts.continuousScroll) {
                if (me._index > me._liLength) {
                    fnScroll(me, num);
                    me._index = 1;
                    setTimeout(function () {
                        fnScroll(me, 0);
                    }, me._time * 1000);
                } else if (me._index <= 0) {
                    fnScroll(me, num);
                    me._index = me._liLength;
                    setTimeout(function () {
                        fnScroll(me, 0);
                    }, me._time * 1000);
                } else {
                    fnScroll(me, num);
                }
            } else {
                if (me._index >= me._liLength) {
                    me._index = 0;
                } else if (me._index < 0) {
                    me._index = me._liLength - 1;
                }
                fnScroll(me, num);
            }
        }

        // 轮播动作
        function fnScroll(me, num) {
            var $container = me.opts.container;
            fnTransition(me, $container, num);
            fnTranslate(me, $container, -me._index * me._slideDistance);
            changeDot(me, num);
        }

        // 改变圆点的状态
        function changeDot(me) {
            var $dots = me.opts.dots;
            var a = me.opts.dotActiveClass;
            var index = me._index;
            if (me.opts.continuousScroll) index = me.mapping[me._index];
            if ($dots && $dots.length > index)   $dots.eq(index).addClass(a).siblings().removeClass(a);
        }
    })(window, window.Zepto || window.jQuery);
});