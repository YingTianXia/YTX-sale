/**
 * Created by hangwei on 15/11/4.
 */
(function(){
    var typeData = {
        "牛仔裤": 1,
        "短袖": 2,
        "长袖": 3,
        "大衣": 4
    }
    function category() {
        var typeCon = document.getElementById('typechoose');
        var titles = typeCon.getElementsByTagName('dt');

        for(var i = 0,j = titles.length; i < j; i++){
            addListener(titles[i], 'click', typeslider);
        };

        function typeslider() {
            var typelist = this.parentNode.getElementsByTagName('dd')[0],
                obj = css(typelist, 'display');

            if(obj === 'block'){
                typelist.style.display = 'none';
                this.style.background = 'url(../../static/images/arrow_2.png) 184px center no-repeat'
            }else{
                typelist.style.display = 'block';
                this.style.background = 'url(../../static/images/arrow_1.png) 184px center no-repeat'
            }
        }

        function css(obj, attr){
            return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
        };
    }
    function chooseType() {
        var typeOne = document.getElementById('type1'),
            typeTwo = document.getElementById('type2'),
            typeThree = document.getElementById('type3'),
            typeOneOptions = typeOne.getElementsByTagName('p'),
            typeTwoOptions = typeTwo.getElementsByTagName('li'),
            typeThreeOptions = typeThree.getElementsByTagName('li'),
            typeStatus = document.getElementById('typeStatus');
        spans = typeStatus.getElementsByTagName('span');

        typeOne.onclick = chooseMainType;
        typeTwo.onclick = chooseSecondType;
        typeThree.onclick = chooseThirdType;

        function chooseMainType(e){
            e = e || window.event;
            obj = e.srcElement || e.target;
            if(obj.nodeName !== 'P')return;
            //obj即为所选目录的节点,如“服装鞋包”
            for(var i = 0, j = typeOneOptions.length; i < j; i++){
                if(typeOneOptions[i].className === 'category-type-item category-type-activeitem'){
                    typeOneOptions[i].className = 'category-type-item';
                    break;
                };
            };
            obj.className = 'category-type-item category-type-activeitem';
            //记录当前所在位置
            //清空之前的位置
            typeStatus.innerHTML = '<span class="category-curStatus-static">您当前的选择是:</span>'
            var typeStatu = document.createElement('span');
            typeStatu.innerHTML = obj.innerHTML;
            typeStatu.className = 'category-curStatus-static';
            typeStatus.appendChild(typeStatu);
            //清空原有类目下的商品
            typeTwo.innerHTML = '';
            /*
             * 重新传入数据
             *typeData为模拟json格式数据
             */
            for(x in typeData){
                var li = document.createElement('li');
                li.className = 'category-type-item';
                li.innerHTML = x;
                typeTwo.appendChild(li);
            };
        };

        function chooseSecondType(e) {
            e = e || window.event;
            obj = e.srcElement || e.target;
            if(obj.nodeName !== 'LI')return;
            //obj为所选类目节点
            for(var i = 0,j = typeTwoOptions.length; i < j; i++){
                if(typeTwoOptions[i].className === 'category-type-item category-type-activeitem'){
                    typeTwoOptions[i].className = 'category-type-item';
                    break;
                };
            };
            obj.className = 'category-type-item category-type-activeitem';
            if(spans[3] == undefined || spans[3] == null){
                curStatus();
            }else{
                spans[3].innerHTML = obj.innerHTML;
            }
            if(!(spans[4] == undefined || spans[4] == null)){
                typeStatus.removeChild(spans[5]);
                typeStatus.removeChild(spans[4]);
            }
            //清空原有类目下的商品
            typeThree.innerHTML = '';
            /*
             * 重新传入数据
             *typeData为模拟json格式数据
             */
            for(x in typeData){
                var li = document.createElement('li');
                li.className = 'category-type-item';
                li.innerHTML = x;
                typeThree.appendChild(li);
            };
        };

        function chooseThirdType(e){
            e = e || window.event;
            obj = e.srcElement || e.target;
            if(obj.nodeName !== 'LI')return;
            //obj为所选类目节点
            for(var i = 0,j = typeThreeOptions.length; i < j; i++){
                if(typeThreeOptions[i].className === 'category-type-item category-type-activeitem'){
                    typeThreeOptions[i].className = 'category-type-item';
                    break;
                };
            };
            obj.className = 'category-type-item category-type-activeitem';
            if(spans[5] == undefined || spans[5] == null){
                curStatus();
            }else{
                spans[5].innerHTML = obj.innerHTML;
            }
        };

        function curStatus(){
            var typeStatu = document.createElement('span');
            var arrow = document.createElement('span');
            arrow.innerHTML = ' &gt; '
            typeStatu.innerHTML = obj.innerHTML;
            typeStatu.className = 'category-curStatus-static';
            typeStatus.appendChild(arrow);
            typeStatus.appendChild(typeStatu);
        }
    };
    function addListener(target, type, fn){
        if(document.addEventListener){
            target.addEventListener(type, fn, false);
        }else if(document.attachEvent){
            target.attachEvent('on' + type, function(e){
                fn.call(target, e)
            });
        }else{
            target['on'+type] = fn;
        };
    };
    window.category = category;
    window.chooseType = chooseType;
}());
