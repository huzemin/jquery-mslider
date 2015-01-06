/**
 * @author 胡泽民
 * @description jQuery 简单的焦点图插件
 */
(function($){
    // 基础参数设置
    var default_opt = {
        'direction':'left',
        'interval': 2000,
    };
    var $slider = null,
        $ili = null, 
        $ful = null, 
        len = 0, 
        active = 0,
        iw=0,
        interval;
    $.fn.mslider = function(option) {
        $slider = $(this);
        // 覆盖用户自定义参数
        $.extend(default_opt,option);
        $ili = $slider.find('.jsimg li');

        // 设置焦点图对应的显示标志容器
        if($slider.find('.jsflag').length <= 0) {
                $slider.append('<div class="jsflag"><ul></ul><div>');
        } else {
            if($slider.find('.jsflag ul').length <= 0) {
                $slider.find('.jsflag').append('<ul></ul>');
            }
        }
        $ful = $slider.find('.jsflag ul');
        // 焦点图的数量和宽度
        len = $ili.length;
        console.log($ili.first().width());
        // 计算图片的长度
        iw = $ili.first().width();
        if(iw == 0) {
            iw = $slider.width();
        }
        // 设置图片容器的宽度
        $slider.find('.jsimg').width(iw * len);
        // 设置焦点图对应的显示标志
        $ili.each(function(index,el) {
            var el = $(el);
            var flel;
             // 产生每张图片对于的小圆点
            if(typeof el.attr('class') != 'undefined' && el.attr('class').match(/active/)) {
                active = index;
                flel = '<li data-index="'+index+'" class="active">'+(index+1)+'</li>';
            } else {
                 flel = '<li data-index="'+index+'">'+(index+1)+'</li>';
            }
            $ful.append(flel);
        });
        // 默认为第一张显示
       if(active <= 0) {
            $ili.first().addClass('active');
            $ful.find('li').first().addClass('active');
            active = 0;
        }
        //点击显示标志切换至对应的焦点图
        $ful.on('click','li',function(){
                var index = $(this).attr('data-index');
                if(typeof index != 'undefined') {
                    active = parseInt(index);
                }
                change(active);
        });
        interval = setInterval(function(){
            next();
        }, default_opt.interval);
        return $slider;
    }
    function next() {
        active = active + 1;
        if(active >= len) {
            active = 0;
        }
        change(active);
    }
    function prev() {
        active = active - 1;
        if(active <= 0) {
            active = len;
        }
        change(active);
    }
    function change(index) {
        if(index > len) {
            index = 0;
        }
        left = index * iw;
        $ili.eq(index).addClass('active');
        $slider.find('.jsimg').animate({left:'-'+left+'px'});
        $ili.removeClass('active');
        $ili.eq(index).addClass('active');
        $slider.find('.jsflag li').removeClass('active');
        $slider.find('.jsflag li').eq(index).addClass('active');
        clearInterval(interval);
        interval = setInterval(function(){
            next();
        }, default_opt.interval);
    }
})(jQuery);