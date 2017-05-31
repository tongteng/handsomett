////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// PC端3D图片左右轮换效果
//// 默认调用$.fn.imgSlide3D();
//// 可以根据需要传入相关参数覆盖默认配置
//// 联系人 Even:373384979
//// Copyright (c) 2015 by Sina Corporation. All rights reserved.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
sSina.imgslide_3d = function(){
    (function($){
        var defaults = {
                "auto":1, // 1代表自动滚动,0代表不自动滚动
                // 大图ul的父级div的class
                "bigImgCls" : ".bigimgslide",
                // 初始化的时候大图的尺寸,位置,层级,只要配置一次就好了!
                "initPos" : [
		            {width:344,height:440,top:0,left:352,zIndex:10}, // 第一张当前中间最大的图(html的大图第1个li元素的相关css属性值)
		            {width:260,height:332,top:56,left:148,zIndex:8}, // 从中间往左边数第2张(html的大图第2个li元素的相关css属性值)
		            {width:204,height:260,top:92,left:0,zIndex:6}, // 从中间往左边数第3张(html的大图第3个li元素的相关css属性值)
		            {width:140,height:180,top:132,left:148,zIndex:4}, // 看不见(动的时候可以看见)
		            {width:110,height:140,top:172,left:232,zIndex:2}, // 看不见(动的时候可以看见)
		            {width:110,height:140,top:172,left:708,zIndex:2}, // 看不见(动的时候可以看见)
		            {width:140,height:180,top:132,left:770,zIndex:4}, // 看不见(动的时候可以看见)
		            {width:204,height:260,top:92,left:844,zIndex:6}, // 从中间往右边数第2张(html的大图倒数第2个li元素的相关css属性值)
		            {width:260,height:332,top:56,left:640,zIndex:8} // 从中间往右边数第3张(html的大图倒数第1个li元素的相关css属性值)
	            ],
                "hasSmall":true, // 如果没有缩略图,删掉dom元素即可
                "hasP":true// 大图中是否含有文字等额外元素,如果配置false,需要手动删掉p元素的,这样干净一点
            };

        // 
        $.fn.imgSlide3D = function(options){
            // 深度copy,第一个参数true
            var settings = $.extend(true, {}, defaults, options),autoSlideTimeout,autoIndex;

            // 大图ul的父级div对象
            var $bigImg = $(settings.bigImgCls);

            // 大图的ul对象
            var $bigUL = $("ul.bigul",$bigImg);

            // 大图li对象
            var $bigLi = $("li",$bigImg);

            // 大图li个数
            var bigliLen = $bigLi.length;        

            function init(){
                // 初始化
                var $eachLi;
                for(var i =0; i < bigliLen; i++){
                    $eachLi = $bigLi.eq(i);
                    $eachLi.css({
                        "width" : settings.initPos[i].width+"px",
                        "height" : settings.initPos[i].height+"px",
                        "left" : settings.initPos[i].left+"px",
                        "top" : settings.initPos[i].top+"px",
                        "z-index" : settings.initPos[i].zIndex
                    });

                    if(!i){
                        // 蒙版设置非透明
                        $(".slidemask",$eachLi).addClass("maskcur");
                    }
                }
            }
            // 初始化
            init();       

            // li设置其他属性的动画效果
            function styleAnimation($obj,styleObj){
                $obj.stop();
                if(!$obj.is(":animated")){
                    $obj.css({"z-index":styleObj.zIndex});
                    $obj.animate({
                        "width":styleObj.width+"px",
                        "height":styleObj.height+"px",
                        "left":styleObj.left+"px",
                        "top":styleObj.top+"px"//,
                        //"zIndex":styleObj.zIndex
                    },300,"linear",function(){});
                }
            }

            // 大图滚动效果主方法
            function slideGo(event,index){
                clearTimeout(autoSlideTimeout);          
                var targetE = $.s_com.getTarget(event),$targetE = $(targetE),$curLi;

                // 点击当前主显示元素,不执行效果,直接返回
                if($targetE.parents("li.hove").length){
                    return;
                }else if(index != "undefined"){
                    $curLi = $bigLi.eq(index);
                }

                // 用户点击的当前li
                $curLi = $targetE.length && !$targetE.hasClass("nextorprev") ? $targetE.parents("li.bigli") : $curLi;

                //  用户点击的当前li的index
                var curIndex = $curLi.index();

                var $eachLi,curLiTimeout,liLength;
                // 该li后边的所有对象对应的位置,尺寸,层级前移
                for(var i = curIndex,j=0; i<bigliLen && j<bigliLen; i++,j++){
                    $eachLi = $bigLi.eq(i);

                
                
                    // li的属性动效
                    styleAnimation($eachLi,settings.initPos[j]);

                    if(!j){                    
                        // 这只当前li值
                        $eachLi.addClass("hove").siblings().removeClass("hove");

                        // 停止所有li的动画,避免重复执行
                        $(".slidemask",$("li")).stop();
                        if(!$(".slidemask",$("li.hove")).is(":animated")){
                        
                            // 给当前以外的蒙版加上0.7的透明
                            $(".slidemask",$("li")).css({"opacity":0.7});

                            // 给当前蒙版透明动画
                            $(".slidemask",$("li.hove")).animate({"opacity":0},1500,function(){});

                            // 对应小图选中
                            var $smallLiCur = $(".smallimgslide li").eq($("li.hove",$bigImg).index());

                            $smallLiCur.siblings().css({"opacity":0.4});

                            $smallLiCur.css({"opacity":1});

                            $smallLiCur.addClass("hove").siblings().removeClass("hove");
                        }
                    }
                }
            
                // 将li前边的所有对象对应的位置,尺寸,层级后移     
                for(var i = curIndex-1,j=(bigliLen-1); i >= 0; i--,j--){
                    $eachLi = $bigLi.eq(i);

                    $eachLi.css({"z-index":settings.initPos[j].zIndex});
                    // li的属性动效
                    styleAnimation($eachLi,settings.initPos[j]);
                }

                clearTimeout(autoSlideTimeout);

                autoIndex = $("li.hove",$bigImg).index()+1;

                autoIndex = autoIndex >= bigliLen ? 0 : autoIndex;

                settings.auto ? autoSide(autoIndex) : "";   
            }

            // 事件代理的方式
            // 大图点击
            $bigUL.bind("click",slideGo);

            $(".next",$bigImg).click(function(){  
                var $curSlide = $(".hove",$bigImg);
                  
                var prevIndex = $curSlide.prev().length ? $curSlide.prev().index() : bigliLen-1;

                slideGo(null,prevIndex);
            });

            $(".prev",$bigImg).click(function(){   
                var $curSlide = $(".hove",$bigImg);
                     
                var nextIndex = $curSlide.next().length ? $curSlide.next().index() : 0;

                slideGo(null,nextIndex);
            });

            // 自动滚动的方法
            function autoSide(autoIndex){
                clearTimeout(autoSlideTimeout);
                autoSlideTimeout = null;
                autoSlideTimeout = setTimeout(function(){
                    slideGo(null,autoIndex);
                },4000);
            }

            // 自动滚动
            settings.auto ? autoSide(1) : "";        

            // 大图li的hover事件
            $bigLi.hover(function(){
                var $this = $(this);
                if(!$this.hasClass("hove")){
                    $(".slidemask",$this).stop();
                    // 当前的蒙版设置非透明动效
                    if(!$(".slidemask",$this).is(":animated")){                    
                        $(".slidemask",$this).animate({"opacity":0},100,function(){});
                    }

                }else if($this.hasClass("hove")){
                    // 如果是当前显示的大图
                    // 是否含有额外的元素
                    $(".b_tit",$this).stop();
                    if(settings.hasP && !$(".b_tit",$this).is(":animated")){
                    
                        $(".b_tit",$this).animate({
                            "bottom":0+"px"
                        },300,"linear")
                    }
                }
                clearTimeout(autoSlideTimeout);
            },function(){
                var $this = $(this);
                if(!$this.hasClass("hove")){
                    $(".slidemask",$this).stop();
                    if(!$(".slidemask",$this).is(":animated")){
                        $(".slidemask",$this).animate({"opacity":0.7},100,function(){});
                    }

                }else if($this.hasClass("hove")){
                    // 如果是当前显示的大图
                    // 是否含有额外的元素
                    $(".b_tit",$this).stop();
                    if(settings.hasP && !$(".b_tit",$this).is(":animated")){
                        $(".b_tit",$this).animate({
                            "bottom":-180+"px"
                        },300,"linear")
                    }
                }
                settings.auto ? autoSide() : "";
            });

            // 是否含有缩略图
            if(settings.hasSmall){
                var $smallLi = $(".smallimgslide li");

                // 小图点击
                $smallLi.click(function(){
                   var $this = $(this);
               
                   if($this.index() == $("li.hove",$bigImg).index()){
                        return;
                   }

                   slideGo(null,$this.index());
               
                   $this.siblings().css({"opacity":0.4});

                   $this.css({"opacity":1});

                   $this.addClass("hove").siblings().removeClass("hove");
                });

                // 小图鼠标上移,可以用css做
                $smallLi.hover(function(){
                    var $this = $(this);

                     $this.animate({"opacity":1},100,function(){
                        $this.siblings().css({"opacity":0.4});
                        $smallLi.eq($("li.hove",$bigImg).index()).css({"opacity":1});
                        $this.css({"opacity":1});
                     });
                },function(){
                    var $this = $(this);

                    // 当前的蒙版设置非透明动效
                    if($this.index()!=$("li.hove",$bigImg).index()){
                        $this.animate({"opacity":0.4},100,function(){
                        
                         });
                    }
                })
            }
        }
    })(jQuery);
};