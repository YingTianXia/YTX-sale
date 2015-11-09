//成交时间（起始）
var start = {
	elem: '#start', 
    event: 'focus', 
    istime: true,
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
    istime: true,
    choose: function(datas){
        start.max = datas; //结束日选好后，重置开始日的最大日期
    }
}
laydate(end);
//发货弹出层
$('#delivery').on('click',function () {
	layer.open({
	    type: 1,
	    area: ['330px', '240px'],
	    closeBtn: false, //不显示关闭按钮
	    shadeClose: false, //开启遮罩关闭
	    btn: ['确定', '取消'],
	    content: '内容'
	});
})
