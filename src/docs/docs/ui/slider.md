### slider (滑动选择器)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/slider'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <u-slider :step="step" :height="height" :block-width="blockWidth" :active-color="activeColor" :value="30"
         :use-slot="useSlot" v-model="value" :min="min" :max="max" @end="end"  @moving="moving"
        >
            <!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
            <view class="" v-if="useSlot">
                <view class="badge-button">
                    {{value}}
                </view>
            </view>
            <!-- #endif -->
        </u-slider>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                value: 30, //滑块选择值
                useSlot: false, //是否使用slot传入自定义滑块,默认false
                setp: 1, //步长,默认1
                activeColor: '#2979ff', //底部的背景颜色
                height: 6, //滑动选择条的高度, 单位rpx, 默认6
                blockWidth: 30, //滑动按钮的宽度(高等于宽), 单位rpx, 默认30
                step: 1, //步长, 默认1
                min: 0, //可选的最小值(0-100之间), 默认0
                max: 100, //可选的最大值(0-100之间), 默认100
            }
        },
        methods: {
            end() {},
            moving() {}
        }
    }
</script>

<style scoped lang="scss">
	.badge-button {
		padding: 4rpx 6rpx;
		background-color: $u-type-error;
		color: #fff;
		border-radius: 10rpx;
		font-size: 22rpx;
		line-height: 1;
	}
</style>
```

[uview 官网文档传送门-slider](https://www.uviewui.com/components/slider.html)
