class GoodsList {
    constructor() {
        this.goodsList = document.getElementById("goodsList");
        this.url = "http://localhost/bango/data/list.json";


        this.load();
    }
    load() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);
            that.handle();
        })
        
    }
    handle() {
        var that = this;
        that.pageArr = [];
        for (var i = 0; i < that.res.length; i += 12) {
            var j = i + 12;
            if (j >= that.res.length) {
                j = that.res.length;
            }
            var str = "";
            for (var a = i; a < j; a++) {
                str += `
                            <li class="goodsBox" goodsId="${that.res[a].id}">
                            <a class="img" href="detail.html" target="_blank">
                                <img src="${that.res[a].img}"
                                    alt="#">
                            </a>
                            <div class="label clearfix">
                                <a href="https://search.banggo.com/brand/a_a_a_celucasn.shtml" class="classfiy  fl"
                                    target="_blank">潮流前线</a>
                                <div class="discout fr">
                                    <span>${that.res[a].discout}</span>折
                                </div>
                            </div>
                            <div class="name">
                                <a href="detail.html"
                                    target="_blank">${that.res[a].name}</a>
                            </div>
                            <div class="price">
                                <b>￥${that.res[a].price}</b>
                                <i>￥${that.res[a].original}</i>
                            </div>
                            <a href="#" target="_blank" class="smallImg">
                                <img src="${that.res[a].smallImg}"
                                    alt="#">
                            </a>
                            </li>
                        `;
            }
            that.pageArr.push(str);
        }
        that.display();
    }
    display(){
        var that = this;
        that.goodsList.innerHTML = that.pageArr[0];
        that.page();
    }
    page (){
        this.pageNum = document.getElementById("pageNum");
        var str = "";
        for (var i = 0; i < this.pageArr.length; i++){
            str += `
                    <li class="detailNum">${i+1}</li>
            `;
        }
        this.pageNum.innerHTML = str;
        this.addEvent ();
    }


    addEvent (){
        var that = this;
        that.numLis = this.pageNum.querySelectorAll("li");
        for (let i = 0; i < that.numLis.length; i++){
            that.numLis[i].onclick = function (e){
                that.goodsList.innerHTML = that.pageArr[i];
                that.margin();
            }
        }
        that.margin();
    }
    margin(){
        this.lis = this.goodsList.querySelectorAll("li");
        console.log(this.lis);
        for (var i = 3; i < this.lis.length; i += 4){
            this.lis[i].style.marginRight = 0;
            console.log(this.lis[i].style.marginRight)
        }
        this.nowGoods ();
    }
    nowGoods () {
        var that = this;
        that.lis = document.querySelectorAll(".goodsList .goodsBox");
        for (let i = 0; i < that.lis.length; i++){
            that.lis[i].onclick = function (e) {
                localStorage.nowGoods = i + 1;
            }
        }
        
        // this.goodsList.onclick = function (e) {
        //     if (e.target.parentNode == this.goodsList) {
                
        //         localStorage.nowGoods = e.target.goodsId;
        //     }
        // }
    }
}
new GoodsList();
