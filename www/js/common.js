//------------公共变量-------------------
var WX_appId = "wxb187ca7c86333eca";
var WX_scurityUrl = "zl.newditui.com";
var g_UrlHost = window.location.protocol + "//" + WX_scurityUrl;
var g_OSSHost = window.location.protocol + "//ditui.oss-cn-beijing.aliyuncs.com/";
//---------------------------------------
$.toast && ($.toast.prototype.defaults.duration = 1000);

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }
}

//动态加载
function loadExtentFile(filePath, fileType, successCallback, errorCallback) {
    if (fileType == "js") {
        var oJs = document.createElement('script');
        oJs.setAttribute("type", "text/javascript");
        oJs.setAttribute("src", filePath);
        oJs.setAttribute("charset", "utf-8");
        document.getElementsByTagName("head")[0].appendChild(oJs);
        oJs.onload = oJs.onreadystatechange = function () {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                if (successCallback)
                    successCallback();
            } else {
                if (errorCallback)
                    ;//      errorCallback();
            }
            oJs.onload = oJs.onreadystatechange = null;
        }
        oJs.onerror = function () {
            if (errorCallback)
                errorCallback();
        }
    } else if (fileType == "css") {
        var oCss = document.createElement("link");
        oCss.setAttribute("rel", "stylesheet");
        oCss.setAttribute("type", "text/css");
        oCss.setAttribute("href", filePath);
        document.getElementsByTagName("head")[0].appendChild(oCss); //绑定
    }
}

//将分转换为元
function FenToYuan(fen) {
    var yuan = fen / 100.00;
    return Number(yuan).toFixed(2);
}
//将元转换为分
function YuanToFen(yuan) {
    var fen = yuan * 100;
    return Number(fen);
}

function FormatDate(strTime) {
    var date = new Date(strTime);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

function dateFormat(_str, _format) {
    return jsonToDate(_str).format(_format);
}

function jsonToDate(_str) {
    return new Date(+/\d+/.exec(_str));
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function getJSONDate(obj) {
    var result = "";
    var offsetStr = "";
    var offset = 0;
    var now = null;
    if (obj.constructor == Date) {
        now = obj;
        offset = now.getTimezoneOffset() / 60 * -1;
        offsetStr = (offset > 0 ? "+" : "-") + (Math.abs(offset) > 9 ? "" : "0") + Math.abs(offset).toString() + "00";
        result = "\/Date(" + now.getTime() + offsetStr + ")\/";
    }
    else if (typeof obj == "string") {
        now = new Date(obj.replace(/-/g, "/"));
        offset = now.getTimezoneOffset() / 60 * -1;
        offsetStr = (offset > 0 ? "+" : "-") + (Math.abs(offset) > 9 ? "" : "0") + Math.abs(offset).toString() + "00";
        result = "\/Date(" + now.getTime() + offsetStr + ")\/";
    }
    return result;
}

//Ajax方法封装
function FuncAjax(ajaxUrl, ajaxData, ajaxSuccess, ajaxError, isShowLoading, beforeSendCallback) {
    if (isShowLoading) { $.showLoading("请稍候..."); }
    return $.ajax({
        type: 'post',
        contentType: 'text/json',
        url: ajaxUrl,
        data: ajaxData,
        dataType: 'json',
        cache: false,
        timeout: 30000,
        beforeSend: function (XHR) {
            if (beforeSendCallback)
                return beforeSendCallback(XHR);
        },
        error: function (msg) {
            if (ajaxError)
                ajaxError(msg);
            if (isShowLoading) { $.hideLoading(); }
        },
        success: function (obj) {
            if (isShowLoading) { $.hideLoading(); }
            ajaxSuccess(obj);
        }
    });
}

/*对象深度克隆*/
function deepClone(obj) {
    var result = {}, oClass = isClass(obj);
    for (key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy);
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

Array.prototype.includes = Array.prototype.includes || function (searchElement) {
    'use strict';
    var O = this;
    var len = parseInt(O.length) || 0;
    if (len === 0) {
        return false;
    }
    var n = parseInt(arguments[2]) || 0;
    var k;
    if (n >= 0) {
        k = n;
    } else {
        k = len + n;
        if (k < 0) { k = 0; }
    }
    var currentElement;
    while (k < len) {
        currentElement = O[k];
        if (searchElement === currentElement ||
           (searchElement !== searchElement && currentElement !== currentElement)) {
            return true;
        }
        k++;
    }
    return false;
}

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}

// 写cookie
function setCookie(name, value, days) {
    var Days = typeof (days) == "undefined" ? 720 : days;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    if (localStorage) {
        localStorage.setItem(name, value);
    }
}

// 读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]) == "" ? null : unescape(arr[2]);
    else if (localStorage) {
        return localStorage.getItem(name);
    }
    return null;
}

// 删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    localStorage.removeItem(name)
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function SetUrlRefresh(url) {
    if (url.indexOf("?") > 0) {
        return url + "&t=" + (new Date().getTime());
    } else {
        return url + "?t=" + (new Date().getTime());
    }
}

function errorImg() {
    var img = event.srcElement;
    img.src = "/View/img/logo.png";
    img.onerror = null;
}

//距离计算
var DEF_PI = 3.14159265359; // PI
var DEF_2PI = 6.28318530712; // 2*PI
var DEF_PI180 = 0.01745329252; // PI/180.0
var DEF_R = 6370693.5; // radius of earth
function getFlatternDistance(lon1, lat1, lon2, lat2) {
    var ew1, ns1, ew2, ns2;
    var dx, dy, dew;
    var distance;
    // 角度转换为弧度
    ew1 = lon1 * DEF_PI180;
    ns1 = lat1 * DEF_PI180;
    ew2 = lon2 * DEF_PI180;
    ns2 = lat2 * DEF_PI180;
    // 经度差
    dew = ew1 - ew2;
    // 若跨东经和西经180 度，进行调整
    if (dew > DEF_PI)
        dew = DEF_2PI - dew;
    else if (dew < -DEF_PI)
        dew = DEF_2PI + dew;
    dx = DEF_R * Math.cos(ns1) * dew; // 东西方向长度(在纬度圈上的投影长度)
    dy = DEF_R * (ns1 - ns2); // 南北方向长度(在经度圈上的投影长度)
    // 勾股定理求斜边长
    distance = Math.sqrt(dx * dx + dy * dy).toFixed(0);
    console.log(distance)
    return distance;
}

function checkChinese(str) { var re = /[^\u4e00-\u9fa5]/; if (re.test(str)) return false; return true; };

function checkChineseName(v) {
    if (v == '') return false; if (v.length < 2) { return false; }
    var name = v.replace(/·/g, ''); name = name.replace(/•/g, '');
    if (checkChinese(name)) return true; else return false;
};


function GetObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function getOsType() {
    if (navigator.userAgent.match(/Android/i)) {
        return 2;
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        return 1;
    } else if (navigator.userAgent.match(/IEMobile/i)) {
        return 4;
    } else {
        return 2;
    }
}

document.setTitle = function (t) {
    document.title = t;
    var i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
        setTimeout(function () {
            i.remove();
        }, 9)
    }
    document.body.appendChild(i);
}

