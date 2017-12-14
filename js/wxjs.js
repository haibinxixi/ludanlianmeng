var timestamp = Math.round(new Date().getTime() / 1000);
var loadCount = 0;
var isLoad = false;
var randomString = randomString || function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function LoadWX(wxReadyCallback, wxErrorCallback) {
    if (isLoad)
        return;
    console.log("LoadWX");
    if (typeof (wx) == "undefined" && loadCount < 2) {
        loadExtentFile("https://res.wx.qq.com/open/js/jweixin-1.1.0.js?v=5", "js", function () { wxJsLoadSuccessCallback(wxReadyCallback, wxErrorCallback) }, wxJsLoadErrorCallback);
        console.log("wxload count:" + loadCount);
    }
    else if (typeof (wx) != "undefined")
        wxJsLoadSuccessCallback(wxReadyCallback, wxErrorCallback);
    else {
        $.modal({
            title: '',
            text: "微信服务无法加载，请重试",
            buttons: [
                {
                    text: "取消", className: "default", onClick: function () {
                        $.modal({
                            title: '',
                            text: "不加载微信服务将无法使用扫码建任务功能，确定吗？",
                            buttons: [
                                { text: "确定", onClick: function () { } },
                                { text: "重试", onClick: function () { loadCount = 0; LoadWX(wxReadyCallback, wxErrorCallback); } }
                            ]
                        });
                    }
                },
                { text: "重试", onClick: function () { loadCount = 0; LoadWX(wxReadyCallback, wxErrorCallback); } },
            ]
        });
    }
}

function GetSignature() {
    var noncestr = randomString();
    $.ajax({
        type: 'post',
        contentType: 'text/json',
        url: '//dt.newditui.com/Weixin/GetJSSingnature',
        //url: '//zl.newditui.com/Weixin/GetJSSingnature',
        //url: '/Weixin/GetJSSingnature',
        data: '{"noncestr":"' + noncestr + '","timestamp":"' + timestamp + '","url":"' + window.location.href.split('#')[0] + '"}',
        dataType: 'json',
        error: function (msg) {
            if (loadCount < 2) {
                setTimeout("GetSignature()", 1000);
            }
            loadCount++;
        },
        success: function (obj) {
            wx.config({
                debug: typeof (WXDEBUG) == "boolean" ? WXDEBUG : false,
                appId: WX_appId,
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: obj.ResultOBJ,
                jsApiList: ['showMenuItems', 'hideAllNonBaseMenuItem', 'scanQRCode', 'getLocation', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseImage', 'uploadImage', 'downloadImage', 'previewImage']
            });
        }
    });
}

function wxJsLoadSuccessCallback(wxReadyCallback, wxErrorCallback) {
    isLoad = true;
    console.log("wxJsLoadSuccessCallback");
    GetSignature();
    wx.ready(wxReadyCallback);
    wx.error(wxErrorCallback);
}

function wxJsLoadErrorCallback() {
    console.log("wxJsLoadErrorCallback");
    loadCount++;
    LoadWX();
}

function hideMenu(list) {
    if (typeof (wx) != "undefined") {
        if (list) {
            wx.hideMenuItems({ menuList: list });
        } else {
            wx.hideAllNonBaseMenuItem();
        }
    }
}

function showMenu(list) {
    if (typeof (wx) != "undefined") {
        if (list) {
            wx.showMenuItems({ menuList: list });
        } else {
            wx.showAllNonBaseMenuItem();
        }
    }
}

// all,appMessage, timeline
function showShareMenu(type) {
    var opt = { menuList: [] };
    if (type == undefined || type == "all") {
        opt.menuList.push("menuItem:share:appMessage");
        opt.menuList.push("menuItem:share:timeline");
        opt.menuList.push("menuItem:share:qq");
    } else if (type == "appMessage") {
        opt.menuList.push("menuItem:share:appMessage");
    } else {
        opt.menuList.push("menuItem:share:timeline");
    }
    wx.showMenuItems(opt);
}

// 分享给朋友
function onMenuShareAppMessage(title, desc, link, imgUrl, successCallback, cancelCallback) {
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            $.toast("分享成功");
            successCallback && successCallback();
        },
        cancel: function () {
            $.toast("取消分享");
            cancelCallback && cancelCallback();
        }
    });
}

// 分享到qq
function onMenuShareQQ(title, link, desc, imgUrl, successCallback, cancelCallback) {
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            $.toast("分享成功");
            successCallback && successCallback();
        },
        cancel: function () {
            $.toast("取消分享");
            cancelCallback && cancelCallback();
        }
    });
}

// 分享到朋友圈
function onMenuShareTimeline(title, link, imgUrl, successCallback, cancelCallback) {
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            $.toast("分享成功");
            successCallback && successCallback();
        },
        cancel: function () {
            $.toast("取消分享");
            cancelCallback && cancelCallback();
        }
    });
}


