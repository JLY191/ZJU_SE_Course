import React, { useEffect } from "react";
import './index.css';

export default function Header() {
    useEffect(() => {
        var oBody = document.querySelector(".headWrap");
        var aBanner = document.querySelectorAll(".banner");
        var aSpan = document.querySelectorAll(".tab")[0].querySelectorAll("span");
        var oNext = document.querySelectorAll(".next")[0];
        var Oprev = document.querySelectorAll(".prev")[0];
        aBanner[0].style.opacity = 1;
        aSpan[0].className = "on";
        var num = 0;

        for (var i = 0; i < aSpan.length; i++) {
            aSpan[i].index = i;
            aSpan[i].onclick = function () {  //点击小圆点图片相对应的进行切换
                for (var j = 0; j < aSpan.length; j++) {
                    num = this.index;
                    aSpan[j].className = "";
                    aBanner[j].style.opacity = 0;
                }
                aSpan[num].className = "on";
                aBanner[num].style.opacity = 1;
            }
            oNext.onclick = function () {//按下图片切换到后一张
                for (var j = 0; j < aSpan.length; j++) {
                    if (aSpan[j].className == "on") {
                        aSpan[j].className = "";
                        aBanner[j].style.opacity = 0;
                        j++;
                        num++;
                        if (j > 4) {
                            j = 0;
                        }
                        aSpan[j].className = "on";
                        aBanner[j].style.opacity = 1;

                    }
                }
            }

            Oprev.onclick = function () {  //按下图片切换到前一张
                for (var j = 0; j < aSpan.length; j++) {
                    if (aSpan[j].className == "on") {
                        aSpan[j].className = "";
                        aBanner[j].style.opacity = 0;
                        j--;
                        num--;
                        if (j < 0) {
                            j = 4;
                        }
                        aSpan[j].className = "on";
                        aBanner[j].style.opacity = 1;

                    }
                }
            }
        }

        function Time() {/*设置定时器运行的函数*/
            num++;
            if (num < 5) {
                for (var j = 0; j < aSpan.length; j++) {
                    aSpan[j].className = "";
                    aBanner[j].style.opacity = 0;
                }
                aSpan[num].className = "on";
                aBanner[num].style.opacity = 1;
            } else {
                num = -1;
            }
        }
        clearInterval(timer);
        var timer = setInterval(Time, 2000);/*调用定时器*/

        oBody.onmouseover = function () {/*鼠标引入，清除定时器，轮播图停止*/
            clearInterval(timer);
        };
        oBody.onmouseout = function () {/*鼠标移出，重新调用定时器，轮播图开始*/
            clearInterval(timer);
            timer = setInterval(Time, 2000);
        };
    }, [])

    return (
        <div className="headWrap">
            {/* <img src="../img/module3/room1.jpg" width="1000" height="460" alt="轮播图1" /> */}

            <div id="carousel-wrap">
                <div className="banner">
                <div className="banner-img">
                    <img src="../img/module3/room1.jpg" width="850" height="442" alt="轮播图1" />
                    </div>
                </div>

                <div className="banner">
                <div className="banner-img">
                    <img src="../img/module3/room2.jpg" width="850" height="442" alt="轮播图1" />
                </div>
                </div>

                <div className="banner">
                <div className="banner-img">
                    <img src="../img/module3/room3.jpg" width="850" height="442" alt="轮播图1" />
                </div>
                </div>

                <div className="banner">
                <div className="banner-img">
                    <img src="../img/module3/room4.jpg" width="850" height="442" alt="轮播图1" />
                </div>
                </div>

                <div className="banner">
                <div className="banner-img">
                    <img src="../img/module3/room5.jpg" width="850" height="442" alt="轮播图1" />
                </div>
                </div>

                <div className="tab">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="prev">

                </div>
                <div className="next"></div>
            </div>
            <script type="text/javascript" src="./script.js"></script>

        </div>
    )
}