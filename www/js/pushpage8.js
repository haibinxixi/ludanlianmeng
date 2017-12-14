//---------------------------------------通用-------------------------------------------------------------------------------------------
// area为B_NAME字段，key目前可以为：指定场所、目标人群、行业、结算标准、推广话术、推广礼品
function GetValueFromBName(area, key) {
    var value = "";
    if (area) {
        var areaArr = area.split(";");
        var areaArr2;
        for (i = 0; i < areaArr.length; i++) {
            areaArr2 = areaArr[i].split(":");
            for (j = 0; j < areaArr2.length; j++) {
                if (areaArr2[0] == key) {
                    return areaArr2[1];
                }
            }
        }
    }
    return value;
}

function PushpageSwitch(type) {
    type += '';
    switch (type) {
        case "0": case "1": case "2": case "3": case "4": case "5": case "6":
            if (window.location.pathname.toLowerCase() != "/view/pushpage7.html") {
                location.href = window.location.protocol + "//" + WX_scurityUrl + "/view/pushpage7.html";
                return true;
            }
            break;
        case "8":
            if (window.location.pathname.toLowerCase() != "/view/pushpage7w.html") {
                location.href = window.location.protocol + "//" + WX_scurityUrl + "/view/pushpage7w.html";
                return true;
            }
            break;
        case "9":
            if (window.location.pathname.toLowerCase() != "/view/pushpage7c.html") {
                if (OPENID != null) {
                    location.href = window.location.protocol + "//cp.newditui.com/view/pushpage7c.html?openid=" + OPENID + "&Token=" + Token;
                }
                return true;
            }
            break;
    }
    return false;
}

; (function ($) {
    $.CountDown = {
        begin: function (selector, options) {
            var $this = $(selector);
            if ($this.attr("data-cd-timmeoutid") != "0") {
                clearTimeout($this.attr("data-cd-timmeoutid"));
                $this.html($this.attr("data-cd-html"));
            }
            options = $.extend(true, { countDown: 5, callback: function () { console.log("countdown is ok") } }, options);

            var btnContent = $this.html(),
                cd = options.countDown;
            $this.attr("data-cd-html", btnContent);
            function CD() {
                if (cd >= 0) {
                    $this.html(btnContent + " <span style='font-size:12px'>(" + format(cd) + ")</span>");
                    cd--;
                    $this.attr("data-cd-timmeoutid", setTimeout(function () { CD() }, 1000));
                } else {
                    $this.attr("data-cd-timmeoutid", 0);
                    $this.html(btnContent);
                    options.callback();
                }
            }
            function format(_time) {
                if (_time == null)
                    return "0秒";
                else if (_time < 60)
                    return _time + "秒";
                else if (_time < 3600) {
                    var ss = _time % 60;
                    ss = (ss < 10 ? ("0" + ss) : ss);
                    return parseInt(_time / 60) + "分" + ss + "秒";
                }
                else {
                    var mm = _time % 3600;
                    var ss = mm % 60 == 0 ? 0 : (mm % 60);
                    mm = parseInt(mm / 60);
                    mm = mm < 10 ? "0" + mm : mm;
                    ss = ss < 10 ? "0" + ss : ss;
                    return parseInt(_time / 3600) + "时" + mm + "分" + ss + "秒";
                }
            }
            CD();
        },
        stop: function (selector) {
            var $this = $(selector);
            if ($this.attr("data-cd-timmeoutid") != "0") {
                clearTimeout($this.attr("data-cd-timmeoutid"));
                $this.html($this.attr("data-cd-html"));
            }
        }
    };
})(jQuery);

//---------------------------------------任务-------------------------------------------------------------------------------------------
var gRestrictEnum = {
    1: { name: "开始时间" },
    2: { name: "结束时间" },
    3: { name: "地域限制" },
    4: { name: "不可申述" },
    5: { name: "地域半径" },
    6: { name: "开放时间" },
    7: { name: "数量限制" },
    8: { name: "可见星级" },
    9: { name: "拉人星级" },
    10: { name: "是否允许开干" },
    11: { name: "是否能导入盒子" },
    12: { name: "是否裂变" },
    13: { name: "取证手段" },
    14: { name: "埋点描述" },
    15: { name: "前置问卷" },
    16: { name: "待审单描述" },
    17: { name: "静默授权" },
    18: { name: "任务步骤描述" },
    19: { name: "拉人分享语" },
    20: { name: "任务分享语" },
    21: { name: "一级分享奖励" },
    22: { name: "二级分享奖励" },
    23: { name: "无需审核任务" }
}

function FixTaskObjRestrict(obj) {
    var item;
    //obj.R_AREA = item.R_VALUE;
    //obj.R_AREA = item.R_VALUE;
    //obj.R_OPENTIME = item.R_VALUE;
    //obj.R_STAR = Number(item.R_VALUE);
    //obj.R_STOP = Number(item.R_VALUE);
    //obj.R_DUIZHANG = item.R_VALUE;
    //obj.R_MAIDIANMIAOSHU = item.R_VALUE;
    //obj.R_DAISHENMIAOSHU = item.R_VALUE;
    //obj.R_OAUTH = item.R_VALUE;
   
    obj.R_SHARE_TITLE = obj.T_NAME + "送您" + obj.T_BROKERAGE + "元,速度抢！";
    obj.R_SHARE_DESC = "卤蛋部落,可能是最专业靠谱的网赚平台,实现你的躺赚梦想！";
    obj.R_FXJL1 = 0;
    obj.R_FXJL2 = 0;
    for (var key in obj.RESTRICT_LIST) {
        item = obj.RESTRICT_LIST[key];
        switch (item.R_TYPE) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                obj.R_AREA = item.R_VALUE;
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                obj.R_OPENTIME = item.R_VALUE;
                break;
            case 7:
                obj.R_NUM_LIMIT = item.R_VALUE;
                break;
            case 8:
                obj.R_STAR = Number(item.R_VALUE);
                break;
            case 9:
                break;
            case 10:
                obj.R_STOP = Number(item.R_VALUE);
                break;
            case 11:
                break;
            case 12:
                break;
            case 13:
                obj.R_DUIZHANG = item.R_VALUE;
            case 14:
                obj.R_MAIDIANMIAOSHU = item.R_VALUE;
                break;
            case 15:
                obj.R_WJURL = item.R_VALUE;
                break;
            case 16:
                obj.R_DAISHENMIAOSHU = item.R_VALUE;
                break;
            case 17:
                obj.R_OAUTH = item.R_VALUE;
                break;
            case 18:
                obj.R_ACTION = item.R_VALUE.split(",");
                break;
            case 19:
                break;
            case 20:
                if (item.R_VALUE.split("$$$$").length > 1) {
                    obj.R_SHARE_TITLE = restrict.R_VALUE.split("$$$$")[0];
                    obj.R_SHARE_DESC = restrict.R_VALUE.split("$$$$")[1];
                } else {
                    obj.R_SHARE_DESC = restrict.R_VALUE.split("$$$$")[0];
                }
                break;
            case 21:
                obj.R_FXJL1 = Number(item.R_VALUE);
                break;
            case 22:
                obj.R_FXJL2 = Number(item.R_VALUE);
                break;
            case 23:
                obj.R_NOTPAY = Number(item.R_VALUE);
                break;
        }
    }
}

//获取任务接口
function TaskGetTaskListDetail(isShowLoading) {
    FuncAjax('/task/GetTaskList/' + OPENID, '', function (obj) {
        if (obj.ResultOBJ != null) {
            init_task_list(obj.ResultOBJ);
            beginTime = + new Date();
            CheckNotUploadTask();
        }
    }, function () {
        alert("获取任务列表出错");
    }, isShowLoading ? isShowLoading : false);
}


// 检查是否有未上传证据的任务，直接进入任务页面
function CheckNotUploadTask() {
    var tmpTask = taskObj.find(function (o) { return o.T_STATE == 1 && o.PROOF_LIST.length == 0; });
    if (tmpTask) {
        $.modal({
            title: "",
            text: '<div class="text-left">您报名的<span class="green">' + tmpTask.T_NAME + '</span>还未提交证据，完成任务后才能继续做其他任务。</div>',
            buttons: [
                { text: "继续完成任务", onClick: function () { TaskDetailShow(tmpTask.ID); } },
            ]
        });
    }
}
function task_filter(obj) {
    var now = new Date(), objTmp = [];
    if (MyInfo.U_CREDITLEVEL == -1) {
        return objTmp;
    }

    for (var i = 0; i < obj.length; i++) {
        FixTaskObjRestrict(obj[i]);
        //只显示已接，可接任务+过滤任务条件
        //if (obj.DT_ID != 0) {
        //    objTmp.push(obj[i]);
        //} else if (obj[i].DT_U_ID == MyInfo.ID) {
            objTmp.push(obj[i]);
        //}
    }
    return objTmp;
}


function checkLocationTaskShow(taskObj) {
    var area = taskObj.R_AREA;
    if (area) {
        if (locationObj) {
            var areaArr = area.split(";");
            for (var i = 0; i < areaArr.length; i++) {
                var areaArr2 = areaArr[i].split(":");
                for (var j = 0; j < areaArr2.length; j++) {
                    if (areaArr2[0] == "省") {
                        if (areaArr2[1].indexOf(locationObj.REGION) > -1) {
                            if (areaArr2[1].indexOf("!") > -1) {
                                return false;
                            }
                            return true;
                        }
                    }
                    if (areaArr2[0] == "市") {//有城市限制
                        if (areaArr2[1].indexOf(locationObj.CITY) > -1) {
                            if (areaArr2[1].indexOf("!") > -1) {
                                return false;
                            }
                            return true;
                        }
                    }
                }
            }
        } else {
            $.modal({
                title: "",
                text: '<i class="fa fa-info-circle orange text-m"></i>位置信息获取失败<br>请在手机设置中打开定位功能。',
                buttons: [
                    { text: "刷新页面重试", onClick: function () { location.reload(true) } },
                ]
            });
        }
    } else {
        return true;
    }
}

