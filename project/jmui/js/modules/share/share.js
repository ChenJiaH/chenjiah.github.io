/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */
define(function (require, exports, module) {

    /**html中必须引入
     * "https://res.wx.qq.com/open/js/jweixin-1.0.0.js" 若不引入，wx对象不存在，导致分享错误
     * "http://m.jr.jd.com/statics/bridgev5.min.js" 若不引入，jsBridgeV3对象不存在，导致分享错误
     * "http://static.jdpay.com/basic/dist/js/m-public/jdp-sdk.js" 若不引入，jdp对象不存在，导致分享错误
     **/
    var share = {
        // 分享的默认文案
        shareData: {
            "imgUrl": "http://demo.jr.jd.com/finance/mobile/base/jm/images/UDC-logo.png",
            "link": function () {
                return (window.location.origin + window.location.pathname);
            },
            "descInfo": "分享文案数据已经初始化了",
            "title": "分享数据已经初始化了"
        },
        // 微信里分享数据刷新
        refreshWxshareInfo: function (shareData) {
            /**
             * 微信JSSDK分享
             * @Doc: http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E5.88.86.E4.BA.AB.E6.8E.A5.E5.8F.A3
             * @Date: 2016-1-4
             * @Mail: chenjiahao@jd.com
             */
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: shareData.title || share.shareData.title, // 分享标题
                link: shareData.link && shareData.link() || share.shareData.link(), // 分享链接
                imgUrl: shareData.imgUrl || share.shareData.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: shareData.title || share.shareData.title, // 分享标题
                desc: shareData.descInfo || share.shareData.descInfo, // 分享描述
                link: shareData.link && shareData.link() || share.shareData.link(), // 分享链接
                imgUrl: shareData.imgUrl || share.shareData.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            // 分享到QQ
            wx.onMenuShareQQ({
                title: shareData.title || share.shareData.title, // 分享标题
                desc: shareData.descInfo || share.shareData.descInfo, // 分享描述
                link: shareData.link && shareData.link() || share.shareData.link(), // 分享链接
                imgUrl: shareData.imgUrl || share.shareData.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            // 分享到腾讯微博
            wx.onMenuShareWeibo({
                title: shareData.title || share.shareData.title, // 分享标题
                desc: shareData.descInfo || share.shareData.descInfo, // 分享描述
                link: shareData.link && shareData.link() || share.shareData.link(), // 分享链接
                imgUrl: shareData.imgUrl || share.shareData.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            // 分享到QQ空间
            wx.onMenuShareQZone({
                title: shareData.title || share.shareData.title, // 分享标题
                desc: shareData.descInfo || share.shareData.descInfo, // 分享描述
                link: shareData.link && shareData.link() || share.shareData.link(), // 分享链接
                imgUrl: shareData.imgUrl || share.shareData.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        },

        /**
         * 金融APP中分享
         * @Date: 2016-1-4
         * @Mail: chenjiahao@jd.com
         */

        /* 使用deffer支持异步调用 */
        deffer: jsBridgeV3.onReady(),
        // 金融APP里数据刷新
        refreshAppShareInfo: function (shareData) {
            share.deffer.then(function () {
                var weiXinData = {
                    isShow: true, //true 显示btn，false 隐藏btn,默认隐藏
                    optionType: 1, //1:分享，2:连接跳转类型，3：跳原生模块
                    btnText: '分享',
                    shareDate: { //optionType=1时候传递，分享信息
                        appId: '', //微信公共号id，可选填
                        img: shareData.imgUrl || share.shareData.imgUrl, //分享图标
                        link: shareData.link && shareData.link() || share.shareData.link(), //分享连接地址
                        desc: shareData.descInfo || share.shareData.descInfo, //分享描述
                        title: shareData.title || share.shareData.title, //分享标题
                        friendesc: shareData.title || share.shareData.title, //分享朋友圈的文字内容
                        type: ''//需要回调时候传递，这个type值，杨国亮给，有则传这个值，没有，type 都不要传
                    }
                };
                this.jsToNaWeiXin(weiXinData);
            })
        }
    };

    var judgeChannel = {
        // 获取浏览器类型
        getBrowserInfo: function () {
            var ua = navigator.userAgent.toLowerCase();
            var isIos = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1 || false;
            var inWx = ua.indexOf('micromessenger') > -1 || false;
            var inJdApp = ua.indexOf('jdapp') > -1 || false;
            var inJrApp = ua.indexOf('jdjr') > -1 || ua.indexOf('android-async-http') > -1 || false;
            var inWyApp = ua.indexOf('walletclient') > -1 || false;
            //TODO:金融APP2.2+普及后可以通过原生对象检测到
            var inApp = (this.getUrlString('source') == "app" ? true : false);
            var resultObj = {
                isIos: isIos,
                inWx: inWx,
                inApp: inApp,
                inJdApp: inJdApp,
                inJrApp: inJrApp,
                inWyApp: inWyApp
            };
            return resultObj
        },
        getUrlString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        }
    };

    var resultObj = judgeChannel.getBrowserInfo();
    if (resultObj.inWx) {
        if (typeof wx == "object") {
            /**微信里初始化分享数据**/
            share.refreshWxshareInfo(share.shareData);
        } else {
            if (document.addEventListener) {
                document.addEventListener('wx', share.refreshWxshareInfo, false);
            } else if (document.attachEvent) {
                document.attachEvent('wx', share.refreshWxshareInfo);
            }
        }
    }

    if (resultObj.inJrApp) {
        /**金融APP里初始化分享数据**/
        share.refreshAppShareInfo(share.shareData);
    }

    /*===================================
    // 注意：目前钱包sdk版本不支持放在function内使用，必须暴露在window环境下才可使用
    function walletShare() {
        jdp.shareUrl({
            url: "http://mdq.jd.com/baina/index.html",  // 分享Url
            title: "遇见白拿告别剁手",    // 分享标题
            desc: "理财有得赚，好货不花钱",   // 分享描述
            channel: 'WX|QQ|WB',    // 分享渠道
            callback: function (status) {
                // 返回结果 SUCCESS|CANCEL|FAIL
            }
        })
    }

    if (resultObj.inWyApp) {
        if (typeof jdp == "object") {
            jdp.setMenu([
                {
                    "menuTitle": "分享",
                    "menuAction": "walletShare"
                }
            ]);
        } else {
            if (document.addEventListener) {
                document.addEventListener('jdp', walletShare, false);
            } else if (document.attachEvent) {
                document.attachEvent('jdp', walletShare);
            }
        }
    }
    ======================================*/

    module.exports = share;
});