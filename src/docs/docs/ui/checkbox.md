### checkbox (多选框)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/checkbox'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <u-checkbox-group :size="size" :width="width" :wrap="wrap" 
        :max="max" @change="checkboxGroupChange" :activeColor="activeColor"
        >
            <u-checkbox
                @change="checkboxChange"
                v-model="item.checked"
                v-for="(item, index) in list"
                :key="index"
                :name="item.name"
                :shape="shape"
                :disabled="item.disabled"
                >{{item.name}}</u-checkbox
            >
        </u-checkbox-group>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        name: '荔枝',
                        checked: false,//checkbox是否选中
                        disabled: false,//checkbox是否禁用,可选值为: false / true
                    },
                    {
                        name: '香蕉',
                        checked: false,
                        disabled: false,
                    },
                    {
                        name: '橙子',
                        checked: false,
                        disabled: false,
                    },
                    {
                        name: '草莓',
                        checked: false,
                        disabled: false,
                    },
                ],
                disabled: false,//是否禁用,可选值为: false / true
                checked: true,//是否选中
                shape: 'square',//CheckboxGroup的形状,可选值为:circle(默认)、square(方形)
                max: 3,//CheckboxGroup最多能选中多少个checkbox
                activeColor: '#2979ff',//选中时的颜色，应用到所有子Checkbox组件,默认#2979ff
                size: 34, //CheckboxGroup组件整体的大小，单位rpx
                wrap: false, //CheckboxGroup组件是否每个checkbox占一行,默认false
                width: 'auto',//CheckboxGroup组件的checkbox的宽度,需带单位,如50%, 150rpx, 默认auto
            }
        },
        methods: {
            // 选中某个复选框时，由checkbox时触发
            checkboxChange(e) {
                // console.log(e);
            },
            // 选中任一checkbox时，由checkbox-group触发
            checkboxGroupChange(e) {
            }
        }
    }
</script>

```

[uview 官网文档传送门-checkbox](https://www.uviewui.com/components/checkbox.html)
