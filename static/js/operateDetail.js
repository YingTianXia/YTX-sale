/**
 * Created by hangwei on 15/11/5.
 */
(function($){
    $('#J-shopChange').on('click',function(){
        switch ($(this).html()){
            case "修改":
                $(this).html('确认');
                $('.j-changInput').each(function(i,v){
                    $(v).html('<input type="text" value="'+$(v).html()+'"/>');
                })
                break;
            case "确认":
                $(this).html('修改');
                $('.j-changInput').each(function(i,v){
                    $(v).html($('input',v).val());
                })
                break;
            default :
                return;
        }
    })

    $('.address-html').eq(0).show();
    $('.J-addressTab').on('click',function(){
        $(this).removeClass('cur-address').siblings().addClass('cur-address');

        switch ($(this).html()){
            case "发货地址":
                $('.address-html').eq(0).show().siblings('.address-html').hide();
                break;
            case "收货地址":
                $('.address-html').eq(1).show().siblings('.address-html').hide();
                break;
            default :
                return;
        }

    })

    $(document).on('change','.J-operate',function(){
        switch ($(this).val()){
            case "修改":
                alert('2')
                //修改跳转链接
                break;
            case "删除":
                pop.init();
                pop.popShow('#pop_addSize');
                break;
            case "设为默认地址":
                //设为默认管理
                break;
            default :
                return;
        }
    })

    $(document).on('click','.J_submitAddSize',function(){
        alert('1')
        pop.popHide();
        $('.J-operate').val('')
    })

    var pop = {
        init:function(){
            var _this = this;
            $('body').on('click','.J_popClose',function(){
                $('.J-operate').val('')
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
    //初始化


})(jQuery);