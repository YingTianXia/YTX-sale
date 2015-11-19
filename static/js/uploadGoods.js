/**
 * Created by hangwei on 15/11/4.
 */

(function($){

    //富文本编辑器
    KindEditor.ready(function(K) {
        window.editor = K.create('#editor', {
            allowFileManager : true,
            langType : 'zh-CN',
            autoHeightMode : true
        });
    });

    //复制粘贴
    var client = new ZeroClipboard( $(".J-copyLink") );
    client.on( "ready", function() {
        client.on( "aftercopy", function( event ) {
            $('.copySuccessShow').show();
        } );
    } );
    $(document).on('click','.copySuccessShow-L',function(){
        $('.get-link-show').hide();
        $('.copySuccessShow').hide();
    })

    $(document).on('click','.copySuccessShow-R',function(){
        $('.copySuccessShow').hide();
    })
    //日历组件

        var start = {
            elem: '#inputStartTime',
            event: 'focus',
            istime: true,
            format: 'YYYY-MM-DD hh:mm:ss',
            choose: function(datas){
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
        }
        var end = {
            elem: '#inputEndTime',
            event: 'focus',
            format: 'YYYY-MM-DD hh:mm:ss',
            istime: true,
            choose: function(datas){
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
        }
        laydate(start);
        laydate(end);

    /*——————————————————————————————————————————尺码表——————————————————————————————————————————*/
    $('.SKU-A-check').on('click',function(){

        skuChange();

        var isShowImg = $(this).parents('#SKU-A').attr('data-img')=="img" ? true: false;
        if(isShowImg){
            colorRender();
        }
    })

    $('.SKU-B-check').on('click',function(){
        skuChange();
    })

    var changeArry=[];

    var colorSize={};

    function skuChange(){
        var sizeArr = [];
        colorSize={};

        $('.J_size').each(function(i,e){
            var sizeCheck = $('.SKU-B-check',e);
            var sizeVal = $('.input-size',e).val();
            if(sizeCheck[0].checked){
                sizeArr.push({
                    'size' :sizeVal,
                    'num':'999',
                    'price':'999',
                    'sellerCode':'',
                    'goodsCode':''
                });
            }
        });

        $('.J_color').each(function(i,e){
            var colorCheck = $('.SKU-A-check',e);
            var colorVal = $('.input-color',e).val();
            if(colorCheck[0].checked){
                colorSize[colorVal]=sizeArr;
            }
        });

        $.each(changeArry,function(index,el){
            $.each(colorSize[el.color],function(i,data){
                if(data.size==el.size){
                    var _temp =el.num;
                    data.num = _temp;

                }
            })
        })
        domrender(colorSize);

    }

    function domrender(obj){
        var dom='<tr>'+
            '<td>'+$(".SKU-name").eq(0).html()+'</td>'+
            '<td>'+$(".SKU-name").eq(1).html()+'</td>'+
            '<td>价格</td>'+
            '<td>数量</td>'+
            '<td>商家编码</td>'+
            '<td>商品条形码</td>'+
            '</tr>';
        var singleDom='<tr>'+
            '<td>'+$(".SKU-name").eq(0).html()+'</td>'+
            '<td>价格</td>'+
            '<td>数量</td>'+
            '<td>商家编码</td>'+
            '<td>商品条形码</td>'+
            '</tr>';
        var isSKUA =$('.SKU-A-check').is(':checked');
        var isSKUB =$('.SKU-B-check').is(':checked');
        var sizeLength=0;
        if(isSKUA&&isSKUB){
            $.each(obj,function(v,tmpl){
                sizeLength =tmpl.length;
                $.each(tmpl,function(i,el){
                    dom =dom+'<tr>'+
                        '<td class="td-color">'+v+'</td>'+
                        '<td class="td-size">'+el.size+'</td>'+
                        '<td><input type="text"'+ el.price+'"/></td>'+
                        '<td><input type="text"'+ el.num+'"/></td>'+
                        '<td><input type="text"/></td>'+
                        '<td><input type="text"/></td>'+
                        '</tr>';
                })
            })

            $('.colorSizeTable').html(dom);

            var colorIndex =0;
            $('.td-color').each(function(i,v){
                if(colorIndex==i){
                    $(v)[0].rowSpan=sizeLength;
                    colorIndex=colorIndex+sizeLength;
                }else{
                    $(v).remove();
                }
            })
        }else if(isSKUA&&!isSKUB){
            $.each(obj,function(v){
                singleDom =singleDom+'<tr>'+
                    '<td class="td-color">'+v+'</td>'+
                    '<td><input type="text"/></td>'+
                    '<td><input type="text"/></td>'+
                    '<td><input type="text"/></td>'+
                    '<td><input type="text"/></td>'+
                    '</tr>';
            })
            $('.colorSizeTable').html(singleDom);
        }
        else{
            $('.colorSizeTable').html('');
        }
    }

    function colorRender(){

        var dom='<tr>'+
            '<td class="colorImgTable-a">颜色</td>'+
            '<td class="colorImgTable-b">图片</td>'+
            '</tr>',
            arr=[],
            isSKUA =$('.SKU-A-check').is(':checked');

        $('.SKU-A-check').each(function(i,el){
            if($(el).get(0).checked){
                arr.push({
                    val: $(el).siblings(".input-color").val()
                })
            }
        })

        if(isSKUA){
            $.each(arr,function(i,el){
                dom =dom+'<tr>'+
                    '<td class="colorImgTable-a">'+el.val+'</td>'+
                    '<td class="colorImgTable-b">'+
                    '<span class="j-good-img">选择图片</span>'+
                    '</td>'+
                    '</tr>';
            })
            $('.colorImgTable').html(dom);
        }else{
            $('.colorImgTable').html('');
        }

    }


    //文件夹
    var arrSelectArry=[];
    var hasSelectIndex =0;
    $('.bread-nav').eq(1).html($('.catalog-folder-name').eq(0).html());

    $(document).on('click','.catalog-folder-name',function(){
        $('.bread-nav').eq(1).html($(this).html());
    });

    $(document).on('click','.imagelist-item-content',function(){

        var selectMax=$('.folder-actions-has em').html()-0;
        var maxPic =selectMax-1;
        if($(this).hasClass('selected')){
            $(this).removeClass('selected');
            $(this).find('.selected-icon').remove();
            arrSelectArry.splice($.inArray($('img',this).attr('src'),arrSelectArry),1);
            hasSelectIndex--;
            $('.folder-actions-has i').html(hasSelectIndex);
        }else{

            if($('#imageContent').find('.selected').length<=maxPic){
                arrSelectArry.push($('img',this).attr('src'))
                $(this).addClass('selected');
                $(this).append('<span class="selected-icon"></span>');
                hasSelectIndex++;
                $('.folder-actions-has i').html(hasSelectIndex);
            }else{
                alert('最多选择'+selectMax+'张图片')
            }
        }

    });

    $(document).on('click','.j-good-img',function(){
        arrSelectArry=[];
        $('.get-img-show').show()
        if($(this).hasClass('select-six')){
            $('.folder-actions-has em').html('6');
        }else{
            $('.colorImgTable-b').removeClass('add-cur-img');
            $(this).parents('.colorImgTable-b').addClass('add-cur-img');
            $('.folder-actions-has em').html('1')
        }
    });

    $(document).on('click','.folder-actions-select',function(){
        var selectMax =$('.folder-actions-has em').html()-0;
        if(selectMax>1){
            $('.goods-imgItem').each(function(v,tmpl){
                if(arrSelectArry[v]){
                    $(tmpl).html('<img src="'+arrSelectArry[v]+'"/>');
                }else{
                    $(tmpl).html('');
                }
            })
        }else{
            $('.add-cur-img').html(
                '<span class="j-good-img">选择图片</span>' +
                '<img src="'+arrSelectArry[0]+'"/>'
            )
        }


        $('.imagelist-item-content').removeClass('selected');
        $('.imagelist-item-content').find('.selected-icon').remove();
        $('.folder-actions-has i').html('0');
        $('.get-img-show').hide()
        hasSelectIndex=0;
    });

    function uploadDateSave(){
        var uploadJson ={};

    }




})(jQuery)







