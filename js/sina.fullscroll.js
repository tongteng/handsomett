//////////////////////////////////////////////////////////////////////
//// PC 端全屏自适应和滚动
//// Even QQ:373384979 
//// 全屏滚动功能
//// $.s_fullScroll.init({
////        "picMaxW" : 1920,// 全屏图片的原始宽度
////        "picMaxH" : 1080// 全屏图片的原始高度
//// });
//////////////////////////////////////////////////////////////////////
(function ($) {
     
    var defaults = {
        picMaxW : 1920,// 全屏图片的原始宽度
        picMaxH : 820,// 全屏图片的原始高度
        speed:700,
        minH : 600 // 窗口最小高度
    };

    var eAction = true;
    var pageLen = $(".pagecontainer .page").length;

    var s_fullScroll = {
        // 初始化
        init : function(options){
            var settings = $.extend(true, {}, defaults, options);

            // 绑定导航或者焦点的单击事件
            $(".pagenav").click(function(event){
                var e = event,targetE = $.s_com.getTarget(e),index;

                var $targetE = $(targetE);
                var nodeName = $targetE[0].nodeName.toLowerCase();
                if(nodeName=="i"||nodeName=="a"){
                    
                    index = nodeName=="i" ? $targetE.parent().index() : $targetE.index();

                    // 开始滚屏
                    $.s_fullScroll.pageUpOrDown("click",index);   
                }          
            });

            // 相关自适应
            function setWindow(){
                var wH = $(window).height(),
                wW = $(window).width();

                // 配置最小高度
                wH = wH < defaults.minH ? defaults.minH : wH;

                // 再做高度自适应
                function setHeight(){
                    if(wH > $(".cur .pagebg .bgimg").height()){
                        $(".pagebg .bgimg").css({"height":wH+"px","width":wH*defaults.picMaxW/defaults.picMaxH+"px"});
                    }else{
                
                    }
                }

                // 背景的缩放
                // 先做宽度自适应
                if(wW >= defaults.picMaxW){
                    $(".main").css({"height":wH+"px","width":defaults.picMaxW+"px"});

                    $(".pagebg .bgimg").attr("style","");

                    setHeight();
                }else if(defaults.minH*defaults.picMaxW/defaults.picMaxH < wW){
                    $(".main").css({"height":wH+"px","width":wW+"px"});

                    $(".pagebg .bgimg").css({"width":wW+"px","height":wW*defaults.picMaxH/defaults.picMaxW+"px"});

                    setHeight();
                }else{
                    $(".main").css({"height":defaults.minH+"px","width":defaults.minH*defaults.picMaxW/defaults.picMaxH+"px"});

                    $(".pagebg .bgimg").css({"width":defaults.minH*defaults.picMaxW/defaults.picMaxH+"px","height":defaults.minH+"px"});
                    setHeight();
                }

                $(".main").css({"height":wH+"px"});

                var $mainR = $(".mainr .pagenav"),mainRH = $mainR.height();

                // 顶部距离
                var mainRTop = (wH-mainRH)/2;

                $mainR.stop();

                if(!$mainR.is(":animated")){
                    $mainR.animate({"top":mainRTop+"px"},"fast",function(){});
                }
                $(".commonh").css({"height":wH+"px"});

                $(".popmain .page").css({"height":wH+"px"});

                var curIndex = $(".pagecontainer .cur").index();
                $(".pagecontainer").css({"top":-curIndex*wH+"px"});
            }

            // 初始化
            $(".pagecontainer .cur .bgimg").load(function(){
                setWindow();
            });

            setWindow();
            // 窗口resize
            window.onresize = function(){
                setWindow();
            };

            function scrollPage(wheelData){
                if(wheelData > 0){
                    $.s_fullScroll.pageUpOrDown("up");
                }else{
                    $.s_fullScroll.pageUpOrDown("down");
                }
            }

            var wheelTime;
            // 滚轮事件
            var scrollFunc=function(e){
                var ev = e || window.event,timeNow = new Date();

                // 如果滚轮控制的区域是不可见的就直接返回
                if(!$(".mainc").is(":visible") || (timeNow.getTime() - wheelTime)<1000){
                    return;
                }
                eAction = false;
                if(ev.wheelDelta){
                    wheelTime = timeNow.getTime();
                    // IE/Opera/Chrome
                    // 大于零是向上
                    // 小于零是向下        
                    // 上滚
                    scrollPage(ev.wheelDelta);
                }else if(ev.detail){
                    wheelTime = timeNow.getTime();
                    // Firefox
                    // 大于零是向下
                    // 小于零是向上
                    scrollPage((-1)*ev.detail);
                }
            };
            /*注册事件*/
            if(document.addEventListener){
                document.addEventListener('DOMMouseScroll',scrollFunc,false);
            }//W3C
            window.onmousewheel = document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari
        },
        // 上滚或者下滚
        pageUpOrDown:function(dir,clickIndex){
            eAction = true;
            var wH = $(window).height();
            // flash主区
            var $mainC =  $(".pagecontainer"),
                $navA = $(".pagenav"),
                $curPage = $(".cur",$mainC),
                curIndex = $curPage.index(),
                $curA = $(".cur",$navA);

            // dir=down表示下滚,dir=up表示上滚
            curIndex = (dir == "down") ? (curIndex + 1) : (curIndex - 1);

            curIndex = clickIndex!=undefined ? clickIndex : curIndex;

            if(curIndex >= pageLen || curIndex <= -1){
                // 第一页上滚和最后一页的下滚直接返回
                return;
            }

            $mainC.stop();

            if(!$mainC.is(":animated")){
                clickIndex == undefined ? ((dir == "down") ? $curPage.removeClass("cur").next().addClass("cur") && $curA.removeClass("cur").next().addClass("cur") : $curPage.removeClass("cur").prev().addClass("cur")&& $curA.removeClass("cur").prev().addClass("cur")) : ($(".page",$mainC).eq(clickIndex).addClass("cur").siblings().removeClass("cur") && $(".pagenav a").eq(clickIndex).addClass("cur").siblings().removeClass("cur"));
                $mainC.animate({"top":-curIndex*100+"%"},defaults.speed,function(){
                    eAction = false;
                });
            }
        }
    };

    $.extend({ s_fullScroll : s_fullScroll });
})(jQuery);