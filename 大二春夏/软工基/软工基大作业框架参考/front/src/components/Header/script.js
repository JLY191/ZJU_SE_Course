var oBody = document.getElementsByTagName("headWrap")[0];
var aBanner = document.getElementsByClassName("banner");
var aSpan = document.getElementsByClassName("tab")[0].getElementsByTagName("span");
var oNext = document.getElementsByClassName("next")[0];
var Oprev = document.getElementsByClassName("prev")[0];
var Oon = document.getElementsByClassName("on")[0];

aBanner[0].style.opacity = "1";
aSpan[0].className = "on";
var num = 0;

for (var i = 0; i < aSpan.length; i++) {
    aSpan[i].index = i;
    aSpan[i].onclick = function () {  //点击小圆点图片相对应的进行切换
        for (var j = 0; j < aSpan.length; j++) {
            num = this.index;
            aSpan[j].className = "";
            aBanner[j].style.opacity = "0";
        }
        aSpan[num].className = "on";
        aBanner[num].style.opacity = "1";
    }
    oNext.onclick = function () {//按下图片切换到后一张
        for (var j = 0; j < aSpan.length; j++) {
            if (aSpan[j].className == "on") {
                aSpan[j].className = "";
                aBanner[j].style.opacity = "0";
                j++;
                num++;
                if (j > 4) {
                    j = 0;
                }
                aSpan[j].className = "on";
                aBanner[j].style.opacity = "1";

            }
        }
    }

    Oprev.onclick = function () {  //按下图片切换到前一张
        for (var j = 0; j < aSpan.length; j++) {
            if (aSpan[j].className == "on") {
                aSpan[j].className = "";
                aBanner[j].style.opacity = "0";
                j--;
                num--;
                if (j < 0) {
                    j = 4;
                }
                aSpan[j].className = "on";
                aBanner[j].style.opacity = "1";

            }
        }
    }
}

function Time() {/*设置定时器运行的函数*/
    num++;
    if (num < 5) {
        for (var j = 0; j < aSpan.length; j++) {
            aSpan[j].className = "";
            aBanner[j].style.opacity = "0";
        }
        aSpan[num].className = "on";
        aBanner[num].style.opacity = "1";
    } else {
        num = -1;
    }
}
clearInterval(timer);
var timer = setInterval("Time()", 2000);/*调用定时器*/

oBody.onmouseover = function () {/*鼠标引入，清除定时器，轮播图停止*/
    clearInterval(timer);
};
oBody.onmouseout = function () {/*鼠标移出，重新调用定时器，轮播图开始*/
    clearInterval(timer);
    timer = setInterval("Time()", 2000);
};