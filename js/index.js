//->解决click的300ms延迟
FastClick.attach(document.body);

//->动态设定REM的根植
~function (desW) {
    var winW = document.documentElement.clientWidth;
    if (winW > desW) {
        var oMain = document.querySelector(".swiper-container");
        oMain.style.margin = "0 auto";
        oMain.style.width = desW + "px";
        return;
    }
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);

//->初始化Swiper
new Swiper(".swiper-container", {
    direction: "vertical",
    loop: true,
    //->当屏幕切换结束后执行 swipe:当前Swiper的一个实例
    onSlideChangeEnd: function (swipe) {
        var n = swipe.activeIndex,//->获取当前活动块(当前展示的)的索引
            slideAry = swipe.slides;//->当前容器中所有的slider(包含loop模式下克隆的那两个)-它是一个类数组集合

        //->让当前展示的那个有ID，其余的都移除ID
        [].forEach.call(slideAry, function (item, index) {
            if (index == n) {
                //->这个就是当前这一块,需要设定ID
                item.id = index == 1 ? "page1" : "page2";
                return;

            }
            item.id = null;
        });
    }
});

//->音频自动播放
var music = document.getElementById("music"),
    musicAudio = document.getElementById("musicAudio");
window.setTimeout(function () {
    musicAudio.play();//->让音频播放:浏览器开始下载资源文件,也就是让它播放到出声音还需要一段时间,只有发出声音后我们才会显示音乐的图标
    musicAudio.addEventListener("canplay", function () {
        //->canplay:音频文件已经可以播放了,但是不一定是所有资源都加载完成了,大部分是边播放边记载
        music.style.display = "block";
    }, false);
}, 1000);
music.addEventListener("click", function () {
    //->当前是暂停状态我让其播放
    if (musicAudio.paused) {
        musicAudio.play();
        music.className = "music musicMove";
        return;
    }
    //->当前是播放状态我让其暂停
    musicAudio.pause();
    music.className = "music";
}, false);