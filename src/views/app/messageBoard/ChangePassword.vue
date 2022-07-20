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
                <view slot="title" class="from-title">修改密码</view>
                <view slot="body">
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="原密码"
                        class="must-fill"
                        prop="oldPassword"
                    >
                        <u-input
                            placeholder="请输入"
                            v-model="model.oldPassword"
                            type="textarea"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="新密码"
                        class="must-fill"
                        prop="newPassword"
                    >
                        <u-input
                            placeholder="请输入"
                            v-model="model.newPassword"
                            type="text"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="170"
                        label-position="left"
                        :border-bottom="false"
                        label="确认新密码"
                        class="must-fill"
                        prop="confirmPassword"
                    >
                        <u-input
                            placeholder="请输入"
                            v-model="model.confirmPassword"
                            type="text"
                        ></u-input>
                    </u-form-item>
                </view>
            </p-mui-card>
        </u-form>

        <div class="btns">
            <u-button @click="cancel">取消</u-button>
            <u-button type="primary" @click="submit">保存</u-button>
        </div>
    </div>
</template>

<script>
import { changePassword } from '@/api/api';
import { aesUtil } from '../../../utils/crypto/crypto.js';
export default {
    name: 'changePassword',
    data() {
        return {
            model: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            rules: {
                oldPassword: [
                    {
                        required: true,
                        message: '请输入原密码',
                        trigger: ['change', 'blur']
                    }
                ],
                newPassword: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: ['change', 'blur']
                    }
                ],
                confirmPassword: [
                    {
                        required: true,
                        message: '请输入确认新密码',
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
            if (this.model.newPassword.length < 6) {
                uni.showToast({
                    icon: 'none',
                    title: '密码最短为 6 个字符'
                });
                return;
            }
            if (this.model.newPassword !== this.model.confirmPassword) {
                uni.showToast({
                    icon: 'none',
                    title: '两次新密码输入不一致'
                });
                return;
            }
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    console.log('验证通过');
                    changePassword({
                        oldPassword: aesUtil.encryptByAESModeEBC(
                            this.model.oldPassword
                        ),
                        newPassword: aesUtil.encryptByAESModeEBC(
                            this.model.newPassword
                        )
                    }).then((res) => {
                        uni.showToast({
                            title: '修改成功'
                        });
                        setTimeout(() => {
                            uni.navigateBack();
                        }, 1000);
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
