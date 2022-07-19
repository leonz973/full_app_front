<!-- @format -->

<template>
    <div
        class="p-mui-wrapper"
        :style="{
            padding: padding,
            margin: margin,
            backgroundColor: boxBgColor
        }"
    >
        <!-- 标题开始 -->
        <div
            class="p-mui-wrapper-title"
            v-if="title"
            ref="title"
            :style="{ backgroundColor: titleBgColor }"
        >
            <div>{{ title }}</div>
            <slot name="title"></slot>
        </div>
        <!-- 标题结束 -->

        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'p-mui-wrapper',
    props: {
        title: {
            type: String,
            default: ''
        }, //标题
        padding: {
            type: String,
            default: '0'
        }, //整个盒子的内边距
        margin: {
            type: String,
            default: '0'
        }, //整个盒子的外边距
        titleBgColor: {
            type: String,
            default: ''
        }, //标题背景色
        boxBgColor: {
            type: String,
            default: '#fff'
        } //盒子背景色
    },
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>

<style lang="less" scoped>
.p-mui-wrapper {
    .p-mui-wrapper-title {
        // background-color: #fff;
        height: 90rpx;
        padding: 0 24rpx;
        border-bottom: 1px solid #e1e1e1;
        color: #333;
        font-size: 30rpx;
        line-height: 90rpx;
        display: flex;
        justify-content: space-between;
    }
}
</style>