function init_task_list(obj) {
    taskObjAll = obj;
    taskObjAll.sort(function (a, b) { return a.ID < b.ID ? 1 : -1 });
    taskObjNest = d3.nest()
        .key(function (d) { return d.ID; })
        .map(taskObjAll, d3.map);
    taskObj = task_filter(taskObjAll);

    $("#task_list").empty();
    $("#detils_lists").empty();

    var empty1 = true;
    var empty2 = true;

    for (var i = 0; i < taskObj.length; i++) {
        if (taskObj[i].T_STATE == 0) {
            empty1 = false;
            $("#task_list").append(TaskListDom(taskObj[i]));
        } else {
            empty2 = false;
            $("#detils_lists").append(TaskIncomeListDom(taskObj[i]));
        }
    }
    if (empty1) {
        $("#task_list").html('<div class="padding-area text-s text-center" onclick="OpenPage(\'wallet_page\')">暂无未报名任务，请在<span class="green">[我的]</span>中查看已报名任务</div>');
    }
    if (empty2) {
        $("#detils_lists").html('<div class="padding-area text-s text-center" onclick="OpenPage(\'task_page\')">暂无,请在<span class="green">[任务]</span>中报名开始赚钱!</div>');
    }
}


function TaskIncomeListDom(obj) {
    var tmp = '<div class="weui-cell task-list" onclick="TaskDetailShow(' + obj.ID + ');">';
    tmp += '<div class="weui-cell__bd weui-cell__primary"><p  class="task-name">' + obj.T_NAME + '<span class="pull-right orange">赏金<b class="text-l ">￥' + obj.T_BROKERAGE + '</b></span></p>';
    tmp += '<div class="task-label text-s">' + "[任务状态] ";
    
    //T_STATE
    // 0 未做
    // 1 已接
    // 2 提交
    // 3 已做(通过)
    // 4 已做(未通过)
    //if (obj.R_STOP == 1) {
    //    tmp += '<div class="weui-cell__ft task-income"><div><em>暂停推广</em></div>';
    //} else if (obj.T_STATE == 0) {
    //    tmp += '<div class="weui-cell__ft task-income"><div  class="orange">赏<em>￥' + obj.T_BROKERAGE + '</em></div>';
    //} else

    if (obj.T_STATE == 1) {
        tmp += '<span class="green">待完成</span>';

    } else if (obj.T_STATE == 2) {
        tmp += '<span class="green">待审核</span>';
    } else if (obj.T_STATE == 3) {
        tmp += '<span class="orange">已打款</span>';
    } else if (obj.T_STATE == 4) {
        tmp += '<span class="grey">失败原因：' + R_AUDIT_COMMENT +'</span>';
    }
    tmp += "</div>";

    tmp += '</div></div>';
    return tmp;
}


function TaskListDom(obj) {
    var tmp = '<div class="weui-cell task-list" onclick="TaskDetailShow(' + obj.ID + ');">';
    tmp += '<div class="weui-cell__hd"><img src="/' + obj.T_ICON + '" alt="' + obj.T_NAME + '" onerror="errorImg(this)"/></div>';
    tmp += '<div class="weui-cell__bd weui-cell__primary"><p class="task-name">';
    if (obj.T_SUMMARY) {
        tmp += '<span class="green">' + obj.T_SUMMARY + '</span> ';
    }
    tmp += obj.T_NAME + '</p>';

    if (obj.T_TOTALNUM < 0) {
        tmp += '<div class="task-label text-s"><i class="fa fa-info-circle green" aria-hidden="true"></i> 名额无限制</div>';
    } else {
        tmp += '<div class="task-label text-s"><i class="fa fa-info-circle green" aria-hidden="true"></i> 剩余:' + obj.T_OVERPLUSNUM + '个名额</div>';
    }
    
    // 推广地域
    if (obj.T_PROMOTION_AREA == null || obj.T_PROMOTION_AREA == "" || obj.T_PROMOTION_AREA == "暂无") {

    } else {
        tmp += '<div class="task-label label text-s"><i class="fa fa-map-marker green" aria-hidden="true"></i> ' + obj.T_PROMOTION_AREA + '</div>';
    }

    tmp += '</div>';
    //T_STATE
    // 0 未做
    // 1 已接
    // 2 提交
    // 3 已做(通过)
    // 4 已做(未通过)
    if (obj.R_STOP == 1) {
        tmp += '<div class="weui-cell__ft task-income"><div><em>暂停推广</em></div>';
    } else if (obj.T_STATE == 0) {
        tmp += '<div class="weui-cell__ft task-income"><div  class="orange">赏<em>￥' + obj.T_BROKERAGE + '</em></div>';
    } else if (obj.T_STATE == 1) {
        tmp += '<div class="weui-cell__ft task-income"><div  class="orange">赏<em>￥' + obj.T_BROKERAGE + '</em>(已接)</div><div class="orange"></div>';
    } else if (obj.T_STATE == 2){
        tmp += '<div class="weui-cell__ft task-income"><div  class="orange">赏<em>￥' + obj.T_BROKERAGE + '</em>(待审)</div><div class="orange"></div>';
    } else if (obj.T_STATE == 3) {
        tmp += '<div class="weui-cell__ft task-income"><div  class="orange">赏<em>￥' + obj.T_BROKERAGE + '</em>(完成)</div><div class="orange"></div>';
    } else if (obj.T_STATE == 4) {
        tmp += '<div class="weui-cell__ft task-income"><div  class="orange">赏<em>￥' + obj.T_BROKERAGE + '</em>(失败)</div><div class="orange"></div>';
    }

    if (obj.R_FXJL1) {
        tmp += '<span class="orange text-s">分享再赏 <b class="text-l">￥' + obj.R_FXJL1 + "</b></span>";
    }

    tmp += '</div>';
    tmp += '</div>';
    return tmp;
}

function GotoSoJump() {
    var href = currentTaskObj.T_URL + "?sojumpparm=" + (new Date()).getTime() + "_" + currentTaskObj.ID + "_" + MyInfo.ID;
    $("#wenjuan_iframe").attr("src", href);
    $.showLoading();
}

function CloseWenjuan(dom) {
    var $dom = $(dom);
    if ($dom.attr("src")) {
        if (!$("#task_wenjuan_cover").hasClass("hidden")) {
            $("#task_wenjuan_cover").addClass("hidden");
        } else {
            $("#task_wenjuan_cover").removeClass("hidden");
            $.hideLoading();
        }
    }
}

//任务详情
function TaskDetailShow(T_ID) {
    currentTaskObj = taskObjNest.get(T_ID)[0];
    if (currentTaskObj.R_STOP == 1) {
        var buttons = [{ text: "确定", className: "default", onClick: function () { $.closeModal(); } }];
        var textDiv = '[' + currentTaskObj.T_NAME + ']<br>此任务已暂停推广，请查看其他任务。<br><br>';
        $.modal({
            title: "",
            text: textDiv,
            buttons: buttons,
            autoClose: false
        });
        OpenPage("task_page");
        return;
    }

    StatisticalPageEx(1);
    InitTaskDetail();
}


