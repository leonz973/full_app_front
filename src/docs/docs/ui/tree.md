###  树形

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/tree'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码

```html
<template>
    <view class="main">
		<p-mui-tree :tree-data="treeData" :show-checkbox="true" node-key="id" :checkStrictly="false" @check="checkChange"></p-mui-tree>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                treeData: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 11,
                        label: '二级 1-1',
                        children: [{
                            id: 111,
                            label: '三级 1-1-1',
                            disabled: true
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 21,
                        label: '二级 2-1',
                        children: [{
                            id: 211,
                            label: '三级 2-1-1'
                        }]
                    }, {
                        id: 22,
                        label: '二级 2-2',
                        children: [{
                            id: 221,
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 31,
                        label: '二级 3-1',
                        children: [{
                            id: 311,
                            label: '三级 3-1-1'
                        }]
                    }, {
                        id: 32,
                        label: '二级 3-2',
                        children: [{
                            id: 321,
                            label: '三级 3-2-1'
                        }]
                    }]
                }]
            }
        },
        methods: {
            checkChange(obj){
                // console.log(obj)
            }
        }
    }
</script>
```
