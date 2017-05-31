sSina.page = function(){
    $(function(){
        //根据项目需求,可以通过js传入参数initPos:[{第1张图片的宽,高,位置等属性},{第2张图片的宽,高,位置等属性},{}....,{倒数第2张图片的宽,高,位置等属性},{倒数第1张图片的宽,高,位置等属性}],来满足需求

        // 默认的调用方法
        $.fn.imgSlide3D();

    //       根据不同项目只要传入相关覆盖参数就可以达到效果
    //    // Notes:如果想对显示大小和个数等需要修改的，只要传入类似下边的参数initPos就好了,每个传入参数有解释
    //    $.fn.imgSlide3D({
    //        // 大图ul的父级div的class
    //        "bigImgCls" : ".bigimgslide",
    //        // 初始化的时候大图的尺寸,位置,层级,只要配置一次就好了!
    //        "initPos" : [
    //		    {width:344,height:440,top:0,left:352,zIndex:10}, // 第一张当前中间最大的图(html的大图第1个li元素的相关css属性值)
    //		    {width:260,height:332,top:56,left:148,zIndex:8}, // 从中间往左边数第2张(html的大图第2个li元素的相关css属性值)
    //		    {width:204,height:260,top:92,left:0,zIndex:6}, // 从中间往左边数第3张(html的大图第3个li元素的相关css属性值)
    //		    {width:140,height:180,top:132,left:148,zIndex:4}, // 看不见(动的时候可以看见)
    //		    {width:110,height:140,top:172,left:232,zIndex:2}, // 看不见(动的时候可以看见)
    //		    {width:110,height:140,top:172,left:708,zIndex:2}, // 看不见(动的时候可以看见)
    //		    {width:140,height:180,top:132,left:770,zIndex:4}, // 看不见(动的时候可以看见)
    //		    {width:204,height:260,top:92,left:844,zIndex:6}, // 从中间往右边数第2张(html的大图倒数第1个li元素的相关css属性值)
    //		    {width:260,height:332,top:56,left:640,zIndex:8} // 从中间往右边数第3张(html的大图倒数第2个li元素的相关css属性值)
    //	    ],
    //        "hasSmall":true, // 如果没有缩略图,删掉相关dom元素即可
    //        "hasP":true// 大图中是否含有文字等额外元素,如果配置false,需要手动删掉相关p元素的,这样干净一点
    //    });
    // 联系人:Even:373384979
    });
};

