<!-- @format -->

<!-- 暂无数据 -->
<template>
    <div class="p-mui-stateless-no-message">
        <div class="p-mui-stateless-no-message-main">
            <!-- <img :src="require(`${mData.imgSrc}`)" :style="{width:mData.width+'rpx'}" /> -->
            <img :src="mData.imgSrc" :style="{ width: mData.width + 'rpx' }" />
            <slot name="des"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'p-mui-stateless-no-message',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    imgSrc: require('./image/nodata.png'), //图片
                    width: 440 //图片宽,单位为rpx
                };
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        mData() {
            return Object.assign(
                {
                    imgSrc: require('./image/nodata.png'), //图片
                    width: 440 //图片宽
                },
                this.data
            );
        }
    },
    created() {},
    methods: {}
};
</script>

<style lang="less" scoped>
.p-mui-stateless-no-message {
    height: 100%;
    box-sizing: border-box;
    .p-mui-stateless-no-message-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        img {
            display: block;
            width: 50%;
            height: 300rpx;
            padding: 120rpx 0;
            margin: auto;
        }
    }
}
</style>
