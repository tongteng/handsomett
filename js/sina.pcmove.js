///////////////////////////////////////////////////////////////////////////////////
//// PC端(pad端)鼠标,手势滑动响应
//// Defines: $("#previewimg").pcMove
//// Description: 移动元素：implements the sSina jQuery extension method
////
//// 在img中预览使用方法:$("#indexpage").pcMove({"upFun":function(){$.s_fullScroll.pageUpOrDown("up");},"downFun":function(){$.s_fullScroll.pageUpOrDown("down");}});
//// 在canvas中预览使用方法:$("#indexpage").pcMove({"upFun":function(){$.s_fullScroll.pageUpOrDown("up");},"downFun":function(){$.s_fullScroll.pageUpOrDown("down");}});
//// Copyright (c) 2013 by Sina Corporation. All rights reserved.
//// 联系人 Even:373384979
///////////////////////////////////////////////////////////////////////////////////
///// <reference path="jquery-1.4.2.js" />
//// 对sina.common.js有依赖

(function ($) {   
    var defaults = {
        upFun:function(){},
        downFun:function(){},
        moveAble : null// 如果存在这个id表示:用户可以在图片外的父级元素进行移动操作
    };
    var SupportsTouches = ("createTouch" in document), //判断是否支持触摸
	    StartEvent = SupportsTouches ? "touchstart" : "mousedown", //支持触摸式使用相应的事件替代
	    MoveEvent = SupportsTouches ? "touchmove" : "mousemove",
	    EndEvent = SupportsTouches ? "touchend" : "mouseup",zoomTimeout;

    // 手势行为
    $.fn.pcMove = function (options) {        
        var settings = $.extend(true, {}, defaults, options),previewId = $(this).selector.replace("#",""); // 从外部读取配置覆盖本程序配置
        var $$cv= $.s_com.getId(settings.moveAble ? settings.moveAble : previewId), $cv = $("#" + previewId); //
        var eventAction = false, orgPoint = { "x": 0, "y": 0 }, newPoint = { "x": 0, "y": 0 }, newTop;

        // touch事件开始,mousedown,tarchstart
        $$cv["on" + StartEvent] = function (event) {
            var e = event;
            newTop = 0;
            if (eventAction) {
                return false;
            } else {
                eventAction = true;
            }
            // 如果不是缩放操作
            // 记录相关坐标
            orgPoint = $.s_com.getPoint(e); 
            // 移动事件开始,mousemove,touchmove
            $$cv["on" + MoveEvent] = function (event) {
                $.s_com.preventDefault(event);
                var e = event;
                // 记录新坐标
                newPoint = $.s_com.getPoint(e);
                    
                // 鼠标移动的距离
                newTop = newPoint.y - orgPoint.y;
            };
        };

        // 移开事件开始,mouseup,touchend
        $$cv["on" + EndEvent] = $$cv["ontouchcancel"] = function (event) {
            eventAction = false;
            $$cv["on" + MoveEvent] = null;

            if(newTop >= 50){
                settings.upFun();
            }else if(newTop <= -50){
                settings.downFun();
            }
        };
    };
    // set the default options of msnvisualcue functionality
    $.fn.pcMove.defaults = defaults;
})(jQuery);