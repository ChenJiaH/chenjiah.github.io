var debug = true;

var siteHost = {
    home: debug ? "../js" : "http://demo.jr.jd.com/finance/mobile/jm/js"
};

//入口文件版本控制
var mainVision = {
    iconDemo: "1.0.0",        // icon展示demo页
    dialog: "1.0.0",        // dialog展示demo页
    dropElement: "1.0.0",        // dropElement展示demo页
    funnyBackground: "1.0.0",        // funnyBackground展示demo页
    funnyConsoleLog: "1.0.0",        // funnyConsoleLog展示demo页
    iscroll: "1.0.0",        // iscroll展示demo页
    jigsaw: "1.0.0",        // jigsaw展示demo页
    lazyLoad: "1.0.0",        // lazyLoad展示demo页
    md5: "1.0.0",        // md5展示demo页
    music: "1.0.0",        // music展示demo页
    numKeyboard: "1.0.0",        // numKeyboard展示demo页
    preLoad: "1.0.0",        // preLoad展示demo页
    qrcode: "1.0.0",        // qrcode展示demo页
    requestAnimationFrameAndTween: "1.0.0",        // requestAnimationFrameAndTween展示demo页
    share: "1.0.0",        // share展示demo页
    base64: "1.0.0",        // base64展示demo页
    checkBox: "1.0.0",        // checkBox展示demo页
    countDown: "1.0.0",        // countDown展示demo页
    drawCharts: "1.0.0",        // drawCharts展示demo页
    addrPicker: "1.0.0",        // addrPicker展示demo页
    swipeSlide: "1.0.0",        // swipeSlide展示demo页
    pullToRefresh: "1.0.0",        // pullToRefresh展示demo页
    pageSlider: "1.0.0",        // pageSlider展示demo页
    analogKeyboard: "1.0.0"        // analogKeyboard展示demo页

};

var comboExSet = debug ? /.*/ : "";
var distPath = debug ? "modules" : "dist";

seajs.config({
    charset: "utf-8",
    base: siteHost.home,
    alias: {
        // 稳定区
        "IScroll": distPath + "/iscroll/iscroll",
        "jm": distPath + "/jm/jm",
        "QRCode": distPath + "/qrcode/qrcode",
        "MD5": distPath + "/md5/md5",
        "PreLoad": distPath + "/preLoad/preLoad",
        "share": distPath + "/share/share",
        "SwipeSlide": distPath + "/swipeSlide/swipeSlide",
        "PageSlider": distPath + "/pageSlider/pageSlider",



        // 定制区
        "Dialog": distPath + "/dialog/dialog",
        "DropElement": distPath + "/dropElement/dropElement",
        "FunnyBackground": distPath + "/funnyBackground/funnyBackground",
        "FunnyConsoleLog": distPath + "/funnyConsoleLog/funnyConsoleLog",
        "Jigsaw": distPath + "/jigsaw/jigsaw",
        "Music": distPath + "/music/music",
        "NumKeyboard": distPath + "/numKeyboard/numKeyboard",
        "base64": distPath + "/base64/base64",
        "CheckBox": distPath + "/checkBox/checkBox",
        "CountDown": distPath + "/countDown/countDown",
        "DrawCharts": distPath + "/drawCharts/drawCharts",
        "AddrPicker": distPath + "/addrPicker/addrPicker",
        "PullToRefresh": distPath + "/pullToRefresh/pullToRefresh",
        "AnalogKeyboard": distPath + "/analogKeyboard/analogKeyboard"

        //"juicer": distPath + "/juicer/juicer",
        //"drawCharts": distPath + "/drawCharts/drawCharts",
    },
    paths: {
        "mod": distPath
    },
    comboExcludes: comboExSet,
    comboMaxLength: 1000
})


$(function () {
    var $pageType = $("#page_main");
    var main_enter = $pageType.attr("data-main");  //对应页面程序入口
    seajs.use("main/" + main_enter + "/" + mainVision[main_enter] + "/" + main_enter, function (e) {
        if (e != null) {
            window.extendFn && window.extendFn(e);
        }
    });  //进入入口
});





