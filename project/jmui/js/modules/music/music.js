/**
 * @ Author: Modified By McChen
 *
 * @ Date: 2015/12/01
 *
 * @ Mail: chenjiahao@jd.com
 *
 * @ Version: V1.0.0
 *
 */
define(function (require, exports, module) {

    function Music(settings) {
        this.controls = settings.controls || false;  // 是否显示原生控制框
        this.autoplay = settings.autoplay || true;  // 自动播放属性
        this.loop = settings.loop || true;  //循环属性
        this.muted = settings.muted || false;  // 规定视频输出时应该静音
        this.src = settings.src || "";  // 音乐路径

        var curMusic = this.init();
        this.curMusic = curMusic;
    }

    Music.prototype = {
        init: function () {
            var self = this;
            var music = document.createElement("audio");
            if (self.controls) {
                music.controls = "controls";
            }
            if (self.autoplay) {
                music.autoplay = "autoplay";
            }
            if (self.loop) {
                music.loop = "loop";
            }
            if (self.muted) {
                music.muted = "muted";
            }
            music.src = self.src;
            document.body.appendChild(music);
            self.bindEvent(music);
            return music;
        },

        bindEvent: function (music) {
            var self = this;
            document.addEventListener("touchstart", musicStart);

            function musicStart() {
                music.play();
                document.removeEventListener('touchstart', musicStart);
            }

            var soundPause;
            var $soundBtn = $("#jm-music");
            if (!!music.autoplay) {
                soundPause = false;
            } else {
                soundPause = true;
                $soundBtn.addClass("jm-music-pause");
            }
            $soundBtn.on("touchend", function () {
                if (!soundPause) {
                    music.pause();
                    $soundBtn.addClass("jm-music-pause");
                } else {
                    music.play();
                    $soundBtn.removeClass("jm-music-pause");
                }
                soundPause = !soundPause;
            })
        },

        // 获取当前音频播放到的timeRanges
        getCurrentTime: function () {
            var self = this;
            return self.curMusic.currentTime;
        },

        // 获取音频播的长度
        getMusicLength: function () {
            var self = this;
            return self.curMusic.duration;
        },

        // 音量控制
        volumeControl: function (type) {
            var self = this;
            if (type == "up") {
                var volume = self.curMusic.volume + 0.1;
                if (volume >= 1) {
                    volume = 1;
                }
                self.curMusic.volume = volume;
            } else if (type == 'down') {
                var volume = self.curMusic.volume - 0.1;
                if (volume <= 0) {
                    volume = 0;
                }
                self.curMusic.volume = volume;
            }
        }

    };

    module.exports = Music;
})
;