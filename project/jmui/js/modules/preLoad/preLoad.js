/**
 * @ Author: Created By McChen
 *
 * @ Date: 2015/10/21
 *
 * @ Mail: chenjiahao@jd.com
 *
 * @ Version: V1.0.0
 *
 */
define(function (require, exports, module) {

    function PreLoad(settings) {
        this.tasks = settings.tasks;      //存放预加载资源的数组
        this.count = 0;                  //开始加载的资源数
        this.total = settings.tasks.length;        //需要加载的资源总数
        this.finishedFn = settings.finishedFn;   //完成后执行函数
        this.prefix = settings.prefix || "";  //前缀

        this.init();
    }

    PreLoad.prototype = {
        init: function () {
            var self = this;
            self.tasks.forEach(function (type) {
                var inputType = type.replace(/[#\?].*$/, '').substr(type.lastIndexOf(".") + 1).toLowerCase(), outputType = self.prefix + type;
                switch (inputType) {
                    case"js":
                        self.script.call(self, outputType);
                        break;
                    case"css":
                        self.stylesheet.call(self, outputType);
                        break;
                    case"svg":
                    case"jpg":
                    case"gif":
                    case"png":
                    case"jpeg":
                        self.image.call(self, outputType)
                }
            });
        },
        getProgress: function () {
            return Math.round(this.count / this.total * 100)
        },
        image: function (url) {
            var img = document.createElement("img");
            this.load(img, url);
            img.src = url;
        },
        stylesheet: function (url) {
            var _link = document.createElement("link");
            this.load(_link, url);
            _link.rel = "stylesheet";
            _link.type = "text/css";
            _link.href = url;
            document.head.appendChild(_link)
        },
        script: function (src) {
            var _script = document.createElement("script");
            this.load(_script, src), _script.type = "text/javascript", _script.src = src, document.head.appendChild(_script)
        },
        load: function (sources, val) {
            var self = this;
            sources.onload = sources.onerror = sources.onabort = function (sources) {
                self.onload && self.onload({count: ++self.count, total: self.total, item: val, type: sources.type})
            }
        },
        onload: function (load) {
            var self = this;
            var $progress = document.getElementById('jm-progress');
            var count = load.count;
            var total = load.total;
            $progress && ($progress.innerHTML = Math.round(100 * count / total) + '%');
            if (count === total) return complete();

            function next(ele, fn) {
                ele.className += ' jm-scaleOut';
                setTimeout(function () {
                    ele.parentNode.removeChild(ele);
                    fn && fn(total)
                }, 800)
            }

            function complete() {
                var $loader = document.getElementById('jm-loader');
                var urlList = [];
                var files = document.getElementsByName("script");
                for (var i = 0; i < files.length; i++) {
                    urlList.push(files[i].src);
                }
                next($loader, self.finishedFn)
            }
        }
    };

    module.exports = PreLoad;
});
