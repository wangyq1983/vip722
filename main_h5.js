/**
 * Created by wyq on 2016/7/15.
 */
$(function(){
    function dangqian(){
        //获取当前vip等级的元素以及位移
        $(".v_item").each(function(i){
            if($(this).hasClass("rank")){
                v_index=$(this).index();
                $(".v_item").eq(v_index).find(".v_three").hide();
                $(".v_item").eq(v_index).find(".money").hide();
                $(".v_item").eq(v_index).addClass("cur").css("marginRight",9+'rem');
                $(".vip_info dl").eq(v_index).show().siblings().hide();
                $(".v_ac").css("left",-(v_index*6.35)+'rem');
                $(".vip_rate_big").show();
                $(".vip_rate_small").css("left",(v_index*6.35)+'rem');
                $(".vip_rate_small").hide();
                dclick=$(this).index();
                if(v_index==12){
                    $('#right_arr').removeClass("right_arrow");
                    $(".vip_rate_big").hide();
                    $(".vip_rate_small").hide();
                    $(".v_item").find(".v_three").show();
                    $(".v_item").find(".money").show();
                    $(".upgrade").hide();
                    $(".v_ac").css("left",-((v_index-1)*6.35)+'rem');
                }
                else if(v_index==0){
                    $('#left_arr').removeClass("left_arrow");
                }
                else if(v_index!==0 || v_index!==12){
                    $('#right_arr').addClass("right_arrow");
                    $('#left_arr').addClass("left_arrow");
                }
            }
        })
    }
    dangqian();
    function chushihua(){
        $(".v_item").each(function(i){
            if($(this).hasClass("cur")){
                v_index=$(this).index();
                slider.init(v_index);
                slider.events.index=v_index;

            }
        })
    }
    //滑动触发函数
    //console.log("wy_juli"+wy_juli);
    dev_w = window.screen.width;
    body_w=document.getElementsByTagName("body")[0].clientWidth;
    juli_50=body_w/125.6;
    juli_100=body_w/16.4;
    juli_150=body_w/14.266;
    var slider = {
        // 判断设备是否支持touch事件
        touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        slider: document.getElementById('slider'),
        // 事件
        events: {
            index:v_index,// 显示元素的索引
            slider: this, // this为slider对象
            handleEvent: function(event) {
                // this指events对象
                var self = this;
                if (event.type == 'touchstart') {
                    self.start(event);
                } else if(event.type == 'touchmove') {
                    self.move(event);
                } else if(event.type == 'touchend') {
                    self.end(event);
                }
            },
            // 滑动开始
            start: function(event) {
                console.log("index+"+this.index);
                //event.preventDefault(); // 阻止触摸事件的默认动作,即阻止滚屏
                var touch = event.touches[0];                // touches数组对象获得屏幕上所有的touch，取第一个touch
                startPos = {                                 // 取第一个touch的坐标值
                    x: touch.pageX,
                    y: touch.pageY,
                    time: +new Date
                };
                // 绑定事件
                this.slider.addEventListener('touchmove', this, false);
                //console.log("touch");
            },
            // 移动
            move: function(event) {
                event.preventDefault(); // 阻止触摸事件的默认行为，即阻止滚屏
                console.log("move");
                // 当屏幕有多个touch或者页面被缩放过，就不执行move操作
                if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
                var touch = event.touches[0];
                endPos = {
                    x: touch.pageX - startPos.x,
                    y: touch.pageY - startPos.y
                };
                if(this.index==0 && endPos.x>=0){
                    console.log(this.index+"move+"+endPos.x);
                    return false;
                }
                else if(this.index==12 && endPos.x<0){
                    return false;
                }
                //执行操作，使元素移动
                if(endPos.x>juli_50 || endPos.x<-juli_50 ){
                    $(".vip_rate_big").hide();
                    $(".vip_rate_small").show();
                    $(".v_item").find(".v_three").show();
                    $(".v_item").find(".money").show();
                    $(".upgrade").hide();
                    $(".v_item").css("marginRight",4.8+'rem');
                    var v_w=$(".v_item").width();
                    var v_mright=parseInt($(".v_item").css('marginRight'));
                    var v_width=Number(v_w)+Number(v_mright);
                    wy_juli=v_width;
                    this.className = 'v_ac';
                    var weiyi1=-(this.index-1)*wy_juli;
                    console.log(wy_juli);
                    $(".v_ac").css("left",(weiyi1+ endPos.x) + 'px');
                }
                this.slider.addEventListener('touchend', this, false);
            },
            // 滑动释放
            end: function(event) {
                //console.log("end");
                var duration = +new Date - startPos.time;    // 滑动的持续时间
                //this.icon[this.index].className = '';
                var l_a=document.getElementById("left_arr");
                var r_a=document.getElementById("right_arr");
                $(".v_item").each(function(i){
                    if($(this).hasClass("cur")){
                        v_index_cur=$(this).index();
                    }
                });
                if (Number(duration) > juli_100) {
                    // 判断是左移还是右移，当偏移量大于50时执行
                    console.log("endposX+"+endPos.x);
                    if (endPos.x > juli_150) {//向右移动
                        console.log("向右移动");
                        r_a.className='right_arrow';
                        if(this.index==0){
                            event.preventDefault();
                            console.log("不能右移了");
                            return false;
                        }
                        if(this.index == 1){
                            l_a.className='';
                        }
                        if(this.index !== 0){
                            this.index -= 1;
                            $(".v_item").eq(v_index_cur).prev().addClass("cur").siblings().removeClass("cur");
                            var xh=$(".v_ac .cur .v_num sub").text();
                            $(".vip_info dl").eq(xh).show().siblings().hide();
                            $(".v_ac").css("left",-(this.index-1) * wy_juli + 'px');
                        }

                    }
                    else if(endPos.x < -juli_150) {//向左移动
                        console.log("向左移动");
                        l_a.className='left_arrow';
                        if (this.index == 11){
                            r_a.className='';
                        }
                        if (this.index !== 12){
                            this.index += 1;
                            $(".v_item").eq(v_index_cur).next().addClass("cur").siblings().removeClass("cur");
                            var xh=$(".v_ac .cur .v_num sub").text();
                            $(".vip_info dl").eq(xh).show().siblings().hide();
                            $(".v_ac").css("left",-(this.index-1) * wy_juli + 'px');
                        }
                        else if(this.index==12){
                            return false;
                        }
                    }
                }
                //this.className='v_ac';
                //$(".vip_info dl").eq(v_index_cur).show().siblings().hide();
                //this.style.left = -this.index*wy_juli + 'px';
                //this.slider_span=document.getElementById("slider").getElementsByClassName("v_item");
                //this.con_item=document.getElementById("con").getElementsByTagName("div");
                // 解绑事件
                this.slider.removeEventListener('touchmove', this, false);
                this.slider.removeEventListener('touchend', this, false);
                dclick=this.index;
            }
        },
        // 初始化
        init: function(t_index) {
            // this指slider对象
            var self = this;
            // addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
            if(!!self.touch) self.slider.addEventListener('touchstart', self.events, false);
        },
        yichu: function() {
            var self = this;
            if(!!self.touch) self.slider.removeEventListener('touchstart', self.events, false);
        }
    };
    chushihua();
    var win_w=$(window).width();
    //点击触发函数
    $(".v_item").click(function(){

            console.log("dclick"+dclick);
            $(".vip_rate_big").hide();
            $(".vip_rate_small").show();
            $(".v_item").find(".v_three").show();
            $(".v_item").find(".money").show();
            if($(this).hasClass("rank")){//判断是否为当前VIP等级
                var v_index=$(this).index();
                $(".vip_info dl").eq(v_index).show().siblings().hide();
            }
            else if($(this).hasClass("cur")){//判断是否为选中正在显示的VIP等级
                return false;
            }
            $(".upgrade").hide();
            var offset_jizhun=win_w/2;
            var offset_case=win_w/4;
            var weiyi=$(".v_ac").position().left;//当前位移
            var v_w=$(".v_item").width();// vip
            var v_mright=parseInt($(this).css('marginRight'));
            var v_width=Number(v_w)+Number(v_mright);
            if($(this).offset().left>offset_case){//点击屏幕右侧
                console.log("click_right");
                dclick=dclick+1;
                if(parseInt($(this).prev().css('marginRight'))>parseInt($(this).next().css('marginRight')) && dclick<11){
                    $(".v_ac").css("left",(weiyi)+'px');
                }
                else{
                    $(".v_ac").css("left",(-v_width+weiyi)+'px');
                    var v_ac_postiong=$(".v_ac").position().left;
                }
                $(this).addClass("cur").siblings().removeClass("cur");
                $(".vip_info dl").eq(dclick).show().siblings().hide();
            }
            else if($(this).offset().left<offset_case){//点击屏幕左侧
                console.log("click_left");
                dclick=dclick-1;
                if(parseInt($(this).css('marginRight'))>parseInt($(this).prev().css('marginRight')) && dclick>0){
                    $(".v_ac").css("left",(weiyi+v_width+v_w)+'px');
                    $(this).prev().addClass("cur").siblings().removeClass("cur");
                    $(".vip_info dl").eq(dclick).show().siblings().hide();
                }
                else{
                    $(".v_ac").css("left",(v_width+weiyi)+'px');
                    var v_ac_postiong=$(".v_ac").position().left;
                }
                $(this).addClass("cur").siblings().removeClass("cur");
                $(".vip_info dl").eq(dclick).show().siblings().hide();
            }
            $(".v_item").css("marginRight",4.8+'rem');
            if(dclick==0){
                $("#left_arr").removeClass("left_arrow");
            }
            else if(dclick==12){
                $("#right_arr").removeClass("right_arrow");
            }
            else{
                $("#left_arr").addClass("left_arrow");
                $("#right_arr").addClass("right_arrow");
            }
            chushihua();
        }
    );
});