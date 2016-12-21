/**
 * @Author: Created By McChen
 * @Date: 2015/12/18
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {

/*倒计时插件 */
function CountDown(settings) {
    this.$day = settings.$day;
    this.$hour = settings.$hour;
    this.$min = settings.$min;
    this.$second = settings.$second || null;
    this.totalSecond = settings.totalSecond;
    this.timeCent = settings.timeCent || 1;
    this.endFn = settings.endFn || null;
    this.init();
}

CountDown.prototype = {
    init: function () {
        this.refreshLag = this.$second ? 1000 : 60000;
        this.totalSecond = this.totalSecond / this.timeCent;
        if (this.totalSecond == 0 && this.endFn) {
            this.endFn()
        }
        this.getFormatTime(this.totalSecond).refreshTime().upDataTime()
    },
    getFormatTime: function (totalSecond) {
        this.timeInfo = {
            day: totalSecond / 86400 | 0,
            hour: (totalSecond % 86400) / 3600 | 0,
            minutes: (totalSecond % 3600) / 60 | 0,
            second: totalSecond % 60
        }

        return this;
    },
    upDataTime: function () {
        var self = this;
        self.timer = setInterval(function () {
            self.totalSecond -= (self.refreshLag / 1000);
            self.getFormatTime(self.totalSecond);
            self.refreshTime();
            if (self.totalSecond <= 0) {
                clearInterval(self.timer);
                self.endFn && self.endFn()
            }
        }, this.refreshLag);
        return this;
    },
    refreshTime: function () {
        this.$day && this.$day.html(("0" + this.timeInfo.day).slice(-2));
        this.$hour && this.$hour.html(("0" + this.timeInfo.hour).slice(-2));
        this.$min && this.$min.html(("0" + this.timeInfo.minutes).slice(-2));
        this.$second && this.$second.html(("0" + Math.max(0, this.timeInfo.second)).slice(-2));
        return this;
    }

};

    module.exports = CountDown;
});