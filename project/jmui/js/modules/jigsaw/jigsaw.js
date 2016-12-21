/**
 * @Author: Created By McChen
 * @Date: 2015/12/11
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */
define(function (require, exports, module) {

function Jigsaw(settings) {
    this.totalTime = settings.totalTime;    // 游戏总时间
    this.begin = settings.begin;            // 开始按钮
    this.again = settings.again;            // 再玩一次按钮
    this.successFn = settings.successFn;      // 成功回调
    this.failFn = settings.failFn;            // 失败回调
    this.init();
}

Jigsaw.prototype = {
    init: function () {
        this.firstClcTop = 0;//第一次点击的图片的top
        this.firstClcLeft = 0;//第一次点击的图片的left
        this.secondClcTop = 0;//第二次点击的图片的top
        this.secondClcLeft = 0;//第二次点击的图片的left
        $('.jm-time').html(this.totalTime);//预设游戏总时间

        this.event();
    },

    event: function () {
        var _this = this;
        FastClick && FastClick.attach(document.body);
        _this._lockPage();//禁止窗口移动
        _this.begin.on('click', function () {//开始游戏
            if (_this.begin.hasClass('jm-gameBegin')) {
                return false;
            } else {
                _this.begin.addClass('jm-gameBegin');
                _this.gameStartNumDown();
            }
        });
        _this.again.on('click', function () {//再玩一次
            if (_this.again.hasClass('gameAgain')) {
                _this.gameStartNumDown('again');
            } else {
                return false;
            }
        });
        $('.jm-jigsawBox').on('click', function () {//开始游戏
            if (_this.begin.hasClass('jm-gameBegin')) {
                return false;
            } else {
                _this.begin.addClass('jm-gameBegin');
                _this.gameStartNumDown();
            }
        });
    },

    gameStartNumDown: function (type) {//触发倒计时
        var _this = this;
        _this.gameUseTime = _this.totalTime-1;//倒计时时间纠错
        var again = false;
        if (type == 'again') {
            $('.jm-shade span').html('3');
            $('.jm-time').html(_this.totalTime);
            again = true;
        }
        $('.jm-shade,.jm-shade span').show();
        setTimeout(function () {
            _this.gameStart(again);//触发游戏
            _this.userTime = setInterval(function () {
                $('.jm-time').html(_this.gameUseTime);
                if (_this.gameUseTime == 0) {
                    clearInterval(_this.userTime);
                    _this.again.addClass('gameAgain');
                    _this.failFn();
                } else {
                    _this.gameUseTime--;
                }
            }, 1000);
        }, 4000);
        var startTime = setInterval(function () {
            var num = $('.jm-shade span').html();
            $('.jm-shade span').hide();
            if (num == 1) {
                $('.jm-shade span').html('go!');
                $('.jm-shade span').show();
            } else if (num == 'go!') {
                clearInterval(startTime);
                $('.jm-shade,.jm-shade span').hide();
            } else {
                num--;
                $('.jm-shade span').html(num);
                $('.jm-shade span').show();
            }
        }, 1000);
    },

    gameStart: function (again) {//初始化拼图
        var _this = this;
        var imgMax = 8;
        var imgIndexUp = parseInt(Math.random() * 8, 10);
        if (again) {
        } else {
            _this.pathData = [          // 储存图片的位置信息
                {'img0': [$('.jm-jigsawImg').eq(0).css('top'), $('.jm-jigsawImg').eq(0).css('left')]},
                {'img1': [$('.jm-jigsawImg').eq(1).css('top'), $('.jm-jigsawImg').eq(1).css('left')]},
                {'img2': [$('.jm-jigsawImg').eq(2).css('top'), $('.jm-jigsawImg').eq(2).css('left')]},
                {'img3': [$('.jm-jigsawImg').eq(3).css('top'), $('.jm-jigsawImg').eq(3).css('left')]},
                {'img4': [$('.jm-jigsawImg').eq(4).css('top'), $('.jm-jigsawImg').eq(4).css('left')]},
                {'img5': [$('.jm-jigsawImg').eq(5).css('top'), $('.jm-jigsawImg').eq(5).css('left')]},
                {'img6': [$('.jm-jigsawImg').eq(6).css('top'), $('.jm-jigsawImg').eq(6).css('left')]},
                {'img7': [$('.jm-jigsawImg').eq(7).css('top'), $('.jm-jigsawImg').eq(7).css('left')]},
                {'img8': [$('.jm-jigsawImg').eq(8).css('top'), $('.jm-jigsawImg').eq(8).css('left')]},
            ];
        }
        $.each(_this.pathData, function (index, elements) {
            if (imgIndexUp >= 0) {
                $('.jigsawImg' + imgIndexUp).css({
                    'top': elements['img' + index][0],
                    'left': elements['img' + index][1]
                });
                imgIndexUp--;
            } else {
                $('.jigsawImg' + imgMax).css({'top': elements['img' + index][0], 'left': elements['img' + index][1]});
                imgMax--;
            }
        });     //利用产生的随机数开始进行遍历，从随机数开始为0赋值
        _this.picMove();//触发拼图移动
    },

    picMove: function () {//移动拼图
        var _this = this;
        $('.jm-jigsawImg').off('click').on('click', function () {
            var imgTop = $(this).css('top'),
                imgLeft = $(this).css('left');
            var firstClicked = $('.firstClicked').length;
            var secondClicked = $('.secondClicked').length;
            if ($(this).find('.pic').hasClass('border')) {
                $(this).find('.pic').removeClass('border');
            } else {
                $(this).find('.pic').addClass('border');
                $(this).siblings().find('.pic').removeClass('border');
            }
            if (firstClicked == 0) {
                _this.firstClcTop = imgTop;
                _this.firstClcLeft = imgLeft;
                $(this).addClass('firstClicked');
            } else if (secondClicked == 0) {
                if (!$(this).hasClass('firstClicked')) {
                    //var indexF = $('.firstClicked').attr('tig'),
                    //    indexS = $(this).attr('tig');
                    $(this).addClass('secondClicked');
                    $('.border').removeClass('border');
                    _this.secondClcTop = imgTop;
                    _this.secondClcLeft = imgLeft;
                    $(this).css({'top': _this.firstClcTop, 'left': _this.firstClcLeft});
                    $(this, '.firstClicked').addClass('scale');
                    $('.firstClicked').css({'top': _this.secondClcTop, 'left': _this.secondClcLeft});
                    //$('.firstClicked').attr('tig', indexS);
                    //$('.secondClicked').attr('tig', indexF);
                    setTimeout(function () {
                        _this.gameRule();//触发拼图是否完成
                    }, 500);
                } else {
                    $(this).removeClass('firstClicked');
                }
            }
        });
        $('.jm-jigsawBox').on('webkitTransitionEnd transitionend', function () {    // 重置移动后的拼图
            $('.firstClicked').removeClass('firstClicked');
            $('.secondClicked').removeClass('secondClicked');
            $('.scale').removeClass('scale');
            $('.border').removeClass('border');
        });
    },

    gameRule: function () {//判断是否拼成功
        var _this = this;
        $.each(_this.pathData, function (index, elements) {
            if (elements['img' + index][0] == $('.jigsawImg' + index).css('top') && elements['img' + index][1] == $('.jigsawImg' + index).css('left')) {
                $('.jigsawImg' + index).addClass('right');
            } else {
                $('.jigsawImg' + index).removeClass('right');
            }
        });
        if ($('.right').length == 9) {
            clearInterval(_this.userTime);
            $('.jm-useTime').html((_this.totalTime-1) - _this.gameUseTime);
            _this.again.addClass('gameAgain');
            _this.successFn &&_this.successFn();
        }
    },

    _lockPage: function () {
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, !1);
    }
};

    module.exports = Jigsaw;
});