### popCommit（提交成功）

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/popCommit'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <div class="pop-commit">
        <p-mui-pop-commit :data="data">
            <!-- 插槽 -->
            <div slot="des">
                <div class="des-box">
                    <p>提交成功!</p>
                    <u-button type="primary" @click="handleClick" size="medium"
                        >确定</u-button
                    >
                </div>
            </div>
        </p-mui-pop-commit>
    </div>
</template>

<script>
export default {
    name: 'popCommit',
    data() {
        return {
            data: {
                isShow: true
            }
        };
    },
    created() {},
    methods: {
        handleClick() {
            this.data.isShow = false;
        }
    }
};
</script>

<style lang="less" scoped>
.pop-commit {
    .des-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            font-size: 32rpx;
            color: #333;
            font-weight: 700;
            margin-bottom: 20rpx;
        }
    }
}
</style>
```

### props 参数
| 参数名 | 简介 | 类型   |
| ------ | ---- | ------ |
| data   | 数据 | Object |

#### data

| 参数名 | 简介         | 类型    | 备注      |
| ------ | ------------ | ------- | --------- |
| srcImg | 传递图片路径 | Any     |           |
| isShow | 弹框是否显示 | Boolean | 默认false |
