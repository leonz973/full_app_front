### switch (开关选择器)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/switch'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <!-- activeValue:打开选择器时通过change事件发出的值  默认true-->
        <!-- inactiveValue:关闭选择器时通过change事件发出的值 默认false -->
        <u-switch  v-model="checked" :loading="loading" :size="size" @change="change" :active-color="activeColor" :disabled="disabled"
         :activeValue="100" :inactiveValue="1"
        ></u-switch>
    </view>
</template>

<script>
    export default {
        data() {
        return {
            checked: false, //组件状态,是否被打开,默认false
            activeColor: '#2979ff', //打开时的背景色,默认#2979ff
            size: 50, //开关尺寸, 单位rpx, 默认50
            loading: false, //是否处于加载中, 默认false
            disabled: false, //是否禁用, 默认false
        }
        },
        methods: {
        change(value) {
            // console.log(value);
        },
        },
    }
</script>
```

[uview 官网文档传送门-switch](https://www.uviewui.com/components/switch.html)
