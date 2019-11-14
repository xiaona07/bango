class Register {
    constructor () {
        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass");
        this.btn = document.getElementById("btn");
        this.init();
    }
    init () {
        var that = this;
        this.btn.onclick = function () {
            that.userVal = that.user.value;
            that.passVal = that.pass.value;
            localStorage.accout = `[
                {"user" : "${that.userVal}",
                "pass" : "${that.passVal}",
                "statu" : "0"
            }]`;
            location = "index.html";
        }
    }
}
new Register ();