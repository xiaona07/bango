class LogQui {
    constructor() {
        this.person = document.getElementById("person");


        this.init();
    }
    init() {
        if (localStorage.accout) {
            this.accout = JSON.parse(localStorage.accout)[0];
            this.statu = this.accout.statu;
            if (this.statu == 1) {
                this.user = this.accout.user
                this.person.innerHTML = `
                                <span>欢迎亲爱的<i>${this.user}</i>光临</span>
                                <a class="quit" id="quit"  href="#">退出</a>
                                `;


                this.addQuitEvent();
            } else {
                this.person.innerHTML = `
            <a class="indexLog" id="indexLog" href="login.html">登录
            </a>
            <a class="indexReg" id="indexReg"  href="register.html">注册</a>
            `;

                this.indexCar.onclick = function () {
                    alert("请您登录您的账户，谢谢");
                }


            }
        } else {
            this.indexCar.onclick = function () {
                alert("请您先注册并登陆，谢谢");
            }
            return
        }
    }
    addQuitEvent() {
        var that = this;
        this.quit = document.getElementById("quit");
        this.quit.onclick = function () {
            localStorage.accout = `
                [
                    {
                        "user" : "${that.accout.user}",
                        "pass" : "${that.accout.pass}",
                        "statu" : "0"
                    }
                ]
            `;
            that.init();
        }
    }
}
new LogQui();