function checkLocation(_taskObj,_locationObj) {
    var flag = false;
    var area = _taskObj.RESTRICT_LIST.find(function (val) { return val.R_TYPE == 3 });
    var area2 = _taskObj.RESTRICT_LIST.find(function (val) { return val.R_TYPE == 5 });
    if (area2 == undefined && area == undefined) {
        return true;
    }
    if (area) {
        var areaArr = area.R_VALUE.split(";");
        for (i = 0; i < areaArr.length; i++) {
            var areaArr2 = areaArr[i].split(":");
            for (j = 0; j < areaArr2.length; j++) {
                if (areaArr2[0] == "省") {
                    if (areaArr2[1].indexOf(_locationObj.REGION) > -1) {
                        if (areaArr2[1].indexOf("!") > -1) {
                            return false;
                        }
                        flag = true;
                    }
                }
                if (areaArr2[0] == "市") {
                    if (areaArr2[1].indexOf(_locationObj.CITY) > -1) {
                        if (areaArr2[1].indexOf("!") > -1) {
                            return false;
                        }
                        flag = true;
                    }
                }
                if (areaArr2[0] == "区") {
                    if (areaArr2[1].indexOf(_locationObj.COUNTY) > -1) {
                        if (areaArr2[1].indexOf("!") > -1) {
                            return false;
                        }
                        flag = true;
                    }
                }
            }
        }
    } else {
        flag = true;
    }

    if (area2) {
        var areaArr = area2.R_VALUE.split(";");
        for (i = 0; i < areaArr.length; i++) {
            var areaArr2 = areaArr[i].split(",");
            var dist = getFlatternDistance(areaArr2[0], areaArr2[1], lng, lat);
            if (dist < Number(areaArr2[2])) {
                flag = true;
            } else {
                flag = false;
            }
        }
    }
    return flag;
}

function unzip(strData) {
    var data = pako.inflate(strData, { to: 'string' });
    data = JSON.parse(data);
    return data;
}
function zip(str) {
    var binaryString = pako.deflate(str, { to: 'string' });
    return binaryString;
}