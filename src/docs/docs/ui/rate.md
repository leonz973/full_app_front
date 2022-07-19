### rate (评分)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/rate'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <u-rate v-model="value" :count="count" @change="change" :active-color="activeColor" :inaction-color="inactiveColor" 
        :active-icon="activeIcon" :inactive-icon="inactiveIcon" :disabled="disabled" :colors="colors" :icons="icons">

        </u-rate>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 1.4.5后推荐使用v-model双向绑定，弃用current
				// current: 1,
				activeColor: '#FA3534',//选中的星星颜色, 默认#FA3534
				inactiveColor: '#b2b2b2',//未选中星星的颜色, 默认#b2b2b2
				disabled: false,// 是否禁止用户操作, 默认false
				count: 5,//最多可选的星星数量, 默认5
				value: 0, //选择星星的数量
				colors: [],//颜色分级显示，可以用不同颜色区分评分层级
				icons: [] //图标分级显示，可以用不同类型的icon区分评分层级
            }
        },
        methods: {
            change(val) {
				// console.log(val);
			}
        }
    }
</script>
```

[uview 官网文档传送门-rate](https://www.uviewui.com/components/rate.html)
