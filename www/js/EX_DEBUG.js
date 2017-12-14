// 清空所有缓存
var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
if (keys) {
    for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
}
if (localStorage)
    localStorage.clear();

var WXDEBUG = false;
function OAuth() {
    if (location.pathname.toLowerCase().indexOf("pushpage") > 0) {
        //获取用户信息
        UserGetUserDetail();
        setTimeout(function () {
            locationObj = new Object;
            locationObj.CITY = "北京市";
            locationObj.REGION = "北京市";
            locationObj.COUNTY = "西城区";
            locationObj.ADDRESS_DESCRIPTION = "北京市西城区";
        }, 500);

    } else if (location.pathname.toLowerCase().indexOf("team_qr") > 0) {
        //UserTeamConfirmState(1);//初次调用
        TaskGetTaskDetailNew();
    } else if (location.pathname.toLowerCase().indexOf("index_z") > 0) {
        useropenid = GetQueryString("o");
        userInfoReady = true;
        locationObj = new Object;
        locationObj.CITY = "北京市";
        locationObj.REGION = "北京市";
        locationObj.COUNTY = "西城区";
        locationObj.ADDRESS_DESCRIPTION = "北京市西城区";
        $.hideLoading();
        GetTaskQR();
    } else if (location.pathname.toLowerCase().indexOf("tuiguang") > 0) {
        useropenid = GetQueryString("o");
    } else {
        GetTaskQR();
        locationObj = new Object;
        locationObj.CITY = "北京市";
        locationObj.REGION = "北京市";
        locationObj.COUNTY = "西城区";
        locationObj.ADDRESS_DESCRIPTION = "北京市西城区";
        $.hideLoading();
    }
}

function onMenuShareAppMessage() {

}
function onMenuShareTimeline() {

}
function showShareMenu() {

}


function GetUserOpenid() {
    //获取用户信息
    UserGetUserDetail();
}
function No_box(_tid) {
    if (typeof(taskObjNest) != "undefined") {
        currentTaskObj = taskObjNest.get(_tid)[0];// taskObj.filter(function (val) { return val["ID"] == _tid; })[0];
        if (currentTaskObj.T_CLASS == 4) {
            No_box_do_b();
        } else {
            No_box_do();
        }
    }
}

function PushpageSwitch() {
    if (MyInfo)
        MyInfo.U_CREDITLEVEL = (GetQueryString("star") == null ? MyInfo.U_CREDITLEVEL : Number(GetQueryString("star")));
}

setTimeout(function () {
    locationObj = new Object;
    locationObj.CITY = "北京市";
    locationObj.REGION = "北京市";
    locationObj.COUNTY = "西城区";
    locationObj.ADDRESS_DESCRIPTION = "北京市西城区";
}, 500);