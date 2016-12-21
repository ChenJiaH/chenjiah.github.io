/**
 * @Author: Created By McChen
 * @Date: 2015/12/18
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.1
 * @用法：
 * new CheckBox({
 *    obj:$("zepto对象"),
 *    checkedClass:"选中的样式class",
 *    initChecked:"初始是否选中",
 *    checkcb:function(){选中后回调},
 *    uncheckcb:function(){取消选中后回调}
 * })
 */


define(function (require, exports, module) {
    /*checkbox模拟插件*/
    function CheckBox(settings) {
        this.obj = settings.obj;
        this.checkedClass = settings.checkedClass;
        this.initChecked = settings.initChecked || false;
        this.checkcb = settings.checkcb;
        this.uncheckcb = settings.uncheckcb;
        this.init();
    }

    CheckBox.prototype = {
        init: function () {
            if (this.initChecked) {
                this.obj.addClass(this.checkedClass);
                this.obj.attr("data-checked", "checked");
            } else {
                this.obj.attr("data-checked", "false");
            }
            this.bindEvent();
        },
        bindEvent: function () {
            var self = this;
            this.obj.on("click", function () {
                if ($(this).hasClass(self.checkedClass)) {
                    $(this).removeClass(self.checkedClass);
                    $(this).attr("data-checked", "false");
                    typeof(self.uncheckcb) == "function" && self.uncheckcb();
                } else {
                    $(this).addClass(self.checkedClass);
                    self.obj.attr("data-checked", "checked");
                    typeof(self.checkcb) == "function" && self.checkcb();
                }
            })
        }
    };

    module.exports = CheckBox;
});