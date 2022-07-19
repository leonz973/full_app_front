<!-- @format -->
<!-- 确认弹窗 -->

<template>
    <div class="p-mui-pop-notarize" v-if="mData.isShow">
        <div class="zy-alert denglu-once-alert">
            <div class="wrapper">
                <p class="til">提示</p>
                <p class="tip">
                    <span>{{ mData.tips }}</span>
                </p>
                <slot name="content"></slot>

                <div class="confirm">
                    <button @click="handleClick">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'p-mui-pop-notarize',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    tips: '初次登陆请先确认以下信息', //提示信息
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
                    tips: '初次登陆请先确认以下信息', //提示信息
                    isShow: false
                },
                this.data
            );
        }
    },
    mounted() {},
    methods: {
        handleClick() {
            this.$emit('handleClick', false);
        }
    }
};
</script>

<style lang="less" scoped>
.p-mui-pop-notarize {
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

    .denglu-once-alert {
        .wrapper {
            width: 657.6086rpx;
            height: 845.4106rpx;
            box-shadow: 0 0 3.0193rpx 0 rgba(0, 0, 0, 0.1);
            background-color: #fff;
            border-radius: 12.0773rpx;
            .til {
                font-size: 31.401rpx;
                color: #232323;
                height: 76rpx;
                line-height: 76rpx;
                text-align: center;
            }
            .tip {
                font-size: 24.1545rpx;
                color: #efa31e;
                text-align: center;
                line-height: 60.3864rpx;
                background-color: #f8f5ed;
                span {
                    display: inline-block;
                    padding-left: 33.8164rpx;
                    background: url(./image/tip-bg.png) 0 center no-repeat;
                    background-size: 22.9468rpx 22.9468rpx;
                }
            }

            .confirm {
                text-align: center;
                margin-top: 18.1159rpx;
                button {
                    width: 350.2415rpx;
                    height: 66.4251rpx;
                    font-size: 28.9854rpx;
                    line-height: 66.4251rpx;
                    background: linear-gradient(to right, #55ddff, #24a0ff);
                    color: #fff;
                    border: none;
                    border-radius: 33.2125rpx;
                    margin: auto;
                }
            }
        }
    }
}
</style>
