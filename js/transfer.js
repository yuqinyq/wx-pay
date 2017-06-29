
//加载转账界面样式，参数1：通讯录图片路径；参数2：通讯录名字
function transferBox(imgSrc,name) {
    pay.header.innerHTML = "";
    pay.main.innerHTML = "";
    pay.footer.style.display = "none";
    pay.header.innerHTML = `
                    <div class = "headCancel">取消</div>
                    <span>转账给朋友</span>                    
                `;
    //转账界面innerhtml
    pay.main.innerHTML = `
                <div class="transferMain">
                    <div class="tfm_head">
                    	<img src=${imgSrc}><br>
                        <span>${name}</span>
                    </div>
                    <div class ="tfm_main">
                    	<p>转账金额</p>
                    	<div class="price">
                    		<span>¥</span>
                    		<input type="text" maxlength="10" required id = "priceIpt">
                    	</div>
                    	<a>添加转账说明</a>
      					<button type="button" id="transferBtn">转账</button>
      				</div>
                </div>
            `; 
            var priceIpt = document.getElementById("priceIpt");
            var transferBtn = document.getElementById("transferBtn");
           
            transferBtn.onclick = function(){
      			var priceNum = Number(priceIpt.value).toFixed(2);
      			//创建遮罩层
            	let oMask = document.createElement(`div`);
    			oMask.className = `mask`;
    			let sHeight = pay.body.scrollHeight;
    			oMask.style.height = sHeight + `px`;
    			pay.body.insertBefore(oMask,pay.scripts);
            	//弹出框函数
            	popup(name,priceNum,oMask);
            	//完成支付函数
                succeed(oMask);
            }
}

//取消返回时：tag1:header标签；tag2:main标签；tag3:footer标签
function cancel(tag1,tag2,tag3) {
    tag1.innerHTML ="";
    tag1.innerHTML += `
        <span>通讯录</span>
        <span class="fa fa-user-plus"></span>
    `;
    tag2.innerHTML = "";
    tag3.style.display = "block";
}
//弹出密码窗口
function popup(name,price,mask){
	pay.popupBox.style.display = "block";
	pay.keysBox.style.bottom = "0";
	pay.popupBox.innerHTML += `
		<div>
			<img id = "close" src="images/close.jpg">
			<span>请输入密码</span>
		</div>
		<p>向&nbsp${name}&nbsp;转账</p>
		<p>¥${price}</p>
		<p class = "errorHint">密码输入错误</p>
		<ul class="pswBox">
			<li><span class="idot"></span></li>
			<li><span class="idot"></span></li>
			<li><span class="idot"></span></li>
			<li><span class="idot"></span></li>
			<li><span class="idot"></span></li>
			<li><span class="idot"></span></li>
		<ul>
	`;
	var close = document.getElementById("close");
	close.onclick = function(){
		pay.popupBox.style.display = "none";
		pay.keysBox.style.bottom = "-280px";
		mask.style.display = "none";
		pay.popupBox.innerHTML="";
	}
	var idot = document.getElementsByClassName("idot");
	var errorHint = document.getElementsByClassName("errorHint")[0];
	//调用键盘点击函数
	keyClick(idot,name,price,errorHint);
}

//点击键盘key;参数4:hint密码错误提示
function keyClick(idot,name,price,hint) {
	//支付密码数组
	var payArr = [];
    var key_leng = pay.key.length - 1;
    for (let i = 0;i < key_leng;i++){
		pay.key[i].onclick = function () {
			if(payArr.length < 6){
                var keyVal = pay.key[i].innerText;
                payArr.push(keyVal);
			}
			//小圆点显示
			if(payArr.length <= 6) {
                var payArr_leng = payArr.length;
                for (let j = 0; j < payArr_leng; j++) {
                    idot[j].style.display = "block";
                }

                //←back撤退事件
			if(payArr_leng > 0 && payArr_leng < 6){
				pay.keyBack.onclick = function () {
					payArr = payArr.slice(0,payArr.length-1);
					var payStr_leng = payArr.length;
					idot[payStr_leng].style.display = "none";
					hint.style.visibility = "hidden";
				}
			}
            }
			//判断密码是否正确
			if(payArr.length == 6){
                var payNum = Number(payArr.join(""));
                if(payNum === pay.password){
                    reasult(name,price);
				}else {
                    hint.style.visibility= "visible";
				}
			}
        }
    }
}
//支付结果函数:
function reasult(name,price) {
	pay.succeed.style.display = "block";
	pay.namePrice.innerHTML = `
		<p>待&nbsp;${name}&nbsp;确认收钱</p>
		<p>￥${price}</p>
	`;
}
//支付点击完成:参数遮罩层
function succeed(mask) {
    pay.finish.onclick = function () {
    	//加载通讯录内容
        ads();
        //加载三个标签
        cancel(pay.header,pay.main,pay.footer);
        pay.succeed.style.display = "none";
        pay.popupBox.style.display = "none";
        pay.popupBox.innerHTML = "";
        pay.keysBox.style.bottom ="-280px";
        mask.style.display = "none";
    }
}
