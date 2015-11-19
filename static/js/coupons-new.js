(function($){
	var dateStart = {
		elem: '#date_start', 
	    event: 'focus', 
	    istime: true,
	    choose: function(datas){
	         dateEnd.min = datas; //开始日选好后，重置结束日的最小日期
	         dateEnd.start = datas //将结束日的初始值设定为开始日
		}
	}
	var dateEnd = {
		elem: '#date_end', 
	    event: 'focus', 
	    istime: true,
	    choose: function(datas){
	        dateStart.max = datas; //结束日选好后，重置开始日的最大日期
	    }
	};
	function init(){
		laydate(dateStart);
		laydate(dateEnd);
		bindEv();
	}
	function bindEv(){
		$('.J_input_name').on('focus',function(e){
			if($(e.target).val() == '输入活动名称'){
				$(e.target).val('')
			}
		});
		$('.J_coupons_submit').on('click',function(e){
			couponsSubmit();
		});
	}
	function couponsSubmit(){
		var isChecked = false,
			isGetWay = false,
			_couponsName = $('#couponsName').val(),
			_faceValue = $('#faceValue').val(),
			_useCondition,
			_startDate = $('#date_start').val(),
			_endDate = $('#date_end').val(),
			_publishCount = $('#publishCount').val(),
			_recipientsWay,
			_couponsDescribe = $('#couponsDescribe').val();

			$('input:radio[name="useCondition"]').each(function(i,e){
				if(e.checked){
					isChecked = true;
					if(e.value == '1'){
						_useCondition = $('#useCondition1').val();
						if(_useCondition =='' || _useCondition == ' '){
							alert('请输入正确的使用条件');
							return false;
						}
					}else if(e.value == '0'){
						_useCondition = 0;
					}else{
						console.log(e);
					}
				}
			});
			$('input:radio[name="getWay"]').each(function(i,e){
				if(e.checked){
					isGetWay = true;
					_recipientsWay = e.value;
				}
			});
			if(!isChecked){
				alert('请选择使用条件');
				return false;
			}else if(!isGetWay){
				alert('请选择推广方式');
				return false;
			}else if(_couponsName == '输入活动名称' || _couponsName == '' || _couponsName == ' '){
				alert('请输入正确的活动名称');
				return false;
			}
        var _data = {
            couponsName: _couponsName, //优惠券名称
            faceValue:_faceValue, //优惠券面额
            useCondition: _useCondition, //无使用条件时给我传0，其他的传实时数字
            startDate: _startDate, //有效期开始
            endDate: _endDate,	// 有效期结束
            publishCount: _publishCount, //发行量
            recipientsWay:_recipientsWay,// 领用方式(卖家发放1,用户领用2)
            couponsDescribe:_couponsDescribe,//优惠券描述
        };
        $.ajax({
            type: "POST",
            url: "/coupons/save",
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
	init();
})(jQuery)