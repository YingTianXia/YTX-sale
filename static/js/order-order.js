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
    var _self = $(this);
    _self.siblings().removeClass('order-search-tag-active');
    _self.addClass('order-search-tag-active');
//售后筛选条件
//	if ($('.order-search-after').hasClass('order-search-tag-active')) {
//		$('.order-condition-status').removeClass('hidden');
//	}else{
//		$('.order-condition-status').addClass('hidden');
//	}
    var status = _self.attr('data-status');
    var _data = {
        status: status,
        pageNumber: 1,
        startTime:'',//成交开始时间
        endTime:'',//成交结束时间
        serialNumber:'',//订单号
        userAccountId:'',//买家id
        userPhone:'',//买家电话
        itemName:'',//商品名称
    };
    $.ajax({
        type:"post",
        url:"/saleOrder/",
        data: JSON.stringify(_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log(data);
            var pageCount = Math.ceil(data.total/data.pageSize);
            render (data);
            $(".j_paging").createPage({
                pageCount:pageCount,
                current:1,
                backFn:function(curPage){}
            });
        },
        error: function(res){
            console.log(res);
        }
    });
});
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
        pageNumber: 1
    }
    $.ajax({
        type:"post",
        url:"/saleOrder/",
        data: JSON.stringify(_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log(data);
            var pageCount = Math.ceil(data.total/data.pageSize);
            render(data);
            $(".j_paging").createPage({
                pageCount:pageCount,
                current:1,
                backFn:function(curPage){
                }
            });
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
var purchaseSerialNumber = "";
var sellerSerialNumber = "";
var itemKey = "";
var itemNum = "";
var itemPrice = "";
$('.order').delegate('#delivery','click',function(e){
    var _self = $(this);
    pop.popShow('#pop_delivery');
    var orderItemId = _self.parents('.order-items-inner').attr('data-orderItemId');
    purchaseSerialNumber = _self.parents('.order-main-orders').find(".order-details-orderNum").find('span').html();
    sellerSerialNumber = _self.parents('.order-main-orders').find(".order-details-saleOrderNum").find('span').html();
    itemKey = _self.parents('.order-items-inner').find('.order-items-inner-img').find('img').attr('src');
    itemNum = _self.parents('.order-items-inner').find('.order-items-inner-num').find('span').html();
    itemPrice = _self.parents('.order-items-inner').find('.order-items-inner-price').find('span').html();
    $('#pop_delivery').attr('data-orderItemId',orderItemId);
});
$('.order').delegate('.J_submitDeliverySure','click',function(e){
    var _self = $(this);
//  console.log(purchaseSerialNumber);
//  console.log(sellerSerialNumber);
    var sendAddress = _self.parents('#pop_delivery').find('.delivery-pop-con-addr').val();
    var orderItemId = _self.parents('#pop_delivery').attr('data-orderItemId');
    var supplierId = _self.parents('#pop_delivery').find('.delivery-pop-con-kind').val();
    var expressNo = _self.parents('#pop_delivery').find('.delivery-pop-con-deliveryNum').val();
    var _deliveryItemDetailList = []
    var _itemDetailList = {
	    		itemId:orderItemId,
	    		itemKey:itemKey,
	    		itemNum:itemNum,
	    		itemPrice:itemPrice
	};
	_deliveryItemDetailList.push(_itemDetailList);
    var _data = {
    		purchaseSerialNumber:purchaseSerialNumber,//买家订单号
    		sellerSerialNumber:sellerSerialNumber,//卖家订单号
    		deliveryItemDetailList:_deliveryItemDetailList,//ItemId
        sendAddress:sendAddress,//发货地址
        supplierId:supplierId,//物流供应商id
        expressNo:expressNo,//快递单号
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
});
var _deliveryItemDetailLists = []
//批量发货
$('.order').delegate('#deliverys','click',function(e){
    var _self = $(this);
    pop.popShow('#pop_deliverys');
    var itemList = _self.parents('.order-orders-items').find('.order-items-inner');
    
    itemList.each(function (i,e) {
        var isChecked = $(this).find('.order-items-inner-chooses').prop("checked");
        if (isChecked) {
        	itemKey = $(this).parents('.order-items-inner').find('.order-items-inner-img').find('img').attr('src');
	    itemNum = $(this).parents('.order-items-inner').find('.order-items-inner-num').find('span').html();
	    itemPrice = $(this).parents('.order-items-inner').find('.order-items-inner-price').find('span').html();
	    orderItemId = $(this).attr('data-orderItemId');
        		var _itemDetailList = {
			    		itemId:orderItemId,
			    		itemKey:itemKey,
			    		itemNum:itemNum,
			    		itemPrice:itemPrice
			};
			_deliveryItemDetailLists.push(_itemDetailList);
        }
    });
});
$('.order').delegate('.J_submitDeliverysSure','click',function(e){
    var _self = $(this);
    var sendAddress = _self.parents('#pop_deliverys').find('.delivery-pop-con-addr').val();
    var supplierId = _self.parents('#pop_deliverys').find('.delivery-pop-con-kind').val();
    var expressNo = _self.parents('#pop_deliverys').find('.delivery-pop-con-deliveryNum').val();
    purchaseSerialNumber = _self.parents('.order-main-orders').find(".order-details-orderNum").find('span').html();
    sellerSerialNumber = _self.parents('.order-main-orders').find(".order-details-saleOrderNum").find('span').html();
    var _data = {
    		saleOrderId:saleOrderId,//订单ID
    		purchaseSerialNumber:purchaseSerialNumber,//买家订单号
    		sellerSerialNumber:sellerSerialNumber,//卖家订单号
    		deliveryItemDetailList:_deliveryItemDetailLists,//ItemId
        sendAddress:sendAddress,//发货地址
        supplierId:supplierId,//物流供应商id
        expressNo:expressNo,//快递单号
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
    var _self = $(this);
    var saleOrderId = _self.parents('#pop_remark').attr('data-saleOrderId');
    var remark = $(".remark-pop-con").find('textarea').val();
    var _data = {
        remark:remark
    }
    $.ajax({
        type:"post",
        url:"/saleOrder/remark/"+saleOrderId,
        data: JSON.stringify(_data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            //console.log(data);
            if (data.success=='false') {
                $(".remark-pop-con").find('textarea').val('请输入备注！');
            } else{
                pop.popHide('#pop_remark');
            }
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
var pageCount = Math.ceil(total/pageSize);
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
            url:"/saleOrder/",
            data: JSON.stringify(_data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data){
                console.log(data);
                var pageCount = Math.ceil(data.total/data.pageSize);
                render (data);
                $(".j_paging").createPage({
                    pageCount:pageCount,
                    current:curPage,
                    backFn:function(curPage){}
                });
            },
            error: function(res){
                console.log(res);
            }
        });
    }
});
function render (data) {
    var res = data.saleOrderMaps;
    $('.order-con-main').empty();
    for (var i=0;i<res.length;i++) {
        var resList = res[i].saleOrderList;
        var strLists = "";
        //判断
        switch (res[i].status){
            case 1://待付款
                for (var n=0;n<resList.length;n++) {
                    var strList = '<table class="order-items-inner" data-orderItemId = "'+resList[n].orderItemId+'"><tr><td class="order-items-inner-choose"><input class="order-items-inner-chooses" name="order-items-inner" type="checkbox" value="" /></td><td class="order-items-inner-img"><img src="'+resList[n].itemImageKey+'" width="80" height="80"/></td><td class="order-items-inner-details"><p>货号:<span>'+resList[n].articleNumber+'</span></p><p>'+resList[n].itemName+'</p><p>'+resList[n].itemSkuName+'</p></td><td class="order-items-inner-num"><span>'+resList[n].number+'</span></td><td class="order-items-inner-price">￥<span>'+resList[n].unitPrice+'</span></td><td class="order-items-inner-buttom"></td></tr></table>';
                    strLists=strLists+strList;
                }
                var str = '<div class="order-main-orders" data-saleOrderId = "'+res[i].saleOrderId+'"><div class="order-orders-details clearfix"><p class="order-details-orderNum fl">订单号:<span>'+res[i].purchaseOrderSn+'</span></p><p class="order-details-saleOrderNum fl">卖家订单号:<span>'+res[i].saleOrderSn+'</span></p><p class="order-details-orderTime fl">下单时间:<span>'+res[i].createAt+'</span></p><p class="order-details-payTime fl">付款时间:<span></span></p><p class="order-details-orderStatus fl" data-orderStatus = "1">订单状态:<span>待付款</span></p><p class="order-details-buyer fl">收货人:<span>'+res[i].consignee+'</span></p><p class="order-details-phone fl">联系方式:<span>'+res[i].phone+'</span></p><p class="order-details-address fl">买家地址:<span>'+res[i].address+'</span></p></div><div class="order-orders-items">'+strLists+'<div class="order-items-statistics clearfix"><p class="fr"><span>共<b>'+res[i].number+'</b>件</span><span>合计:￥<b>'+res[i].totalAmount+'</b>(平台包邮)</span></p><p class="fr clearfix"><a class="order-items-statistics-print" href="javascript:;">打印配货单</a><a id="remark" href="javascript:;">备注</a><a href="">订单详情</a></p></div></div></div>';
                $('.order-con-main').append(str);
                break;
            case 2://待发货
                for (var n=0;n<resList.length;n++) {
                    var strList = '<table class="order-items-inner" data-orderItemId = "'+resList[n].orderItemId+'"><tr><td class="order-items-inner-choose"><input class="order-items-inner-chooses" name="order-items-inner" type="checkbox" value="" /></td><td class="order-items-inner-img"><img src="'+resList[n].itemImageKey+'" width="80" height="80"/></td><td class="order-items-inner-details"><p>货号:<span>'+resList[n].articleNumber+'</span></p><p>'+resList[n].itemName+'</p><p>'+resList[n].itemSkuName+'</p></td><td class="order-items-inner-num"><span>'+resList[n].number+'</span></td><td class="order-items-inner-price">￥<span>'+resList[n].unitPrice+'</span></td><td class="order-items-inner-buttom"><a id="delivery" href="javascript:;">发货</a></td></tr></table>';
                    strLists=strLists+strList;
                }
                var str = '<div class="order-main-orders" data-saleOrderId = "'+res[i].saleOrderId+'"><div class="order-orders-details clearfix"><p class="order-details-orderNum fl">订单号:<span>'+res[i].purchaseOrderSn+'</span></p><p class="order-details-saleOrderNum fl">卖家订单号:<span>'+res[i].saleOrderSn+'</span></p><p class="order-details-orderTime fl">下单时间:<span>'+res[i].createAt+'</span></p><p class="order-details-payTime fl">付款时间:<span>'+res[i].paidAt+'</span></p><p class="order-details-orderStatus fl" data-orderStatus = "2">订单状态:<span>待发货</span></p><p class="order-details-buyer fl">收货人:<span>'+res[i].consignee+'</span></p><p class="order-details-phone fl">联系方式:<span>'+res[i].phone+'</span></p><p class="order-details-address fl">买家地址:<span>'+res[i].address+'</span></p></div><div class="order-orders-items">'+strLists+'<div class="order-items-statistics clearfix"><p class="fr"><span>共<b>'+res[i].number+'</b>件</span><span>合计:￥<b>'+res[i].totalAmount+'</b>(平台包邮)</span></p><p class="fr clearfix"><a class="order-items-statistics-print" href="javascript:;">打印配货单</a><a id="remark" href="javascript:;">备注</a><a id="deliverys" href="javascript:;">批量发货</a><a href="">订单详情</a></p></div></div></div>';
                $('.order-con-main').append(str);
                break;
            case 3://部分发货
                for (var n=0;n<resList.length;n++) {
                    var strList = '<table class="order-items-inner" data-orderItemId = "'+resList[n].orderItemId+'"><tr><td class="order-items-inner-choose"><input class="order-items-inner-chooses" name="order-items-inner" type="checkbox" value="" /></td><td class="order-items-inner-img"><img src="'+resList[n].itemImageKey+'" width="80" height="80"/></td><td class="order-items-inner-details"><p>货号:<span>'+resList[n].articleNumber+'</span></p><p>'+resList[n].itemName+'</p><p>'+resList[n].itemSkuName+'</p></td><td class="order-items-inner-num"><span>'+resList[n].number+'</span></td><td class="order-items-inner-price">￥<span>'+resList[n].unitPrice+'</span></td><td class="order-items-inner-buttom"></td></tr></table>';
                    strLists=strLists+strList;
                }
                var str = '<div class="order-main-orders" data-saleOrderId = "'+res[i].saleOrderId+'"><div class="order-orders-details clearfix"><p class="order-details-orderNum fl">订单号:<span>'+res[i].purchaseOrderSn+'</span></p><p class="order-details-saleOrderNum fl">卖家订单号:<span>'+res[i].saleOrderSn+'</span></p><p class="order-details-orderTime fl">下单时间:<span>'+res[i].createAt+'</span></p><p class="order-details-payTime fl">付款时间:<span>'+res[i].paidAt+'</span></p><p class="order-details-orderStatus fl" data-orderStatus = "3">订单状态:<span>部分发货</span></p><p class="order-details-buyer fl">收货人:<span>'+res[i].consignee+'</span></p><p class="order-details-phone fl">联系方式:<span>'+res[i].phone+'</span></p><p class="order-details-address fl">买家地址:<span>'+res[i].address+'</span></p></div><div class="order-orders-items">'+strLists+'<div class="order-items-statistics clearfix"><p class="fr"><span>共<b>'+res[i].number+'</b>件</span><span>合计:￥<b>'+res[i].totalAmount+'</b>(平台包邮)</span></p><p class="fr clearfix"><a class="order-items-statistics-print" href="javascript:;">打印配货单</a><a id="remark" href="javascript:;">备注</a><a id="deliverys" href="javascript:;">批量发货</a><a href="">查看物流</a><a href="">订单详情</a></p></div></div></div>';
                $('.order-con-main').append(str);
                break;
            case 4://已发货
                for (var n=0;n<resList.length;n++) {
                    var strList = '<table class="order-items-inner" data-orderItemId = "'+resList[n].orderItemId+'"><tr><td class="order-items-inner-choose"><input class="order-items-inner-chooses" name="order-items-inner" type="checkbox" value="" /></td><td class="order-items-inner-img"><img src="'+resList[n].itemImageKey+'" width="80" height="80"/></td><td class="order-items-inner-details"><p>货号:<span>'+resList[n].articleNumber+'</span></p><p>'+resList[n].itemName+'</p><p>'+resList[n].itemSkuName+'</p></td><td class="order-items-inner-num"><span>'+resList[n].number+'</span></td><td class="order-items-inner-price">￥<span>'+resList[n].unitPrice+'</span></td><td class="order-items-inner-buttom"></td></tr></table>';
                    strLists=strLists+strList;
                }
                var str = '<div class="order-main-orders" data-saleOrderId = "'+res[i].saleOrderId+'"><div class="order-orders-details clearfix"><p class="order-details-orderNum fl">订单号:<span>'+res[i].purchaseOrderSn+'</span></p><p class="order-details-saleOrderNum fl">卖家订单号:<span>'+res[i].saleOrderSn+'</span></p><p class="order-details-orderTime fl">下单时间:<span>'+res[i].createAt+'</span></p><p class="order-details-payTime fl">付款时间:<span>'+res[i].paidAt+'</span></p><p class="order-details-orderStatus fl" data-orderStatus = "4">订单状态:<span>全部发货</span></p><p class="order-details-buyer fl">收货人:<span>'+res[i].consignee+'</span></p><p class="order-details-phone fl">联系方式:<span>'+res[i].phone+'</span></p><p class="order-details-address fl">买家地址:<span>'+res[i].address+'</span></p></div><div class="order-orders-items">'+strLists+'<div class="order-items-statistics clearfix"><p class="fr"><span>共<b>'+res[i].number+'</b>件</span><span>合计:￥<b>'+res[i].totalAmount+'</b>(平台包邮)</span></p><p class="fr clearfix"><a class="order-items-statistics-print" href="javascript:;">打印配货单</a><a href="">查看物流</a><a href="">订单详情</a></p></div></div></div>';
                $('.order-con-main').append(str);
                break;
            case 5://成功的订单
                for (var n=0;n<resList.length;n++) {
                    var strList = '<table class="order-items-inner" data-orderItemId = "'+resList[n].orderItemId+'"><tr><td class="order-items-inner-choose"><input class="order-items-inner-chooses" name="order-items-inner" type="checkbox" value="" /></td><td class="order-items-inner-img"><img src="'+resList[n].itemImageKey+'" width="80" height="80"/></td><td class="order-items-inner-details"><p>货号:<span>'+resList[n].articleNumber+'</span></p><p>'+resList[n].itemName+'</p><p>'+resList[n].itemSkuName+'</p></td><td class="order-items-inner-num"><span>'+resList[n].number+'</span></td><td class="order-items-inner-price">￥<span>'+resList[n].unitPrice+'</span></td><td class="order-items-inner-buttom"></td></tr></table>';
                    strLists=strLists+strList;
                }
                var str = '<div class="order-main-orders" data-saleOrderId = "'+res[i].saleOrderId+'"><div class="order-orders-details clearfix"><p class="order-details-orderNum fl">订单号:<span>'+res[i].purchaseOrderSn+'</span></p><p class="order-details-saleOrderNum fl">卖家订单号:<span>'+res[i].saleOrderSn+'</span></p><p class="order-details-orderTime fl">下单时间:<span>'+res[i].createAt+'</span></p><p class="order-details-payTime fl">付款时间:<span>'+res[i].paidAt+'</span></p><p class="order-details-orderStatus fl" data-orderStatus = "5">订单状态:<span>已完成</span></p><p class="order-details-buyer fl">收货人:<span>'+res[i].consignee+'</span></p><p class="order-details-phone fl">联系方式:<span>'+res[i].phone+'</span></p><p class="order-details-address fl">买家地址:<span>'+res[i].address+'</span></p></div><div class="order-orders-items">'+strLists+'<div class="order-items-statistics clearfix"><p class="fr"><span>共<b>'+res[i].number+'</b>件</span><span>合计:￥<b>'+res[i].totalAmount+'</b>(平台包邮)</span></p><p class="fr clearfix"><a href="">查看物流</a><a href="">订单详情</a></p></div></div></div>';
                $('.order-con-main').append(str);
                break;
            case 6://已取消
                for (var n=0;n<resList.length;n++) {
                    var strList = '<table class="order-items-inner" data-orderItemId = "'+resList[n].orderItemId+'"><tr><td class="order-items-inner-choose"><input class="order-items-inner-chooses" name="order-items-inner" type="checkbox" value="" /></td><td class="order-items-inner-img"><img src="'+resList[n].itemImageKey+'" width="80" height="80"/></td><td class="order-items-inner-details"><p>货号:<span>'+resList[n].articleNumber+'</span></p><p>'+resList[n].itemName+'</p><p>'+resList[n].itemSkuName+'</p></td><td class="order-items-inner-num"><span>'+resList[n].number+'</span></td><td class="order-items-inner-price">￥<span>'+resList[n].unitPrice+'</span></td><td class="order-items-inner-buttom"></td></tr></table>';
                    strLists=strLists+strList;
                }
                var str = '<div class="order-main-orders" data-saleOrderId = "'+res[i].saleOrderId+'"><div class="order-orders-details clearfix"><p class="order-details-orderNum fl">订单号:<span>'+res[i].purchaseOrderSn+'</span></p><p class="order-details-saleOrderNum fl">卖家订单号:<span>'+res[i].saleOrderSn+'</span></p><p class="order-details-orderTime fl">下单时间:<span>'+res[i].createAt+'</span></p><p class="order-details-payTime fl">付款时间:<span>'+res[i].paidAt+'</span></p><p class="order-details-orderStatus fl" data-orderStatus = "6">订单状态:<span>已取消</span></p><p class="order-details-buyer fl">收货人:<span>'+res[i].consignee+'</span></p><p class="order-details-phone fl">联系方式:<span>'+res[i].phone+'</span></p><p class="order-details-address fl">买家地址:<span>'+res[i].address+'</span></p></div><div class="order-orders-items">'+strLists+'<div class="order-items-statistics clearfix"><p class="fr"><span>共<b>'+res[i].number+'</b>件</span><span>合计:￥<b>'+res[i].totalAmount+'</b>(平台包邮)</span></p><p class="fr clearfix"><a href="">订单详情</a></p></div></div></div>';
                $('.order-con-main').append(str);
                break;
        }
    }
}