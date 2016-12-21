/**
 * @ Author: Created By McChen
 *
 * @ Date: 2015/12/01
 *
 * @ Mail: chenjiahao@jd.com
 *
 * @ Version: V1.0.0
 *
 */
define(function (require, exports, module) {

    function AnalogKeyboard(settings) {
        this.$board = settings.$board || $(".jm-analogKeyboard");              //模拟键盘
        this.$key = settings.$key || this.$board.find("li[data-key]");              //模拟按键
        this.$input = settings.$input || $(".jm-analogKeyboard-input");              //模拟input
        this.maxLength = settings.maxLength || 20;
        this.completeFn = settings.completeFn;            //点击完成的回调
        this.codeType = settings.codeType || "hidden";  //输入结果显示形式（默认为密文）

        this.init().bindEvent();
    }

    AnalogKeyboard.prototype = {
        init: function () {
            var self = this;
            self.resultAry = []; //记录输入结果
            self.LOCK = false;
            self.$input.html("");

            return this;
        },

        bindEvent: function () {
            var self = this;
            $("body").on("click", ".uppercase", function () {
                self.$board.removeClass("abc").addClass("ABC");
            }).on("click", ".lowercase", function () {
                self.$board.removeClass("ABC").addClass("abc");
            }).on("click", ".changeNumber", function () {
                self.$board.removeClass("ABC").removeClass("abc").addClass("number");
            }).on("click", ".changeLetter", function () {
                self.$board.removeClass("number").removeClass("NUMBER").addClass("abc");
            }).on("click", ".changeNumberLetter", function () {
                self.$board.removeClass("NUMBER").addClass("number");
            }).on("click", ".changeNumberLetter2", function () {
                self.$board.removeClass("number").addClass("NUMBER");
            }).on("click", ".complete", function () {
                self.LOCK = true;
                // 执行完成操作
                self.completeFn && self.completeFn(self.resultAry.join(""));
                self.LOCK = false
            });

            self.$key.on("touchend", function (e) {
                e.preventDefault();
                if (self.LOCK) {
                    return false;
                } else {
                    var keyType = $(this).attr("data-key");
                    self.dealKeyDown(keyType);
                    self.lockKeyboard();
                }
            });
        },

        dealKeyDown: function (keyType) {
            var self = this;
            if (keyType == "del") {
                self.resultAry.pop();
            } else if (keyType) {
                self.resultAry.push(keyType);
            }
            self.showResultInInput();
        },

        showResultInInput: function () {
            var self = this;
            self.$input.html("");
            console.log(self.resultAry.length);
            for (var i = 0; i < self.resultAry.length; i++) {
                if (self.codeType == "hidden") {
                    self.$input.append('<span class="jm-analogKeyboard-point"></span>')
                } else {
                    self.$input.append('<span>' + self.resultAry[i] + '</span>');
                }
            }
        },

        lockKeyboard: function () {
            var self = this;
            if (self.$input.find("span").length >= self.maxLength) {
                self.LOCK = true;
            }
        }


    };

    module.exports = AnalogKeyboard;
});