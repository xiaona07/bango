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
            
            that.t1 = /[a-z]{5,10}/.test(that.userVal);
            that.t2 = /[0-9]{3,10}/.test(that.passVal);
            
            if(!that.t1 || !that.t2){
                if (!that.t1 && that.t2){
                    alert("请输入正确的用户名，小写字母5-10位");
                }else if(that.t1 && !that.t2){
                    alert("请输入正确的密码，数字3-10位");
                }else{
                    alert("请输入正确的用户名和密码，用户名小写字母5-10位，密码数字3-10位");
                }
            }else{
                            localStorage.accout = `[
                {"user" : "${that.userVal}",
                "pass" : "${that.passVal}",
                "statu" : "0"
            }]`;
            location = "index.html";

            }
            
            
        }
    }
}
new Register ();



// addEvent() {
//     this.submit.addEventListener('click',() => {
//         this.t1 = /^1[3456789]\d{9}$/.test(this.name.value);
//         this.t2 =/^[\w_-]{6,16}$/.test(this.pass.value);
//         this.t3 = this.pass.value == this.sure.value ? true : false;
//         this.userMsg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : [];
//         this.onoff = true;
//         if(!this.t1){
//             this.name.nextElementSibling.innerHTML = "请输入正确的手机号";
//         }else{
//             this.name.nextElementSibling.innerHTML = "";
//             if(this.userMsg.length > 0){
//                 for(var i=0;i<this.userMsg.length;i++){
//                     if(this.userMsg[i].username == this.name.value){
//                         this.name.nextElementSibling.innerHTML = "用户已存在 请重新输入";
//                         this.onoff = false;
//                     }
//                 }
//             }
//         }
//         if(this.onoff){
//             if(!this.t2){
//                 this.pass.nextElementSibling.innerHTML = "请输入6-16字符";
//             }else {
//                 this.pass.nextElementSibling.innerHTML = "";
//                 if(!this.t3){
//                     this.sure.nextElementSibling.innerHTML = "密码不一致";
//                 }else{
//                     this.sure.nextElementSibling.innerHTML = "";
//                     this.userMsg.push({
//                         username:this.name.value,
//                         password:this.pass.value
//                     })
//                     setCookie("userMsg",JSON.stringify(this.userMsg));
//                     alert("恭喜您注册成功，可以去登录啦");
//                     // location.href="./login.html";
//                     window.open('./login.html','_self');
//                 }
//             }
//         }
//     })
// }
