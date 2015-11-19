//成交时间（起始）
var start = {
	elem: '#start', 
    event: 'focus', 
    istime: true,
    format: 'YYYY-MM-DD hh:mm:ss',
    choose: function(datas){
         end.min = datas; //开始日选好后，重置结束日的最小日期
         end.start = datas //将结束日的初始值设定为开始日
    }
}
laydate(start);
//成交时间（终止）
var end = {
	elem: '#end', 
    event: 'focus', 
    format: 'YYYY-MM-DD hh:mm:ss',
    istime: true,
    choose: function(datas){
        start.max = datas; //结束日选好后，重置开始日的最大日期
    }
}
laydate(end);
//顶部筛选条件
$(".order-search-tag").delegate('.order-search-tagcon','click',function () {
	$(this).siblings().removeClass('order-search-tag-active');
	$(this).addClass('order-search-tag-active');
	//售后筛选条件
	if ($('.order-search-after').hasClass('order-search-tag-active')) {
		$('.order-condition-status').removeClass('hidden');
	}else{
		$('.order-condition-status').addClass('hidden');
	}
	var _data = {
		
	};
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

//发货弹出层
var pop = {
    init:function(){
        var _this = this;
        $('body').on('click','.J_popClose',function(){
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
}
//弹窗初始化
pop.init();
//单个发货
$('.order').delegate('#delivery','click',function(e){
    pop.popShow('#pop_delivery');
});
//批量发货
$('.order').delegate('#deliverys','click',function(e){
    pop.popShow('#pop_deliverys');
});
//备注
$('.order').delegate('#remark','click',function(e){
    pop.popShow('#pop_remark');
});