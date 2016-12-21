/**
 * @authors Hua (lidonghua@jd.com)
 * @date    2015-11-19 09:01:54
 * @version V1.0.0
 */

define(function (require, exports, module){
	var jm = require("jm");

	function PullToRefresh(opts){
		this.maxMove = opts.maxMove || 44;
		this.moveBox = opts.moveBox || $("body");
		this.moveEle = opts.moveEle || $('.main-wrap');
		this.loadingTop = opts.loadingTop || 0;
		this.callback = opts.callback || null;

		this.init();
		this.bindEvent();
	}

    PullToRefresh.prototype = {
		init: function() {
			var _this = this;
			_this.mStartY = 0;
			_this.mEndY = 0;
			_this.mDist = 0;
			

			if(_this.loadingTop) {
				_this.pullLoading = $('<div class="pull-loading pr" style="top: 3rem"><i class="icon icon-spinner abs-mm"></i></div>');
				//_this.pullLoading.css("top", _this.pullLoading + "px");
			}else{
				_this.pullLoading = $('<div class="pull-loading pr"><i class="icon icon-spinner abs-mm"></i></div>');
			}
		},
		bindEvent: function() {
			var _this = this;
			var timer = null;
			_this.moveBox.on("touchstart", function(e) {
                jm.pageLock();
				_this.mSatrtY = e.touches[0].clientY;

				$("body").prepend(_this.pullLoading);

			}).on("touchmove", function(e) {

				_this.mEndY = e.touches[0].clientY;
				_this.mDist = _this.mEndY - _this.mSatrtY;

				_this.pullLoading.css("opacity", _this.mDist/100)

				if($(window).scrollTop() == 0 && _this.mDist >= 5){  //顶部 下拉

					if(_this.mDist < _this.maxMove){
						_this.transY(_this.mDist)
					}else{
						_this.transY(_this.maxMove + _this.mDist /5)
					}
				}

			}).on("touchend", function(e) {

				_this.moveEle.css({
					"transition-property": "transform",
					"transition-duration": "0.3s"
				})

				if($(window).scrollTop() == 0) {
                    jm.pageUnlock();
			        if(_this.mDist >= _this.maxMove){
			        	_this.transY(_this.maxMove);
			        	clearTimeout(timer);
			        	timer = setTimeout(function(){
			        		_this.transY("0");
			        		_this.pullLoading.css("opacity", "0")
			        		_this.pullLoading.remove();
			        		//_this.moveEle.attr("style","");
			        		//location.reload();
			        		_this.callback && _this.callback();

			        		clearTimeout(timer)
			        	},1000)
			        }else{
			        	_this.transY("0");
		        		_this.pullLoading.css("opacity", "0")
		        		_this.pullLoading.remove();
			        }
				}
			});
		},
		transY: function(dis) {
			var _this = this;

			_this.moveEle.css({
	            "-webkit-transform": "translateY(" + dis + "px)",
	            "-webkit-transition-property": "all",
	            "-webkit-transition-duration": '0.3',
	            "-webkit-transition-timing-function": "ease-out"
	        });
		}
	}
	

	module.exports = PullToRefresh;

});