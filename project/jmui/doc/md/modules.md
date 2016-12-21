## jm

CORE & API

----------

#### jm

js模块，jm基础工具函数集合

> 语法：`jm.方法名`

| 参数名称      |参数类型 | 参数说明|
| :-------- | :--------:| :--------|
| vision| String|版本号 |
| timestamp| Long | 时间戳|

| 方法名      | 使用说明|
| :-------- | :--------|
| lazyLoad | 图片懒加载，返回`Boolean`。`true`表示全部加载完成,`false`表示没有全部加载完成<br />Demo实例：[请狠狠戳我](http://jr.jd.com)|
| requestAnimationFrame| 对于现代浏览器使用`requestAnimationFrame`代替`setTimeOut`<br />Demo实例：[请狠狠戳我](http://jr.jd.com)|
| tween| 将缓动曲线集合添加至`Math.Tween`类<br />Demo实例：[请狠狠戳我](http://jr.jd.com)|
| pageLock| 锁定页面|
| pageUnlock| 解锁页面|
| getUrlString| 获取Url参数值<br />语法：`jm.getUrlString(name)`<br />参数类型：`{String}`|
| setCookie| 将值存入cookie<br />语法：`jm.setCookie(c_name,value,expiredays)`<br />参数说明：`名称，键值，存在周期（可选）`<br />参数类型：`{String}`|
| getCookie| 从cookie中取值<br />语法：`jm.getCookie(c_name)`<br />参数类型：`{String}`|
| getBrowserInfo| 获取浏览器UA 判断环境，返回`object，{object}.in环境={boolean}`<br />参数：`inIos、inWx、inApp、inJdApp、inJrApp、inWyApp`|
| addJrBanner| 添加金融Banner，可进行金融APP下载<br />语法：`jm.addJrBanner(imgSrc,id,saveDays)`<br />参数说明：`bannerUrl，下载id（默认70），存在周期（默认1天）`<br />参数类型：`{String}、{Int}、{Int}`|
| formatTime| 时间格式化<br />语法：`jm.formatTime(time,'yyyy-MM-dd HH:mm:ss')`<br />参数说明：`时间戳，输入格式`<br />参数类型：`{Long}、{String}`<br />注：`yyyy`表示年，`MM`表示月，`dd`表示日，`HH`表示小时，`mm`表示分，`ss`表示秒（参数名不允许更改，格式可自定义）|
| createDiv| 创建DIV，返回`Object`。<br />语法：`jm.createDiv(className,innerHTML)`<br />参数说明：`标签class名，html内容`<br />参数类型：`{String}`|
| fixTips| 固定提示，返回`Object`。<br />语法：`jm.fixTips({text:"固定提示框",pos:"top",autoClose:false})`<br />参数说明：`html内容，位置，自动隐藏`<br />参数类型：`{String}、{top/mid}、{Boolean}`|
| validate| 验证器集合，返回`Boolean`。<br />语法：`jm.validate.方法名（值）`<br />方法：<br />`checkTel(value)` 验证手机号<br />`checkEmail(value)` 验证邮箱地址<br />`checkPicture(value)` 验证图片格式<br />`checkRar(value)` 验证压缩格式<br />`checkIDCard(value)` 验证身份证<br />`checkQQ(value)` 验证QQ号<br />`checkPassWord(value)` 验证密码 字母开头，长度在6~20之间，只能包含字母、数字和下划线<br />`checkCreditCard(value)` 验证信用卡<br />`checkBankCard(value)` 验证银联卡<br />`checkVisaCard(value)` 验证Visa卡<br />`checkMasterCard(value)` 验证万事达卡<br />`checkLoginName(value)` 验证登录名<br />`checkTrueName(value)` 验证真实姓名 考虑到外国人名 xx·XXX<br />`checkChinese(value)` 验证中文|


----------

#### jmForZepto

jmForZepto拓展zepto

> 语法：`$("选择器").方法名`

| 方法名      | 使用说明|
| :-------- | :--------|
| createAppDownload| 将一个标签按钮转化为可检测安装与否的下载链接<br />语法：`$("选择器").addJrBanner(id,appSrc)`<br />参数说明：`下载id（默认70），app链接（默认'jdmobild://'）`<br />参数类型：`{Int}、{String}`|
| createBackTop| 将元素变为回到顶部按钮<br />语法：`$("选择器").createBackTop(type)`<br />参数说明：`scroll平滑滚动、static瞬间制定`<br />参数类型：`{String}`|
| useNineKeyboard| input调用九宫键盘 兼容Android IOS<br />语法：`$("选择器").useNineKeyboard()`|
| setOnlyRead| input设置为已读<br />语法：`$("选择器").setOnlyRead()`|



----------

#### addrPicker

js模块，地址选择器

> 语法：`new AddrPicker({config});`

| 参数名称      |参数类型 | 参数说明|
| :-------- | :--------:| :--------|
| selecteBtn | Object |必选，触发选择按钮 |
| addrPickerBox| Object | 必选，地址选择的容器|
| moveBox| Object |必选，可滑动区域容器 |
| moveObj | Object |必选，可滑动的对象 |
| addrInput| Object |必选，输入内容区域 |
| lineHeight| Int |必选，每个滚动项高度 |
| btnSure | Object |必选，确定按钮 |
| btnCancel | Object |必选，取消按钮 |
| sureFn| Function |可选，确定回调函数 |
| cancelFn| Function |可选，取消回调函数 |
| ajaxUrl| String |可选，数据Url |

``` javascript
new addrPicker({
    selecteBtn: $("#btnChooseAddr"),
    addrPickerBox: $("#addrPicker"),
    moveBox: $(".picker-item"),
    moveObj: $(".picker-ul"),
    btnSure: $("#pickerSure"),
    btnCancel: $("#pickerCancel"),
    addrInput: $("#addrInput"),
    lineHeight: 40,
    ajaxUrl: {"province": "../data/provinces.json", "city": "../data/citys.json", "area": "../data/areas.json"},
    sureFn: function(id,text) {
        $("#addrProvince").val(id[0] + "," + text[0])
        $("#addrCity").val(id[1] + "," + text[1])
        $("#addrArea").val(id[2] + "," + text[2])
    }
});
```
Demo实例：[请狠狠戳我](http://jr.jd.com)


----------
#### base64

方法，将字符串转化为base64编码
>语法： `$.base64.encode(str)` || `$.base64.decode(str)`

| 方法名称 | 参数名称  | 参数类型   |   参数说明           | 
| :-------- | :------- | -------------------:|
| encode|   `str`  | String |可选，分享标题| 
| decode|   `str`  | String |可选，分享标题| 
```javascript
  var newStr = $.base64.decode("UDC");
  console.log(newStr);
  //输出"P0"
  var newStr = $.base64.encode("UDC");
  console.log(newStr);
  //输出"VURD"
```
--------
#### checkbox
将任一zepto元素变成checkbox
>语法：`new CheckBox({config})`

| 参数名称  | 参数类型   |   参数说明 | 
| :-------- | :------- | -------------------:|
| `obj`  | $obj |必选，checkbox对象| 
| `checkedclass` | String |必选，选中的class| 
| `initChecked` | boolean |可选，初始是否选中|
| `checkcb` | function|可选，选中回调|
| `uncheckcb` | function |可选，取消选中回调|


```javascript
new CheckBox({
	obj:$("zepto对象"),
	checkedClass:"选中的样式class",
	initChecked:"初始是否选中",
	checkcb:function(){选中后回调},
	uncheckcb:function(){取消选中后回调}
})
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------

#### countDown

js模块，倒计时插件

> 语法：`new CountDown({config});`

| 参数名称      |参数类型 | 参数说明|
| :-------- | :--------:| :--------|
| $day| Object |必选，显示天的对象 |
| $hour| Object | 必选，显示小时的对象|
| $min| Object |必选，显示分的对象 |
| $second| Object|可选，显示秒的对象 |
| totalSecond| Int|必选，倒计时总时间 |
| timeCent| Int |可选，倒计时单位 |
| endFn| Function |可选，结束回调函数 |


``` javascript
new CountDown({
                $day: $(".day"),
                $hour: $(".hour"),
                $min: $(".min"),
                $second: $(".second"),
                totalSecond: 10,
                endFn: function () {
                    alert("终于等到你，还好我没放弃---------然并卵");
                }
            });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)


----------
#### Dialog
js弹框组件
>语法：`new Dialog({config})`

| 参数名称      |参数类型 | 参数说明|
| :-------- | :--------:| :--------|
| title| String |可选，弹框的标题。默认为空，为空时，弹框没有标题 |
| content| String | 必选，弹框的内容|
| sureUrl| String |可选，点击确定之后的跳转链接|
| sureFn| Function|可选，点击确定之后的回调函数|
| cancelFn| Function|可选，点击取消之后的回调函数|
| singleBtn| Boolean |可选，默认false。当为true的时候只显示确定按钮 |

```javascript
  new Dialog({
		  title: "我是标题",
	      content: "singleBtn若设置为true,则只显示确定按钮",
	      sureUrl: "http://www.jd.com",
	      singleBtn: false,
	      sureFn: function () {
	          new Dialog({content: "你点击了确定"});
	      },
	      cancelFn: function () {
	          new Dialog({content: "你点击了取消"});
	      }
	  });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------

#### dropElement

js模块，元素飘落插件

> 语法：`new DropElement({config});`

| 参数名称      |参数类型 | 参数说明|
| :-------- | :--------:| :--------|
| sizeArr| Array |必选，掉落元素的尺寸数组（二维） |
| count| Int| 可选，同时出现的最大数量|
| during| Int|可选，完成一次掉落的周期 |
| splitTime| Int|可选，每个元素出现的时间间隔 |
| width| Int |可选，可掉落的区域宽度 |
| loop| Boolean|可选，是否循环掉落 |


``` javascript
new DropElement({
                sizeArr: [[10, 24], [13, 15], [16, 19], [12, 14], [10, 15]],
                count: 15,
                during: 3000,
                splitTime: 300,
                loop: true
            });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)


----------
#### FunnyBackground
canvas背景组件
>语法：`new FunnyBackground({config})`

| 参数名称  | 参数类型   |   参数说明  | 
| :------- | :--------|:--------| 
|  canvas | object |必选，画布的容器| 
|   sedIn  | String |可选，应用场景| 

```javascript
	new FunnyBackground({
	        canvas : document.getElementById("jm-funnyBackground"),
	        usedIn : "pc"
	    });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------

#### iscroll

js模块，web最流畅的滚动插件

> 语法：`new IScroll("#wrapper", {config});`

参数请点这里：https://github.com/cubiq/iscroll/

``` javascript
new IScroll("#wrapper", {mouseWheel: true, probeType: 3});
```
Demo实例：[请狠狠戳我](http://jr.jd.com)


----------
#### Jigsaw
js拼图小游戏组件
>语法：`new Jigsaw({config})`

| 参数名称  | 参数类型   |   参数说明 | 
| :------- | :-------|:-------| 
|  totalTime | Int |必选，游戏总时间| 
| begin | Object |必选，开始按钮| 
|  again | Object |必选，再玩一次按钮| 
|   successFn| Function|必选，成功之后的回调函数|
|  failFn | Function|必选，失败之后的回调函数|

```javascript
   new Jigsaw({
       totalTime: 10,
       begin: $(".jm-begin"),
       again: $(".jm-again"),
       successFn: function () {
           console.log("你成功了~Yeah!");
       },
       failFn: function () {
           console.log("你失败了~wuwu~");
       }
   });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------

#### md5

js模块，MD5转换插件

> 语法：`new MD5({config});`

| 参数名称      |参数类型 | 参数说明|
| :-------- | :--------:| :--------|
| $btn| Object|必选，转换触发按钮 |
| str| String| 必选，需要转换的字符串|
| endFn| Function|可选，转换完成回调函数 |


``` javascript
new MD5({
                $btn:$(".jm-md5-btnTransform"),
                str:$(".jm-md5-str").text(),
                endFn: function (str) {
                    $(".jm-md5-str").text(str);
                }
            })
```
Demo实例：[请狠狠戳我](http://jr.jd.com)


----------
#### Music
js音乐播放组件
>语法：`new Music({config})`

| 参数名称  | 参数类型   |   参数说明  | 
| :------- | -------------------:|:-------  | 
|   controls | Boolean |可选，默认false。是否显示原生控制框| 
|  autoplay | Boolean |可选，默认true。是否自动播放| 
|  loop | Boolean |可选，默认true。是否循环| 
| muted | Boolean |可选，默认false。规定视频输出时应该静音|
|  src | String |必选，音乐路径|

```javascript
 new Music({
	  controls : false,
      autoplay : true,
      loop : true,
      muted: false,
      src : 'http://static.360buyimg.com/finance/mobile/activity/2015/crowdReBuy/song/song.mp3'
  });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------

#### preLoad

js模块，预加载插件

> 语法：`new PreLoad({config});`

| 参数名称      |参数类型 | 参数说明|
| :-------- | :--------:| :--------|
| tasks| Array|必选，存放预加载资源Url的数组 |
| finishedFn| Function| 必选，完成加载的回调函数|
| prefix| String|可选，输出的前缀 |


``` javascript
new PreLoad({
                tasks:[
                    "1.png",
                    "2.png",
                    "3.png"
                ],
                finishedFn:function(total){
                    console.log("已经加载完成了，共加载"+total+"个资源");
                }
            });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)


----------
#### PullToRefresh
js下拉刷新组件
>语法：`new PullToRefresh({config})`

| 参数名称  | 参数类型   |   参数说明  | 
| :------- | -------------------:|:------- | 
|  maxMove | Int |可选，默认44。触发加载数据的最小移动距离| 
|  moveBox | Object |可选，默认`$("body")`。监听拉动事件的元素| 
|   moveEle | Object |可选，默认`$('.main-wrap')`。拉动的元素| 
|  loadingTop | Boolean |可选，默认0。loading图标距顶部距离|
|   callback | Function |可选，刷新之后的回调函数|

```javascript
 new PullToRefresh({
     moveEle: $(".mainBox"),
     loadingTop: 0,
     maxMove: 30,
     callback: function() {
         console.log("刷新成功";
     }
   })
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------

#### qrcode

js模块，二维码插件

> 语法：`new QRCode(object,{config});`

| 参数名称      |参数类型 | 参数说明|
| :-------- | :--------:| :--------|
| object| Object|必填，二维码的容器 |
| text| *| 必选，二维码内容（支持 url 文本 电子邮件 短消息 电话 vCard 地理位置 二级制压缩文件）|
| width| Int|可选，二维码宽度 |
| height| Int|可选，二维码高度 |
| colorDark| String|可选，二维码颜色 |
| colorLight| Int|可选，二维码底色 |
| correctLevel | ？|可选，二维码容错等级 |
参数请点这里：https://github.com/davidshimjs/qrcodejs

``` javascript
new QRCode(document.getElementById("qrcode"), {
                text: "http://jr.jd.com?" + Math.random(), 
                width: 61,                                      
                height: 61,                                      
                colorDark: "#000000",                          
                colorLight: "#ffffff"                          
            })；
```
Demo实例：[请狠狠戳我](http://jr.jd.com)


----------
#### share
js微信分享文案组件
>语法：`share.refreshWxshareInfo({config})` ||  `share.refreshAppShareInfo({config})` || `share.refreshWalletShareInfo({config})`

|  参数名称  | 参数类型   |   参数说明 | 
| :-------- | :------- |  :-------| 
| title| String |可选，分享标题| 
|  content | String |可选，分享描述| 
| link | String |可选，分享链接| 
|  imgUrl | String |可选，分享图片|

```javascript
 share.refreshWxshareInfo({
	    "title": "【再次更新】分享文案数据已经更新了呢~~",
	    "content": "分享内容在此，你要作甚",
	    "imgUrl": "http://demo.jr.jd.com/finance/mobile/base/jm/images/UDC-logo.png",
        "link": function () {
            return (window.location.origin + window.location.pathname);
        }
	 })
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------
#### analogKeyboard
js模块，模拟字母键盘插件
>语法：`new AnalogKeyboard({config})`

| 参数名称  | 参数类型   |   参数说明           |
| :------- | :-------|:-------|
|   `$board`  | Object |可选，默认`$(".jm-analogKeyboard")`。模拟键盘|
|   `$key`  | Object |可选，默认`$board.find("li[data-key]")`。模拟按键|
|   `$input`  | Object |可选，默认`$(".jm-analogKeyboard-input")`。模拟input|
|   `maxLength`  | Int |可选，默认20。input字符串的最大长度|
|   `completeFn`  | Function |必选，点击完成的回调|
|   `codeType`  | String |可选，默认`hidden`。输入结果显示形式（默认为密文）|

```javascript
  new AnalogKeyboard({
       $board: $(".jm-analogKeyboard"),
       $key: $(".jm-analogKeyboard").find("li[data-key]"),
       $input: $(".jm-analogKeyboard-input"),
       maxLength: 15,
       completeFn: function (result) {
           alert("您输入的密码为："+ result)
       },
       codeType: "hidden"
   });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------
#### numKeyboard
js模块，模拟数字键盘插件
>语法：`new NumKeyBoard({config})`

| 参数名称  | 参数类型   |   参数说明           |
| :------- | :-------|:-------|
|   `$board`  | Object |必选，模拟键盘|
|   `$targetInput`  | Object |必选，模拟input|
|   `checkFn`  | Function |必选，输入长度达6位时调用的校验函数|
|   `codeType`  | String |可选，默认`hidden`。输入结果显示形式（默认为密文）|

```javascript
  new NumKeyboard({
      $board: $("#jm-keyBoard").find("li"),       //组件键盘
      $targetInput: $("#jm-targetInput").find("li"),  //组件input
      codeType: "num",                        //组件显示方式
      ajaxUrl:"../../data/password.json",
      checkFn: function(pwd,callback){
          this.getAjaxData(this.ajaxUrl,pwd,returnData);
          function returnData(data){
              var flag = (pwd == data.password);
              callback && callback(flag);
          }
      }
  });
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------
#### PageSlider
js模块，移动端全屏翻页插件
>语法：`new PageSlider({config})`

| 方法名称  | 参数类型   |   方法说明           |
| :------- | :-------|:-------|
|   `slideTo`  | Int |指定翻到第几屏 |

| 参数名称  | 参数类型   |   参数说明           |
| :------- | :-------|:-------|
|   `$page`  | Object |可选，默认`$(".page")`。页面容器对象 |
|   `beginIndex`  | Int |可选，默认0。开始页面下标|
|   `activeClass`  | String |可选，默认`page-active`。当前页面class标识|
|   `type`  | String |可选，默认`ease-out`。翻页动画速度曲线|
|   `scaleEffect` | Boolean |可选，默认false。是否开启页面拉伸效果|

```javascript
  var pageSlider = new PageSlider({
      page: $(".page"),
      beginIndex: 0,
      activeClass: "page-active",
      type: "ease-out",
      scaleEffect: false
  });
  pageSlider.slideTo(2); //指定调到第三页
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------
#### SwipeSlide
js模块，移动端翻页插件
>语法：`$viewPort.swipeSlide({config})`

| 方法名称  | 参数类型   |   方法说明           |
| :------- | :-------|:-------|
|   `goTo`  | Int |指定跳转到哪一页 |

| 参数名称  | 参数类型   |   参数说明           |
| :------- | :-------|:-------|
|   `container`  | Object |必选，滚动的容器 |
|   `speed`  | Int |可选，默认4000。滚动的时间间隔|
|   `dots`  | Object |必选，和滚动项目对应的点 dot|
|   `dotActiveClass`  | String |可选，默认`active`。点激活状态的class|
|   `autoScroll` | Boolean |可选，默认false。是否连续滚动|
|   `continuousScroll`  | Boolean |可选,默认false,是否连续滚动|
|   `dir`  | String |可选，默认x-水平滚动，y-竖直滚动。运动的方向|
|   `transitionType`  | String |可选，默认`ease`。运动方式|
|   `callback` | Function |可选，每项滚动完后的回调函数|


```javascript
 var sliderObj = $viewPort.swipeSlide({
	 container: $tabContainer,
	 speed : 2000,
	 dots : $dots,
	 dotActiveClass: "active",
	 autoScroll : false,
	 continuousScroll: true,
	 dir: "y",
	 transitionType: "ease",
	 callback: fn
 });

 sliderObj.goTo(2); //指定调到第三页
```
Demo实例：[请狠狠戳我](http://jr.jd.com)

--------