function InitTaskDetail() {
    var str = '';
    $("#tasks").empty();
    str += '<div class="weui-form-preview" style="box-shadow: 0px 2px 5px #888888;z-index:1">';
    str += '<div class="weui-cell task-list green-bg white">';

    str += '<div class="weui-cell__hd"><img src="/' + currentTaskObj.T_ICON + '" onerror="errorImg();"></div>';
    str += '<div class="weui-cell__bd weui-cell__primary">';
    str += '<div class="task-name">' + currentTaskObj.T_NAME + '</div>';
    if (currentTaskObj.T_TOTALNUM < 0) {
        str += '<div class="task-label text-s white"><i class="fa fa-info-circle" aria-hidden="true"></i> 名额无限制</div>'; 
    } else {
        str += '<div class="task-label text-s white"><i class="fa fa-info-circle" aria-hidden="true"></i> 剩余: ' + currentTaskObj.T_OVERPLUSNUM + '个名额</div>'; 
    }
    
    str += '</div>';

    $.CountDown.stop("#overall-btn-baoming-btn");
    //if (currentTaskObj.R_NOTPAY) {
    //    str += '<div class="weui-cell__ft white"><div class="task-income">赏<em class="orange">￥' + currentTaskObj.T_BROKERAGE + '</em>(自动)</div>';
    //} else

    if (currentTaskObj.R_STOP == 1) {
        str += '<div class="weui-cell__ft task-income"><div><em>暂停推广</em></div>';
    } else if (currentTaskObj.T_STATE == 0) {
        str += '<div class="weui-cell__ft white"><div class="task-income">赏<em class="yellow">￥' + currentTaskObj.T_BROKERAGE + '</em></div>';
    } else if (currentTaskObj.T_STATE == 1) {
        str += '<div class="weui-cell__ft white"><div class="task-income">赏<em class="yellow">￥' + currentTaskObj.T_BROKERAGE + '</em>(已接)</div>';
    } else if (currentTaskObj.T_STATE == 2) {
        str += '<div class="weui-cell__ft white"><div class="task-income">赏<em class="yellow">￥' + currentTaskObj.T_BROKERAGE + '</em>(待审)</div>';
    } else if (currentTaskObj.T_STATE == 3) {
        str += '<div class="weui-cell__ft white"><div class="task-income">赏<em class="yellow">￥' + currentTaskObj.T_BROKERAGE + '</em>(完成)</div>';
    } else if (currentTaskObj.T_STATE == 4) {
        str += '<div class="weui-cell__ft white"><div class="task-income">赏<em class="yellow">￥' + currentTaskObj.T_BROKERAGE + '</em>(失败)</div>';
    }
    //if (currentTaskObj.R_NOTPAY) {
    //    str += '<span class="text-s">无需审核和报名</span></div>';
    //} else {
        str += '<span class="text-s">' + GetCycleStr(currentTaskObj.T_CYCLE) + '</span></div>';
    //}
    str += '</div>';

    
    str += '<div class="weui-form-preview__ft">';
    str += '<a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:ShowHaibao()"><i class="fa fa-fw fa-qrcode"></i> 我的专属推广码</a>';
    str += '<a class="weui-form-preview__btn green" href="javascript:ShowShareDialog()"><i class="fa fa-fw fa-share-alt"></i> 分享';
    if (currentTaskObj.R_FXJL1 && currentTaskObj.R_FXJL1>0) {
        str += '(再赏 <span class="orange">￥' + currentTaskObj.R_FXJL1 + '</span>)';
    }
    str += '</a>';
    str += '</div>';
    str += '</div>';

    var _value = "";

    str += '<div style="overflow-y: scroll;height:100%;padding-bottom:220px;-webkit-overflow-scroll:touch">';
    // 任务说明
    _value = currentTaskObj.T_DESCRIPTION == null ? "暂无" : currentTaskObj.T_DESCRIPTION == "" ? "暂无" : currentTaskObj.T_DESCRIPTION;
    str += '<div class="weui-panel"><div class="weui-panel__hd"><span class="weui-panel__hd_icon green-bg white"></span>任务说明</div><div class="weui-panel__bd"><div class="weui-media-box weui-media-box_text text-dq" style="padding-top:0px;"><p class="weui-media-box__desc">' + _value + '</p></div></div></div>';
    //str += '</div>';
    str += '<div class="weui-panel"><div class="weui-panel__hd"><span class="weui-panel__hd_icon green-bg white"></span>任务步骤</div>';
    str += '<div class="weui-panel__bd">';
    str += '<div class="task_step">';

    var qrcodeStr = convertQRcodeImage(currentTaskObj.T_URL);
    str += '<div class="weui-panel__hd"><span class="task_step_nr green-bg white">第1步</span>按住识别二维码：</div>';
    if (currentTaskObj.T_STATE > 0)
        str += '<div class="weui-panel__hd2"><div class="task_step_item text-center"><img src="' + qrcodeStr + '"></div></div>';
    else
        str += '<div class="weui-panel__hd2 weui-panel__hd2_center text-center orange">报名成功后立即显示二维码</div>';

    str += '<div class="clearfix"></div></div>'
    if (currentTaskObj.COURSE_LIST != null) {
        var actionId = 1;
        var proof;
        for (var i = 0; i < currentTaskObj.COURSE_LIST.length; i++) {
            str += '<div class="task_step">'
            str += '<div class="weui-panel__hd" style="text-indent:-56px;margin-left:56px"><span class="task_step_nr green-bg white">第' + (i + 2) + '步</span>';
            if (currentTaskObj.COURSE_LIST[i].CS_NAME) {
                str += '<span>' + currentTaskObj.COURSE_LIST[i].CS_NAME + '</span></div>';
            } else {
                str += '</div> ';
            }
            str += '<div class="weui-panel__hd2 text-center">';
            if (currentTaskObj.COURSE_LIST[i].CS_TYPE == 1) {
                //str += '<div class="weui-flex top-offset">';
                str += '<div class="task_step_item"><img class="task_step_item_img" onload="javascript:$(this).parent().addClass(\'task_step_item_img_proof\')" src="' + currentTaskObj.COURSE_LIST[i].CS_URL + '"></div>';
                proof = currentTaskObj.PROOF_LIST.find(function (obj) { return obj.P_ACTION == actionId });
                if (proof) {
                    str += '<div id="action_' + actionId + '" class="task_step_item"><img class="task_step_item_img" src="' + g_OSSHost + proof.P_URL + '"><a class="weui-btn weui-btn_orange" href="javascript:void(0)" onclick="ShowUploadFileDialog(' + actionId + ')"><p>更换</p></a></div>';
                } else {
                    str += '<div id="action_' + actionId + '" class="task_step_item"><a class="weui-btn weui-btn_primary" href="javascript:void(0)" onclick="ShowUploadFileDialog(' + actionId + ')"><i class="fa fa-fw fa-photo"></i>上传</a></div>';
                }
                
                //str += '</div> ';
                actionId++;
            } else if (currentTaskObj.COURSE_LIST[i].CS_TYPE == 2) {
               // str += '<div class="weui-flex top-offset">';
                str += '<div class="task_step_item"><img src="' + currentTaskObj.COURSE_LIST[i].CS_URL + '"></div>';
                proof = currentTaskObj.PROOF_LIST.find(function (obj) { return obj.P_ACTION == actionId });
                if (proof) {
                    str += '<div id="action_' + actionId + '" class="task_step_item"><p>' + proof.P_DATA + '</p><a class="weui-btn weui-btn_orange" href="javascript:void(0)" onclick="ShowSubmitTextDialog(' + actionId + ',' + proof.ID + ',\'' + proof.P_DATA + '\')"><p>修改</p></a></div>';
                } else {
                    str += '<div id="action_' + actionId + '" class="task_step_item"><a class="weui-btn weui-btn_primary" href="javascript:void(0)" onclick="ShowSubmitTextDialog(' + actionId + ')"><i class="fa fa-fw fa-pencil"></i>记录</a></div>';
                }
                //str += '</div> ';
                actionId++;
            } else if (currentTaskObj.COURSE_LIST[i].CS_TYPE == 0) {
                str += '<div class="task_step_item task_step_item_img_notproof text-center"><img class="task_step_item_img" src="' + currentTaskObj.COURSE_LIST[i].CS_URL + '"></div>';
            }
            str += '<div class="clearfix"></div></div></div>'
        }
    } else {
        //str += "暂无";
    }

    str += '</div></div></div></div></div></div></div>';
    
    $("#tasks").append(str);
    OpenPage("task_details_cover");

    SetTaskBtn();
    //设置分享内容
    var redirUrl = g_UrlHost + "/view/pushpage8.html?tid=" + currentTaskObj.ID + "&o=" + OPENID + "&u=" + MyInfo.ID + "&l=1";
    onMenuShareAppMessage(currentTaskObj.R_SHARE_TITLE, currentTaskObj.R_SHARE_DESC, redirUrl, g_UrlHost + "/" + currentTaskObj.T_ICON, ShareSuccessCallback, ShareCancelCallback);
    onMenuShareQQ(currentTaskObj.R_SHARE_TITLE, currentTaskObj.R_SHARE_DESC, redirUrl, g_UrlHost + "/" + currentTaskObj.T_ICON, ShareSuccessCallback, ShareCancelCallback);
    onMenuShareTimeline(currentTaskObj.R_SHARE_TITLE, redirUrl, g_UrlHost + "/" + currentTaskObj.T_ICON, ShareSuccessCallback, ShareCancelCallback);
}


function InitImgUploader() {
        uploader = new plupload.Uploader({
            runtimes: 'html5,html4',
            browse_button: $("#uploadCache")[0],
            //container: document.getElementById('upload_container'),
            filters: {
                max_file_size: '10mb',
            },
            resize: { height: 1080, quality: 70 },
            multi_selection: false,
            url: 'http://oss.aliyuncs.com',
            init: {
                PostInit: function () {

                },
                BeforeUpload: function (up, file) {
                    var now = new Date();
                    var fileKey = "zl/" + currentTaskObj.ID + "/" + now.format("yyyy-MM-dd") + "/" + currentTaskObj.ID + "_" + MyInfo.ID + "_" + currentTaskObj.TL_ID + "_" + currentAction + "/" + now.format("yyyyMMddhhmmssS") + getSuffix(file.name);
                    set_upload_param(up, fileKey, currentTaskObj.ID);
                },
                FilesAdded: function (up, files) {
                    $.showLoading();
                    var html = '';
                    //for (var i = 0; i < files.length; i++) {
                    //    html += '<li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(' + GetObjectURL(files[i].getNative()) + ')" id="' + files[i].id + '">'
                    //        + '<div class="weui-uploader__file-content">'
                    //        + '<i class="weui-icon-waiting"></i>'
                    //        + '</div>'
                    //        + '</li>';
                    //}

                    $("#uploaderFiles").append(html);
                    //UpdateFileNum();
                    up.start();

                },
                FilesRemoved: function (up, files) {
                    //UpdateFileNum();
                },

                UploadProgress: function (up, file) {
                    $(".weui-toast_content").html(file.percent + "%");
                },

                FileUploaded: function (up, file, info) {
                    $.hideLoading();
                    var result = JSON.parse(info.response);
                    if (result.ResultCode == 0) {
                        
                        currentTaskObj.PROOF_LIST.push(result.ResultOBJ);
                        UpdateActionProof(result.ResultOBJ);
                    } else {
                        $.alert("上传失败，请重试");
                    }


                },
                UploadComplete: function (up, files) {
                    //$(".btn-upload").html("重新上传");
                },
                Error: function (up, err) {
                    console.log(err.response);
                }
            }
        });
        uploader.init();
}

function UpdateActionProof(_proof) {
    if (_proof.P_TYPE == 2) {
        $("#action_" + _proof.P_ACTION).html('<p>' + _proof.P_DATA + '</p><a class="weui-btn weui-btn_orange" href="javascript:void(0)" onclick="ShowSubmitTextDialog(' + _proof.P_ACTION + ',' + _proof.ID + ',\'' + _proof.P_DATA + '\')"><p>修改</p></a>');
        $("#action_" + _proof.P_ACTION).addClass("weui-flex__item3");
        $("#action_" + _proof.P_ACTION).removeClass("weui-flex__item");
    } else if (_proof.P_TYPE == 3) {
        $("#action_" + _proof.P_ACTION).html('<img src="' + g_OSSHost + _proof.P_URL + '" style="width:100%;height:auto;" ><a class="weui-btn weui-btn_primary" href="javascript:void(0)" onclick="ShowUploadFileDialog(' + _proof.P_ACTION + ')"><p>更换</p></a>');
        $("#action_" + _proof.P_ACTION).addClass("weui-flex__item3");
        $("#action_" + _proof.P_ACTION).removeClass("weui-flex__item");
    }

}

