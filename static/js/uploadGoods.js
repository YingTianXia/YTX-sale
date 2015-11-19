/**
 * Created by hangwei on 15/11/4.
 */

(function($){
   /* $('.j-addSize').on('click',function(){
        var dom  =  '<li class="goods-sizeItem J_size">'+
                    '<input type="checkbox" class="goods-sizeItem-checkbox" checked />'+
                    '<input type="text" class="input-size" value="'+$(this).siblings().val()+'"/>'+
                    '</li>';
        if($(this).siblings().val()){
            $('#J-sizeUl').append(dom);
            colorChange();
        }
    })
    $('.j-addColor').on('click',function(){
        var dom  =  '<li class="goods-color J_color">'+
                    '<input type="checkbox" class="checkbox-color" />'+
                    '<span class="color-mark select-color-a"></span>'+
                    '<input class="input-color" value="'+$(this).siblings().val()+'"  type="text"/>'+
                    '</li>';
        if($(this).siblings().val()){
            $('#J-colorUl').append(dom);
            colorChange();
        }
    })*/

    /**
     * 从 file 域获取 本地图片 url
     */
    function getFileUrl(sourceId) {
        var url;
        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
            url = document.getElementById(sourceId).value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        }
       return url;
    }
    /**
     * 将本地图片 显示到浏览器上
     */
    function preImg(fileId) {
        var url = getFileUrl(fileId);
        $('.goods-imgItem').each(function(i,v){
            if($('img',v).length==0){
                var dom =   '<span class="j-close close">X</span>'+
                            '<img src="'+url+'" class="goods-imgItem-img" width="100%" height="100%"/>'
                $(v).html(dom);
                return false;
            }
        })
        /*var filePath;
        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
            filePath = document.getElementById(fileId).value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            filePath = document.getElementById(fileId).files.item(0);
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            filePath = document.getElementById(fileId).files.item(0);
        }*/
    }
    $('#fileUp').on('change',function(){
        preImg('fileUp')
    })

    $(document).on('click','.j-close',function(){
        $(this).parents('.goods-imgItem').html('');
        $('.goods-imgCon-file').val('');
    })

    $(document).on('change','.j-good-img',function(){
        $('.j-good-img').removeAttr('id');
        $(this).attr('id','J-good-img');
        var url = getFileUrl('J-good-img');
        $('#J-good-img').parent().append('<img src="'+url+'" class="" width="100%" height="100%"/><span class="j-deleteGood">删除</span>');
        $(this).val('');
    })
    $(document).on('click','.j-deleteGood',function(){
        $(this).siblings('img').remove();
        $(this).remove();

    })

    /*——————————————————————————————————————————尺码表——————————————————————————————————————————*/

    var changeArry=[];

    $(document).on('change','.j-add',function(){

        var saveValue =$(this).attr('attr')+'-'+$(this).val();

        var m = saveValue.substring(0,saveValue.indexOf('-'));

        $.each(changeArry,function(i,el){
            var nowChange =el.substring(0,el.indexOf('-'))
            if(nowChange==m){
                console.log('1')
                changeArry.splice(i, el);
            }else{
                changeArry.push('1')
            }
            //console.log(el+i)
        })


        console.log(changeArry)

    })

    var colorSize={};

    function colorChange(){
        var sizeArr = [];
        colorSize={};

        $('.J_size').each(function(i,e){
            var sizeCheck = $('.goods-sizeItem-checkbox',e);
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
            var colorCheck = $('.checkbox-color',e);
            var colorVal = $('.input-color',e).val();
            if(colorCheck[0].checked){
                colorSize[colorVal]=sizeArr;
            }
        });


       /*$.each(colorSize,function(name,el){
            $.each(el,function(index,data){
                $.each(changeArry,function(i,newData){
                    if(newData.color==name&&newData.size==data.size){
                        //console.log(newData.num + newData.color + newData.size)
                        data.num = newData.num;
                        data.price = newData.price;
                        data.sellerCode = newData.sellerCode;
                        data.goodsCode = newData.goodsCode;
                    }
                })
            })
        })*/
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
            '<td>颜色分类</td>'+
            '<td>尺寸</td>'+
            '<td>价格</td>'+
            '<td>数量</td>'+
            '<td>商家编码</td>'+
            '<td>商品条形码</td>'+
            '</tr>';
        var checkColor =$('.checkbox-color').is(':checked');
        var checkSize =$('.goods-sizeItem-checkbox').is(':checked');
        var sizeLength=0;
        if(checkColor&&checkSize){
            $.each(obj,function(v,tmpl){
                sizeLength =tmpl.length;
                $.each(tmpl,function(i,el){
                    dom =dom+'<tr>'+
                        '<td class="td-color">'+v+'</td>'+
                        '<td class="td-size">'+el.size+'</td>'+
                        '<td><input type="text" attr="'+v+el.size+'a" class="j-add" value="'+ el.price+'"/></td>'+
                        '<td><input type="text" attr="'+v+el.size+'b" class="j-add" value="'+ el.num+'"/></td>'+
                        '<td><input type="text" attr="'+v+el.size+'c" class="j-add" value=""/></td>'+
                        '<td><input type="text" attr="'+v+el.size+'d" class="j-add" value=""/></td>'+
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
        }else{
            $('.colorSizeTable').html('');
        }
    }

    $('.checkbox-color').on('click',function(){
        colorChange();

        var dom='<tr>'+
                '<td class="colorImgTable-a">颜色</td>'+
                '<td class="colorImgTable-b">图片</td>'+
                '</tr>';
        var arr=[];
        $('.checkbox-color').each(function(i,el){
            if($(el).get(0).checked){
                arr.push({
                    color:$(el).siblings(".color-mark").attr('class')+' imgColorSpan',
                    val:$(el).siblings(".input-color").val()
                })
            }
        })

        $.each(arr,function(i,el){
            dom =dom+'<tr>'+
                '<td class="colorImgTable-a">' +
                '<span class="'+el.color+'"></span>'+
                '<span >'+el.val+'</span>'+
                '</td>'+
                '<td class="colorImgTable-b">'+
                '<input class="j-good-img" type="file"/>'+
                '</td>'+
                '</tr>';
        })
        $('.colorImgTable').html(dom);

    })

    $('.goods-sizeItem-checkbox').on('click',function(){
        colorChange();
    })


    var app = angular.module('myApp', []);
    app.controller('myCtrl', ['$scope', function($scope) {

        $('.false-show').show();
        $scope.upload={
            mail:'free',
            countNum:'buy',
            commit:'commit'
        }

        $scope.save = function() {
            // check to make sure the form is completely valid
            if ($scope.uploadForm.$valid) {
                $('.goods-imgItem').each(function(i,v){
                    if($('img',v).length==1&&i==0){
                        alert('success');
                    }else if(i==0){
                        alert('请上传宝贝主图');
                    }
                })
            }else{
                alert('请填写必须信息')
            }
        };
        console.log($scope)
    }]);
})(jQuery)







