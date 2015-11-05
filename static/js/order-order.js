var start = {
	elem: '#start', 
    event: 'focus', 
    istime: true,
    choose: function(datas){
         end.min = datas; //开始日选好后，重置结束日的最小日期
         end.start = datas //将结束日的初始值设定为开始日
    }
}
var end = {
	elem: '#end', 
    event: 'focus', 
    istime: true,
    choose: function(datas){
        start.max = datas; //结束日选好后，重置开始日的最大日期
    }
}
laydate(start);
laydate(end);