function GetCycleStr(val) {
    var str = "";
    if (val == 0) {
        str = "秒审核"
    } else {
        str = val + "小时内审核打款"
    }
    return str;
}

function GetTaskClassName(val) {
    var str = "";
    switch (val) {
        case 1:
            //app
            str = "APP推广";
            break;
        case 2:
            //加粉
            str = "微信加粉";
            break;
        case 3:
            //h5
            str = "H5页面推广";
            break;
        case 4:
            //h5
            str = "推B端";
            break;
    }
    return str;
}

function ShowHaibao() {
    $.modal({
        title: "",
        text: '<div id="qrModalContent"><div class="qrcodeImgDiv text-center"><i id="haibaoImgZoomLoading" class="weui-loading weui-icon_toast"></i><img id="haibaoImgZoom" class="hidden" style="width:70%;height:auto"  src=""></div><div class="green padding-area-sm text-left" style="text-" id="qrcodeTips"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;这是您的专属推广二维码。<br>按住可以保存至手机相册。</p></div><br></div>',
        buttons: [
            { text: "返回", className: "default" }
        ]
    });
    hecheng();
}
//合成图片
function hecheng() {
    //画布区域
    var c = document.createElement('canvas'),
        ctx = c.getContext('2d');
    c.width = 640;
    c.height = 960;
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = '#fff';
    ctx.fill();

    var img = new Image;//背景
    var img2 = new Image;//二维码
    var img3 = new Image;//logo

    img.src = $('#qrcodeBg').attr("src");
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 640, 960);

        img2.src = convertQRcodeImage(g_UrlHost + "/view/pushpage8.html?tid=" + currentTaskObj.ID + "&o=" + OPENID + "&u=" + MyInfo.ID + "&l=1");
        img2.onload = function () {
            //二维码
            ctx.drawImage(img2, 210, 532, 220, 220);
            img3.src = '/' + currentTaskObj.T_ICON;
        
            img3.onload = function () {
                ctx.drawImage(img3, 290, 612, 60, 60);
                //设置字体样式
                ctx.font = "small-caps bold 46px arial";
                ctx.fillStyle = "#fff400 ";
                ctx.textAlign = "center";
                //开始绘制文字--昵称
                ctx.fillText("任务赏金￥" + currentTaskObj.T_BROKERAGE, 320, 300);
                if (currentTaskObj.R_FXJL1 > 0) {
                    ctx.fillText("分享再赏￥" + currentTaskObj.R_FXJL1, 320, 370);
                }
                ////设置字体样式
                //ctx.font = "46px 'microsoft yahei'";
                //ctx.fillStyle = "#fff400 ";
                //ctx.textAlign = "center";
                ////开始绘制文字--昵称
                //ctx.fillText(currentTaskObj.T_NAME, 320, 300);

                //设置字体样式
                ctx.font = "22px 'microsoft yahei'";
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                //开始绘制文字--对话内容(text,x,y)
                ctx.fillText("[" + currentTaskObj.T_NAME + "]" + currentTaskObj.ID + " (" + MyInfo.ID + ")", 320, 880);
                //保存生成作品图片
                $("#haibaoImgZoomLoading").remove();
                $("#haibaoImgZoom").removeClass("hidden");
                document.getElementById("haibaoImgZoom").src = c.toDataURL("image/jpeg", 1);
                
                
            }
            img3.onerror = function () {
                //设置字体样式
                ctx.font = "small-caps bold 46px arial";
                ctx.fillStyle = "#fff400 ";
                ctx.textAlign = "center";
                //开始绘制文字--昵称
                ctx.fillText("任务赏金￥" + currentTaskObj.T_BROKERAGE, 320, 300);
                if (currentTaskObj.R_FXJL1 > 0) {
                    ctx.fillText("分享再赏￥" + currentTaskObj.R_FXJL1, 320, 370);
                }
                ////设置字体样式
                //ctx.font = "46px 'microsoft yahei'";
                //ctx.fillStyle = "#fff400 ";
                //ctx.textAlign = "center";
                ////开始绘制文字--昵称
                //ctx.fillText(currentTaskObj.T_NAME, 320, 300);

                //设置字体样式
                ctx.font = "22px 'microsoft yahei'";
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                //开始绘制文字--对话内容(text,x,y)
                ctx.fillText("[" + currentTaskObj.T_NAME + "]" + currentTaskObj.ID + " (" + MyInfo.ID + ")", 320, 880);
                //保存生成作品图片
                $("#haibaoImgZoomLoading").remove();
                $("#haibaoImgZoom").removeClass("hidden");
                document.getElementById("haibaoImgZoom").src = c.toDataURL("image/jpeg", 1);
            }
        }
    }
}

function TaskReceiveTaskDialog() {
    $.modal({
        title: "",
        text: '<div class="text-left">当您报名成功后，必须完成<span class="green">提交证据</span>或者手动终止才能接下一个任务，确定报名吗？</div>',
        buttons: [
            { text: "返回", className: "default", onClick: function () { $.closeModal(); } },
            { text: "马上报名", onClick: function () { TaskReceiveTask(); } }
        ]
    });
}

function TaskReceiveTask() {
    if (locationObj != "") {
        if (!checkLocationTaskShow(currentTaskObj)) {
            $.alert("您所在的位置不符合该任务的要求。<br />该任务的目标地域为：[" + currentTaskObj.R_AREA.replace(/(省:)|(市:)|(区:)/, "").replace(";", ",").replace("!", "非") + "]。");
            return;
        }
    } else {
        getLocationWX(TaskReceiveTask);
    }
    
    FuncAjax("/Task/ReceiveTask/" + currentTaskObj.ID + "/" + OPENID, "", function (obj) {
        if (obj.ResultCode == 0) {
            $.toast("报名成功");

            currentTaskObj.T_COUNT_DOWN = obj.ResultOBJ + Math.round((+new Date() - beginTime) / 1000);
            currentTaskObj.T_STATE = 1;
            InitTaskDetail();
            init_task_list(taskObjAll);
            SetTaskBtn();
            $.CountDown.begin("#overall-btn-baoming-btn", {
                countDown: obj.ResultOBJ,
                callback: function () { }
            });

            if (!currentTaskObj.TL_ID) {
                StatisticalPage("", currentTaskObj.ID);
            }
        } else {
            $.alert(obj.ResultMsg);
        }
    }, null, true);
}

function TaskCancelTask() {
    FuncAjax("/Task/CancelTask/" + currentTaskObj.ID + "/" + OPENID, "", function (obj) {
        if (obj.ResultCode == 0) {
            $.toast("取消成功");
            currentTaskObj.T_STATE = 0;
            InitTaskDetail();
            init_task_list(taskObjAll);
            SetTaskBtn();
        } else {
            $.alert(obj.ResultMsg);
        }
    }, null, true);
}

function TaskSubmitTask() {
    var course = currentTaskObj.COURSE_LIST.filter(function (o) { return o.CS_TYPE != 0 });
    if (currentTaskObj.PROOF_LIST.length < course.length) {
        $.alert("您忘了上传截图了！");
        return;
    }
    FuncAjax("/Task/SubmitTask/" + currentTaskObj.ID + "/" + OPENID, "", function (obj) {
        if (obj.ResultCode == 0) {
            $.alert("提交成功，请等待审核。审核通过后将自动打款到您的余额。", "");
            currentTaskObj.T_STATE = 2;
            InitTaskDetail();
            init_task_list(taskObjAll);
            //$("#overall-btn-baoming").addClass("hidden");
        } else if (obj.ResultCode == 1) {
            $.alert("此任务的报名已超时，请重新报名");
            currentTaskObj.T_COUNT_DOWN = 0;
            currentTaskObj.T_STATE = 0;
            InitTaskDetail();
            init_task_list(taskObjAll);
            SetTaskBtn();
        } else if (obj.ResultCode == 2) {
            $.alert("此任务您还没有报名");
        } else if (obj.ResultCode == 3) {
            $.alert("任务不存在");
        }
    }, null, true);
}

function SetTaskBtn() {
    //T_STATE
    // 0 未做
    // 1 已接
    // 2 提交
    // 3 已做(通过)
    // 4 已做(未通过)
    switch (currentTaskObj.T_STATE) {
        case 0:
            $("#overall-btn-baoming-btn").html("马上报名");
            $("#overall-btn-baoming-btn").addClass("weui-btn_primary");
            $("#overall-btn-baoming-btn").removeClass("weui-btn_orange");
            $("#overall-btn-baoming-btn").attr("href", "javascript: TaskReceiveTaskDialog();");

            $("#overall-btn-back").removeClass("hidden");
            $("#overall-btn-baoming").removeClass("hidden");
            $("#overall-btn-cancel").addClass("hidden");
            break;
        case 1:
            $("#overall-btn-baoming-btn").html("提交证据");
            $("#overall-btn-baoming-btn").removeClass("weui-btn_primary");
            $("#overall-btn-baoming-btn").addClass("weui-btn_orange");
            $("#overall-btn-baoming-btn").attr("href", "javascript: TaskSubmitTask();");
            $.CountDown.begin("#overall-btn-baoming-btn", {
                countDown: currentTaskObj.T_COUNT_DOWN - Math.round((+new Date() - beginTime) / 1000),
                callback: function () { }
            })

            $("#overall-btn-back").addClass("hidden");
            $("#overall-btn-baoming").removeClass("hidden");
            $("#overall-btn-cancel").removeClass("hidden");

            break;
        case 2:
            $("#overall-btn-back").removeClass("hidden");
            $("#overall-btn-baoming").addClass("hidden");
            $("#overall-btn-cancel").addClass("hidden");
            break;
        case 3:
            $("#overall-btn-back").removeClass("hidden");
            $("#overall-btn-baoming").addClass("hidden");
            $("#overall-btn-cancel").addClass("hidden");
            break;
        case 4:
            $("#overall-btn-back").removeClass("hidden");
            $("#overall-btn-baoming").addClass("hidden");
            $("#overall-btn-cancel").addClass("hidden");
            break;
    }

    //if (currentTaskObj.R_NOTPAY) {
    //    $("#overall-btn-back").removeClass("hidden");
    //    $("#overall-btn-baoming").addClass("hidden");
    //    $("#overall-btn-cancel").addClass("hidden");
    //}
    if (currentTaskObj.R_STOP) {
        $("#overall-btn-back").removeClass("hidden");
        $("#overall-btn-baoming").addClass("hidden");
        $("#overall-btn-cancel").addClass("hidden");
    }
    
}


