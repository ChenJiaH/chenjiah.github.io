/**
 * @Author: Created By McChen
 * @Date: 2016/1/21
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

define(function (require, exports, module) {
    var addrPicker = require("AddrPicker");

    var addrPickerPage = {
        init: function () {
            var _this = this;
            _this.useModule();
        },

        useModule: function () {
            var myAddrPicker = new addrPicker({
                selecteBtn: $("#btnChooseAddr"),
                addrPickerBox: $("#addrPicker"),
                moveBox: $(".picker-item"),
                moveObj: $(".picker-ul"),
                btnSure: $("#pickerSure"),
                btnCancel: $("#pickerCancel"),
                addrInput: $("#addrInput"),
                lineHeight: 40,
                ajaxUrl: {"province": "../data/provinces.json", "city": "../data/citys.json", "area": "../data/areas.json"},
                //ajaxUrl: {"province": "http://baitiao.jd.com/v3/mobile/addr_getProvinces", "city": "http://baitiao.jd.com/v3/mobile/addr_getCitys", "area": "http://baitiao.jd.com/v3/mobile/addr_getCountys"},
                sureFn: function(id,text) {
                    $("#addrProvince").val(id[0] + "," + text[0])
                    $("#addrCity").val(id[1] + "," + text[1])
                    $("#addrArea").val(id[2] + "," + text[2])
                }
            })
        }
    };


    $(function () {
        FastClick && FastClick.attach(document.body);
        addrPickerPage.init();
    });

    module.exports = addrPickerPage;
});
