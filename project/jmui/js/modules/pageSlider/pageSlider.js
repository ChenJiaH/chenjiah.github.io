/**
 * @Author: Created By McChen
 * @Date: 2016/2/19
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */


define(function (require, exports, module) {
    function PageSlider(settings) {
        this.page = settings.page || $(".page");    // 页面容器对象 {Object}
        this.beginIndex = settings.beginIndex || 0; // 开始页面下标，从0开始 {Int}
        this.activeClass = settings.activeClass || "page-active"; // 当前页面class标识 {String}
        this.type = settings.type || "ease-out";    // 动画速度曲线
        this.scaleEffect = settings.scaleEffect || false;   // 拉伸效果开关 {Boolean}


        this.init(this.beginIndex);
    }

    PageSlider.prototype = {
        init: function (index) {
            var self = this;
            self.currentIndex = index || 0;
            self.pageLength = self.page.length;     // 展示页面数
            self.currentPage = self.page.eq(self.currentIndex);
            self.currentPage.addClass(self.activeClass);
            self.targetIndex = 0;
            self.targetPage = "";

            self.bindEvent();
        },

        // 绑定基本的滑动事件
        bindEvent: function () {
            var self = this;
            var touchStart = false;     // 触摸锁
            var startY = 0;
            var endY = 0;
            var disY = 0;
            var moveCent = 0;
            var winH = $(window).height();
            var isMoving = false;       // 移动锁
            var scrollType = "";

            var currentEffect = "";
            var targetEffect = "";
            var moveTime = 0;

            self.page.on("touchstart", function (e) {
                touchStart = true;
                if (!isMoving) {
                    winH = $(window).height();
                    startY = e.changedTouches[0].clientY;
                    moveTime = new Date() * 1;
                }
            });

            var scrollIndex = 3;
            $(document).on("touchmove", function (e) {
                e.preventDefault();
                // 防止频繁触发
                if (scrollIndex >= 3) {
                    if (isMoving || !touchStart) return true;
                    endY = e.changedTouches[0].clientY;
                    disY = endY - startY;
                    moveCent = (disY / winH);
                    if (disY < 0) { //下一页
                        self.targetIndex = Math.min(self.currentIndex + 1, self.pageLength - 1);
                        scrollType = "next";
                    } else { //上一页
                        self.targetIndex = Math.max(self.currentIndex - 1, 0);
                        scrollType = "prev";
                    }
                    if (self.targetIndex != self.currentIndex) {   //可以滚动
                        self.targetPage = self.page.eq(self.targetIndex);

                        scrollType == "next" ? nextPageMove() : prevPageMove();
                    }
                    scrollIndex = 0;
                }
                scrollIndex++;
            });

            function nextPageMove() {
                // 是否开启拉伸效果
                if (self.scaleEffect) {
                    currentEffect = 'scale(' + (1 + moveCent / 10) + ') translateY(0)';
                } else {
                    currentEffect = 'translateY(0)';
                }
                targetEffect = 'translateY(' + (winH + winH * moveCent / 2) + 'px)';
                self.animate(self.currentPage, currentEffect, 0, self.type);
                self.animate(self.targetPage, targetEffect, 0, self.type);
            }

            function prevPageMove() {
                currentEffect = 'translateY(' + ( winH * moveCent / 2) + 'px)';
                if (self.scaleEffect) {
                    targetEffect = 'scale(' + (0.9 + moveCent / 10) + ') translateY(0)';
                } else {
                    targetEffect = 'translateY(0)';
                }
                self.animate(self.currentPage, currentEffect, 0, self.type);
                self.animate(self.targetPage, targetEffect, 0, self.type);
            }

            $(document).on("touchend", function (e) {
                touchStart = false;
                moveTime = new Date() * 1 - moveTime;
                var back = false;
                if ((self.targetIndex == self.currentIndex) || isMoving) {
                    return true;
                }
                if (moveTime < 500 || Math.abs(disY) > 100) {  //翻页
                    switch (scrollType) {
                        case "next":
                            if (self.scaleEffect) {
                                currentEffect = 'scale(0.9) translateY(0)';
                            }
                            else {
                                currentEffect = 'scale(1) translateY(0)';
                            }
                            targetEffect = 'translateY(0)';
                            break;
                        case "prev":
                            currentEffect = 'translateY(' + winH + 'px)';
                            targetEffect = 'scale(1) translateY(0)';
                            break;
                    }
                } else { //回到当前页
                    back = true;
                    switch (scrollType) {
                        case "next":
                            currentEffect = 'scale(1) translateY(0)';
                            targetEffect = 'translateY(' + winH + 'px)';
                            break;
                        case "prev":
                            currentEffect = 'translateY(0)';
                            targetEffect = 'scale(1) translateY(0)';
                            break;
                    }
                }

                self.animate(self.currentPage, currentEffect, 0.3,self.type);
                self.animate(self.targetPage, targetEffect, 0.3,self.type);

                isMoving = true;
                self.currentPage.one("webkitTransitionEnd", function () {
                    isMoving = false;
                    if (!back) {
                        self.currentIndex = self.targetIndex;
                        self.currentPage.removeClass(self.activeClass);
                        self.targetPage.addClass(self.activeClass);
                        self.currentPage = self.targetPage;
                    } else {
                        self.targetPage.removeClass(self.activeClass);
                    }
                });
            });
            return this;
        },

        // 动画兼容处理
        animate: function (obj, target, time, type) {
            var self = this;
            obj.css({
                "transition": time + "s",
                "-webkit-transition": time + "s",
                "transform": target,
                "-webkit-transform": target,
                "transition-timing-function": type,
                "-webkit-transition-timing-function": type
            });
            return obj;
        },

        /** 功能拓展 **/
        // 滑动到指定页
        slideTo: function (idx){
            var self =this;
            if(idx == self.currentIndex) {
                console.info("已在此页，无须滑动");
            } else {
                self.animate(self.page.eq(idx),'translateY(0)',self.currentIndex);
                self.page.eq(idx).addClass(self.activeClass).siblings().removeClass(self.activeClass);
                self.init(idx);
            }

        }
    };

    module.exports = PageSlider;
});