class Car {
    constructor () {
        this.clearing = document.getElementById("clearing");
        this.pay = document.getElementById("pay")
        this.url = "http://localhost/bango/data/list.json";

        this.load ();
    }
    load () {
        var that = this;
        if (localStorage.car){
        
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
    display () {
        var that = this;
        var str = "";
        for (var i = 0; i < this.car.length; i++){
            var g = this.car[i].id ;
            for (var j = 0; j < that.res.length; j++){
                if (that.res[j].id == g){
                    
                    str += `
                    <ul class="goodslist clearfix" id="goodslist" nowId="${g}" nowindex="${i}">
                        <li ><input type="checkbox" class="checkbox"></li>
                        <li class="tImg"><img src="${this.res[j].img}" alt="#" ></li>
                        <li class="tname">${this.res[j].name}</li>
                        <li>￥<span   class="realPrice">${this.res[j].price}</span></li>
                        <li class="tnum"><span class="reduceNum nowId="${g}" nowindex="${i}">-</span><input type="text" value="${this.car[i].num}" class="changeNum"><span  class="addNum  nowId="${g}" nowindex="${i}">+</span></li>
                        <li>￥<span  class="changePrice">${(this.res[j].price)*(this.car[i].num)}</span></li>
                        <li class="tdelete"><input type="button" value="删除" class="delete"  nowId="${g}" nowindex="${i}"></li>
                    </ul>
                     `;
                     break
                }
            }
        }
        this.carList.innerHTML = str;

        this.addEvent ();
    }
    addEvent () {

        var that = this;
        
        this.realPrices = document.querySelectorAll(".carList .realPrice");
        
        this.checkboxs = document.querySelectorAll(".carList .checkbox");
        this.changeNums = document.querySelectorAll(".carList .changeNum");
        this.reduceNums = document.querySelectorAll(".carList .reduceNum");
        this.addNums = document.querySelectorAll(".carList .addNum");
        this.changePrices = document.querySelectorAll(".carList .changePrice");
        this.deletes = document.querySelectorAll(".carList .delete");
        


        for (var i = 0; i < reduceNums.length; i++){
            this.reduceNums[i].onclick = function () {
                if(that.changeNums[i] > 1){
                    that.changeNums[i].value--;


                    for (var i = 0; i < that.car.length; i++){
                        if (that.car[i].id == this.reduceNums[i].nowId){
                            that.car[i].num --;
                            break
                        }
                    }
                    


                    localStorage.car = JSON.stringify(that.car);
                    
                }
            }
            this.addNums[i].onclick = function () {
                that.changeNums[i].value++;



                for (var i = 0; i < that.car.length; i++){
                    if (that.car[i].id == this.addNums[i].nowId){
                        that.car[i].num ++;
                        break
                    }
                }
                localStorage.car = JSON.stringify(that.car);



            }
            this.deletes[i].onclick = function () {
                var b;
                for (var i = 0; i < that.car.length; i++){
                    if (that.car[i].id == this.deletes[i].nowId){
                        
                        b = i;

                        break
                    }
                }
                that.car.splice(b,1);
                localStorage.car = JSON.stringify(that.car);


            }
        }

        this.change();
    }
    change () {
        var totalPrice = 0;
        for (var i = 0; i < changePrices; i++){
            this.changePrices[i].innerHTML = this.realPrices[i] * this.changeNums[i];
            totalPrice += (this.realPrices[i] * this.changeNums[i]);
        }
        this.totalPrice = totalPrice;

    }
}
new Car ();