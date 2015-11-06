/**
 * Created by hangwei on 15/11/4.
 */
;(function(){
    var sizeIndex = 0;
    function sizeTable() {
        var addArgBtn = document.getElementById('addArg'),
            addSizeBtn = document.getElementById('addSize'),
            tableCon = document.getElementById('tableCon'),
            tableSpec = document.getElementById('table-spec'),
            tableFlag = true,
            argIndex = 0,
            specVal = '';

        addListener(addArgBtn, 'click', addArg);
        addListener(addSizeBtn, 'click', addSize);

        function addArg() {
            //判断参数
            var specValue = tableSpec.value;
            if(specValue == '' || specValue == undefined){
                alert('请填写规格名，如“尺码”');
                return;
            };
            specVal = specValue;
            var args = this.parentNode.getElementsByTagName('input')[0].value;
            if(args == ''){
                this.parentNode.getElementsByTagName('input')[0].focus();
                alert('请填写参数，如‘袖长’');
                return;
            };
            if(argIndex >=7){
                alert('您最多只能填写7个属性');
                return;
            };
            if(tableFlag){
                //没有表格创建表格
                tableFlag = false;
                var table = document.createElement('table');
                table.className = 'SM-table';
                var thead = document.createElement('thead');
                thead.className = 'SM-table-head';
                var tbody = document.createElement('tbody');
                tbody.className = 'SM-table-body';
                var tr = document.createElement('tr');
                tr.className = 'SM-table-rows';
                var curTh = document.createElement('th');
                curTh.className = 'SM-table-th';
                curTh.innerHTML = specVal
                tr.appendChild(curTh);
                thead.appendChild(tr);
                table.appendChild(thead);
                table.appendChild(tbody);
                tableCon.appendChild(table);
            };
            var theadTh = document.createElement('th');
            theadTh.className = 'SM-table-th';
            theadTh.innerHTML = args;
            var theadTr = tableCon.getElementsByTagName('tr')[0];
            theadTr.appendChild(theadTh);
            if(sizeIndex > 0){
                //tbody中已经有尺码存在则每次添加属性要相应添加对应尺码输入框
                var tbody = tableCon.getElementsByTagName('tbody')[0],
                    trs = tbody.getElementsByTagName('tr');

                //为每行tr添加一列
                for(var m = 0,n = trs.length; m < n; m++){
                    var td = document.createElement('td');
                    td.className = 'SM-table-td';
                    td.innerHTML = '<input type="text" class="SM-table-input" />';
                    trs[m].appendChild(td);
                };
            };
            argIndex++;
            this.parentNode.getElementsByTagName('input')[0].value = '';
        };

        function addSize() {
            var specValue = tableSpec.value;
            if(specValue == '' || specValue == undefined){
                alert('请填写规格名，如“尺码”');
                return;
            };
            specVal = specValue;
            var args = this.parentNode.getElementsByTagName('input')[0].value;
            if(args == ''){
                this.parentNode.getElementsByTagName('input')[0].focus();
                alert('请填写参数，如‘S、M’');
                return;
            };
            if(tableFlag){
                //没有表格创建表格
                tableFlag = false;
                var table = document.createElement('table');
                table.className = 'SM-table';
                var thead = document.createElement('thead');
                thead.className = 'SM-table-head';
                var tbody = document.createElement('tbody');
                tbody.className = 'SM-table-body';
                var tr = document.createElement('tr');
                tr.className = 'SM-table-rows';
                var curTh = document.createElement('th');
                curTh.className = 'SM-table-th';
                curTh.innerHTML = specVal
                tr.appendChild(curTh);
                thead.appendChild(tr);
                table.appendChild(thead);
                table.appendChild(tbody);
                tableCon.appendChild(table);
            };
            var tbodyTr = document.createElement('tr'),
                tbodyTd = document.createElement('td');

            tbodyTr.className = 'SM-table-rows';
            tbodyTd.className = 'SM-table-td';
            tbodyTd.innerHTML = '<span class = "SM-table-delete" onclick = "deleteTr.call(this)">删除</span>' + args;
            tbodyTr.appendChild(tbodyTd),
                tbody = tableCon.getElementsByTagName('tbody')[0];
            for (var i = 1, j = argIndex; i <= j; i++){
                tbodyTd = document.createElement('td');
                tbodyTd.className = 'SM-table-td';
                tbodyTd.innerHTML = '<input type="text" class="SM-table-input" />';
                tbodyTr.appendChild(tbodyTd);
            };
            tbody.appendChild(tbodyTr);
            tbodyFlag = true;
            this.parentNode.getElementsByTagName('input')[0].value = '';
            sizeIndex++;
        };
    };
    function deleteTr(){
        var deleteObj = this.parentNode.parentNode,
            tableObj = document.getElementById('tableCon').getElementsByTagName('tbody')[0];
        tableObj.removeChild(deleteObj);
        sizeIndex--;
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
    window.sizeTable = sizeTable;
    window.deleteTr = deleteTr;
}());
