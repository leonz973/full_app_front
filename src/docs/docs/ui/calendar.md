### calendar (输入框)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/calendar'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <u-calendar  v-model="show" ref="calendar" @change="change" :mode="mode" :start-text="startText" :end-text="endText" 
        :range-color="rangeColor" :range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType" >
        </u-calendar>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                show: false, //控制日历的弹出与收起, 默认false
                mode: 'range', //选择日期的模式,date-为单个日期(默认),range-为选择日期范围, 
                startText: '开始', //起始日期底部的提示文字, 默认为 开始
                endText: '结束',//结束日期底部的提示文字, 默认为 结束
                rangeColor: '#2979ff', //选择范围内字体颜色, 默认#2979ff
                rangeBgColor: 'rgba(41,121,255,0.13)', //起始/结束日期之间的区域的背景颜色, 默认rgba(41,121,255,0.13)
                activeBgColor: '#2979ff',//起始/结束日期按钮的背景色, 默认#2979ff
                btnType: 'primary', //底部确定按钮的主题, 可选值为: primary(默认)、default、success、info、 warning、error
            }
        },
        methods: {
            change(e) {}
        }
    }
</script>
```

[uview 官网文档传送门-calendar](https://www.uviewui.com/components/calendar.html)
