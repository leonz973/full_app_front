### modal (模态框)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/modal'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <!-- 基本用法 -->
        <u-modal v-model="show" :content="content"></u-modal>
         <!-- 例子用法 -->
        <u-modal ref="uModal" v-model="show" :show-cancel-button="true" width="600" :show-title="showTitle"
        :async-close="asyncClose"  @confirm="confirm" :content="content" >
            <!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
            <view class="warp" style="margin: 30rpx;" v-if="contentSlot">
                <image
                class="logo"
                src="https://uviewui.com/common/logo.png"
                style="width: 220rpx;"
                mode="widthFix"
                ></image>
            </view>
            <!-- #endif -->
        </u-modal>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                show: false, //是否显示模态框, 默认false
                content: '慈母手中线，游子身上衣',//模态框内容，如传入slot内容，则此参数无效
                contentSlot: false,// 是否显示自定义内容
                showTitle: true, //是否显示标题, 默认true
                asyncClose: false,//是否异步关闭，只对确定按钮有效, 默认false
            }
        },
        methods: {
            confirm() {
                // setTimeout(() => {
                // 	this.show = false;
                // }, 2000)
            }
        }
    }
</script>
```

[uview 官网文档传送门-modal](https://www.uviewui.com/components/modal.html)