### popReason（填写意见）

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/popReason'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <div class="pop-reason">
        <p-mui-pop-reason
            :data="data"
            @handleSubmit="handleSubmit"
        ></p-mui-pop-reason>
    </div>
</template>

<script>
export default {
    name: 'popReason',
    data() {
        return {
            reasonMsg: '', //输入的原因
            data: {
                reasonTitle: '反馈意见：误报', //弹框标题
                mainTitle: '误报原因', //原因标题
                placeholder: '请填写误报原因', //文本框提示文字
                isPopShow: true //弹框是否显示
            }
        };
    },
    created() {},
    methods: {
        handleSubmit(val) {
            // 输入的原因
            this.reasonMsg = val;
            // 弹框关闭
            this.data.isPopShow = false;
        }
    }
};
</script>
```


### props 参数
| 参数名 | 简介 | 类型   |
| ------ | ---- | ------ |
| data   | 数据 | Object |

#### data

| 参数名      | 简介           | 类型    | 备注                  |
| ----------- | -------------- | ------- | --------------------- |
| reasonTitle | 弹框标题       | String  | 默认 '反馈意见：误报' |
| mainTitle   | 原因标题       | String  | 默认 '误报原因'       |
| placeholder | 文本框提示文字 | String  | 默认 '请填写误报原因' |
| isPopShow   | 弹框是否显示   | Boolean | 默认false             |
