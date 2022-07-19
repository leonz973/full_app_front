### tag (标签)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/tag'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码
```html

<template>
   <view>
		<u-tag :text="text" :type="type" :shape="shape" :closeable="closeable" :mode="mode"
         @close="close" @click="click" :show="show" :size="size" />
    </view>
</template>

<script>
export default {
	data() {
		return {
			text: '蒹葭苍苍',//标签的文字内容
			mode: 'light',//模式选择,可选值为:light(默认)、dark、 plain
			type: 'error',//主题类型,可选值为:primary(默认)、success、info、warning、error
			size: 'default',//标签大小,可选值为:default(默认)、mini(小尺寸)
			shape: 'square',//标签形状,可选值为:square(默认)、circle 、circleLeft 、circleRight
			closeable: true,//是否可关闭，设置为true，文字右边会出现一个关闭图标
			show: true //标签显示与否
		};
	},
	methods: {
		
		click(index) {

		},
		close(index) {

		}
	}
};
</script>

<style lang="scss" scoped>
.u-demo {
}
</style>

```

[uview官网文档传送门-tag](https://www.uviewui.com/components/tag.html)