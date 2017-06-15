function loadjscssfile(filename, filetype){
    if (filetype=="js"){
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype=="css"){
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
};

function direction(){
    var window_width=$(window).width();
    var window_height=$(window).height();
    if(window_width<window_height){
        sppm();
        loadjscssfile("css/vip.css","css");
        loadjscssfile("main.js","js");
    }
    else{
        if(window_width<600){
            loadjscssfile("css/vip_h5.css","css");
            loadjscssfile("main_h5.js","js");
        }
        else{
            loadjscssfile("css/vip_h.css","css");
            loadjscssfile("main_h.js","js");
        }
        var xx=window.screen.height;
        $(".vip_info").height(xx);
        $(".head").height(xx);
    }
}
direction();
function sppm(){
    var dev_w = window.screen.width;
    var body_w=document.getElementsByTagName("body")[0].clientWidth;
    var html_w=document.getElementsByTagName('html')[0];
    var ztdx=body_w/18.75;
    html_w.style.fontSize=ztdx+"px";
}
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
window.addEventListener(evt, function() {
    location.reload();
    direction();
    sppm();
}, false);
