
### layout (布局)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/layout'" style="border:none;width:280px;height:100%"></iframe>
</div>


```html 
<template>
    <view>
        <!-- 基本用法 通过col组件的span设置需要分栏的比例 -->
        <view class="u-demo-area">
            <u-row gutter="16">
                <u-col span="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
                <u-col span="4">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
                <u-col span="5">
                    <view class="demo-layout bg-purple-dark"></view>
                </u-col>
            </u-row>
        </view>


        <!-- 通过设置row组件的gutter参数，来指定每一栏之间的间隔(最终表现为左边内边距各为gutter/2)，默认间隔为0 -->
        <view class="u-demo-title">分栏间隔</view>
        <view class="u-demo-area">
            <u-row gutter="16">
                <u-col span="3">
                    <view class="demo-layout bg-purple">
                    </view>
                </u-col>
                <u-col span="9">
                    <view class="demo-layout bg-purple-light">
                    </view>
                </u-col>
            </u-row>
        </view>

        <!-- 通过指定col组件的offset属性可以指定分栏偏移的栏数 -->
        <view class="u-demo-title">分栏间隔</view>
        <view class="u-demo-area">
            <u-row gutter="16">
                <u-col span="3">
                    <view class="demo-layout bg-purple"></view>
                </u-col>
                <u-col span="3" offset="6">
                    <view class="demo-layout bg-purple-light"></view>
                </u-col>
            </u-row>
        </view>
    </view>
</template>
```


[uview官网文档传送门-layout](https://www.uviewui.com/components/layout.html)