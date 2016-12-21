/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var QRCode = require("QRCode");

    var qrcodePage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            // 实例化二维码
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: "http://jr.jd.com?" + Math.random(),        // 二维码内容支持 url 文本 电子邮件 短消息 电话 vCard 地理位置 二级制压缩文件
                width: 61,                                      // 二维码的style width
                height: 61,                                      // 二维码的style height
                colorDark: "#000000",                          // 二维码的颜色
                colorLight: "#ffffff"                          // 二维码的底色
            })

    //    qrcode.clear();                                   // 清除二维码
    //    qrcode.makeCode("华丽变身McChen")                 // 生成另外一个二维码
        }
    };

    $(function () {
        FastClick && FastClick.attach(document.body);
        qrcodePage.init();
    });

    module.exports = qrcodePage;
});
