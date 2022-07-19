### utable (表格)

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/utable'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view>
        <u-table :align="align" :borderColor="borderColor">
            <u-tr class="u-tr">
                <u-th class="u-th">姓名</u-th>
                <u-th class="u-th">年龄</u-th>
                <u-th class="u-th">籍贯</u-th>
                <u-th class="u-th">性别</u-th>
            </u-tr>
            <u-tr class="u-tr">
                <u-td class="u-td">吕布</u-td>
                <u-td class="u-td">22</u-td>
                <u-td class="u-td">楚河</u-td>
                <u-td class="u-td">男</u-td>
            </u-tr>
            <u-tr class="u-tr">
                <u-td class="u-td">项羽</u-td>
                <u-td class="u-td">28</u-td>
                <u-td class="u-td">汉界</u-td>
                <u-td class="u-td">男</u-td>
            </u-tr>
            <u-tr class="u-tr">
                <u-td class="u-td">木兰</u-td>
                <u-td class="u-td">24</u-td>
                <u-td class="u-td">南国</u-td>
                <u-td class="u-td">女</u-td>
            </u-tr>
        </u-table>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                borderColor: '#e4e7ed', //表格边框的颜色, 默认#e4e7ed
                align: 'center',//单元格的内容对齐方式，作用类似css的text-align, 可选值为: center(默认)、left、right
            }
        },
        methods: {}
    }
</script>
```

[uview 官网文档传送门-utable](https://www.uviewui.com/components/table.html)

