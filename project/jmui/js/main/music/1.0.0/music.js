/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var Music = require("Music");

    var musicPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            //实例化音乐
            var music = new Music({
                autoplay : true,
                loop : true,
                muted: false,
                src : 'http://static.360buyimg.com/finance/mobile/activity/2015/crowdReBuy/song/song.mp3'
            });
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        musicPage.init();
    });

    module.exports = musicPage;
});
