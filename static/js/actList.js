/**
 * Created by hangwei on 15/11/17.
 */

//$('#J-registerStatus option[value="未报名"]').prop('disabled','true');


$('.J-actStatus').on('change',function(){
    $('#J－registerStatus').val('');
    var selectVal =$(this).val();

    if(selectVal!="活动进行中"&&selectVal!="活动结束"){
        //报名状态
        $('.registerStatus-option').show();
        $('.option-c').hide();
        $('.option-d').hide();
    }else{
        //活动状态
        $('.registerStatus-option').show();
        $('.option-a').hide();
        $('.option-b').hide();
    }
})