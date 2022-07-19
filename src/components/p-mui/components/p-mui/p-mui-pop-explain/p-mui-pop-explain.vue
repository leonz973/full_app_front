<!-- @format -->
<!-- 说明弹窗 -->

<template>
    <div class="p-mui-pop-explain">
        <div class="zy-alert jifen-alert" v-if="mData.isShow">
            <div class="wrapper">
                <p class="til">{{ mData.tips }}</p>
                <i class="close" @click="handleClose"></i>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'p-mui-pop-explain',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    tips: '积分说明', //头部信息
                    isShow: false
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
                    tips: '积分说明', //头部信息
                    isShow: false
                },
                this.data
            );
        }
    },
    created() {},
    methods: {
        handleClose() {
            this.$emit('handleClose', false);
        }
    }
};
</script>

<style lang="less" scoped>
.p-mui-pop-explain {
    .zy-alert {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.5);
        .wrapper {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            overflow: auto;
        }
    }

    .jifen-alert {
        .wrapper {
            width: 657.6086rpx;
            height: 807.3671rpx;
            box-shadow: 0 0 3.0193rpx 0 rgba(0, 0, 0, 0.1);
            background-color: #fff;
            border-radius: 12.0773rpx;
            background: linear-gradient(#d1ebff, #fff 15%);
            .til {
                font-size: 31.401rpx;
                color: #5fb9fd;
                height: 108.6956rpx;
                line-height: 114.7343rpx;
                text-align: center;
                background: url(./image/jifen-til-bg.png) center 48.3091rpx
                    no-repeat;
                background-size: 189.6134rpx;
            }

            .close {
                position: absolute;
                top: 45.8937rpx;
                right: 30.1932rpx;
                width: 24.7584rpx;
                height: 24.7584rpx;
                background: url(./image/close-i1.png) no-repeat;
                background-size: 24.7584rpx;
            }
        }
    }
}
</style>
