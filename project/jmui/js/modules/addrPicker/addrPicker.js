/**
 * @authors Hua (lidonghua@jd.com)
 * @date    2015-11-20 17:36:51
 * @version V1.0.0
 */


define(function (require, exports, module) {
	var jm = require("jm");

	function AddrPicker(opts) {
		this.selecteBtn = opts.selecteBtn;
		this.addrPickerBox = opts.addrPickerBox;
		this.moveBox = opts.moveBox;
		this.moveObj = opts.moveObj;
		this.addrInput = opts.addrInput;
		this.lineHeight = opts.lineHeight;
		this.btnSure = opts.btnSure;
		this.btnCancel = opts.btnCancel;
		this.sureFn = opts.sureFn || null;
		this.cancelFn = opts.cancelFn || null;
		this.ajaxUrl = opts.ajaxUrl || null;
		this.noMemory = opts.noMemory || false;

		this.tStart = [];
		this.tEnd = [];
		this.tMove = [];
		this.heightArr = [];

		this.cacheMap = {};

		this.init();
		this.bindEvent();
	}



	AddrPicker.prototype = {
		init: function() {
			var _this = this;

			_this.selecteBtn.click(function() {
				_this.addrPickerBox.addClass("show");
				//_this.pageLock(); //禁止屏幕滑动
				jm.pageLock(); //禁止屏幕滑动

				//开始移动前位置
				_this.tMove = _this.topArr();

				// 开始、结束位置 数组
				_this.startendPos(); 

				//ajax 获取数据
				if(_this.ajaxUrl) {
					if(_this.topArr()[0] == 0) {  
						_this.getDataFn("province", 0, _this.moveObj.eq(0), 0);
					}else{
						var myId = _this.getItemId(_this.moveObj.eq(0), _this.topArr()[0]);
						_this.getDataFn("city", myId, _this.moveObj.eq(1), 1);
					}
				}else{   //非ajax请求数据直接计算高度，有请求先请求再计算

					//每一项的高度
					for(var i=0;i<_this.moveObj.length;i++) {
						_this.moveItemHeight(_this.moveObj.eq(i), i);
					}
				}

			});

		},
		bindEvent: function() {
			var _this = this;
			var currtMove = _this.topArr();
			var cacheMove = 0;
			var getTransY;


			_this.moveBox.off().each(function(n,t) {
				var $this = $(this);
				var $moveObj = _this.moveObj.eq(n);

				$this.on('touchstart',function(e){
					_this.tStart[n] = e.touches[0].clientY; //滑动的起始坐标Y

					getTransY = _this.getTop(_this.moveObj.eq(n)) ? _this.getTop(_this.moveObj.eq(n)) : 0;

				}).on('touchmove',function(e){
					_this.tEnd[n] = e.touches[0].clientY; //滑动到当前位置的坐标Y

					currtMove[n] = _this.tMove[n] + _this.tEnd[n] - _this.tStart[n];

					if(currtMove[n] <= -_this.heightArr[n]){  //下零界点判断
						currtMove[n] = -_this.heightArr[n];
					}else if(currtMove[n] >= 0){  //上零界点判断
						currtMove[n] = 0;
					}

					_this.eleAnimate($moveObj, currtMove[n], 0);

				}).on('touchend',function(e){
					cacheMove = _this.tMove[n]
					_this.tMove[n] = currtMove[n];

					if(Math.abs(_this.tMove[n] % _this.lineHeight) < _this.lineHeight/2){
						_this.tMove[n] -= _this.tMove[n] % _this.lineHeight;
					}else if(Math.abs(_this.tMove[n] % _this.lineHeight) >= _this.lineHeight/2){
						_this.tMove[n] -= _this.lineHeight -Math.abs(_this.tMove[n] % _this.lineHeight);
					}

					//滚动改变了
					if(cacheMove != _this.tMove[n]) {

						//在页面记录滚动的距离
						_this.setTop($moveObj, _this.tMove[n],n);

						//如果有ajax请求接口
						if(_this.ajaxUrl) {

							//获取id
							var selectedId = _this.getItemId(_this.moveObj.eq(n), _this.tMove[n]);

							if(n == 0) {
								
								_this.eleAnimate(_this.moveObj.eq(1), 0,0);		
								_this.eleAnimate(_this.moveObj.eq(2), 0,0);
								_this.setTop(_this.moveObj.eq(1), 0, 1);
								_this.setTop(_this.moveObj.eq(2), 0, 2);

								_this.getDataFn("city", selectedId, _this.moveObj.eq(1), 1);

							}else if(n == 1){	
								_this.eleAnimate(_this.moveObj.eq(2), 0,0);	
								_this.setTop(_this.moveObj.eq(2), 0, 2);

								_this.getDataFn("area", selectedId, _this.moveObj.eq(2), 2);
							}
						}
					}		

					//滚动
					_this.eleAnimate($moveObj, _this.tMove[n], '0.3s');			

				});
			});
			
			_this.btnSure.off().on("click", function() {

				//显示 选择的地址到输入框
				var sText = [];
				var sId = [];
				for(var i=0; i<_this.moveObj.length;i++) {
					sText.push(_this.getItemText(_this.moveObj.eq(i), _this.tMove[i]));
					sId.push(_this.getItemId(_this.moveObj.eq(i), _this.tMove[i]))
					_this.moveObj.eq(i).attr("data-sureTop", _this.tMove[i]);
				}
				_this.addrInput.val(sText.join(""));

				_this.hideSelect();

				_this.sureFn && _this.sureFn(sId,sText);
			});

			_this.btnCancel.off().on("click", function() {

				var sureTop = [];
				for(var i=0; i<_this.moveObj.length;i++) {
					
					sureTop.push(parseInt(_this.moveObj.eq(i).attr("data-sureTop")));

					//top值重设到上一次
					_this.setTop(_this.moveObj.eq(i), sureTop[i], i)
					//回滚到原位
					_this.eleAnimate(_this.moveObj.eq(i), sureTop[i], 0);

				}

				_this.hideSelect();
				_this.cancelFn && _this.cancelFn();
			});
			
		},
		moveItemHeight: function(obj, i) {
			var _this = this;
			
			_this.heightArr[i] = (obj.height() - _this.lineHeight);
		},
		startendPos: function() {
			var _this = this;
			_this.tStart = [];
			_this.tEnd = [];
			for(var i=0; i<_this.moveObj.length;i++) {
				_this.tStart.push(0);
				_this.tEnd.push(0);
			}
		},
		setTop: function(obj,top,ix) {   //在页面记录 translateY
			var _this = this;
			obj.attr("data-top",top);
			_this.tMove[ix] = top;
		},
		getTop: function(obj) {		//获取页面中的 translateY
			var val = obj.attr("data-top");
			return parseInt(val)
		},
		topArr: function() {		////translateY 数组
			var _this = this;
			var topArr = [];
			for(var i=0;i<_this.moveObj.length;i++) {
				var setTransY = _this.getTop(_this.moveObj.eq(i)) ? _this.getTop(_this.moveObj.eq(i)) : 0;
				topArr.push(parseInt(setTransY));
			}
			return topArr;
		},
		eleAnimate: function(ele, length, time){//日期滚动动画

			ele.css({
	            "-webkit-transform": "translateY(" + length + "px)",
	            "-webkit-transition-property": "all",
	            "-webkit-transition-duration": time,
	            "-webkit-transition-timing-function": "ease-out"
	        });
		},
		getItemId: function(obj, top) {
			var _this = this;
			return _this.getItemInfo(obj, top).id
		},
		getItemText: function(obj, top) {
			var _this = this;
			return _this.getItemInfo(obj, top).text
		},
		getItemInfo: function(obj, top) {
			var _this = this;
			var selectIndex = Math.abs(top/_this.lineHeight);
			var text = obj.find("li").eq(selectIndex).text() ? obj.find("li").eq(selectIndex).text()  : "";
			var id = obj.find("li").eq(selectIndex).attr("id") ? obj.find("li").eq(selectIndex).attr("id") : "";
			return {"id": id, "text": text}
		},
		hideSelect: function() {
			var _this = this;
			//隐藏
			_this.addrPickerBox.removeClass("show");
			//页面解锁
			//_this.pageUnlock(); 
			jm.pageUnlock();
		},
		// pageLock: function(){
		// 	document.addEventListener("touchmove", pageLockHandler, false)
		// },
		// pageUnlock: function(){
		// 	document.removeEventListener("touchmove", pageLockHandler, false)
		// },
		getDataFn: function(type, id, obj, ix) {
			var _this = this;
			var parentId = id ? id : 0;

			if (_this.cacheMap[parentId]) {
				createHtml(type, parentId); //数据绘制
				
				// 开始、结束位置 数组
				_this.startendPos(); 
				// 滑动区域高度
				_this.moveItemHeight(_this.moveObj.eq(ix), ix);

			} else {
	            if(!_this.ajaxUrl[type] || !_this.ajaxUrl[type].length)return false;

				_this.getAjaxData(_this.ajaxUrl[type], parentId, function(json){
					_this.cacheMap[parentId] = json ; //保留缓存
					createHtml(type, parentId); //数据绘制

					// 开始、结束位置 数组
					_this.startendPos(); 
					_this.moveItemHeight(_this.moveObj.eq(ix), ix);  //计算高度
				});
			}


			function createHtml(type, id) {
				var json = _this.cacheMap[id];
				var html = '';

				if (json.areaList.length) {
					for (var i = 0; i < json.areaList.length; i++) {
						html += ('<li id="' + json.areaList[i].id + '" value="'+json.areaList[i].name+'">' + json.areaList[i].name + '</li>');
					}

					if (type == "province") {
						obj.html(html);

						_this.getDataFn("city", _this.moveObj.eq(0).find("li").eq(0).attr("id"), _this.moveObj.eq(1), 1);
					}
					if (type == "city") {
						obj.html(html);
						var selId = _this.topArr()[1] != 0 ? _this.getItemId(_this.moveObj.eq(1), _this.tMove[1]) : _this.moveObj.eq(1).find("li").eq(0).attr("id");
						_this.getDataFn("area", selId, _this.moveObj.eq(2), 2);
					}
					if (type == "area") {
						obj.html(html);
                    }
                }
			}
		},
		getAjaxData: function(url, id, callback) {
			$.ajax({
	            url: url,
	            type: "GET",
	            dataType: "json",
	            data: "parentId=" + id,
	            success: function (data) {
	                callback && callback(data);
	            },
	            error:function() {
	            }
	        });
		}
	}

    module.exports = AddrPicker;
});