<!-- @format -->

<template>
    <div class="statelessNoMessage">
        <!-- 暂无数据 -->
        <p-mui-stateless-no-message :data="data">
            <!-- 插槽 -->
            <div slot="des">
                <div class="empty">暂无数据</div>
            </div>
        </p-mui-stateless-no-message>
    </div>
</template>

<script>
export default {
    // name: 'statelessNoMessage',
    data() {
        return {
            data: {
                imgSrc: require('../../../static/images/iconx.png') //传递图片路径
            }
        };
    },
    created() {},
    methods: {}
};
</script>

<style lang="less" scoped>
.statelessNoMessage {
    height: 100%;
    /deep/ .p-mui-stateless-no-message img {
        margin: 0 auto !important;
        padding: 0 !important;
    }
    .empty {
        margin-top: 20rpx;
        font-size: 33rpx;
        font-weight: 700;
        color: #999;
    }
}
</style>
