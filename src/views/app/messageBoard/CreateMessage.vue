<!-- @format -->

<template>
    <div class="list-from-card">
        <u-form
            :model="model"
            :rules="rules"
            ref="uForm"
            :errorType="errorType"
            :border-bottom="false"
        >
            <p-mui-card>
                <view slot="title" class="from-title">创建留言</view>
                <view slot="body">
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="内容"
                        class="must-fill"
                        prop="content"
                    >
                        <u-input
                            placeholder="请输入"
                            v-model="model.content"
                            type="textarea"
                        ></u-input>
                    </u-form-item>
                </view>
            </p-mui-card>
        </u-form>

        <div class="btns">
            <u-button @click="cancel">取消</u-button>
            <u-button type="primary" @click="submit">提交</u-button>
        </div>
    </div>
</template>

<script>
import { createComment } from '@/api/api';
export default {
    name: 'createMessage',
    data() {
        return {
            model: {
                content: ''
            },
            rules: {
                content: [
                    {
                        required: true,
                        message: '请输入内容',
                        trigger: ['change', 'blur']
                    }
                ]
            },
            errorType: ['message']
        };
    },
    created() {},
    onReady() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        submit() {
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    console.log('验证通过');
                    createComment({
                        content: this.model.content
                    }).then((res) => {
                        uni.showModal({
                            title: '提示',
                            content: '创建成功',
                            showCancel: false,
                            success: (r) => {
                                if (r.confirm) {
                                    uni.navigateBack();
                                }
                            }
                        });
                    });
                } else {
                    console.log('验证失败');
                }
            });
        },
        cancel() {
            uni.navigateBack();
        }
    }
};
</script>

<style lang="less" scoped>
.list-from-card {
    padding-top: 20rpx;
    /deep/ .p-mui-card .p-mui-card-title {
        border-bottom: none;
    }

    /deep/ .p-mui-card .p-mui-card-body {
        padding: 0;
    }

    .u-form {
        background-color: transparent;
        padding: 0;
    }

    .must-fill {
        padding: 10rpx 0;
        padding-left: 30rpx;
        position: relative;
        &::before {
            content: '*';
            position: absolute;
            top: 26rpx;
            left: 10rpx;
            color: red;
        }
        &.label-top {
            &::before {
                top: 0;
            }
        }
    }

    .u-input {
        text-align: right !important;
    }

    .btns {
        display: flex;
        justify-content: space-evenly;
        .u-btn {
            width: 30%;
            height: 80rpx;
        }
    }

    /deep/.u-form-item__message {
        text-align: right !important;
    }

    .from-title {
        position: relative;
        padding-left: 20rpx;
        &::before {
            position: absolute;
            content: '';
            left: 0;
            top: 40rpx;
            width: 12rpx;
            height: 12rpx;
            border-radius: 50%;
            background-color: #3cabff;
        }
    }

    .time-box {
        float: right;
    }
}
</style>