//-----------------------上传证据相关------------------------------
var uploader;
//var accessid = '6MKOqxGiGU4AUk44';
//var accesskey = 'ufu7nS8kS59awNihtjSonMETLI0KLy';
//var host = 'https://post-test.oss-cn-hangzhou.aliyuncs.com';
var accessid = 'zydL2DWCGEi2B5GC';
var accesskey = 'EVgAQrK5XO6d2Y4AkVSNnUBJjbUDja';
var host = '//ditui.oss-cn-beijing.aliyuncs.com';
var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z",
    "conditions": [["content-length-range", 0, 10485760]]
};
var policyBase64 = Base64.encode(JSON.stringify(policyText));
var bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, { asBytes: true });
var signature = Crypto.util.bytesToBase64(bytes);

function set_upload_param(up, filename) {
    var callbackBody = {
        'callbackUrl': 'http://zl.newditui.com/stats/OssCallback',
        'callbackBody': '{"U_ID":' + MyInfo.ID + ',"T_ID":' + currentTaskObj.ID + ',"TL_ID":' + currentTaskObj.TL_ID + ',"P_ACTION":' + currentAction + ',"P_URL":${object}}',
        'callbackBodyType': 'application/json'
    };
    var new_multipart_params = {
        'key': filename,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'signature': signature,
        'callback': Base64.encode(JSON.stringify(callbackBody))
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });
}
var currentAction = 0;
function ShowUploadFileDialog(_actionId) {
    var str = "";
    if (currentTaskObj.R_STOP == 1) {
        str = '任务已暂停推广，请返回查看其他任务。';
    } else if (currentTaskObj.T_STATE == 0) {
        str = '您还没有报名，请先报名再上传证据。';
    } else if (currentTaskObj.T_STATE == 1) {
        currentAction = _actionId;
        $("input[type='file']").trigger("click");
    } else if (currentTaskObj.T_STATE == 2) {
        str = '任务已提交证据，无法修改，请等待审核。';
    } else if (currentTaskObj.T_STATE == 3) {
        str = '任务已通过审核，请到钱包查询余额。';
    }
    if (str != "")
        $.alert(str);
}

function UpdateFileNum() {
    $("#uploader_curnum").html($("#uploaderFiles .weui-uploader__file:not(.weui-uploader__file_status)").length);
    $("#uploader_maxnum").html($("#uploaderFiles .weui-uploader__file").length);
    if ($("#uploaderFiles li").length >= 1) {
        $("#upload_container").addClass("hidden");
    } else {
        $("#upload_container").removeClass("hidden");
        uploader && uploader.refresh();
    }
}

function RemoveUploaderImg() {
    var isNotUpload = $("#gallery").attr("data-not-upload");
    var proofId = $("#gallery").attr("data-proof-id");
    var tid = $("#gallery").attr("data-tid");
    if (isNotUpload == "1") {
        uploader.removeFile(fileid);
        $("#" + fileid).remove();
    } else {
        FuncAjax("/Task/RemoveTaskStatisticsFile/" + tid, proofId, function (obj) {
            if (obj.ResultCode == 0) {
                $("#uploaderFiles .weui-uploader__file[data-proof-id='" + proofId + "']").remove();

                var curTaskLog;
                if (CurrentPage != "task_page") {
                    curTaskLog = taskLogObj.find(function (obj) { return obj.ID == Number($("#upload_container").attr("data-tlid")); });
                } else {
                    curTaskLog = taskDoStatsLogObj.find(function (obj) { return obj.ID == Number($("#upload_container").attr("data-tlid")); });
                }
                var proof = curTaskLog.PROOF_LIST.find(function (o) { return o.ID == proofId });
                curTaskLog.PROOF_LIST.splice(curTaskLog.PROOF_LIST.indexOf(proof), 1);
                UpdateFileNum();
            }
        }, null, true);
    }
}

function ShowSubmitTextDialog(_actionId, _pid, _text) {
    var buttons = [{ text: "返回", className: "default", onClick: function () { $.closeModal(); } }];
    var textDiv = '<div class="weui-cells">'
        + '<div class="weui-cell">'
        + '<div class="weui-cell__bd">'
        + '<input id="txt_proof_text" class="weui-input text-m" type="text" value="' + (_text ? _text : '') + '" placeholder="请输入内容" data-pid="' + (_pid >> 0) + '">'
        + '</div>'
        + '<div class="weui-cell__ft">'
        + '<a class="weui-btn weui-btn_primary" href="javascript:void(0);" onclick="SubmitText(this,' + (_pid >> 0) + ',' + _actionId + ')">提 交</a>'
        + '</div></div></div>';
    $.modal({
        title: "",
        text: textDiv,
        buttons: buttons,
        autoClose: false
    });
}

function SubmitText(dom, _pid, _actionId) {
    var $dom = $(dom);
    if ($dom.hasClass("weui-btn_disabled"))
        return;
    var text = $("#txt_proof_text").val();
    if (text) {
        $dom.html("提交中");
        $dom.addClass("weui-btn_disabled weui-btn_default");
        $dom.removeClass("weui-btn_primary");
        var postModel = {
            ID: Number(_pid),
            T_ID: currentTaskObj.ID,
            U_ID: MyInfo.ID,
            TL_ID: currentTaskObj.TL_ID,
            P_TYPE: 2,
            P_ACTION: _actionId,
            P_DATA: text
        };

        FuncAjax("/Task/SaveTaskProofText/" + OPENID, JSON.stringify(postModel), function (obj) {
            $dom.html("记录手机");
            $dom.removeClass("weui-btn_disabled weui-btn_default");
            $dom.addClass("weui-btn_primary");
            if (obj.ResultCode == 0) {
                $.toast("已保存内容");
                $.closeModal();
                if (postModel.ID == 0)
                    currentTaskObj.PROOF_LIST.push(obj.ResultOBJ);
                else
                    currentTaskObj.PROOF_LIST.find(function (a) { return a.ID == obj.ResultOBJ.ID }).P_DATA = obj.ResultOBJ.P_DATA;
                UpdateActionProof(obj.ResultOBJ);
            }
        }, function () {
            if ($dom) {
                $dom.html("提 交");
                $dom.removeClass("weui-btn_disabled weui-btn_default");
                $dom.addClass("weui-btn_primary");
            }
        }, true);
    } else {
        $.toast("请输入内容", "cancel");
    }
}

//----------------------------------------

function GetProofStr(tasklog, task) {
    var item = tasklog, result;
    if (task.T_CLASS == 4) {
        // B端任务
        var wjObj = JSON.parse(item.GUEST_UA);
        result = wjObj.q1;
    } else {
        var maidian_phone = item.PROOF_LIST.find(function (obj) { return obj.P_TYPE == 1 && obj.P_EXDATA == "1" });
        if (maidian_phone == null)
            item.PROOF_LIST.find(function (obj) { return obj.P_TYPE == 1 && obj.P_EXDATA == "0" });
        var proof_phone = item.PROOF_LIST.find(function (obj) { return obj.P_TYPE == 2 });
        var proof_photo = item.PROOF_LIST.find(function (obj) { return obj.P_TYPE == 3 });
        result = "[暂无]";

        if (task.R_DUIZHANG == "2") {
            if (proof_phone != null)
                result = proof_phone.P_PHONE;
        } else {
            if (maidian_phone != null)
                result = maidian_phone.P_DATA;
            else if (proof_phone != null)
                result = proof_phone.P_PHONE;
            //else if (item.PHONE != null)
            //    result = item.PHONE;
            else if (item.GUEST_MAC != null)
                result = item.GUEST_MAC.substr(0, 8);
        }

        if (proof_photo != null) {
            result += ' <i class="fa fa-photo"></i>';
        }
    }
    return result;
}

function init_QRcode(_tid, _openid, _type, _sms, _isInfoOAuth) {
    var url = g_UrlHost + "/view/index_g.html?tid=" + _tid + "&o=" + _openid + "&u=" + MyInfo.ID + "&type=" + _type + "&s=" + _sms + "&a=" + _isInfoOAuth;
    convertQRcodeImage(url, "QR_img");
}

function convertQRcodeImage(url, div) {
    $('#qrcode canvas').remove();
    $('#qrcode').qrcode({
        width: 600,
        height: 600,
        text: url
    });
    if (typeof (div) != "undefined") {
        $('#' + div).attr("src", $('#qrcode canvas')[0].toDataURL("image/png"));
        $('#' + div).attr("data-src", url);
        $('#qrcode canvas').remove();
    } else {
        return $('#qrcode canvas')[0].toDataURL("image/png");
    }
}


