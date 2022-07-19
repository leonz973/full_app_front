### upload (上传)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/upload'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <!-- 基本用法 -->
        <u-upload :action="action" :file-list="fileList" ></u-upload>
         <!-- 例子用法 -->
        <u-upload  @on-choose-fail="onChooseFail" :before-remove="beforeRemove" ref="uUpload" :custom-btn="customBtn"
        :show-upload-list="showUploadList" :action="action" :auto-upload="autoUpload" :file-list="fileList" 
        :show-progress="showProgress" :deletable="deletable" :max-count="maxCount"  @on-list-change="onListChange" >
            <view
                v-if="customBtn"
                slot="addBtn"
                class="slot-btn"
                hover-class="slot-btn__hover"
                hover-stay-time="150"
            >
                <u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
            </view>
        </u-upload>
        <u-button :custom-style="{marginTop: '20rpx',height:'80rpx'}" @click="upload">上传</u-button>
        <u-button :custom-style="{marginTop: '40rpx',height:'80rpx'}" @click="clear">清空列表</u-button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                action: 'http://127.0.0.1:7001/upload', //服务器上传地址,默认空
                fileList: [], //默认显示的图片列表，数组元素为对象，必须提供url属性
                // fileList: [{
                // 	url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
                // 	error: false,
                // 	progress: 100
                // }],
                showUploadList: true, //是否显示组件内部的图片预览,默认true
                customBtn: false, //自定义选择图片的按钮,默认false
                autoUpload: false, //选择完图片是否自动上传,默认true
                showProgress: true, //是否显示进度条, 默认true
                deletable: true, //是否显示删除图片的按钮, 默认true
                maxCount: 2, //最大选择图片的数量, 默认99
            }
        },
        methods: {
            // 当内部文件列表被加入文件、移除文件，或手动调用clear方法时触发
            onListChange(lists) {},

            // 手动移除列表的某一个图片
            beforeRemove(index, lists) {
                return true
            },

            // 选择文件出错时触发，比如选择文件时取消了操作，只在微信和APP有效
            onChooseFail(e) {
                // console.log(e);
            },

            // 上传按钮点击
            upload() {
			},

            // 清空按钮点击
            clear() {
			},
        }
    }
</script>
```

[uview 官网文档传送门-upload](https://www.uviewui.com/components/upload.html)
