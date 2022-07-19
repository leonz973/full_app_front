### 按钮（button）

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/button'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码
```html
<template>
   <view>
	    <!-- 常用例子 -->
	    <u-button type="primary" shape='square'>按钮</u-button>
		<!-- 演示例子 -->
        <u-button @click="btnClick" :loading="loading" :plain="plain" :shape="shape"
					:size="size" :ripple="ripple" :hairLine="hairLine" :type="type">山川异域，风月同天</u-button>
    </view>
</template>


<script>
    export default {
		data() {
			return {
				hairLine: true,
				type: 'default', // type值可选的有default(默认)、primary、success、info、warning、error
				size: 'default', // button组件的size（可选值为default(默认)，mini(小尺寸)和medium(中等尺寸)）
				shape: 'square', // shape默认值为square(按钮为圆角矩形)，设置为circle，则按钮两边为半圆形
				plain: false, // 镂空状态按钮背景为白色，边框和文字同色，通过plain来设置
				ripple: false,  // 该效果通过给按钮绝对定位形式覆盖一个view，点击时改变view的scale，opacity样式属性，形成扩散再消失的水波纹效果
				loading: false,  // 是否加载中
			}
		},
        methods: {
            btnClick(){

            }
        }
    }    
</script>

```


[uview官网文档传送门-button](https://www.uviewui.com/components/button.html)

