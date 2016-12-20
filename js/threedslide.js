;(function(root,factory){
	var a = factory();
	window.threedslide = function(config){
		return a(config);
	}
})(window,function(){

	var config = {
		width : 800,
		height : 350,
		spacing : 200,
		autoplay : true,
		waitingTime : 3000,
		transitionTime : 500,
		scale : 0.8,
		element : null,
		childClassName : 'threedslide',
		next : function(){

		},
		prev : function(){

		},
		firstChange : function(){

		},
		secondChange : function(){

		},
		lastChange : function(){

		}
	}
	var dataFatory = {
		now : 0
	};
	var bower = ['webkit','moz','ms','o',''];
	function extend(p,c){
		for(var i in c){
			p[i] = c[i];
		}
	}
	function hasClass(node,name){
		return new RegExp('\\b'+name+'\\b','g').test(node.className);
	}
	function  threeForEach(arr,fn){
		for(var i =0;i<arr.length;i++){
			fn(i,arr[i]);
		}
	}
	function getClass(node,name){
		if(node.getElementsByClassName){
			return node.getElementsByClassName(name);
		}else{
			var childLists = node.getElementsByTagName('*');
			var targetElements = [];
			for(var i=0;i<childLists.length;i++){
				if(hasClass(childLists[i])){
					targetElements.push(childLists[i]);
				}
			}
			return targetElements;
		}
	}
	function setFirst(){
		var node = getNode(1);
		node.style.marginTop = -config.height/2+'px';
		node.style.marginLeft = -config.width/2+'px';
		node.style.zIndex = dataFatory.nodeLists.length+1 - node.index;
		config.firstChange(node);
		threeForEach( dataFatory.nodeLists,function(k,v){
			v.home = false;
		})
		node.home = true;
		threeForEach(bower,function(k,v){
			var bowerCase = v == '' ? 'transform' : v+'Transform';
			node.style[bowerCase] = 'scale('+1+')';
		})
	}
	function setSecond(){
		var node = getNode(2);
		node.style.marginTop = -config.height/2+'px';
		node.style.marginLeft = -config.width/2+config.spacing+'px';
		node.style.zIndex = dataFatory.nodeLists.length - node.index;
		config.secondChange(node);
		threeForEach(bower,function(k,v){
			var bowerCase = v == '' ? 'transform' : v+'Transform';
			node.style[bowerCase] = 'scale('+config.scale+')';
		})
	}
	function setLast(){
		var node = getNode(3);
		node.style.marginTop = -config.height/2+'px';
		node.style.marginLeft = -config.width/2+(-config.spacing)+'px';
		node.style.zIndex = dataFatory.nodeLists.length - node.index;
		config.lastChange(node);
		threeForEach(bower,function(k,v){
			var bowerCase = v == '' ? 'transform' : v+'Transform';
			node.style[bowerCase] = 'scale('+config.scale+')';
		})
	}
	function setOthers(){
		var newArrer = [];
		threeForEach(dataFatory.nodeLists,function(k,v){
			if(v.index != dataFatory.FIRST &&v.index != dataFatory.LAST &&v .index != dataFatory.SECOND){
				newArrer.push(v);
			}
		})
		threeForEach(newArrer,function(k,v){
			v.style.marginTop = -config.height/2+'px';
			v.style.marginLeft = -config.width/2+'px';
			v.style.zIndex = 1;
			threeForEach(bower,function(key,value){
				var bowerCase = value == '' ? 'transform' : value+'Transform';
				v.style[bowerCase] = 'scale('+config.scale+')';
			})
		})
	}
	function getNode(type){
		//1,2,3,4,5,6
		var node = {};
		threeForEach(dataFatory.nodeLists,function(k,v){
			switch(v.index){
				case dataFatory.FIRST:
					node[1] = v;
					break;
				case dataFatory.SECOND:
					node[2] = v;
					break;
				case dataFatory.LAST:
					node[3] = v;
					break;
				
			}
		})
		return node[type];
	}

	function resizeNodes(){
		threeForEach(dataFatory.nodeLists,function(k,v){
			v.index = k+1;
			v.oindex = k;
			v.style.position = 'absolute';
			v.style.left = '50%';
			v.style.top = '50%';
			v.style.width = config.width+'px';
			v.style.height = config.height +'px';
			v.style.marginTop = -config.height/2+'px';
			v.style.marginLeft = -config.width/2+'px';
			threeForEach(bower,function(key,value){
				var bowerCase = value == '' ? 'transform' : value+'Transform';
				v.style[bowerCase] = 'scale('+1+')';
			})
		})
		dataFatory.FIRST = 1;
		dataFatory.SECOND = 2;
		dataFatory.LAST = dataFatory.nodeLists.length;

		dataFatory.defaultValue = [];
		for(var i=0;i<dataFatory.LAST;i++){
			dataFatory.defaultValue[i] = i+1;
		}
		doit();
	}
	function doit(){
		setFirst();
		setSecond();
		setLast();
		setOthers();
	}
	function getNumberIndexArray(type){
		var newArray = [];
		var pianYi = dataFatory.defaultValue.slice( dataFatory.defaultValue.length-type, dataFatory.defaultValue.length);
		
		threeForEach(pianYi,function(k,v){
			newArray.push(v);
		})
		threeForEach(dataFatory.defaultValue,function(k,v){
			if(newArray.length < dataFatory.defaultValue.length){
				newArray.push(v)
			}

		})
		return newArray;
	}
	function addEvent(node,type,fn){
		if(node.addEventListener){
			node.addEventListener(type,fn,false);
		}else{
			node.attachEvent('on'+type,function(){
				fn.call(node,window.event);
			})
		}
	}
	function eventSystem(obj){
		threeForEach(dataFatory.nodeLists,function(k,v){
			addEvent(v,'click',function(e){
				if(!this.home){
					if(window.event){
						e.returnValue = false;
					}else{
						e.preventDefault();
					}
					obj.moveTo(this.oindex)	
				}
				
			})
		})
		if(config.autoplay){
			setInterval(function(){
				obj.next();
			},config.waitingTime)
		}
	}
	function Factory(){

	}
	Factory.prototype.init = function(apple){
		extend(config,apple);
		dataFatory.nodeLists = getClass(config.element,config.childClassName);
		config.element.style.position = 'relative';
		resizeNodes();
		eventSystem(this);
		return this;
	}
	Factory.prototype.prev = function(){
		dataFatory.now ++;
		if(dataFatory.now > dataFatory.nodeLists.length-1){
			dataFatory.now = 0;
		}
		config.prev(dataFatory.now,dataFatory.nodeLists);
		var nowsGroup = getNumberIndexArray(dataFatory.now);
		threeForEach(dataFatory.nodeLists,function(k,v){
			v.index = nowsGroup[k];
		})
		doit();
	}
	Factory.prototype.next = function(){
		dataFatory.now --;
		if(dataFatory.now < 0){
			dataFatory.now = dataFatory.nodeLists.length-1;
		}
		config.next(dataFatory.now,dataFatory.nodeLists);
		var nowsGroup = getNumberIndexArray(dataFatory.now);
		threeForEach(dataFatory.nodeLists,function(k,v){
			v.index = nowsGroup[k];
		})
		doit();
	}
	Factory.prototype.moveTo = function(index){

		if(index>=0&&index<=dataFatory.nodeLists.length-1){
			dataFatory.now= index;

			var nowsGroup = getNumberIndexArray(dataFatory.now);
			threeForEach(dataFatory.nodeLists,function(k,v){
				v.index = nowsGroup[k];
			})
			doit();
		}
		
	}
	return function(config){
		return new Factory().init(config);
	}
})
