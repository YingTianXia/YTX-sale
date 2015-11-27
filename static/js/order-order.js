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
//订单状态筛选
$(".order-search-tag").delegate('.order-search-tagcon','click',function () {
	var _self = $('this');
	$(this).siblings().removeClass('order-search-tag-active');
	$(this).addClass('order-search-tag-active');
//售后筛选条件
//	if ($('.order-search-after').hasClass('order-search-tag-active')) {
//		$('.order-condition-status').removeClass('hidden');
//	}else{
//		$('.order-condition-status').addClass('hidden');
//	}
	var status = _self.attr('data-status');
	var _data = {
		status:status,
		pageNumber:1
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
//条件筛选
$('.order').delegate('#search','click',function(e){
    var status = $('.order-search-tag-active').attr('data-status');
    var startTime = $('#start').val();
    var endTime = $('#end').val();
    var serialNumber = $(".order-condition-orderNum").find('input').val();
    var userAccountId = $(".order-condition-id").find('input').val();
    var userPhone = $(".order-condition-phone").find('input').val();
    var itemName = $(".order-condition-name").find('input').val();
    var _data={
    		status:status,//订单状态
    		startTime:startTime,//成交开始时间
    		endTime:endTime,//成交结束时间
    		serialNumber:serialNumber,//订单号
    		userAccountId:userAccountId,//买家id
    		userPhone:userPhone,//买家电话
    		itemName:itemName,//商品名称
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
	var _self = $(this);
    pop.popShow('#pop_delivery');
    var skuid = _self.parents('.order-items-inner').attr('data-skuid');
    $('#pop_delivery').attr('data-skuid',skuid);
});
$('.order').delegate('.J_submitDeliverySure','click',function(e){
	var _self = $(this);
	var sendAddress = _self.parents('#pop_delivery').find('.delivery-pop-con-addr').val();
	var skuid = _self.parents('#pop_delivery').attr('data-saleOrderId');
	var id = _self.parents('#pop_delivery').find('.delivery-pop-con-kind').val();
	var deliveryNO = _self.parents('#pop_delivery').find('.delivery-pop-con-deliveryNum').val();
	var _data = {
		skuid:skuid,
		sendAddress:sendAddress,
		id:id,
		deliveryNO:deliveryNO
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
//批量发货
var iskuIds = [];
$('.order').delegate('#deliverys','click',function(e){
	var _self = $(this);
    pop.popShow('#pop_deliverys');
    var itemList = _self.parents('.order-orders-items').find('.order-items-inner');
    var skuIds = [];
    itemList.each(function (i,e) {
    	    var isChecked = $(this).find('.order-items-inner-chooses').prop("checked");
    	    if (isChecked) {
    	    		skuIds.push($(this).attr('data-skuid')); 
    	    }
    });
    iskuIds = skuIds;
});
$('.order').delegate('.J_submitDeliverysSure','click',function(e){
	var _self = $(this);
	var sendAddress = _self.parents('#pop_deliverys').find('.delivery-pop-con-addr').val();
	var id = _self.parents('#pop_deliverys').find('.delivery-pop-con-kind').val();
	var deliveryNO = _self.parents('#pop_deliverys').find('.delivery-pop-con-deliveryNum').val();
	var _data = {
		skuIds:iskuIds,
		sendAddress:sendAddress,
		id:id,
		deliveryNO:deliveryNO
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
//备注
$('.order').delegate('#remark','click',function(e){
	var _self = $(this);
    pop.popShow('#pop_remark');
    var saleOrderId = _self.parents('.order-main-orders').attr('data-saleOrderId');
    $('#pop_remark').attr('data-saleOrderId',saleOrderId);
});
$('.order').delegate('.J_submitRemarkSure','click',function(e){
	var saleOrderId = _self.parents('#pop_remark').attr('data-saleOrderId');
	var remark = $(".remark-pop-con").find('textarea').val();
	var _data = {
		saleOrderId:saleOrderId,
		remark:remark
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
//分页
var total = $('.paging').attr('data-total');
var pageSize = $('.paging').attr('data-pageSize');
var pageNumber = parseInt($('.paging').attr('data-pageNumber'));
var pageCount = total/pageSize;
$(".j_paging").createPage({
    pageCount:pageCount,
  	current:pageNumber,
    backFn:function(curPage){
        var status = $('.order-search-tag-active').attr('data-status');
        var startTime = $('#start').val();
        var endTime = $('#end').val();
        var serialNumber = $(".order-condition-orderNum").find('input').val();
        var userAccountId = $(".order-condition-id").find('input').val();
        var userPhone = $(".order-condition-phone").find('input').val();
        var itemName = $(".order-condition-name").find('input').val();
        var _data={
        		status:status,//订单状态
        		startTime:startTime,//成交开始时间
        		endTime:endTime,//成交结束时间
        		serialNumber:serialNumber,//订单号
        		userAccountId:userAccountId,//买家id
        		userPhone:userPhone,//买家电话
        		itemName:itemName,//商品名称
        		pageNumber:curPage//页码 
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
    }
});