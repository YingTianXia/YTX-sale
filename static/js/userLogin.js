/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     佛祖保佑                    永无BUG
 */
//登陆
$('.login').delegate('.login-main-loginButton','click',function () {
	var userName = $("#userName").val();
	var passWord = $("#password").val();
	var _data={
		userName:userName,
		passWord:passWord
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