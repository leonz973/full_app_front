### icon (图标)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/icon'" style="border:none;width:280px;height:100%"></iframe>
</div>


```html 
<template>
    <view>
        <!-- 通过<u-icon>形式来调用，设置name参数为图标名即可 -->
        <u-icon name="level"></u-icon>  
        <!-- 通过color参数修改图标的颜色
        通过size参数修改图标的大小，单位为rpx -->
        <u-icon name="photo" color="#2979ff" size="28"></u-icon>
    </view>
</template>
```


[uview官网文档传送门-icon](https://www.uviewui.com/components/icon.html)