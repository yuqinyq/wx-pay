/**
 * Created by PX on 2017/5/10.
 */

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
var pay = {
    header:document.getElementsByTagName("header")[0],
    main:document.getElementsByTagName("main")[0],
    footer:document.getElementsByTagName("footer")[0],
   	popupBox:document.getElementsByClassName("popupBox")[0],
   	keysBox:document.getElementsByClassName("keysBox")[0],
    key:document.getElementsByClassName("keysBox")[0].children,
    keyBack:document.getElementsByClassName("keyBack")[0],
    password:123456,
    body:document.getElementsByTagName("body")[0],
    succeed:document.getElementsByClassName("succeed")[0],
    finish:document.getElementsByClassName("finish")[0],
    namePrice:document.getElementsByClassName("namePrice")[0],
    scripts:document.getElementsByTagName("scripts")[0],
}
/*************************************************/
/* 页面加载完统一执行部分 */
/*************************************************/
window.onload = function () {
    ads();
}
/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/

//通讯录列表
function ads() {
    var $ = new GD();
    $.getJSON("json/ads.json",function (data) {
        var d_leng = data.length;
        var oUl= document.createElement(`ul`);
        oUl.className = "adsBox";
        pay.main.appendChild(oUl);
        for(let i = 0; i < d_leng; i++){
            oUl.innerHTML += `
                <li class="adsLi">
                    <img src=${data[i].img}>
                    <span>${data[i].name}</span>
                </li>`;
        }
        var oLi = oUl.children;
        var oLi_leng = oLi.length;
        for(let j = 0; j < oLi_leng; j++){
            oLi[j].onclick = function () {
                var oImg = this.getElementsByTagName(`img`)[0].src;
                var oName = this.getElementsByTagName(`span`)[0].innerText;
                //调用转账页面函数
                transferBox(oImg,oName);
                var oCancel = document.getElementsByClassName("headCancel")[0];
                oCancel.onclick = function () {
                    ads();
                    //点击取消后调用样式函数
                    cancel(pay.header,pay.main,pay.footer);
                }
            }
        }
    })
}

//获取JSON的AJAX请求
function GD() {
    function getJSON(url,callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if(xhr.readyState ==4 && xhr.status == 200){
                var jsonStr = xhr.responseText;
                var jsonObj = JSON.parse(jsonStr);
                callback(jsonObj);
            }
        }
    }
    return {
        getJSON:getJSON
    }
}