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

function NumKeyboard(settings) {
    this.$board = settings.$board;              //模拟键盘
    this.$targetInput = settings.$targetInput; //模拟的input
    this.ajaxUrl = settings.ajaxUrl || null;
    this.checkFn = settings.checkFn;
    this.codeType = settings.codeType || "hidden";  //输入结果显示形式（默认为密文）

    this.init().bindEvent();
}

NumKeyboard.prototype = {
    init: function () {
        this.resultAry = []; //记录输入结果
        this.inputLockTimer = null;  //输入满后校验中锁死键盘计时器
        this.LOCK_TIME = 1000;    //锁死的时间
        this.resultChecking = false; //录入结果是否在处理中
        this.keyLength = this.$targetInput.length; //输入位数
        this.reset();
        return this;
    },

    reset: function () {
        this.resultAry = [];  //清空已记录结果
        this.resultChecking = false;   //清空检测锁
        clearTimeout(this.inputLockTimer)
        this.$targetInput.each(function () {     //清空模拟input的值
            $(this).html("");
        });

    },

    bindEvent: function () {
        var self = this;
        this.$board.on("touchend", function (e) {
            e.preventDefault();
            var keyType = $(this).attr("data-key");
            if (!self.resultChecking) {
                self.dealKeyDown(keyType);
            }
        });
    },
    dealKeyDown: function (keyType) {
        if (keyType == "del") {
            this.resultAry.pop();
        } else if (keyType) {
            this.resultAry.push(keyType);
        }
        this.showResultInTargetInput();
    },
    showResultInTargetInput: function () {
        this.$targetInput.html("")
        for (var i = 0; i < this.resultAry.length; i++) {
            if (this.codeType == "hidden") {
                this.$targetInput.eq(i).html('<div class="jm-point"></div>')
            } else {
                this.$targetInput.eq(i).html(this.resultAry[i]);
            }
        }
        if (this.resultAry.length == this.keyLength) {
            this.checkResult();
        }
    },
    checkResult: function () {
        var self = this;
        this.resultChecking = true;
        this.inputLockTimer = setTimeout(function () { //连续输入锁
            self.resultChecking = false;
        }, this.LOCK_TIME);
        this.checkFn && this.checkFn(this.resultAry.join(""),nextFn);

        function nextFn(flag) {
            if(flag){
                console.log("密码正确执行下一步操作");
            } else {
                setTimeout(function(){self.reset()},1000)
            }
        }
    },
    getAjaxData: function(url, data, callback, failFn) {
        $.ajax({
            url: url,
            data: data,
            type: "get",
            dataType: "json",
            success: function (data) {
                callback && callback(data);
            },
            error:function() {
                failFn && failFn();
            }
        });
    }
};

    module.exports = NumKeyboard;
});