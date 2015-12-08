
(function($){
    $('.J_actInput').on('focus',function(e){
        console.log();
        if($(e.target).val() == $(e.target).attr('defval')){
            $(e.target).val('');
        }
    });
    $('.J_actSelect').on('change',function(e){
        var _v = e.target.value-1;
        $('.J_actType').removeClass('active');
        $('.J_actType').eq(_v).addClass('active');
    });
    $('.J_addtype3').on('click',function(){
        $('.J_manjian','.active').append('<p>满：<input class="act-info-input2 J_type3_man" type="number"> 元 减：<input class="act-info-input2 J_type3_jian" type="number"> 元 <a class="act-set-btn ml-10 J_actSetDelete" href="javascript:;">删除</a></p>');
    });
    $('.J_addtype4').on('click',function(){
        $('.J_manjian','.active').append('<p>满：<input class="act-info-input2 J_type4_man" type="number"> 件 减：<input class="act-info-input2 J_type4_jian" type="number"> 元 <a class="act-set-btn ml-10 J_actSetDelete" href="javascript:;">删除</a></p>');
    });
    $('.J_actType').on('click','.J_actSetDelete',function(e){
        var _tpp = $(e.target).parent().parent(),
            _tp  = $(e.target).parent();
        if($('p',_tpp).length>1){
            _tp.remove();
        }else{
            alert('至少需要一个条件');
        }
    });
    $('.J_actSubmit').on('click',function(){
        var _fullReductionDetails = [];
        var _activityName = $('#activityName').val(),
            _startDate = $('#startDate').val(),
            _endDate = $('#endDate').val(),
            _activityDescribe = $('#activityDescribe').val();
            _activityType = $('#activityType').val();
            if(_activityType == '1'){
                //商品限时折扣
                var _rebeta = parseInt($('.J_rebate').val());
                // if(_rebeta <= 0 || _rebeta >10 || $('.J_rebate').val() == undefined||$('.J_rebate').val() == ''){
                //     alert('请输入正确的折扣');
                //     return false;
                // }
                var _details = {
                    id: "",
                    rebate: _rebeta
                }
                _fullReductionDetails.push(_details);
            }else if(_activityType == '2'){
                //全场限时折扣
                var _rebeta = parseInt($('.J_allRebate').val());
                // if(_rebeta <= 0 || _rebeta >10 || $('.J_allRebate').val() == undefined||$('.J_allRebate').val() == ''){
                //     alert('请输入正确的折扣');
                //     return false;
                // }
                var _details = {
                    id: "",
                    rebate: _rebeta
                }
                _fullReductionDetails.push(_details);
            }else if(_activityType == '3'){
                //满多少元减多少元
            }else if(_activityType == '4'){
                //满多少件减多少元
            }
        // var _data = {
        //     id:1,
        //     activityName: _activityName,
        //     startDate: _startDate,
        //     endDate: _endDate,
        //     activityDescribe: _activityDescribe,
        //     activityType:_activityType,// 1:限时折扣,2,3,4
        //     sellerId:"",//卖家id
        //     products:"",//商品列表 ”123,234,345"
        //     fullReductionDetails:[
        //         {
        //             id:"", //活动条件id
        //             fullSet:"",//满xx
        //             reductionSet:"", //减xx
        //             rebate:"" //折扣
        //         }
        //     ]
        // };
        var _data = {
            id:1,
            activityName: _activityName,
            startDate: _startDate,
            endDate: _endDate,
            activityDescribe: _activityDescribe,
            activityType:_activityType,// 1:限时折扣,2,3,4
            sellerId:"",//卖家id
            products:"",//商品列表 ”123,234,345"
            fullReductionDetails: _fullReductionDetails
        };
        //test
                if(_activityType == '1'){
                    window.location.href="additem.html" 
                }

                
        // $.ajax({
        //     type: "POST",
        //     url: "/fullReduction/save",
        //     data: JSON.stringify(_data),
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        //     success: function(data){
        //         console.log(data);
        //         if(_activityType == '1'){
        //             windows.location.href="additem.html" 
        //         }
        //     },
        //     error: function(res){
        //         console.log(res);
        //     }
        // });
    })
})(jQuery);