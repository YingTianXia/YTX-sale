function type(){
	var C_idx = 1,
		cateCon = document.getElementById('cateCon');

	/*addListener(C_addNewType, 'click', addNewType);
	 addListener(C_addNewCate, 'click', addNewCate);
	 //监听删除事件
	 addListener(C_list, 'click', removeAttr);*/

	addListener(cateCon, 'click', cateHandler);

	function cateHandler(e){
		e = e || window.event;
		obj = e.srcElement || e.target;
		switch (obj.className){
			case 'category-attr-delete':
				//删除小类
				removeAttr();
				break;
			case 'category-action-addNew':
				//新增小类
				addNewType();
				break;
			case 'category-action-addNewType':
				//新增大类
				addNewCate();
				break;
			default:
				return;
		}
	}
	function removeAttr(e) {
		var deleteEle = obj.parentNode;
		deleteEle.parentNode.removeChild(deleteEle);
	};
	function addNewCate() {
		C_idx++;
		var val = oninput(C_idx);
		if(val == undefined){
			return;
		};
		//创建新的类目
		var div = document.createElement('div');
		div.className = 'category-item';
		div.innerHTML = '<p class="category-item-title">'+ val +'级类目</p><div class="category-attr-list-con"><ul class="category-attr-list"></ul></div><div class="category-action"><span class="category-action-addNew">新增</span><span class="category-action-addNewType">新增下一级</span></div>';
		cateCon.appendChild(div);
		//删除上一级目录中的添加大类按钮
		obj.parentNode.removeChild(obj);
	};
	function addNewType() {
		var outer = obj.parentNode.parentNode,
			parent = outer.getElementsByTagName('div')[0];
		attrlist = parent.getElementsByTagName('ul')[0];
		if(outer.parentNode.getElementsByTagName('input')[0]){
			var deleteEle = outer.parentNode.getElementsByTagName('input')[0].parentNode;
			deleteEle.parentNode.removeChild(deleteEle);
		};
		var div = document.createElement('div');
		div.className = 'category-add-con';
		var inputcon = document.createElement('input');
		inputcon.className = 'category-attr-input';
		var b = document.createElement('b');
		b.className = 'category-attr-add';
		b.innerHTML = '确定';
		div.appendChild(inputcon);
		div.appendChild(b);
		parent.appendChild(div);

		addListener(b, 'click', addNewHandler);

		function addNewHandler(){
			var newAttr = this.parentNode.getElementsByTagName('input')[0].value;
			if(newAttr == '' || newAttr == undefined){
				alert('请输入类目再添加');
				return;
			};
			//删除输入框
			parent.removeChild(this.parentNode);
			//添加属性
			var licon = document.createElement('li');
			licon.className = 'category-attr-item';
			var span = document.createElement('span');
			span.innerHTML = newAttr;
			span.className = 'category-attr-name';
			var a = document.createElement('a');
			a.innerHTML = '删除';
			a.className = 'category-attr-delete';
			licon.appendChild(span);
			licon.appendChild(a);
			attrlist.appendChild(licon);
		};
	};
	function oninput(num) {
		switch (num){
			case 1:
				return '一';
			case 2:
				return '二';
			case 3:
				return '三';
			case 4:
				return '四';
			case 5:
				return '五';
			case 6:
				return '六';
			default:
				alert('类目不能超过7个');
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

};
