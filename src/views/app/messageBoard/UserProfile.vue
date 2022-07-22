<!-- @format -->

<template>
    <div class="list-from-card">
        <p-mui-card>
            <view slot="title" class="from-title">头像</view>
            <view slot="body">
                <u-avatar :src="avatarSrc" size="160"></u-avatar>
                <u-gap height="20" bgColor="#fff"></u-gap>
                <div class="btn-box">
                    <u-button
                        :plain="true"
                        text="更换头像"
                        @click="updateAvatar"
                        >更换头像</u-button
                    >
                </div>
                <u-gap height="20" bgColor="#fff"></u-gap>
            </view>
        </p-mui-card>
        <u-form
            :model="model"
            :rules="rules"
            ref="uForm"
            :errorType="errorType"
            :border-bottom="false"
        >
            <p-mui-card>
                <view slot="title" class="from-title">个人资料</view>
                <view slot="body">
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="账号"
                        class="must-fill"
                        prop="username"
                    >
                        <u-input
                            placeholder="请输入"
                            v-model="model.username"
                            type="textarea"
                            disabled
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="昵称"
                        class="must-fill"
                        prop="netName"
                    >
                        <u-input
                            placeholder="请输入"
                            v-model="model.netName"
                            type="textarea"
                        ></u-input>
                    </u-form-item>
                    <u-form-item
                        label-width="150"
                        label-position="left"
                        :border-bottom="false"
                        label="性别"
                        class="must-fill"
                        prop="gender"
                    >
                        <u-input
                            placeholder="请选择"
                            v-model="model.genderLabel"
                            type="text"
                            disabled
                            @click="showGender = true"
                        ></u-input>
                        <u-select
                            mode="single-column"
                            v-model="showGender"
                            :list="genderOptions"
                            @confirm="genderConfirm"
                        ></u-select>
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
import { getUserInfo, updateUserInfo } from '@/api/api';
import { BASE_URL } from '@/api/api';
import uPicker from '../../../components/p-mui/components/u-picker/u-picker.vue';
export default {
    components: { uPicker },
    name: 'userProfile',
    data() {
        return {
            avatarSrc: `${BASE_URL}/images/myuser.png`, //头像地址
            showGender: false, //性别选择
            defaultGenderValue: [0],
            genderOptions: [
                {
                    label: '保密',
                    value: 0
                },
                {
                    label: '男',
                    value: 1
                },
                {
                    label: '女',
                    value: 2
                }
            ], //性别选择
            model: {
                username: '',
                netName: '',
                gender: '',
                genderLabel: ''
            },
            rules: {
                netName: [
                    {
                        required: true,
                        message: '请输入昵称',
                        trigger: ['change', 'blur']
                    }
                ],
                genderLabel: [
                    {
                        required: true,
                        message: '请选择性别',
                        trigger: ['change']
                    }
                ]
            },
            errorType: ['message']
        };
    },
    created() {
        //初始化用户资料
        this.getUserInfo();
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        //初始化用户资料
        getUserInfo() {
            getUserInfo({}).then((res) => {
                Object.assign(this.model, res.data);
                if (res.data.avatarUrl) {
                    this.avatarSrc = `${BASE_URL}${res.data.avatarUrl}`;
                }
                this.genderOptions.forEach((item) => {
                    if (item.value === res.data.gender) {
                        this.model.genderLabel = item.label;
                    }
                });
            });
        },
        //上传头像
        updateAvatar() {
            uni.chooseImage({
                count: 1,
                success: (imageFile) => {
                    if (imageFile.tempFiles.length) {
                        // console.log(imageFile);
                        uni.showLoading({
                            title: '上传中'
                        });
                        uni.uploadFile({
                            url: BASE_URL + '/uploadAvatar',
                            filePath: imageFile.tempFilePaths[0],
                            name: 'file',
                            header: {
                                Authorization:
                                    'Bearer ' + uni.getStorageSync('token')
                            },
                            timeout: 30000,
                            formData: {},
                            success: (res) => {
                                // console.log(res);
                                if (res.statusCode === 200) {
                                    uni.showToast({
                                        title: '头像更改成功'
                                    });
                                    setTimeout(() => {
                                        this.getUserInfo();
                                    }, 500);
                                }
                            },
                            fail: (err) => {
                                uni.showToast({
                                    title: '头像上传失败'
                                });
                            }
                        });
                    }
                }
            });
        },
        //提交
        submit() {
            this.$refs.uForm.validate((valid) => {
                if (valid) {
                    console.log('验证通过');
                    updateUserInfo({ userInfo: this.model }).then((res) => {
                        uni.setStorageSync('userInfo', res.data.userInfo);
                        uni.showToast({
                            title: '资料修改成功'
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
        //选择性别
        genderConfirm(v) {
            this.model.gender = v[0].value;
            this.model.genderLabel = v[0].label;
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
.btn-box {
    width: 320rpx;
    .u-btn {
        width: 70%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
    }
}
</style>
