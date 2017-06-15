function sppm(){
    var dev_w = window.screen.width;
    var body_w=document.getElementsByTagName("body")[0].clientWidth;
    var html_w=document.getElementsByTagName('html')[0];
    //alert(body_w+'+'+dev_w);
    var ztdx=body_w/18.75;
    html_w.style.fontSize=ztdx+"px";
    var window_width=$(window).width();
    var window_height=$(window).height();
    if(window_width<window_height){
        $(".fwsm img").attr("src","images/fwsm.jpg");
    }
    else{
        $(".fwsm img").attr("src","images/fwsm_w.jpg");
    }
}
sppm();
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
window.addEventListener(evt, function() {
    //location.reload()
    sppm();
}, false);