//放大二维码
function zoomQRcode() {
    $.modal({
        title: "",
        text: '<div class="qrcodeImgDiv"><img class="qrcodeImgIcon " id="QR_icon" src="/' + currentTaskObj.T_ICON + '"><img class="qrcodeImgZoom " id="QR_img_zoom" src="' + $("#QR_img").attr("src") + '"></div><div class="text-left text-s" id="qrcodeTips">二维码在点击开干后，当天23:59分前有效。<br>1、用微信扫描此二维码； <br>2、扫码后请引导用户确认"新地推"授权； <br>3、请引导用户确认获取位置信息。<br><p class="text-s"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;位置信息仅用于考核地推人员的工作情况，不会泄漏用户隐私。</p></div><br />',
        buttons: [
            { text: "返回", className: "default" }
        ]
    });
}


//放大二维码
function openTaskLink(link) {
    var str = "";
    if (currentTaskObj.R_STOP == 1) {
        str = '任务已暂停推广，请返回查看其他任务。';
    } else if (currentTaskObj.T_STATE == 0) {
        str = '您还没有报名，请先报名再开始任务。';
    } else if (currentTaskObj.T_STATE == 1 || currentTaskObj.T_STATE == 2 || currentTaskObj.T_STATE == 3) {
        StatisticalPageEx(2);
        window.history.pushState("turl", null, "pushpage8.html?" + '&opentask=' + encodeURIComponent(link));
        $("#llqcover").removeClass("hidden");
        showMenu(["menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:originPage"]);
    }
    //else if (currentTaskObj.T_STATE == 2) {
    //    StatisticalPageEx(2);
    //    window.history.pushState("turl", null, "pushpage8.html?" + '&opentask=' + encodeURIComponent(link));
    //    $("#llqcover").removeClass("hidden");
    //    //str = '任务已提交证据,请等待审核。';
    //} else if (currentTaskObj.T_STATE == 3) {
    //    StatisticalPageEx(2);
    //    window.history.pushState("turl", null, "pushpage8.html?" + '&opentask=' + encodeURIComponent(link));
    //    $("#llqcover").removeClass("hidden");
    //    //str = '任务已通过审核，请到钱包查询余额。';
    //}
    if (str != "")
        $.alert(str);
}
//---------------------------------------钱包-------------------------------------------------------------------------------------------
function InitWalletDetail() {
    $("#wallet_available").html(Money_conversion_yuan(MyInfo.U_TOTALPROFIT - MyInfo.U_ALREADYWITHDRAWALS));
    //$("#wallet_total").html(Money_conversion_yuan(MyInfo.U_TOTALPROFIT + MyInfo.U_ALREADYWITHDRAWALS));
    $("#wallet_already").html(Money_conversion_yuan(MyInfo.U_ALREADYWITHDRAWALS));
    if ((MyInfo.U_TOTALPROFIT - MyInfo.U_ALREADYWITHDRAWALS) <= 0) {
        $("#tixian_btn").addClass("opacity50");
    }
}

//提现
function Withdrawals() {
    //if (!CheckIsAuthentication())
    //    return;
    if (MyInfo.U_TOTALPROFIT<= 0) {
        $.alert("您还没有余额，干活拿奖励，入账再来提现吧", "");
        return;
    }

    // 显示提现模态
    var html = "";
    html += '<div class="grey text-center text-s padding-area">'
        //+ '<b>为了确保资金安全，【新地推】财务正在小步快跑打款审核中，请您注意查收。</b>'
        + '<ul class="weui_text_area text-left">'
        + '<li><i class="fa fa-fw fa-star green text-m"></i> 单笔最小金额为1元，单笔最大限额200元；</li>'
        + '<li><i class="fa fa-fw fa-star green text-m"></i> 每个会员每天最多可提现6次；</li>'
        //+ '<li><i class="fa fa-fw fa-star green text-m"></i> 每笔提现金额不得低于100元；</li>'
        + '<li><i class="fa fa-fw fa-star green text-m"></i> 同一个会员提款时间间隔不得低于15秒。</li>'
        + '</ul><p class="orange text-xl padding-area">可用余额：' + Money_conversion_yuan(MyInfo.U_TOTALPROFIT - MyInfo.U_ALREADYWITHDRAWALS) + ' 元</p>'
        + '<input id="wallet_money" class="padding-area-sm text-m task-list-left-f" placeholder="请输入提现金额" type="number">'
        + '<div class="orange-bg white margin_top_2" id="withdraw_error_msg"></div></div>';
    $.modal({
        title: "提现金额",
        text: html,
        buttons: [
            {
                text: "返回",
                className: "default",
                onClick: function () {
                    $.closeModal();
                }
            },
            {
                text: "确认提现",
                onClick: function () {
                    if (Withdrawals_Verification()) {
                        UserGetUserWithdrawals();
                        $.closeModal();
                    }
                }
            },
        ],
        autoClose: false
    });
}

// 检查是否实名，弹出提示
function CheckIsAuthentication() {
    if (MyInfo.U_NAME == null || MyInfo.U_NAME == "" || MyInfo.U_NAME.indexOf("(有误)") > -1) {
        $.modal({
            title: '',
            text: '<i class="fa fa-lock" aria-hidden="true"></i> 您的报酬将会自动打入您的微信钱包，请在此填写您开通微信钱包时所绑定的银行卡使用的姓名，否则将无法提现！',
            buttons: [
                { text: "返回" },
                {
                    text: "去实名",
                    onClick: function () {
                        $("div[name='cell_nickname']").removeClass("hidden");
                        OpenPage("user_authentication_cover");
                    }
                }
            ]
        });
        return false;
    } else {
        Withdrawals();
    }
}

//提现验证
function Withdrawals_Verification() {
    var flag = false, money = $("#wallet_money").val();
    if (money == "")
        $("#withdraw_error_msg").html("请输入提现金额");
    else {
        money = Number(money);
        if (money < 1)
            $("#withdraw_error_msg").html("单笔提现金额不得少于1元");
        else
        if (money > 200)
            $("#withdraw_error_msg").html("由于微信限制，单笔提现金额不得多于200元");
        else if (money * 100 > MyInfo.U_TOTALPROFIT)
            $("#withdraw_error_msg").html("提现金额已经超过可用金额");
        else
            flag = true;
    }
    return flag;
}

//提现
//function Present_audit() {
//    var url = '/User/Expenditure/' + OPENID;
//    var post = '{"ID":-1,"R_UID":' + MyInfo.ID + ',"R_MONEY":' + Number($("#wallet_money").val()) * 100 + ',"R_REASON":"提现"}';
//    FuncAjax(url, post, function (obj) {
//        if (obj.ResultCode == 0) {
//            $.alert("提现成功，请注意查收！", "");
//        }
//        else {
//            $.alert(obj.ResultMsg, "");
//        }
//    }, function (obj) {
//        $.alert(obj.ResultMsg, "");
//    }, true);
//}

//提现
function UserGetUserWithdrawals() {
    var url = '/User/GetUserWithdrawals/' + OPENID + "/" + Token;
    var post = $("#wallet_money").val();
    FuncAjax(url, post, function (obj) {
        if (obj.ResultCode == 0) {
            UserGetUserDetail();
            //UserGetUserAccountingList();
            ShowGetHBTip();
        }
        else {
            $.alert(obj.ResultMsg, "");
        }
    }, function (obj) {
        $.alert(obj.ResultMsg, "");
    }, true);
}

//提现成功
function ShowGetHBTip() {
    $.modal({
        title: "提现成功",
        text: '<div><div class="qrcodeImgDiv text-center"><img style="width:100%;height:auto" src="img/get-hb-tip.jpg"></div><br><div class="tips_blue padding-area-sm text-left text-dq">如上图，红包将由“微信企业红包”直接给您发送，请注意查看微信“服务通知”查收红包！</div></div>',
        buttons: [
            { text: "确定", className: "default" }
        ]
    });
}



//加载明细
function UserGetUserAccountingList() {
    var url = '/User/GetUserAccountingList/' + OPENID + "/" + Token;
    FuncAjax(url, "", function (obj) {
        if (obj.ResultCode == 0) {
            var data = obj.ResultOBJ;
            if (data.length > 0) {
                DetailedList(data);
            } else {
                $("#mingxi_detils_lists").html('<div class="weui-media-box weui-media-box_text text-center">暂无明细</div>');
            }
        } else {
            $.toast(obj.ResultMsg, "forbidden");
        }
    }, function (obj) {
        $.alert(obj.ResultMsg, "");
    }, true);
}

//加载明细
function DetailedList(data) {
    var str = '<div class="weui-cells margin_top_0">';
    for (var i = 0; i < data.length; i++) {
        if (data[i].A_MONEY != 0) {
            str += '<div class="weui-cell task-list"><div class="weui-cell__bd weui-cell__primary"><p  class="task-name orange">';
            if (data[i].A_TYPE == 4) {
                str += '提现';
            } else if (data[i].A_TYPE == 3) {
                str += '任务赏金';
            } else if (data[i].A_TYPE == 5){
                str += '分享赏金';
            }
            str += "</p>";
            str += '<div class="task-label text-s">' + data[i].A_DESCRIBE + '</div>';
            str += "</div>";
            if (data[i].A_TYPE != 4) {
                str += '<div class="task-income"><div><em>+ ' + Money_conversion_yuan(data[i].A_MONEY) + '</em></div>';
                //str += '<div class="task-income">+' + Money_conversion_yuan(data[i].A_MONEY) + '</span></h4><div class="weui-media-box__desc pull-left">' + data[i].A_DESCRIBE + '</div>';
            } else {
                str += '<div class="task-income"><div><em class="green">- ' + Money_conversion_yuan(data[i].A_MONEY) + '</em></div>';
            }
            str += '<div><span class="text-s">' + dateFormat(data[i].A_TIME, 'yyyy-MM-dd hh:mm') + '</span></div>';
            str += '</div></div>';
        }
    }
    str += '</div>';
    $("#mingxi_detils_lists").html(str);
}

