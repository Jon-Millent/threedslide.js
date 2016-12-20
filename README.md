# threedslide.js
**一个3d图片轮播插件（A 3D image carousel plugin）演示http://www.thisummer.top/children/threedslide/**
# 如何开始
## 引入JS文件
```javascript
<script type="text/javascript" src="./js/threedslide.js"></script>
```
## Dom结构规范
```html
  <!--这里的class名字统一为 threedslide ，也可以在通过js自定义class-->
  <ul id="box">
	<li class="threedslide"><a href="https://www.baidu.com"><img src="images/1.jpg"></a></li>
	<li class="threedslide"><a href="https://www.baidu.com"><img src="images/2.jpg"></a></li>
	<li class="threedslide"><a href="https://www.baidu.com"><img src="images/3.jpg"></a></li>
	<li class="threedslide"><a href="https://www.baidu.com"><img src="images/4.jpg"></a></li>
	<li class="threedslide"><a href="https://www.baidu.com"><img src="images/5.jpg"></a></li>
  </ul>
```

## 样式规范
```css
li{
	list-style: none;
}
#box{
	width: 1000px; /*通过这里定义你的父级元素的大小样式*/
	height: 500px;
	margin: 20px auto;
}
#box img{
	width: 100%; /*你必须让你的图片大小都为100%*/
	height: 100%;
}
#box li{ /* 定义过渡动画 */
	-webkit-transition: all 1s ease;
	-moz-transition: all 1s ease;
	-ms-transition: all 1s ease;
	-o-transition: all 1s ease;
	transition: all 1s ease;
}
```
## javascript使用
**通过下面的代码执行插件，配置项后面会详细说明**
```
var box = document.getElementById('box');
var a = new threedslide({
	element : box
})
```
**参数配置项**

```javascript
{
	width : 800, //子元素的宽度
	height : 350, //子元素的高度
	spacing : 200, //子元素之间的间距
	autoplay : true, //是否自动播放
	waitingTime : 3000, //自动播放等待间隔时间
	scale : 0.8,//子元素缩放比
	element : null,//指定父元素
	childClassName : 'threedslide', //子元素的className
	next : function(){ //当下一个的时候执行 参数[index|elements]

	},
	prev : function(){ //当上一个的时候执行参数[index|elements]

	},
	firstChange : function(){ //当第一屏变化的时候 参数[elements]

	},
	secondChange : function(){ //当第二屏变化的时候 参数[elements]

	},
	lastChange : function(){ //当第三屏变化的时候 参数[elements]

	}
}
```
[img](https://github.com/Jon-Millent/threedslide.js/blob/master/images/box.png?raw=true)
