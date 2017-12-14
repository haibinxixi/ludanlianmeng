var NewDituiStats = function () {
    var url = "https://dt.newditui.com/view/statsjs.html";

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

    this.SendStats = function (data, successCallback, errorCallback) {
        if (data.data == null || data.data == "") {
            console.log("对账参数openid不能为空");
            return;
        }

        if (successCallback) {
            if (typeof (successCallback) != "function") {
                console.log("回调参数错误");
                return;
            }
        }
        var newditui_uid = GetQueryString("newditui_uid");
        var newditui_tid = GetQueryString("newditui_tid");
        var newditui_tlid = GetQueryString("newditui_tlid");

        var i = document.createElement('iframe');
        i.src = url + '?data=' + data.data
            + (data.exdata ? "&exdata=" + data.exdata : "")
            + (data.phone ? "&phone=" + data.phone : "")
            + (data.action ? "&action=" + data.action : "")
            + (newditui_uid ? "&newditui_uid=" + newditui_uid : "")
            + (newditui_tid ? "&newditui_tid=" + newditui_tid : "")
            + (newditui_tlid ? "&newditui_tlid=" + newditui_tlid : "");
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
                successCallback && successCallback();
            }, 9)
        }
        document.body.appendChild(i);
    };
}