### popExplain（说明）

<div class="demo-model">
    <iframe :src="$themeConfig.url+'/views/demo/pages/popExplain'" style="border:none;width:280px;height:100%"></iframe>
</div>

#### 例子代码
```html

<template>
    <div class="pop-explain">
        <p-mui-pop-explain :data="data" @handleClose="handleClose">
            <view slot="content">
                <ul>
                    <li>
                        <p class="p1">签到</p>
                        <p class="p2">每日首次登录积1分。</p>
                    </li>
                    <li>
                        <p class="p1">巡查</p>
                        <p class="p2">每日首次登录积1分。</p>
                    </li>
                    <li>
                        <p class="p1">学法</p>
                        <p class="p2">每日首次登录积1分。</p>
                    </li>
                    <li>
                        <p class="p1">答题</p>
                        <p class="p2">每日首次登录积1分。</p>
                    </li>
                    <li>
                        <p class="p1">公开许可证信息</p>
                        <p class="p2">每日首次登录积1分。</p>
                    </li>
                    <li>
                        <p class="p1">完成学法考试</p>
                        <p class="p2">每日首次登录积1分。</p>
                    </li>
                </ul>
            </view>
        </p-mui-pop-explain>
    </div>
</template>

<script>
export default {
    name: 'popExplain',
    data() {
        return {
            data: {
                isShow: true
            }
        };
    },
    created() {},
    methods: {
        handleClose(val) {
            this.data.isShow = val;
        }
    }
};
</script>

<style lang="less" scoped>
.pop-explain {
    ul {
        li {
            margin-bottom: 18.1159rpx;
            .p1 {
                font-size: 28.9854rpx;
                color: #232323;
                padding-left: 53.1401rpx;
                background: url(../../../static/images/til-bg1.png) 30.1932rpx
                    center no-repeat;
                background-size: 6.6425rpx;
                line-height: 49.5168rpx;
            }
            .p2 {
                font-size: 27.7777rpx;
                color: #666;
                line-height: 43.4782rpx;
                padding-left: 52.5362rpx;
            }
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

| 参数名 | 简介         | 类型    | 备注              |
| ------ | ------------ | ------- | ----------------- |
| tips   | 头部信息     | String  | 默认为 '积分说明' |
| isShow | 弹框是否显示 | Boolean | 默认false         |
