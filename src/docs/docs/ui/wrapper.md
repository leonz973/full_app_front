### wrapper

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/wrapper'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <p-mui-wrapper :title="'wrapper'">
            <div slot="title" class="time">
                <div>xxxx-xx-xx</div>
            </div>
            <div style="width:100%;height:200px"></div>
        </p-mui-wrapper>
    </view>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {},
    }
</script>
<style lang="less" scoped>

</style>
```

### props 参数

| 参数名       | 简介             | 类型   | 备注                                                            |
| ------------ | ---------------- | ------ | --------------------------------------------------------------- |
| title        | 标题名           | String | 默认为空,不传就不显示                                           |
| padding      | 整个盒子的内边距 | String | 默认为0，格式和css一样，例如：'20px'、'0 20px'、'0 20px 0 10px' |
| margin       | 整个盒子的外边距 | String | 默认为0，格式和css一样，例如：'20px'、'0 20px'、'0 20px 0 10px' |
| titleBgColor | 标题背景色       | String | 默认为空                                                        |
| boxBgColor   | 盒子背景色       | String | 默认为'#fff'                                                    |

### slot 插槽

| 插槽名 | 简介               |
| ------ | ------------------ |
| title  | 标题部分的具名插槽 |
