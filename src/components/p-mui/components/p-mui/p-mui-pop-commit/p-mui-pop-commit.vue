<!-- @format -->

<!-- 提交成功提示 -->
<template>
    <div class="p-mui-pop-commit" v-if="mData.isShow">
        <!-- 遮罩层 -->
        <div class="p-mui-pop-commit-mask">
            <!-- 弹框 -->
            <div
                class="p-mui-pop-commit-box"
                :style="{
                    background: 'url(' + mData.srcImg + ')',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat'
                }"
            >
                <slot name="des"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'p-mui-pop-commit',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    srcImg: require('./image/commit-success.png'),
                    isShow: false //弹框是否显示
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
                    srcImg: require('./image/commit-success.png'),
                    isShow: false //弹框是否显示
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
.p-mui-pop-commit {
    height: 100%;
    .p-mui-pop-commit-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.5);

        .p-mui-pop-commit-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 480rpx;
            height: 460rpx;
            // background-repeat: no-repeat;
            // background-size: 100%;
            padding-top: 240rpx;
            box-sizing: border-box;
        }
    }
}
</style>
