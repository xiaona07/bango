class Magnify {
    constructor() {
        this.smallImg = document.querySelector(".smallImg");
        this.img = document.querySelector(".smallImg img");
        this.add = document.getElementById("add");



        this.buyImg = document.getElementById("buyImg");
        this.nowname = document.getElementById("nowname");
        this.nowPrice = document.getElementById("nowPrice");
        this.original = document.getElementById("original");
        this.discout = document.getElementById("discout");


        this.box = document.querySelector(".smallImg .box");
        this.bigImg = document.querySelector(".bigImg");

        this.url = "http://localhost/bango/data/list.json";

        // this.addEvent();
        this.display();
    }

    display() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);
            that.addData();
        })



    }
    addData() {
        var that = this;
        for (var i = 0; i < that.res.length; i++) {
            if (that.res[i].id == localStorage.nowGoods) {
                that.nowGoods = that.res[i];
                break

            }
        }
        that.img.src = that.nowGoods.img;


        that.buyImg.src = that.nowGoods.img;
        that.nowname.innerHTML = that.nowGoods.name;
        that.nowPrice.innerText = that.nowGoods.price;
        that.original.innerText = that.nowGoods.original;
        that.discout.innerText = that.nowGoods.discout;


        that.bigImg.style.backgroundImage = "url("+ that.img.src +")";
        
        this.addEvent();
    }





    addEvent() {
        var that = this;
        this.smallImg.onmouseenter = function () {
            that.box.style.display = "block";
            that.bigImg.style.display = "block";
            that.r = that.box.clientWidth / that.smallImg.clientWidth;
            document.onmousemove = function (e) {
                that.resultX = e.pageX - offset(that.smallImg).left - that.smallImg.clientLeft - that.box.clientWidth / 2;
                that.resultY = e.pageY - offset(that.smallImg).top - that.smallImg.clientTop - that.box.clientHeight / 2;
                if (that.resultX < 0) {
                    that.resultX = 0;
                } else if (that.resultX > that.smallImg.clientWidth - that.box.clientWidth) {
                    that.resultX = that.smallImg.clientWidth - that.box.clientWidth
                }

                if (that.resultY < 0) {
                    that.resultY = 0;
                } else if (that.resultY > that.smallImg.clientHeight - that.box.clientHeight) {
                    that.resultY = that.smallImg.clientHeight - that.box.clientHeight;
                }
                that.box.style.left = that.resultX + "px";
                that.box.style.top = that.resultY + "px";
                that.bigImg.style.backgroundPositionX = -that.resultX / that.r + "px";
                that.bigImg.style.backgroundPositionY = -that.resultY / that.r + "px";

            }
        }
        this.smallImg.onmouseleave = function () {
            that.box.style.display = "none";
            that.bigImg.style.display = "none";
        }


        function offset(dom) {
            // 返回一个对象
            var obj = {
                left: 0,
                top: 0
            }

            // 先让这个对象加上 dom的自己得到定位父元素的距离
            obj.left = dom.offsetLeft;
            obj.top = dom.offsetTop;
            // 判定浏览器是否是IE8 
            var isIE8 = window.navigator.userAgent.indexOf("MSIE 8") != -1;


            // 循环往上走 累加每一个offsetParent的offsetLeft和clientLeft 
            // 加每一个offsetParent的offsetTop和clientTop
            var offsetParent = dom.offsetParent;
            while (offsetParent != document.body) {
                if (isIE8) {
                    obj.left += offsetParent.offsetLeft;
                    obj.top += offsetParent.offsetTop;
                } else {
                    obj.left += offsetParent.offsetLeft + offsetParent.clientLeft;
                    obj.top += offsetParent.offsetTop + offsetParent.clientTop;
                }
                offsetParent = offsetParent.offsetParent;
            }
            return obj;
        }

    that.add.onclick = function () {
        if(localStorage.car){
            that.car = JSON.parse(localStorage.car);
            var flag = false;
            var index;
            for(var i = 0; i < that.car.length; i++){
                if(that.car[i].id == that.nowGoods.id){
                    flag = true;
                    index = i;
                    break
                }
            }
            if (flag) {
                that.car[index].num ++;
                localStorage.car = JSON.stringify(that.car);
            }else{
                var obj = {
                    "id" : that.nowGoods.id,
                    "num" : 1
                };
                that.car.push(obj);
                localStorage.car = JSON.stringify(that.car);
            }
            alert("加入商品成功");

        }else{
            localStorage.car = `[
                {
                    "id" : ${that.nowGoods.id},
                    "num" : 1
                }
            ]`;
        }
        alert("加入商品成功");

    }



    }


}
new Magnify();


