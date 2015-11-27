$('.check-con-tabNav li').on('click',function () {
	var _self = $(this);
	var tabIndex = _self.index();
	//console.log(tabIndex);
	_self.addClass('check-con-tabActive');
	_self.siblings().removeClass('check-con-tabActive');
	$(".check-tabCon-pannel").hide();
	$(".check-tabCon-pannel").eq(tabIndex).show();
})
