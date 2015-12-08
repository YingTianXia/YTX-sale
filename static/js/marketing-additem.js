(function($){
    $('.J_itemTable tr').on('click',function(e){
        if($('.J_itemCheck',this)[0].checked){
            $('.J_itemCheck',this).prop("checked",false);
        }else{
            $('.J_itemCheck',this).prop("checked",true);
        }
        $('.J_item_detail,.J_itemCheck').on('click',function(e){
            e.stopPropagation();
        });
    });
    $('.J_allCheck').on('click',function(){
        $('.J_itemCheck').prop("checked",true);
    });
    $('.J_allUncheck').on('click',function(){
        $('.J_itemCheck').prop("checked",false);
    });

})(jQuery)