<!-- @format -->

<template>
    <view class="p-mui-card">
        <view class="p-mui-card-title">
            <slot name="title"></slot>
        </view>
        <view class="p-mui-card-body">
            <slot name="body"></slot>
        </view>
    </view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.p-mui-card {
    background: #fff;
    margin: 0 18rpx;
    border-radius: 12rpx;
    padding: 0 18rpx;
    margin-bottom: 20rpx;

    .p-mui-card-title {
        height: 92rpx;
        line-height: 92rpx;
        border-bottom: 1px solid #ededed;

        ::v-deep view {
            line-height: 92rpx;
            font-size: 32rpx;
        }

        ::v-deep .p-mui-card-title-icon,
        ::v-deep u-icon {
            float: right;
            height: 92rpx;
            color: #999;
            font-size: 28rpx;
        }
    }

    .p-mui-card-body {
        padding: 18rpx 0;
        font-size: 30rpx;
        color: #2c323f;
        line-height: 1.5;

        ::v-deep view {
            font-size: 30rpx;
        }
    }
}
</style>
