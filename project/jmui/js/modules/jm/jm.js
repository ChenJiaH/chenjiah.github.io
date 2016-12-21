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
    /**================================
     私有方法
     ==================================*/
    function pageLockHandler(e) {
        e.preventDefault();
    }

    var jm = {

        /**================================
         版本信息
         ==================================*/
        vision: "1.0.0",
        timestamp: 20160121,

        /**================================
         jm.方法名 工具函数
         ==================================*/

        /** 图片懒加载
         * @return {boolean} 表示是否已经完全加载完img
         */
        lazyLoad: function () {
            var images = $("img[data-src]");
            var finish = false;
            // 加载在可视取中的图片
            $(images).each(function (index) {
                if (isElementInViewport(this)) {
                    $(this).attr("src", $(this).attr("data-src"));
                    $(this).removeAttr("data-src")
                }
            });
            // 当图片加载完时，停止监听
            if (images.length == 0) {
                finish = true;
            }
            return finish;

            function isElementInViewport(el) {
                var rect = el.getBoundingClientRect();
                return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.top <= $(window).height() &&
                rect.left <= $(window).width()
                );
            }
        },

        /** 对于现代浏览器使用requestAnimationFrame代替setTimeOut */
        requestAnimationFrame: function () {
            //return window.requestAnimationFrame       ||
            //        window.webkitRequestAnimationFrame ||
            //        window.mozRequestAnimationFrame    ||
            //        function( callback ){
            //            window.setTimeout(callback, 1000 / 60);
            //        };

            var lastTime = 0;
            var vendors = ['webkit', 'moz'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
            }
        },

        /** ===========缓动================
         * t: current time（当前时间）
         * b: beginning value（初始值）
         * c: change in value（变化量）
         * d: duration（持续时间）
         * you can visit 'http://easings.net/zh-cn' to get effect
         =========================*/
        tween: function () {
            var Tween = {
                Linear: function (t, b, c, d) { // 无缓动效果 线性
                    return c * t / d + b;
                },
                Quad: { // 二次方的缓动 t^2
                    easeIn: function (t, b, c, d) {
                        return c * (t /= d) * t + b;
                    },
                    easeOut: function (t, b, c, d) {
                        return -c * (t /= d) * (t - 2) + b;
                    },
                    easeInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                        return -c / 2 * ((--t) * (t - 2) - 1) + b;
                    }
                },
                Cubic: { // 三次方的缓动 t^3
                    easeIn: function (t, b, c, d) {
                        return c * (t /= d) * t * t + b;
                    },
                    easeOut: function (t, b, c, d) {
                        return c * ((t = t / d - 1) * t * t + 1) + b;
                    },
                    easeInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                        return c / 2 * ((t -= 2) * t * t + 2) + b;
                    }
                },
                Quart: { // 四次方的缓动 t^4
                    easeIn: function (t, b, c, d) {
                        return c * (t /= d) * t * t * t + b;
                    },
                    easeOut: function (t, b, c, d) {
                        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                    },
                    easeInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                    }
                },
                Quint: { // 五次方的缓动 t^5
                    easeIn: function (t, b, c, d) {
                        return c * (t /= d) * t * t * t * t + b;
                    },
                    easeOut: function (t, b, c, d) {
                        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                    },
                    easeInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                    }
                },
                Sine: { // 正弦曲线的缓动 sin(t)
                    easeIn: function (t, b, c, d) {
                        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                    },
                    easeOut: function (t, b, c, d) {
                        return c * Math.sin(t / d * (Math.PI / 2)) + b;
                    },
                    easeInOut: function (t, b, c, d) {
                        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                    }
                },
                Expo: { // 指数曲线的缓动 2^t
                    easeIn: function (t, b, c, d) {
                        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
                    },
                    easeOut: function (t, b, c, d) {
                        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                    },
                    easeInOut: function (t, b, c, d) {
                        if (t == 0) return b;
                        if (t == d) return b + c;
                        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                    }
                },
                Circ: { // 圆形曲线的缓动 sqrt(1-t^2)
                    easeIn: function (t, b, c, d) {
                        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
                    },
                    easeOut: function (t, b, c, d) {
                        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
                    },
                    easeInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                    }
                },
                Elastic: { // 指数衰减的缓动
                    easeIn: function (t, b, c, d, a, p) {
                        var s;
                        if (t == 0) return b;
                        if ((t /= d) == 1) return b + c;
                        if (typeof p == "undefined") p = d * .3;
                        if (!a || a < Math.abs(c)) {
                            s = p / 4;
                            a = c;
                        } else {
                            s = p / (2 * Math.PI) * Math.asin(c / a);
                        }
                        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                    },
                    easeOut: function (t, b, c, d, a, p) {
                        var s;
                        if (t == 0) return b;
                        if ((t /= d) == 1) return b + c;
                        if (typeof p == "undefined") p = d * .3;
                        if (!a || a < Math.abs(c)) {
                            a = c;
                            s = p / 4;
                        } else {
                            s = p / (2 * Math.PI) * Math.asin(c / a);
                        }
                        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
                    },
                    easeInOut: function (t, b, c, d, a, p) {
                        var s;
                        if (t == 0) return b;
                        if ((t /= d / 2) == 2) return b + c;
                        if (typeof p == "undefined") p = d * (.3 * 1.5);
                        if (!a || a < Math.abs(c)) {
                            a = c;
                            s = p / 4;
                        } else {
                            s = p / (2 * Math.PI) * Math.asin(c / a);
                        }
                        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
                    }
                },
                Back: { // 超过范围的三次方缓动 (s+1)*t^3-s*t^2
                    easeIn: function (t, b, c, d, s) {
                        if (typeof s == "undefined") s = 1.70158;
                        return c * (t /= d) * t * ((s + 1) * t - s) + b;
                    },
                    easeOut: function (t, b, c, d, s) {
                        if (typeof s == "undefined") s = 1.70158;
                        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                    },
                    easeInOut: function (t, b, c, d, s) {
                        if (typeof s == "undefined") s = 1.70158;
                        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                    }
                },
                Bounce: { // 指数衰减的反弹缓动
                    easeIn: function (t, b, c, d) {
                        return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
                    },
                    easeOut: function (t, b, c, d) {
                        if ((t /= d) < (1 / 2.75)) {
                            return c * (7.5625 * t * t) + b;
                        } else if (t < (2 / 2.75)) {
                            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                        } else if (t < (2.5 / 2.75)) {
                            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                        } else {
                            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                        }
                    },
                    easeInOut: function (t, b, c, d) {
                        if (t < d / 2) {
                            return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                        } else {
                            return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                        }
                    }
                }
            };
            Math.tween = Tween;
        },

        // 锁定页面
        pageLock: function () {
            document.addEventListener("touchmove", pageLockHandler, false)
        },

        // 解锁页面
        pageUnlock: function () {
            document.removeEventListener("touchmove", pageLockHandler, false)
        },

        /** 获取Url参数值
         * jm.getUrlString('')
         * */
        getUrlString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        },

        //添加存储金融banner
        setCookie: function (c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays)
            document.cookie = c_name + "=" + encodeURI(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
        },
        getCookie: function (c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=")
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1
                    c_end = document.cookie.indexOf(";", c_start)
                    if (c_end == -1) c_end = document.cookie.length
                    return decodeURI(document.cookie.substring(c_start, c_end))
                }
            }
            return ""
        },

        /** 获取浏览器UA 判断环境
         * @return {object}
         * {object}.inWx = {boolean}
         */
        getBrowserInfo: function () {
            var ua = navigator.userAgent.toLowerCase();
            var isIos = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1 || false;
            var inWx = ua.indexOf('micromessenger') > -1 || false;
            var inJdApp = ua.indexOf('jdapp') > -1 || false;
            var inJrApp = ua.indexOf('jdjr') > -1 || ua.indexOf('android-async-http') > -1 || false;
            var inWyApp = ua.indexOf('WalletClient') > -1 || false;
            //TODO:金融APP2.2+普及后可以通过原生对象检测到
            var inApp = (this.getUrlString('source') == "app" ? true : false);
            var resultObj = {
                isIos: isIos,
                inWx: inWx,
                inApp: inApp,
                inJdApp: inJdApp,
                inJrApp: inJrApp,
                inWyApp: inWyApp
            }
            console.info(resultObj)
            return resultObj
        },

        addJrBanner: function (imgSrc, id, saveDays) {
            var imgSrc = imgSrc || "http://img30.360buyimg.com/jr_image/jfs/t1486/303/139986702/12691/91dfb4b2/555dd20eN9c5f1724.png";
            var id = id || 70;
            var saveDays = saveDays || 1
            var getClose = $.jm.getCookie("closeAdBanner");
            var browserInfo = $.jm.getBrowserInfo();
            if (!getClose && !browserInfo.inJrApp && !browserInfo.inWyApp) {
                var bannerHtml = '<div class="bannerHolder pr pct100" style="z-index:99999">' +
                    '<div class="pct100 fix-lb ta-c">' +
                    '<div class="pct100 auto pr " style="max-width:600px"><img class="pct100 bannerImg" src="' + imgSrc + '">' +
                    '<div class="closeBtn abs-rt" style="width:40px;height:40px;"></div>' +
                    '</div></div></div>'
                var $banner = $(bannerHtml);
                $("body").append($banner);
                var $bannerImg = $banner.find(".bannerImg");
                $bannerImg[0].onload = function () {
                    var _height = $bannerImg.height();
                    $banner.css("height", _height + "px");
                }
                if (!browserInfo.isIos) {
                    $banner.createAppDownload(id, "jdmobile://share");
                } else {
                    $banner.createAppDownload(id);
                }
                $banner.on("touchend", ".closeBtn", function (e) {
                    e.preventDefault();
                    $banner.hide();
                    $.jm.setCookie("closeAdBanner", "true", saveDays);
                })
            }
        },

        /**日期格式化
         * jm.formatTime(time,'yyyy-MM-dd HH:mm:ss')
         * */
        formatTime: function (time, format) {
            var t = new Date(time);
            var tf = function (i) {
                return ( i < 10 ? '0' : '') + i
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        },

        //创建div
        createDiv: function (className, innerHTML) {
            var oDiv = document.createElement("div");
            oDiv.className = className;
            if (innerHTML) {
                oDiv.innerHTML = innerHTML
            }
            document.body.appendChild(oDiv);
            return oDiv;
        },

        /**固定提示
         *jm.fixTips({text:"固定提示框",pos:"top",autoClose:false})
         * */
        fixTips: function (obj) {
            var text = obj.text;
            var pos = obj.position;
            var maxWidth = obj.maxWidth || "";

            if (obj.autoClose == false) {
                var autoClose = false;
            } else {
                var autoClose = true;
            }

            switch (pos) {
                case "top":
                    var fixTips = $.jm.createDiv("jm-fixTips fix-mt", text);
                    break;
                case "mid":
                    var fixTips = $.jm.createDiv("jm-fixTips fix-mm", text);
                    break;
                default :
                    var fixTips = $.jm.createDiv("jm-fixTips fix-mm", text);
                    break;
            }
            if (maxWidth)fixTips.style.maxWidth = maxWidth;
            if (autoClose) {
                $(fixTips).addClass("jm-fixTips-fadeOut");
                fixTips.addEventListener("webkitAnimationEnd", function () {
                    $(this).remove();
                })
            }

            return $(fixTips);
        },

        /**存放验证的一系列方法的对象
         * jm.validate.方法名（值）
         * @return {boolean}
         * */
        validate: {
            // 验证手机号
            checkTel: function (value) {
                var reg = /^(13|14|15|17|18)\d{9}$/;
                return reg.test(value);
            },

            //验证邮箱地址
            checkEmail: function (value) {
                var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                return reg.test(value);
            },

            //验证图片格式
            checkPicture: function (value) {
                var reg = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
                return reg.test(value);
            },

            //验证压缩格式
            checkRar: function (value) {
                var reg = /(.*)\.(rar|zip|7zip|tgz)$/;
                return reg.test(value);
            },

            //验证身份证
            checkIDCard: function (value) {
                var reg = /^([0-9]){7,18}(x|X)?$/;
                return reg.test(value);
            },

            //验证QQ号
            checkQQ: function (value) {
                var reg = /[1-9][0-9]{4,14}/;
                return reg.test(value);
            },

            //验证密码 字母开头，长度在6~20之间，只能包含字母、数字和下划线
            checkPassWord: function (value) {
                var reg = /^[a-zA-Z]\w{5,19}$/;
                return reg.test(value);
            },

            //验证信用卡
            checkCreditCard: function (value) {
                var reg = /[0-9]{13,16}/;
                return reg.test(value);
            },

            //验证银联卡
            checkBankCard: function (value) {
                var reg = /^62[0-5]\d{13,16}$/;
                return reg.test(value);
            },

            //验证Visa卡
            checkVisaCard: function (value) {
                var reg = /^4[0-9]{12}(?:[0-9]{3})?$/;
                return reg.test(value);
            },

            //验证万事达卡
            checkMasterCard: function (value) {
                var reg = /^5[1-5][0-9]{14}$/;
                return reg.test(value);
            },

            //验证登录名
            checkLoginName: function (value) {
                var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){4,19}$/;
                return reg.test(value);
            },

            //验证真实姓名 考虑到外国人名 xx·XXX
            checkTrueName: function (value) {
                var reg = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;
                return reg.test(value);
            },

            //验证中文
            checkChinese: function (value) {
                var reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
                return reg.test(value);
            }
        }

    };

    var jmForZepto = function () {
        return {
            /**================================
             $("选择器").方法名 工具函数
             ==================================*/
            //将一个标签按钮转化为可检测安装与否的下载链接
            createAppDownload: function (id, appSrc) {
                id = id || 70;
                appSrc = appSrc || 'jdmobile://';
                var timer = null;
                this.on("click", function (e) {
                    var ifr = document.createElement('iframe');
                    ifr.src = appSrc;
                    ifr.style.display = 'none';
                    document.body.appendChild(ifr);
                    var openTime = new Date() * 1;
                    timer = setTimeout(function () {
                        var currentTime = new Date() * 1;
                        if (currentTime - openTime <= 1200) {
                            window.location.href = "http://jrappgw.jd.com/resources/downloadApp.html?id=" + id
                        }
                    }, 1000);
                });
            },

            //将元素变为回到顶部按钮  type：scroll (平滑滚动) || static (瞬间置顶)
            createBackTop: function (type) {
                type = type || "scroll";
                var goTopTimer = null;
                this.on("click", function () {
                    if (type == "scroll") {
                        goTopTimer = setInterval(function () {
                            var sclTop = $(window).scrollTop();
                            $(window).scrollTop(sclTop * 0.9);
                            if ($(window).scrollTop() <= 0) {
                                clearInterval(goTopTimer);
                                $(window).scrollTop(0);
                            }
                        }, 20);
                    } else {
                        $(window).scrollTop(0);
                    }
                });

                $(document).on('touchstart', function () {
                    clearInterval(goTopTimer);
                })
            },

            //input调用九宫键盘 兼容Android IOS
            useNineKeyboard: function () {
                var _this = this;
                for (var i = 0; i < _this.length; i++) {
                    _this[i].attr("pattern", "[0-9]*")
                }
            },

            //input设置为已读
            setOnlyRead: function () {
                var _this = this;
                for (var i = 0; i < _this.length; i++) {
                    _this[i].attr("readonly", "readonly");
                    _this[i].focus(function () {
                        $(this).blur();
                    })
                }
            }
        }
    }();

    //扩展至zepto
    if ($) {
        $.extend($.fn, jmForZepto);   //将jmForZepto中的方法添加到Zepto上
        //$.jm = jm;                  //将jm中的方法添加到Zepto.jm上
    }

    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = jm;
    } else {
        window.jm = jm;
    }
});