//提现中的解释
function Withdrawals_Explain() {
    $.modal({
        title: "",
        text: "平台正在对提现账户审核，24小时内审核通过后，直接提现到您的微信钱包。如发现账户有问题，平台会及时发送通知。请注意查看微信钱包余额变化。",
        buttons: [
            { text: "返回", className: "default", onClick: function () { } },
        ]
    });
}


//加载分享明细
function TaskGetTaskShareDetailList() {
    var url = '/Task/GetTaskShareDetailList/' + OPENID;
    FuncAjax(url, "", function (obj) {
        if (obj.ResultCode == 0) {
            var data = obj.ResultOBJ;
            if (data.length > 0) {
                ShareDetailedList(data);
            } else {
                $("#detils_lists").html('<div class="padding-area text-s text-center" onclick="OpenPage(\'task_page\')">暂无分享明细,请在<span class="green">[任务]</span>中分享赚钱!</div>');
            }
        } else {
            $.alert(obj.ResultMsg,"");
        }
    }, function (obj) {
        $.alert(obj.ResultMsg, "");
    }, true);
}


//加载分享明细
function ShareDetailedList(data) {
    var str = '';

    for (var i = 0; i < data.length; i++) {
        var tmpTask = taskObjAll.find(function (o) { return o.ID == data[i].T_ID });
        //if (data[i].ALL_COUNT == 0) {
        str += '<div class="weui-cell task-list" onclick="TaskDetailShow(' + tmpTask.ID + ');">';
            //str += '<div class="weui-cell__hd"><img src="/' + tmpTask.T_ICON + '" onerror="errorImg();"></div>';
            str += '<div class="weui-cell__bd weui-cell__primary"><p  class="task-name">' + tmpTask.T_NAME + '<span class="pull-right orange">共赚赏金<b class="text-l ">￥' + (data[i].ADOPT_COUNT * tmpTask.R_FXJL1).toFixed(1) + '</b></span></p>';
            str += '<div class="task-label text-s">' + "报名:" + data[i].ALL_COUNT + "  提交:" + data[i].SUBMIT_COUNT + "  待审:" + data[i].WAIT_COUNT + "  失败:" + data[i].NOT_ADOPT_COUNT + "  <span class='green'>通过:" + data[i].ADOPT_COUNT + "</span></div>";
            str += "</div></div>";

            //str += '<div class="task-income">';
            //str += '<span class="orange text-s">分享赏金 <b class="text-l">￥' + tmpTask.R_FXJL1 + "</b></span>";
            //str += '</div></div>';
        //}
    }
    //str += '</div>';
    $("#detils_lists").html(str);
}



//---------------------------------------身份验证-------------------------------------------------------------------------------------------
//绑定用户认证的相关事件
function BindEvent() {
    $('#txt_telephone').bind('input propertychange', function () {
        var _this = $(this);
        if (_this.val().length == 11 && $("#btn_verify_code").html().indexOf("重发") < 0) {
            $("#btn_verify_code").removeClass("weui-btn_disabled weui-btn_default").addClass("weui-btn_primary");
        } else {
            $("#btn_verify_code").removeClass("weui-btn_primary").addClass("weui-btn_disabled weui-btn_default");
        }
    });
    $("#btn_verify_code").click(function () {
        if ($("#txt_telephone").val() == "") {
            $.alert("请输入常用手机号。", "");
            return;
        }
        if ($("#txt_telephone").val() && /^1[3|4|5|7|8]\d{9}$/.test($("#txt_telephone").val()) == false) {
            $.alert("手机号格式错误。", "");
            return;
        }
        $this = $(this);
        if ($this.hasClass("weui-btn_disabled"))
            return false;
        GetTelephoneVerifyCode();
    });

    $("#tasks").on("click", 'img.task_step_item_img', function () {
        var $this = $(this);
        $("#gallery").find("span").css("background-image", "url(" + this.src + ")");
        $("#gallery").fadeIn(100);
    });

}

//提交用户实名信息
function SubmitUserAuthentication() {
    if (!CheckAuthenticationInfo())
        return;

    var U_NAME = $("#txt_name").val();
    var U_PHONE = $("#txt_telephone").val();
    var M_TEST = $("#txt_MessageTest").val();
    var U_IDCARD = $("#txt_idcard").val();

    $.showLoading("请稍候");
    $.ajax({
        type: 'post',
        contentType: 'text/json',
        url: '/user/UserAuthentication/' + OPENID + "/" + Token,
        data: '{"U_NAME":"' + U_NAME + '","U_PHONE":"' + U_PHONE + '","M_TEST":"' + M_TEST + '","U_IDCARD":"' + U_IDCARD + '"}',
        dataType: 'json',
        error: function (msg) {
            $.hideLoading();
            $.alert("网络和服务器去开房了，请稍后再试！", "");
        },
        success: function (obj) {
            $.hideLoading();
            if (obj.ResultCode == 0) {
                MyInfo.U_NAME = U_NAME;
                MyInfo.U_PHONE = U_PHONE;
                MyInfo.U_IDCARD = U_IDCARD;
                $.modal({
                    title: '',
                    text: '提交成功',
                    buttons: [
                        {
                            text: "确定", className: "default", onClick: function () {
                                OverallBack();
                                CheckIsAuthentication();
                            }
                        }
                    ]
                });
            } else {
                $.modal({
                    title: "",
                    text: obj.ResultMsg
                });
            }
        }
    });
}

var checkNameFlag = true;
function CheckAuthenticationInfo() {
    var reg = /^\s*$/g;
    if ($("#txt_telephone").val() && /^1[3|4|5|7|8]\d{9}$/.test($("#txt_telephone").val()) == false) {
        $.alert("手机号格式错误。", "");
        return;
    }
    if (reg.test($("#txt_MessageTest").val())) {
        $.alert("验证码不能为空", "");
        return false;
    }

    if (!$("div[name='cell_nickname']").hasClass("hidden")) {
        if (reg.test($("#txt_idcard").val())) {
            $.alert("身份证不能为空", "");
            return false;
        }

        if (reg.test($("#txt_name").val())) {
            $.alert("姓名不能为空", "");
            return false;
        } else {
            if (!checkChineseName($("#txt_name").val())) {
                $.alert("请输入您开通微信钱包时所绑定的银行卡使用的姓名，否则将无法提现！", "姓名格式不对");
                return false;
            } else if ($("#txt_name").val() == MyInfo.U_NICKNAME && checkNameFlag) {
                $.modal({
                    title: "",
                    text: "您输入的姓名和您的微信昵称相同，请确认此姓名是否为您开通微信钱包时所绑定的银行卡使用的姓名，否则无法提现！<br><p class='text-m orange'>是否确认使用此姓名:[" + MyInfo.U_NICKNAME + "]？</p>",
                    buttons: [
                        { text: "否", className: "default", onClick: function () { } },
                        {
                            text: "是",
                            onClick: function () {
                                checkNameFlag = false;
                                SubmitUserAuthentication();
                            }
                        },
                    ]
                });
                return false;
            }
        }
    }
    return true;
}

var time = 60;
function GetTelephoneVerifyCode() {
    var btn = $("#btn_verify_code");
    btn.html("发送中");
    btn.addClass("weui-btn_disabled weui-btn_default").removeClass("weui-btn_primary");;
    $.ajax({
        type: 'post',
        contentType: 'text/json',
        url: '/user/SendSMS',
        dataType: 'json',
        data: '{"M_PHONE":"' + $("#txt_telephone").val() + '","M_WXOPENID":"' + OPENID + '"}',
        error: function (msg) {
            btn.removeClass("weui-btn_disabled weui-btn_default").addClass("weui-btn_primary");
            btn.html("重发");
            $.alert("响应超时！", "");
        },
        success: function (obj) {
            if (obj.ResultCode == 0) {
                $.toast("已发送成功，<br/>有效期30分钟，<br/>请尽快验证。");
                btn.html("(60)重发");
                setTimeout(function () { downCount(btn) }, 1000);
            }
            else {
                btn.removeClass("weui-btn_disabled weui-btn_default").addClass("weui-btn_primary");
                btn.html("重发");
                $.alert(obj.ResultOBJ, "");
            }
        }
    })
}

function downCount(_dom) {
    if (time <= 0) {
        _dom.html("重新发送");
        _dom.removeClass("weui-btn_disabled weui-btn_default");
        _dom.addClass("weui-btn_primary");
        time = 60;
    } else {
        _dom.html("(" + time + ")重发");
        --time;
        setTimeout(function () { downCount(_dom) }, 1000);
    }
}


