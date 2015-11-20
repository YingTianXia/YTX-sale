//确定用户名
$(".findPassword").delegate('.findPassword-main-next','click',function () {
	var usernName = $("#usernName").val();//用户名
	var CAPTCHA = $("#CAPTCHA").val();//验证码
	_data={
		usernName:usernName,
		CAPTCHA:CAPTCHA
	}
	$.ajax({
		type:"post",
		url:"",
		data: JSON.stringify(_data),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function(data){
	       console.log(data);
	    },
	    error: function(res){
	       console.log(res);
	    }
	});
})
//validate页面
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
$(".validate").delegate('#btnSendCode','click',function sendMessage () {
	 curCount = count;
	 $("#btnSendCode").attr("disabled", "true");
     $("#btnSendCode").val(curCount + "s");
     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
　　 //向后台发送处理数据
	 var _data={
		xx:1
	 }
     $.ajax({
     　　type:"post",
		url:"",
		data: JSON.stringify(_data),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function(data){
	       console.log(data);
	    },
	    error: function(res){
	       console.log(res);
	    }
     });
});
//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {          
        window.clearInterval(InterValObj);//停止计时器
        $("#btnSendCode").removeAttr("disabled");//启用按钮
        $("#btnSendCode").val("重新发送");
    }
    else {
        curCount--;
        $("#btnSendCode").val(curCount + "s");
    }
}

$(".validate").delegate('.validate-main-next','click',function () {
	var validateWay = $("#validateWay").val();//验证方式
	var validateCode = $("#validateCode").val();//验证码
	_data={
		validateWay:validateWay,
		validateCode:validateCode
	}
	$.ajax({
		type:"post",
		url:"",
		data: JSON.stringify(_data),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function(data){
	       console.log(data);
	    },
	    error: function(res){
	       console.log(res);
	    }
	});
})
//newPassword页面
$(".newPassword").delegate('.newPassword-main-next','click',function () {
	var newPassword = $("#newPassword").val();//新密码
	var newPasswordSure = $("#newPasswordSure").val();//确认新密码
	_data={
		newPassword:newPassword,
		newPasswordSure:newPasswordSure
	}
	$.ajax({
		type:"post",
		url:"",
		data: JSON.stringify(_data),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function(data){
	       console.log(data);
	    },
	    error: function(res){
	       console.log(res);
	    }
	});
})