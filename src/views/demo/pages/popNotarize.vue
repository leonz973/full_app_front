<!-- @format -->

<template>
    <div class="pop-notarize">
        <p-mui-pop-notarize :data="data" @handleClick="handleClick">
            <view slot="content">
                <ul>
                    <li>
                        <p class="p1">单位名称：</p>
                        <p class="p2">江阴品盛塑胶厂</p>
                    </li>
                    <li>
                        <p class="p1">注册地址：</p>
                        <p class="p2">江阴市顾山镇顾北村（工业集中区）</p>
                    </li>
                    <li>
                        <p class="p1">邮政编码：</p>
                        <p class="p2">214414</p>
                    </li>
                    <li>
                        <p class="p1">行业类别：</p>
                        <p class="p2">铝压延加工</p>
                    </li>
                    <li>
                        <p class="p1">法定代表人：</p>
                        <p class="p2">张顺发</p>
                    </li>
                    <li>
                        <p class="p1">法人联系电话：</p>
                        <p class="p2">13382845678</p>
                    </li>
                    <li>
                        <p class="p1">技术负责人：</p>
                        <p class="p2">吴锡兴</p>
                    </li>
                    <li>
                        <p class="p1">负责人联系电话：</p>
                        <p class="p2">13382845678</p>
                    </li>
                </ul>
            </view>
        </p-mui-pop-notarize>
    </div>
</template>

<script>
export default {
    name: 'popNotarize',
    data() {
        return {
            data: {
                isShow: true
            }
        };
    },
    created() {},
    methods: {
        handleClick(val) {
            this.data.isShow = val;
        }
    }
};
</script>

<style lang="less" scoped>
.pop-notarize {
    ul {
        li {
            display: flex;
            padding-left: 33.2125rpx;
            padding-right: 24.1545rpx;
            justify-content: space-between;
            .p1 {
                font-size: 26.57rpx;
                color: #666;
                line-height: 72.4638rpx;
            }
            .p2 {
                font-size: 26.57rpx;
                color: #333;
                line-height: 72.4638rpx;
            }
        }
    }
}
</style>
