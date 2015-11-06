/**
 * Created by hangwei on 15/11/4.
 */
function uploadgoods() {
    var colorTabs = document.getElementById('colorTab').getElementsByTagName('li'),
        colorTabCons = document.getElementById('colorTabCon').getElementsByTagName('ul'),
        colorIdx = 0;

    colorTabCons[0].style.display = 'block';
    for(var i = 0, j = colorTabs.length; i < j; i++){
        (function(arg){
            addListener(colorTabs[arg], 'click', function(){
                SwitchTab(arg, this);
            });
        }(i));
    }

    function SwitchTab(arg, that) {
        if(arg == colorIdx){
            return;
        }
        colorTabs[colorIdx].className = 'goods-colorTab';
        that.className = 'goods-colorTab goods-colorTab-active';
        colorTabCons[colorIdx].style.display = 'none';
        colorTabCons[arg].style.display = 'block';
        colorIdx = arg;
    }
}
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


