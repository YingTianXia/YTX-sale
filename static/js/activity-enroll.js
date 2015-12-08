var pop = {
	init:function(){
		var _this = this;
		$('.J_popClose').click(function(){
			_this.popHide();
		});
	},
	popShow:function(el) {
		var _this = this;
		$(el).show();
		_this.maskShow();
	},
	popHide:function(el){
		var _this = this;
		var _el = el || '.J_pop';
		$(_el).hide();
		$('#J_popMask').hide();
	},
	maskShow:function(){
		var _this = this;
		if($('#J_popMask').length){
			$('#J_popMask').show();
		}else{
			$('body').append('<div class="pop-mask" id="J_popMask" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: #333;opacity: .6;display: none;"></div>');
			$('#J_popMask').show();
		}
	}
};
(function($){
	var isAnim = false;
	function init(){
		bindEv();
		wordCount();
		pop.init();
	}
	function bindEv(){
		$('.J_enroll_additem').on('click',function(){
			enrollAddItem();
		});
		$('.J_info_btn').on('click',function(){
			if(!isAnim){
				if($('.J_info_btn').hasClass('active')){
					isAnim = true;
					$('.J_info_btn').toggleClass('active');
					$('.J_foldBox').animate(
						{
							height:'240px'
						},
						600,
						function(){
							isAnim = false;
						}
					);
				}else{
					var ulh = $('.act-enroll-info-list ul').height();
					isAnim = true;
					$('.J_info_btn').toggleClass('active');
					$('.J_foldBox').animate(
						{
							height: ulh+'px'
						},
						600,
						function(){
							isAnim = false;
						}
					);
				}
			}
		});
	    $('.J_popItemTable tr').on('click',function(e){
	        if($('.J_itemCheck',this)[0].checked){
	            $('.J_itemCheck',this).prop("checked",false);
	        }else{
	            $('.J_itemCheck',this).prop("checked",true);
	        }
	        $('.J_itemCheck').on('click',function(e){
	            e.stopPropagation();
	        });
	    });
	    $('.J_popAllCheck').on('click',function(){
	        $('.J_itemCheck').prop("checked",true);
	    });
	    $('.J_popAllUncheck').on('click',function(){
	        $('.J_itemCheck').prop("checked",false);
	    });

	}
	function wordCount(){
		var _wordBox = $('.J_wordCount');
		_wordBox.each(function(i,e){
			$('.J_wordInput',e).on('keyup blur',function(f){
				$('.J_wordNum',e).html(f.target.value.length);
			});
		});
	}
	function enrollAddItem(){
		pop.popShow('#pop_enroll_additem');
	}
	init();
})(jQuery)