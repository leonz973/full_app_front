### input (输入框)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/input'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <u-input placeholder="账号" v-model="value" :type="type" :border="border" />
        <u-input placeholder="密码" v-model="value" type="password" :border="border" />
    </view>
</template>

<script>
    export default {
        data() {
            return {
                value: '',//输入框的值
                type: 'text',//模式选择,可选值为:text(默认)、select、password、textarea、 number
                border: true,//是否显示边框,默认false
            }
        },
        methods: {}
    }
</script>
```

[uview 官网文档传送门-input](https://www.uviewui.com/components/input.html)
