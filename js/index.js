class Banner {
    constructor() {
        this.idx = 0;
        this.lis = document.querySelectorAll(".banner .bannerUl li");
        this.width = this.lis[0].clientWidth;
        this.bannerUl = document.querySelector(".banner .bannerUl");
        this.leftBtn = document.querySelector("#leftBtn");
        this.rightBtn = document.querySelector("#rightBtn");
        this.dots = document.querySelectorAll(".banner .dot li");
        this.interval = 1800;
        this.lock = false;

        this.banner = document.getElementById("banner");
        this.addEvent();
    }
    addEvent() {
        var that = this;
        this.rightBtn.onclick = function () {
            if (that.lock) {
                return;
            }
            that.idx++;
            that.change();
        }
        this.leftBtn.onclick = function () {
            if (that.lock) {
                return;
            }
            that.idx--;
            if (that.idx < 0) {
                that.idx = that.dots.length;
                that.bannerUl.style.left = -that.idx * that.width + 'px';
                that.idx--;
            }
            that.change();
        }
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].onclick = function () {
                if (that.lock) {
                    return;
                }
                that.idx = i;
                that.change();
            }
        }
        this.addEvent2();

    }
    auto() {
        var that = this;
        this.timer = setInterval(function () {
            that.rightBtn.onclick();
        }, this.interval);

    }
    addEvent2() {
        var that = this;
        this.banner.onmouseenter = function () {
            clearInterval(that.timer);
            console.log(1);
        }
        this.banner.onmouseleave = function () {
            that.auto();
            console.log(2);
        }
        this.auto();
    }
    change() {
        this.lock = true;
        var that = this;
        animate(this.bannerUl, { left: -this.idx * this.width }, this.interval, function () {
            if (that.idx >= that.dots.length) {
                that.idx = 0;
                that.bannerUl.style.left = 0;
            }
            that.lock = false;
            that.changeStyle();
        })
    }
    changeStyle() {
        for (var i = 0; i < this.dots.length; i++) {
            if (i === this.idx) {
                this.dots[i].className = "active";
            } else {
                this.dots[i].className = "";
            }
        }
    }
}
new Banner();

class Floor {
    constructor() {
        this.aside = document.querySelector("aside");
        this.bkTop = document.querySelector(".bkTop");
        this.bkHot = document.querySelector(".bkHot");
        this.hotBrand = document.querySelector(".hotBrand");
        this.quality = document.querySelector(".quality");
        this.bkToday = document.querySelector(".bkToday");
        this.height = document.documentElement.clientHeight
        this.addEvent();
    }
    addEvent() {
        var that = this;
        onscroll = function () {
            that.scroll = document.documentElement.scrollTop;
            if (that.scroll >= that.height) {
                that.aside.style.display = "block";
            } else {
                that.aside.style.display = "none";
            }
        }
        this.aside.onclick = function (e) {
            if (e.target == that.bkTop) {
                document.documentElement.scrollTop = 0;
            } else if (e.target == that.bkHot) {
                document.documentElement.scrollTop = that.hotBrand.offsetTop;
            } else if (e.target == that.bkToday) {
                document.documentElement.scrollTop = that.quality.offsetTop;
            }
        }
    }
}
new Floor();

