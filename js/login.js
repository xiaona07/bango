class Login {
    constructor() {
        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass");
        this.btn = document.getElementById("btn");
        this.init();
    }
    init() {
        var that = this;
        this.btn.onclick = function () {
            that.userVal = that.user.value;
            that.passVal = that.pass.value;
            if (localStorage.accout) {
                that.obj = JSON.parse(localStorage.accout)[0];
                if (that.userVal == that.obj.user && that.passVal == that.obj.pass) {
                    localStorage.accout = `[
                    {"user" : "${that.userVal}",
                    "pass" : "${that.passVal}",
                    "statu" : "1"
                }]`;
                    // location = "index.html";
                    // location.go(-1);
                    // history.back();
                    history.go(-1); 
                } else {
                    alert("用户名或密码错误，请重新输入");
                }

            }else {
                alert("用户名或密码错误，请重新输入");
            }


        }

    }
}
new Login();