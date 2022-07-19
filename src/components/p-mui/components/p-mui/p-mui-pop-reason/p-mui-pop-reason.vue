<!-- @format -->

<template>
    <div class="p-mui-pop-reason">
        <!-- 遮罩层 -->
        <div class="p-mui-pop-reason-mask" v-if="mData.isPopShow">
            <!-- 弹框 -->
            <div class="p-mui-pop-reason-box">
                <!-- 弹框标题 -->
                <div
                    class="p-mui-pop-reason-title"
                    :style="{
                        background: 'url(' + srcImg + ')',
                        backgroundSize: '100%',
                        backgroundRepeat: 'no-repeat'
                    }"
                >
                    {{ mData.reasonTitle }}
                </div>

                <!-- 主体内容 -->
                <div class="p-mui-pop-reason-main">
                    <!-- 输入框标题 -->
                    <div class="main-title"><i>*</i>{{ mData.mainTitle }}</div>

                    <!-- 输入框 -->
                    <div class="main-box">
                        <u-input
                            class="input-box"
                            v-model="reasonMsg"
                            type="textarea"
                            :placeholder="mData.placeholder"
                            border-color="#F2F2F2"
                            :custom-style="{
                                'background-color': '#F2F2F2',
                                padding: '4px 7px !important'
                            }"
                            height="150"
                            :clearable="false"
                        />
                        <p class="reason-tips" v-show="isShowT">
                            {{ requiredMsg }}
                        </p>
                    </div>

                    <!-- 按钮 -->
                    <div class="button-box">
                        <u-button
                            type="primary"
                            size="medium"
                            @click="handleSubmit"
                            >提交</u-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'p-mui-pop-reason',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    reasonTitle: '反馈意见：误报', //弹框标题
                    mainTitle: '误报原因', //原因标题
                    placeholder: '请填写误报原因', //文本框提示文字
                    isPopShow: false //弹框是否显示
                };
            }
        }
    },
    data() {
        return {
            srcImg: require('./image/reason.png'),
            reasonMsg: '', //输入的原因
            requiredMsg: '', //必填提示
            isShow: false // 计算属性是否生效
        };
    },
    computed: {
        mData() {
            return Object.assign(
                {
                    reasonTitle: '反馈意见：误报', //弹框标题
                    mainTitle: '误报原因', //原因标题
                    placeholder: '请填写误报原因', //文本框提示文字
                    isPopShow: true //弹框是否显示
                },
                this.data
            );
        },
        // 必填提示是否显示
        // eslint-disable-next-line vue/return-in-computed-property
        isShowT() {
            if (this.isShow) {
                if (this.reasonMsg.trim() !== '') {
                    return false;
                } else {
                    return true;
                }
            }
        }
    },
    mounted() {
        // 把文本框提示文字 设置成 必填提示文字
        this.requiredMsg = this.mData.placeholder;
    },
    methods: {
        // 提交按钮点击
        handleSubmit() {
            this.isShow = true;
            if (this.reasonMsg.trim() !== '') {
                this.$emit('handleSubmit', this.reasonMsg);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.p-mui-pop-reason {
    height: 100%;
    .p-mui-pop-reason-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.5);

        .p-mui-pop-reason-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            background: #fff;
            box-sizing: border-box;
            border-radius: 8rpx;
            overflow: hidden;

            .p-mui-pop-reason-title {
                width: 100%;
                height: 160rpx;
                line-height: 160rpx;
                box-sizing: border-box;
                padding-left: 180rpx;
                color: #fff;
                font-size: 32rpx;
            }

            .p-mui-pop-reason-main {
                width: 100%;
                padding: 20rpx;
                box-sizing: border-box;
                .main-title {
                    display: flex;
                    font-size: 28rpx;
                    color: #333;
                    font-weight: 700;
                    margin-bottom: 14rpx;

                    i {
                        color: #f55858;
                        margin-right: 6rpx;
                    }
                }

                .main-box {
                    position: relative;
                    margin-bottom: 60rpx;

                    .u-input {
                        // background-color: #F2F2F2;
                        // padding: 8rpx 15rpx !important;
                    }

                    .reason-tips {
                        position: absolute;
                        left: 10rpx;
                        bottom: -50rpx;
                        font-size: 26rpx;
                        color: #f55858;
                    }
                }

                .button-box {
                    text-align: center;
                }
            }
        }
    }
}
</style>
