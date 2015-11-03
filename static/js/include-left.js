$('.left-item-title').on('click',function(){
	var _self = $(this);
	_self.siblings().slideToggle();
	if (_self.hasClass('left-item-active')) {
		_self.removeClass('left-item-active');
	} else{
		_self.addClass('left-item-active');
	};
})
$('.left-item-content-text').on('click',function () {
	$('.left-item-content-text').removeClass('left-text-active');
	$(this).addClass('left-text-active');
})
