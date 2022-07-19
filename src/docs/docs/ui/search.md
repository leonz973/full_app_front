### search（搜索）

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/search'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码
```html
<template>
   <view>
	    <u-search v-model="value" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled" 
				:show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
    </view>
</template>


<script>
    export default {
		data() {
			return {
				value: '',//输入框搜索值
				shape: 'round',//搜索框形状,可选值为:round(默认，圆形)、square(方形)
				clearabled: true,//是否启用清除控件,默认true
				showAction: true,//是否显示右侧控件(右侧的"搜索"按钮),默认true
				inputAlign: 'left' //输入框内容水平对齐方式,可选值为:left(默认)、center 、right
			}
		},
        methods: {
            change(value) {
				// 搜索框内容变化时，会触发此事件，value值为输入框的内容
				//console.log(value);
			},
			custom(value) {
                // 用户点击右侧控件时触发
				//console.log(value);
			},
			search(value) {
                // 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发
			},
			clear() {
                // 配置了clearabled后，清空内容时会发出此事件
			}
        }
    }    
</script>

```


[uview官网文档传送门-search](https://www.uviewui.com/components/search.html)

