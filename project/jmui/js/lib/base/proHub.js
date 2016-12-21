/**
 * @Author: Created By McChen
 * @Date: 2015/12/17
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

/* 定义一个全局接口对象 */
window.global = {};

window.global.proHub = (function () {
    var baseUrl = "../../data/";       // 公用头
    var timeout = 3000;     // 请求时间


    function request(data, callback, fainFn, url, type, dataType) {
        $.ajax({
            url: baseUrl + url,
            data: data,
            type: type,
            timeout: timeout,
            dataType: dataType,
            success: function (data) {
                callback && callback(data);
            },
            error: function () {
                fainFn && fainFn();
            }
        })
    }

    return {
        proHub1: function(data, succee, failFn){
            request(data, succee, failFn, "password.json", "get", "json");
        },
        proHub2: function(data, succee, failFn){
            request(data, succee, failFn, "password2.json", "post", "json");
        }
    }
})();