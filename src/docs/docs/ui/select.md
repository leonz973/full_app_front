### select (列选择器)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/select'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
  <view>
    <u-select @click="show = true" :default-value="defaultValue" :mode="mode" v-model="show" :list="list" @confirm="confirm" @cancel="cancel" >
        
    </u-select>
  </view>
</template>

<script>
    export default {
        data() {
        return {
            show: false, //布尔值变量，用于控制选择器的弹出与收起, 默认false
            defaultValue: [3], //提供的默认选中的下标,数组的长度,必须与列数相同，否则无效 (从0开始)
            mode: 'single-column', //模式选择 可选值为：single-column(默认，单列模式), mutil-column(多列模式), mutil-column-auto(多列联动模式)
            list: [],
            list1: [  //单列模式
                {
                    value: '江',
                    label: '江',
                },
                {
                    value: '湖',
                    label: '湖',
                },
                {
                    value: '夜',
                    label: '夜',
                },
                {
                    value: '雨',
                    label: '雨',
                },
                {
                    value: '十',
                    label: '十',
                },
                {
                    value: '年',
                    label: '年',
                },
                {
                    value: '灯',
                    label: '灯',
                },
            ],
            list2: [ //多列模式
                [
                    {
                        value: '昔',
                        label: '昔',
                    },
                    {
                        value: '去',
                        label: '去',
                    },
                    {
                        value: '雪',
                        label: '雪',
                    },
                    {
                        value: '如',
                        label: '如',
                    },
                    {
                        value: '花',
                        label: '花',
                    },
                ],
                [
                    {
                        value: '今',
                        label: '今',
                    },
                    {
                        value: '来',
                        label: '来',
                    },
                    {
                        value: '花',
                        label: '花',
                    },
                    {
                        value: '似',
                        label: '似',
                    },
                    {
                        value: '雪',
                        label: '雪',
                    },
                ],
            ],
            list3: [ //多列联动模式
                {
                    label: '中国',
                    value: '1',
                    children: [
                        {
                            label: '广西',
                            value: '2',
                            children: [
                                {
                                    label: '南宁',
                                    value: '3',
                                },
                                {
                                    label: '梧州',
                                    value: '3',
                                },
                                {
                                    label: '柳州',
                                    value: '3',
                                },
                            ],
                        },
                        {
                            label: '广东',
                            value: '2',
                            children: [
                                {
                                    label: '深圳',
                                    value: '3',
                                },
                                {
                                    label: '惠州',
                                    value: '3',
                                },
                                {
                                    label: '清远',
                                    value: '3',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: '美国',
                    value: '1',
                    children: [
                        {
                            label: '纽约',
                            value: '2',
                            children: [
                                {
                                    label: '皇后街道',
                                    value: '3',
                                },
                                ],
                            },
                        ],
                    },
                ],
            }
        },
        methods: {
            confirm(e) {},
            cancel(e) {},
        },
    }
</script>
```

[uview 官网文档传送门-select](https://www.uviewui.com/components/select.html)
