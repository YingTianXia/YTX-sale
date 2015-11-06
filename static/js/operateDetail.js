/**
 * Created by hangwei on 15/11/5.
 */
(function($){
    $('#J-shopChange').on('click',function(){
        switch ($(this).html()){
            case "修改":
                $(this).html('确认');
                $('.j-changInput').html('<input type="text"/>');
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
    $('.j-addressDelete').on('click',function(){
        $(this).parent().parent().remove();
    })
})(jQuery);