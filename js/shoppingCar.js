class Car {
    constructor() {
        this.clearing = document.getElementById("clearing");
        this.pay = document.getElementById("pay")
        this.url = "http://localhost/bango/data/list.json";

        this.load();
    }
    load() {
        var that = this;
        if (localStorage.car) {

            this.pay.style.display = "block";
            this.clearing.innerHTML = `
                    <ul class="theader clearfix" id="theader">
                        <li><input type="checkbox" id="chooseAll">&nbsp;全选</li>
                        <li>图片</li>
                        <li>名称</li>
                        <li>单价</li>
                        <li>数量</li>
                        <li>价格</li>
                        <li>操作</li>
                    </ul>
                    <div class="carList" id="carList"></div>
                    <ul class="total clearfix"  id="total">
                        <li>合计:&nbsp;￥<span class="totalPrice" id="totalPrice"></span></li>
                    </ul>
                    `;
            this.carList = document.getElementById("carList");

            this.chooseAll = document.getElementById("chooseAll");
            this.totalPrice = document.getElementById("totalPrice");

            this.car = JSON.parse(localStorage.car);
            ajaxGet(this.url, function (res) {
                that.res = JSON.parse(res);

                that.display();
            })


        }

    }
    display() {
        var that = this;
        var str = "";
        for (var i = 0; i < this.car.length; i++) {
            var g = this.car[i].id;
            for (var j = 0; j < that.res.length; j++) {
                if (that.res[j].id == g) {

                    str += `
                    <ul class="goodslist clearfix" id="goodslist" nowId="${g}" nowindex="${i}">
                        <li ><input type="checkbox" class="checkbox"></li>
                        <li class="tImg"><img src="${this.res[j].img}" alt="#" ></li>
                        <li class="tname">${this.res[j].name}</li>
                        <li>￥<span   class="realPrice">${this.res[j].price}</span></li>
                        <li class="tnum"><span class="reduceNum" nowId="${g}" nowindex="${i}">-</span><input type="text" value="${this.car[i].num}" class="changeNum"><span  class="addNum  nowId="${g}" nowindex="${i}">+</span></li>
                        <li>￥<span  class="changePrice">${(this.res[j].price) * (this.car[i].num)}</span></li>
                        <li class="tdelete"><input type="button" value="删除" class="delete"  nowId="${g}" nowindex="${i}"></li>
                    </ul>
                     `;
                    break
                }
            }
        }
        this.carList.innerHTML = str;



        this.realPrices = document.querySelectorAll(".carList .realPrice");

        this.checkboxs = document.querySelectorAll(".carList .checkbox");
        this.changeNums = document.querySelectorAll(".carList .changeNum");
        this.reduceNums = document.querySelectorAll(".reduceNum");
        this.addNums = document.querySelectorAll(".carList .addNum");
        this.changePrices = document.querySelectorAll(".changePrice");
        this.deletes = document.querySelectorAll(".carList .delete");


        // this.change();


        this.addEvent();
    }

    change() {
        var that = this;
        for (var i = 0; i < that.changePrices.length; i++) {
            that.changePrices[i].innerHTML = that.realPrices[i].innerHTML * that.changeNums[i].value;
        }

    }
    changeAll() {
        var that = this;
        var total = 0;
        for (var i = 0; i < this.checkboxs.length; i++) {
            console.log(this.checkboxs.length);
            if (this.checkboxs[i].checked) {
                total += Number(that.changePrices[i].innerHTML);

            }
        }
        this.totalPrice.innerHTML = total;
    }






    addEvent() {

        var that = this;


        for (let i = 0; i < this.reduceNums.length; i++) {
            this.reduceNums[i].onclick = function () {
                if (that.changeNums[i].value > 1) {
                    that.changeNums[i].value--;
                    that.car[i].num--;
                    localStorage.car = JSON.stringify(that.car);
                }

                that.change();
                that.changeAll();
            }

            this.addNums[i].onclick = function () {
                that.changeNums[i].value++;
                that.car[i].num++;



                // for (var i = 0; i < that.car.length; i++) {
                //     if (that.car[i].id == this.addNums[i].nowId) {
                //         that.car[i].num++;
                //         break
                //     }
                // }
                localStorage.car = JSON.stringify(that.car);
                that.change();
                that.changeAll();

            }
            this.deletes[i].onclick = function () {
                // var b;
                // for (var i = 0; i < that.car.length; i++) {
                //     if (that.car[i].id == this.deletes[i].nowId) {

                //         b = i;

                //         break
                //     }
                // }
                that.car.splice(i, 1);
                localStorage.car = JSON.stringify(that.car);
                that.load();


            }
            this.checkboxs[i].onclick = function () {
                // if (this.checkboxs[i].checked == "checked") {

                // }
                // that.change();
                that.changeAll();
                var flag =true;
                for (var i = 0; i < that.checkboxs.length; i++){
                    if (!(that.checkboxs[i].checked == "checked")){
                        flag = false;
                        that.chooseAll.checked = "";
                        break
                    }
                }
                if(flag){
                    that.chooseAll.checked = "checked";
                }
            }
            this.chooseAll.onclick = function (){

                if (that.chooseAll.checked) {
                    for (var i = 0; i < that.checkboxs.length; i++) {
                        that.checkboxs[i].checked = "checked";
                    }
                } else {
                    for (var i = 0; i < that.checkboxs.length; i++) {
                        that.checkboxs[i].checked = "";
                    }
                }
                that.changeAll();
            }



        }
        // this.change();
    }


}
new Car();