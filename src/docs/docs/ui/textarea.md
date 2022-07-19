### textarea (输入框)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/textarea'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <u-input v-model="value" :type="type" :border="border" :height="height" :auto-height="autoHeight" />
    </view>
</template>

<script>
    export default {
        data() {
            return {
                value: '',//输入框的值
				type: 'textarea',//模式选择,可选值为:text(默认)、select、password、textarea、 number
				border: true,//是否显示边框,默认false
				height: 100,//高度，单位rpx,默认100, text类型时为70，textarea时为100
				autoHeight: true,//是否自动增高输入区域，type为textarea时有效,默认true
            }
        },
        methods: {},
    }
</script>
```

[uview 官网文档传送门-textarea](https://www.uviewui.com/components/textarea.html)
