<!-- @format -->

<template>
    <div>
        <div class="mb-login-type4">
            <!-- <div class="login-type4-logo">
                <img src="images/login_type4_logo.png" alt="" />
            </div> -->
            <h1 class="login-type4-h1">Welcome to app.</h1>
            <div class="login-type4-form">
                <h1 class="login-title">登录</h1>
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
                <div class="item">
                    <label class="login-checkbox"
                        ><u-checkbox v-model="savePassword"
                            >记住密码</u-checkbox
                        ></label
                    >
                </div>
                <button class="login-type4-submit" @click="login">登录</button>
            </div>
            <p class="login-register" @click="register">注册新账号</p>
            <p class="login-danwei">Design By Powersmart</p>
        </div>
    </div>
</template>

<script>
import { login, getUserInfo } from '@/api/api.js';
import { aesUtil } from '../../utils/crypto/crypto.js';
import uCheckbox from '../../components/p-mui/components/u-checkbox/u-checkbox.vue';
export default {
    components: { uCheckbox },
    data() {
        return {
            savePassword: false,
            showPassword: false,
            submitData: {
                username: '',
                password: ''
            }
        };
    },
    created() {
        if (uni.getStorageSync('token')) {
            getUserInfo({})
                .then((res) => {
                    if (res.data) {
                        uni.reLaunch({
                            url: '/views/app/messageBoard/MessageBoard'
                        });
                    }
                })
                .catch((err) => {
                    if (err.status === '401') {
                        uni.removeStorageSync('token');
                    }
                });
        }
        if(uni.getStorageSync('username')){
            this.submitData.username = aesUtil.decryptByAESModeEBC(uni.getStorageSync('username'))
        }
    },
    mounted() {},
    methods: {
        login() {
            if (this.submitData.username.length < 5) {
                uni.showToast({
                    icon: 'none',
                    title: '账号最短为 5 个字符'
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

            login({
                username: aesUtil.encryptByAESModeEBC(this.submitData.username),
                password: aesUtil.encryptByAESModeEBC(this.submitData.password)
            }).then((res) => {
                console.log(res);
                if (res.status === '000') {
                    uni.showToast({
                        title: '登录成功',
                        icon: 'none'
                    });
                    uni.setStorageSync(
                        'username',
                        aesUtil.encryptByAESModeEBC(this.submitData.username)
                    );
                    uni.setStorageSync('token', res.data.token);
                    uni.setStorageSync('userInfo', res.data.userInfo);
                    setTimeout(() => {
                        uni.reLaunch({
                            url: '/views/app/messageBoard/MessageBoard'
                        });
                    }, 1000);
                }
            });
        },
        register() {
            uni.navigateTo({
                url: '/views/app/register'
            });
        }
    }
};
</script>

<style>
.pd-logmain {
    height: 386.8261rpx;
}
.pd-logform ._li .pd-inptxt.usr {
    padding-left: 40rpx;
}
.pd-logform ._li .pd-inptxt.pwd {
    padding-left: 40rpx;
}

.login-register {
    position: relative;
    bottom: -350rpx;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 24rpx;
    color: #3580ff;
}
.login-danwei {
    position: relative;
    bottom: -360rpx;
}
.login-title {
    font-size: 39.855rpx;
    line-height: 111.111rpx;
    color: #000;
    font-weight: bold;
    text-align: left;
    margin-bottom: 45.8333rpx;
}
</style>
