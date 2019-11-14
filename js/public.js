function ajaxGet(url,cb,data){
    data = data || {};
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    var d = new Date();
    url = url + "?" + str + "__qft="+d.getTime();
    
    var xhr = new XMLHttpRequest();
    xhr.open("get",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            cb(xhr.responseText)
        }
    }
    xhr.send();
}


function ajaxPost(url,callback,data){
    data = data || {};
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            callback(xhr.responseText);
        }
    }
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(str);
}


function jsonp(url,callback,data){
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    url = url + "?" + str.slice(0,str.length-1);

    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);

    window[data[data.columnName]] = function(res){
        callback(res);
    }
}


function animate(dom, cssObj, duration, callback) {
    // 定义间隔
    var interval = 20;
    // 定义当前状态对象
    var nowObj = {};
    // 循环cssObj
    for (var i in cssObj) {
        nowObj[i] = parseInt(getStyle(dom, i))
    }
    // 定义总次数
    var allCount = duration / interval;
    // 定义计数器
    var count = 0;
    var timer = setInterval(function () {
        count++;
        for (var i in cssObj) {
            // 计算总距离
            var distance = cssObj[i] - nowObj[i];
            // 计算单次步长
            var step = distance / allCount;
            // 赋予样式
            if (i.toLowerCase() === "opacity") {
                dom.style[i] = nowObj[i] + count * step;
            } else {
                dom.style[i] = nowObj[i] + count * step + "px";
            }
        }
        if (count >= allCount) {
            clearInterval(timer);
            // 判断 有回调函数就执行回调函数 没有回调函数就不执行
            if (callback) {
                callback();
            }
            // callback && callback();
        }
    }, interval);
    // 定义获取样式函数
    function getStyle(dom, cssProp) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(dom)[cssProp];
        }
        return dom.currentStyle[cssProp];
    }
}



function setCookie(key,val,options){
    options = options || {};
    var path = options.path ? ";path="+options.path : "";
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        var exp = ";expires="+d;
    }else{
        var exp = "";
    }
    document.cookie = key + "=" + val + path + exp;
}


function removeCookie(key,options){
    options = options || {};
    options.expires = -1;
    setCookie(key,null,options);
}


function getCookie(key){
    var data = document.cookie;
    var arr = data.split("; ");
    for(var i=0;i<arr.length;i++){
        if(arr[i].split("=")[0] === key){
            return arr[i].split("=")[1];
        }
    }
    return "";
}