//----------------------------------------------------帮助页--------------------------------------------------------------------------------
function InitHelp() {
    var domTmp = '';
    switch (num) {
        case "dituiyuan":
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">1. 新地推是什么？</div><div class="weui-media-box__desc">我们是！数据化地推平台。因为<strong>有数据</strong>、因为<strong>是平台</strong>，可以：全部一手活，没有中间商赚差价了，多赚钱！自动记录数据，再也不用纸笔记录了，多省心！自助提现，点点钱包按钮就能自助提现，多放心</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">2. 我怎么接活儿啊？</div><div class="weui-media-box__desc">关注“新地推”公众号，点击“开始赚钱”，看见了吧，任务列表出来了，点击你想干的任务后边的“开干”按钮，立刻就会给你自动分配一个专属二维码，让客户扫码吧！简单吧，开干吧！</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title text-center"><img src="/view/img/help/dty-2.jpg" alt="zhsq"></div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">3. 怎么可以接的活儿那么少啊？</div><div class="weui-media-box__desc">因为你只是刚刚开始使用“新地推”的菜鸟啊。你现在只是初级用户，我们有等级制度，等级越高，能看见的活儿越多，甚至，偷偷告诉你，活儿的价格也越高。所以，赚钱游戏开始了，加油练级吧！</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">4. 那我怎么提升等级啊？</div><div class="weui-media-box__desc">杀怪啊！哦。。。不对，地推啊~ 随着你干的活儿越多，推的用户越多，你的等级将越来越高。初级地推员 -> 高级地推员 -> 地推队长 -> 地推BOSS</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">5. 我怎么提现啊？</div><div class="weui-media-box__desc">点击“钱包”，输入提现金额，一会钱就自动打到你的微信钱包啦。点开“微信钱包”看看，有明细。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title text-center"><img src="/view/img/help/dty-5.jpg" alt="提现"></div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">6. 为啥酬劳和记录的数据对不上啊？</div><div class="weui-media-box__desc">在推广时，“新地推”会自动帮大家记录数据，免去一边地推一边还得纸笔记录的手忙脚乱。但是，这自动记录的数据不是对账结算的依据，毕竟，甲方出钱，他说了算啊。。。还得以甲方的数据为准。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">7. 我能邀请我的朋友一起来做么？</div><div class="weui-media-box__desc">当然可以！人多力量大，特别是，当你邀请超过10个小伙伴一起来干活，我们将会邀请你升级为队长。嘿嘿，队长有神秘奖励的，你懂的。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">8. 如果我反馈活儿的信息给平台，有奖励吗？</div><div class="weui-media-box__desc">必须有！但奖励多少得看活儿的质量。</div></div>';
            $("#help-btn1").addClass("active");
            $("#help-btn2").removeClass("active");
            $("#help-btn3").removeClass("active");
            $("#help-btn4").removeClass("active");
            break;
        case "duizhang":
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__desc text-left weui-btn_primary padding-area"><i class="fa fa-star" aria-hidden="true"></i> 你的小弟永远是你的小弟；<br><i class="fa fa-star" aria-hidden="true"></i> 队长能看见平台更多的活儿；<br><i class="fa fa-star" aria-hidden="true"></i> 队长有拉人权限，可以一键转发到朋友圈/微信群，扩充队伍；<br><i class="fa fa-star" aria-hidden="true"></i> 小弟每干一单，队长都能获得额外奖励；<br><i class="fa fa-star" aria-hidden="true"></i> 队长能随时查看小弟们干活的数据，一键导出对账；<br><i class="fa fa-star" aria-hidden="true"></i> 队长有礼品管理和分配权，能随时查看各个小弟用了多少礼品了、干了多少单了；</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">1. 队长特权有什么好处？</div><div class="weui-media-box__desc">队长特权可以：<br>① 队长可以拉人，组建自己的队伍；<br>② 队长能随时查看小弟们的推广量；<br>③ 小弟们每干一单，队长都能获得平台额外的奖励；<br>（注：获得奖励需要小队推广量达到一定数量。）<br>④ 更重要的是，队长还能比小弟们看见平台更多、更新的好活儿；<br>⑤ 队长可以把活儿转给小弟们，这样你的小弟永远是你的小弟。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title text-center"><img src="/view/img/help/dz-1.jpg" alt=""></div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">2. 我担心拉小弟进来，他会变成你们新地推平台的人啦？</div><div class="weui-media-box__desc">不会，我们是地推平台，又不是卖人平台。一个个地推员吃喝拉撒睡、分配地点、话术培训、分配礼品乌七八糟一堆事儿，你把小弟给我，我们还不敢要呢，哪儿能管得过来？我们需要队长们，把自己的小弟们管起来，这也是队长的价值，也是队长奖励必须存在的原因。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">3. 队长奖励是怎么回事？</div><div class="weui-media-box__desc">成为队长后，每多拉一个人，就会有相应奖励，并且队员干的越多队长奖励越多！</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title text-center"><img src="/view/img/help/dz-3.jpg" alt=""></div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">4. 那我怎么提升队长等级？</div><div class="weui-media-box__desc">队员带的好，活儿干的漂亮，经常给平台反馈有用信息！我们会定期选出优秀队长，提升队长等级。</div></div>';
            $("#help-btn1").removeClass("active");
            $("#help-btn2").addClass("active");
            $("#help-btn3").removeClass("active");
            $("#help-btn4").removeClass("active");
            break;
        case "oem":
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__desc text-left weui-btn_primary padding-area"><i class="fa fa-star" aria-hidden="true"></i> 客户全案里包括地推，可人员难找？我们平台有成千上万专业地推员；<br><i class="fa fa-star" aria-hidden="true"></i> 地推刷单造假，难以管理？我们把它全过程数据化了，量化、可控；<br><i class="fa fa-star" aria-hidden="true"></i> 支持OEM，变身为您的数据化地推平台，更容易说服客户，拿下单子。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">1. OEM怎么操作？</div><div class="weui-media-box__desc">换上合作方的logo和名称，变成合作方自己的平台，去谈甲方，收入分成。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">2. 平台为什么支持OEM？</div><div class="weui-media-box__desc">① 本平台用专业地推方式，解决广告公司不熟悉地推行业的弱点，直接解决全案推广难的问题；<br>② 垂直定位目标客户；<br>③ 解决网络推广转化率低的问题，最大限度的降低转化成本；<br>④ 釜底抽薪的解决地推行业层层转包、良莠不齐、刷单造假、无法甄别管控的根本性问题。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">3. OEM有什么意义？</div><div class="weui-media-box__desc">我们的开放平台，支持OEM，变成大家自己的平台，共同开发市场。<br>① 商家将推广任务放到平台上，地推团队、地推人员在平台上看到活儿，马上开干；<br>② 商家实时查看推广进展、地推员实时查看自己做了多少单、队长可以实时查看队员推广数据、实时提现，真正实现让广告主与地推员无缝对接；<br>③ 就像网络投放中的百度、天猫等，地推也可以生成各种数据报表，量化地推。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title text-center"><img src="/view/img/help/oem-3.jpg" alt="oem商家版页面"></div></div>';
            $("#help-btn1").removeClass("active");
            $("#help-btn2").removeClass("active");
            $("#help-btn3").addClass("active");
            $("#help-btn4").removeClass("active");
            break;
        case "tuiguangxuqiu":
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__desc text-left weui-btn_primary padding-area"><i class="fa fa-star" aria-hidden="true"></i> 您的任务将直接推送给成千上万地推员，省心；<br><i class="fa fa-star" aria-hidden="true"></i> 推广全过程数据化，可见、可控、可量化分析，杜绝刷单造假。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">1. 推广价格是多少？</div><div class="weui-media-box__desc">我们是地推平台，价格是您定，我们负责把您的推广需求推送给成千上万的地推员，好活儿所有人都会抢着干。 就像淘宝，您的货物是由您自己自由定价。（当然，推广前我们会根据同地域、同行业的相似推广任务的价格，给您专业的定价建议。）</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title text-center"><img src="/view/img/help/tgxq-1.jpg" alt="cut"></div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">2. 你们有多少推广员啊？</div><div class="weui-media-box__desc">立足北京，覆盖全国。目前我们在北京地区有1100个专业地推员、全国111个城市和地区有分支机构，同时覆盖全国600余个地推群。您的需求将一呼百应。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title text-center"><img src="/view/img/help/tgxq-2.jpg" alt="pingtai" width="200px"></div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">3. 你们能提供地推场地吗？</div><div class="weui-media-box__desc">目前我们和阿里巴巴旗下的淘会场建立了深度合作，您可以快速方便的浏览全国适合地推、会展的场所，一键定购。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">4. 你们能把地推怎样数据化管起来？</div><div class="weui-media-box__desc">地推全过程数据化，实时可见有多少人、在哪些地方、推广了多少单、每一单进展到哪一步了，一目了然。不看广告，看疗效，请点击下方视频：</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title text-center"><div class="video-container"><iframe src="http://player.youku.com/embed/XMjcwOTU5ODg5Ng==" frameborder=0></iframe></div></div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">5. 你们能保证在规定时间内，完成规定用户量的推广吗？</div><div class="weui-media-box__desc">实话实说，不能。我们是地推平台，能将您的推广需求方便快捷的推送给地推员，但是能有多少人来替您推广、能完成多少推广量，完全是自由选择、由市场调节。呃。。有钱能使磨推鬼。 就像您在淘宝开店，能卖出多少取决于货物的质量、口碑、价格优势等。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">6. 我如何把需求放到你们平台进行推广？</div><div class="weui-media-box__desc">请您按住下方二维码，添加微信好友。我们会有专人和您联系跟进，我们将：<br>①了解您的详细推广需求（目标地域、目标人群、业务流程等）；<br>②研究并试用您的产品，给出适合地推场景的产品优化建议方案；<br>③给出专业的地推定价和执行方案；<br>④签署合作协议；<br>⑤给您开通地推数据后台权限，以便您随时能查看推广实况；<br>⑥推广完成，提交本次推广的量化分析报告与建议。</div></div>';
            domTmp += '<div class="weui-flex text-center"><div class="weui-flex__item"><img src="/view/img/help/tgxq-6.png" alt="陈总对外微信" width="110px"><p>联系人二维码</p></div></div></div></div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">7. 已经有团队在帮我们做推广了，也能用你们的平台实现数据化管理吗？</div><div class="weui-media-box__desc">当然可以，地推行业的乱象我们感同身受，我们试图用数据化以规范它、量化带来可控、可信。所以我们的平台是开放的，而且免费。请按住上方二维码添加微信好友，我们有专人引导您使用。</div></div>';
            domTmp += '<div class="weui-media-box weui-media-box_text"><div class="weui-media-box__title green">8. 如何建立推广任务：</div><div class="weui-media-box__desc"><a class="weui-btn weui-btn_mii weui-btn_primary" style="text-align:center" href="javascript:OpenPage(\'task_publish_page\')">立刻新建任务</a></div></div>';

            $("#help-btn1").removeClass("active");
            $("#help-btn2").removeClass("active");
            $("#help-btn3").removeClass("active");
            $("#help-btn4").addClass("active");
            break;
    }
    $("#help_text").html(domTmp);
}



