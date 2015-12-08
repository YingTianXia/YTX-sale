
(function($){
    var editRebte = {
        init:function(){
            var _this = this;
            _this.bindEv();
        },
        bindEv:function(){
            var _this = this;
            $('.J_itemTable').on('blur','.J_setRebeta',function(e){
                _this.setRebeta(e.target);
            });
            $('.J_itemTable').on('blur','.J_setMarkDown',function(e){
                _this.setMarkDown(e.target);
            });
            $('.J_itemTable').on('blur','.J_setResult',function(e){
                _this.setResult(e.target);
            });
            $('.J_setAllRebeta').on('click',function(){
                _this.setAllRebeta();
            });
            $('.J_setAllMarkDown').on('click',function(){
                _this.setAllMarkDown();
            });
        },
        setRebeta:function(et){
            var _this = this;
            var _tr = $(et).parent().parent().parent();
            var _etval = $(et).val();
            if(_etval == ''|| _etval == ' '){
                return false;
            }
            var op = parseFloat($('.J_original',_tr).html());
            var _rebeta = parseFloat(_etval)/10;
            if(_rebeta>=1|| _rebeta<=0){
                alert('设置错误');
                return false;
            }
            var _markDown = (op*(1-_rebeta)).toFixed(2);
            var _result = (op*_rebeta).toFixed(2);
            $('.J_setMarkDown',_tr).val(_markDown);
            $('.J_setResult',_tr).val(_result);
        },
        setMarkDown:function(et){
            var _this = this;
            var _tr = $(et).parent().parent().parent();
            var _etval = $(et).val();
            if(_etval == ''|| _etval == ' '){
                return false;
            }
            var op = parseInt($('.J_original',_tr).html());
            var _md = parseInt(_etval);
            if(_md>=op|| _md<=0){
                alert('设置错误');
                return false;
            }
            var _rebeta = ((op-_md)/op*10).toFixed(1);
            var _result = (op-_md).toFixed(2);
            $('.J_setRebeta',_tr).val(_rebeta);
            $('.J_setResult',_tr).val(_result);
        },
        setResult:function(et){
            var _this = this;
            var _tr = $(et).parent().parent().parent();
            var _etval = $(et).val();
            if(_etval == ''|| _etval == ' '){
                return false;
            }
            var op = parseInt($('.J_original',_tr).html());
            var _result = parseInt(_etval);
            if(_result>=op|| _result<=0){
                alert('设置错误');
                return false;
            }
            var _rebeta = (_result/op*10).toFixed(1);
            var _markDown = (op-_result).toFixed(2);
            $('.J_setRebeta',_tr).val(_rebeta);
            $('.J_setMarkDown',_tr).val(_markDown);

        },
        setAllRebeta:function(){
            var _this = this;
            var _val = $('.J_setAllRebeta_val').val();
            if(_val == ''|| _val == ' '){
                return false;
            }
            var _rebeta = parseFloat(_val)/10;
            if(_rebeta>=1|| _rebeta<=0){
                alert('设置错误');
                return false;
            }
            $('.J_itemTable tbody tr').each(function(i,e){
                var op = parseFloat($('.J_original',e).html());
                var _markDown = (op*(1-_rebeta)).toFixed(2);
                var _result = (op*_rebeta).toFixed(2);
                $('.J_setRebeta',e).val(_rebeta*10);
                $('.J_setMarkDown',e).val(_markDown);
                $('.J_setResult',e).val(_result);
            });

        },
        setAllMarkDown:function(){
            var _this = this;
            var _val = $('.J_setAllMarkDown_val').val();
            if(_val == ''|| _val == ' '){
                return false;
            }
            $('.J_itemTable tbody tr').each(function(i,e){
                var op = parseFloat($('.J_original',e).html());
                var _md = parseInt(_val);
                if(_md>=op|| _md<=0){
                    alert('设置错误');
                    return false;
                }
                var _rebeta = ((op-_md)/op*10).toFixed(1);
                var _result = (op-_md).toFixed(2);
                $('.J_setRebeta',e).val(_rebeta);
                $('.J_setMarkDown',e).val(_md);
                $('.J_setResult',e).val(_result);
            });
        }
    }
    editRebte.init();
})(jQuery)