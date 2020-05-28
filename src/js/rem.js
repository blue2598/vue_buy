(function() {
    var designW = 375; //设计稿宽
    var font_rate = 100;
    //适配a
    document.getElementsByTagName("html")[0].style.fontSize = document.body.clientWidth / designW * font_rate + "px";
    document.getElementsByTagName("body")[0].style.fontSize = document.body.clientWidth / designW * font_rate + "px";

    //监测窗口大小变化
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        document.getElementsByTagName("html")[0].style.fontSize = document.body.clientWidth / designW * font_rate + "px";
        document.getElementsByTagName("body")[0].style.fontSize = document.body.clientWidth / designW * font_rate + "px";
    }, false);

})();