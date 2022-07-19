### badge (徽标数)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/badge'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码
```html

<template>
   <view>
	    <u-badge :is-center="isCenter" :type="type" :count="count" :is-dot="isDot" :offset="offset" :size="size"></u-badge>
    </view>
</template>

<script>
export default {
	data() {
		return {
			count: 8, //数值显示
			type: 'error',//预设的背景颜色，可选值为:error(默认)、success 、 primary、warning、info
			isDot: false,// 显示点(不展示数字，只有一个小点)
			offset: [-8, -8],//设置badge的位置偏移，格式为 [x, y]
			size: 'default',//Badge的尺寸，可选值为:default(默认)、mini(小尺寸)
			isCenter: false //组件中心点是否和父组件右上角重合，优先级比offset高，如设置，offset参数会失效
		};
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
.u-badge-wrap {
	width: 60px;
	height: 60px;
	border-radius: 6px;
	background-color: $u-light-color;
	position: relative;
	margin: auto;
}
</style>

```

[uview官网文档传送门-badge](https://www.uviewui.com/components/badge.html)