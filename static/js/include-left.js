$(document).ready(function(){

	$(document).on('click','.left-item-title',function(){

		var _self = $(this);
		_self.siblings().slideToggle();
		if (_self.hasClass('left-item-active')) {
			_self.removeClass('left-item-active');
		} else{
			_self.addClass('left-item-active');
		};
	})
	$(document).on('click','.left-item-content-text',function () {
		$('.left-item-content-text').removeClass('left-text-active');
		$(this).addClass('left-text-active');
	})
})

