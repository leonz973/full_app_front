<!-- @format -->

<template>
    <div class="mb-login-type4">
        <!-- <div class="login-type4-logo">
                <img src="images/login_type4_logo.png" alt="" />
            </div> -->
        <h1 class="login-type4-h1">Welcome to app.</h1>
        <div class="login-type4-form">
            <h1 class="login-title">注册</h1>
            <div class="item">
                <input
                    type="text"
                    placeholder="请输入昵称"
                    class="login-type4-user"
                    v-model="submitData.netName"
                />
            </div>
            <div class="item">
                <input
                    type="text"
                    placeholder="请输入账号"
                    class="login-type4-user"
                    v-model="submitData.username"
                />
            </div>
            <div class="item">
                <input
                    v-show="showPassword"
                    type="text"
                    placeholder="请输入密码"
                    class="login-type4-password"
                    v-model="submitData.password"
                />
                <input
                    v-show="!showPassword"
                    type="password"
                    placeholder="请输入密码"
                    class="login-type4-password"
                    v-model="submitData.password"
                />
                <i
                    class="login-eye"
                    :class="{ on: showPassword }"
                    @click="
                        () => {
                            showPassword = !showPassword;
                        }
                    "
                ></i>
            </div>
            <div class="btn-group2">
                <div class="login-type4-btn" @click="goBack()">返回登录</div>
                <div class="login-type4-submit" @click="register()">注册</div>
            </div>
        </div>
        <p class="login-danwei">Design By Powersmart</p>
    </div>
</template>

<script>
import { register } from '@/api/api.js';
import { aesUtil } from '../../utils/crypto/crypto.js';

export default {
    data() {
        return {
            showPassword: false,
            submitData: {
                netName: '',
                username: '',
                password: ''
            }
        };
    },
    mounted() {},
    methods: {
        goBack() {
            uni.navigateBack();
        },
        // 注册
        register() {
            if (this.submitData.username == '') {
                uni.showToast({
                    icon: 'none',
                    title: '用户名不能为空'
                });
                return;
            }

            if (this.submitData.password == '') {
                uni.showToast({
                    icon: 'none',
                    title: '密码不能为空'
                });
                return;
            }
            if (this.submitData.username.length < 5) {
                uni.showToast({
                    icon: 'none',
                    title: '用户名最短为 5 个字符'
                });
                return;
            }
            if (this.submitData.password.length < 6) {
                uni.showToast({
                    icon: 'none',
                    title: '密码最短为 6 个字符'
                });
                return;
            }

            register({
                userInfo: {
                    netName:
                        this.submitData.netName ||
                        '用户_' + this.$dayjs().valueOf(),
                    username: aesUtil.encryptByAESModeEBC(
                        this.submitData.username
                    ),
                    password: aesUtil.encryptByAESModeEBC(
                        this.submitData.password
                    )
                }
            }).then((res) => {
                console.log(res);
                if (res.status === '000') {
                    uni.showToast({
                        title: '注册成功',
                        icon: 'none'
                    });
                    setTimeout(() => {
                        uni.navigateTo({
                            url: '/views/app/login'
                        });
                    }, 1000);
                }
            });
        }
    }
};
</script>

<style>
.get-phone {
    display: inline-block;
    border: none;
    float: right;
    font-size: 27rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(12, 156, 247, 1);
    background: none;
    margin-right: 20rpx;
}
.get-phone::after {
    border: none;
    background: none;
}
.reg-title {
    position: absolute;
    top: 34rpx;
    left: 27rpx;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(5, 156, 247, 1);
}
.pd-logmain {
    height: 386.8261rpx;
}
.pd-logform ._li .pd-inptxt.usr {
    padding-left: 40rpx;
}
.pd-logform ._li .pd-inptxt.pwd {
    padding-left: 40rpx;
}
.changeBtn {
    width: 575rpx;
    height: 72rpx;
    left: 88rpx;
}
.changeBtn button {
    width: 575rpx;
    height: 72rpx;
}
.reg-list {
    width: 638px;
    position: absolute;
    left: 65rpx;
    top: 90rpx;
}
.reg-list li {
    height: 83rpx;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.reg-list li label {
    display: inline-block;
    color: #464646;
    line-height: 83rpx;
}
.reg-list li input {
    display: block;
    line-height: 83rpx;
    float: right;
    height: 83rpx;
    width: 480rpx;
    text-align: right;
    padding-right: 20rpx;
}
.login-title {
    font-size: 39.855rpx;
    line-height: 111.111rpx;
    color: #000;
    font-weight: bold;
    text-align: left;
    margin-bottom: 45.8333rpx;
}
.btn-group2 {
    display: flex;
    justify-content: space-around;
}
.login-type4-btn {
    display: block;
    width: 40%;
    height: 90.9722rpx;
    border-radius: 48.611rpx;
    background-color: #fff;
    font-size: 34.7222rpx;
    color: #000;
    text-align: center;
    line-height: 90.9722rpx;
    box-shadow: 4rpx 6rpx 16rpx rgba(0, 0, 0, 0.1);
    margin-top: 69.4444rpx;
    border: 1rpx solid #eee;
}
.login-type4-btn:active {
    background-color: rgb(251, 251, 251);
}
.login-type4-submit {
    width: 40%;
}
</style>
