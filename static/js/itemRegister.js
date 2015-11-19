/**
 * Created by hangwei on 15/11/17.
 */
$(document).on('click','.J-click-show',function(){
    $('.act-detail-wrap').css('height','auto');
    $('.click-show-span').hide();
    $('.click-hide-span').css('display','block');
    $(this).removeClass('J-click-show').addClass('J-hide-show');
})
$(document).on('click','.J-hide-show',function(){
    $('.act-detail-wrap').css('height','200px');
    $('.click-hide-span').hide();
    $('.click-show-span').show();
    $(this).removeClass('J-hide-show').addClass('J-click-show');
})