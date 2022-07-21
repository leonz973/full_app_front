<!-- @format -->

<template>
    <div style="background-color: #f6f6f6; height: 100%">
        <section class="main">
            <div class="inner" style="padding-top: 0">
                <div class="indextopbg">
                    <div class="userbox myuserbox">
                        <!-- <img
                            class="userlogo"
                            src="@/static/app/images/myuser.png"
                        /> -->
                        <u-avatar :src="avatarSrc" size="160"></u-avatar>
                        <div class="rf">
                            <p class="gx-name1" v-if="userInfo.username">
                                {{ userInfo.netName }}
                            </p>
                            <p
                                class="gx-name1"
                                v-else
                                @click="redirectToLogin()"
                            >
                                请先登录
                            </p>
                            <div class="hello">-</div>
                        </div>
                    </div>
                    <ul class="gx-work">
                        <li @click="openOwnMessage()">
                            <div class="zjwrap">
                                <img
                                    src="@/static/app/images/zj1.png"
                                    alt=""
                                    class="zj1"
                                />
                                <span class="deal1">我的留言</span>
                            </div>
                        </li>
                        <li @click="openUserProfile()">
                            <div class="zjwrap">
                                <img
                                    src="@/static/app/images/zj2.png"
                                    alt=""
                                    class="zj1"
                                />
                                <span class="deal1">个人资料</span>
                            </div>
                        </li>
                    </ul>
                    <!-- <div class="gxmy-mod">
                        <h1 class="mytit1">我的留言</h1>
                        <ul class="gx-bsul mybsul">
                            <li>
                                <img
                                    src="@/static/app/images/bs1.png"
                                    alt=""
                                    class="bsic"
                                />
                                <p>待提交</p>
                            </li>
                            <li>
                                <img
                                    src="@/static/app/images/bs2.png"
                                    alt=""
                                    class="bsic"
                                />
                                <p>待审核</p>
                            </li>
                            <li>
                                <img
                                    src="@/static/app/images/bs3.png"
                                    alt=""
                                    class="bsic"
                                />
                                <p>已发布</p>
                            </li>
                        </ul>
                    </div> -->
                    <div class="gxmy-mod" style="padding-bottom: 0">
                        <h1 class="mytit1">功能服务</h1>
                        <div class="passbox">
                            <div class="editpass1" @click="changePassword()">
                                <span class="passtit eico1">修改密码</span>
                                <span class="rgtarr"></span>
                            </div>
                            <div class="editpass1" @click="aboutVersion()">
                                <span class="passtit eico2">关于版本</span>
                                <span class="rgtarr2"></span>
                            </div>
                            <div class="editpass1" @click="exit()">
                                <span class="passtit eico3">退出登录</span>
                                <span class="rgtarr2"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gap"></div>
            </div>
        </section>
        <!-- <footer class="pd-footer">
            <ul class="pd-menu pd-menu2">
                <li>
                    <i class="muic1"></i>
                    <p>首页</p>
                </li>
                <li>
                    <i class="muic2"></i>
                    <p>办事</p>
                </li>
                <li class="on">
                    <i class="muic4"></i>
                    <p>我的</p>
                </li>
            </ul>
        </footer> -->
    </div>
</template>

<script>
import { BASE_URL, getUserInfo } from '@/api/api';
export default {
    data() {
        return {
            userInfo: {
                username: ''
            },
            avatarSrc: `${BASE_URL}/images/myuser.png` //头像地址
        };
    },
    onShow() {
        this.getUserInfo();
    },
    methods: {
        //获取头像，用户名
        getUserInfo() {
            getUserInfo({}).then((res) => {
                Object.assign(this.userInfo, res.data);
                console.log(this.userInfo);
                if (res.data.avatarUrl) {
                    this.avatarSrc = `${BASE_URL}${res.data.avatarUrl}`;
                }
            });
        },

        //跳转修改密码
        changePassword() {
            uni.navigateTo({
                url: '/views/app/messageBoard/ChangePassword'
            });
        },

        //跳转我的留言
        openOwnMessage() {
            uni.navigateTo({
                url: '/views/app/messageBoard/OwnMessage'
            });
        },
        //跳转资料
        openUserProfile() {
            uni.navigateTo({
                url: '/views/app/messageBoard/UserProfile'
            });
        },
        //跳转登录
        redirectToLogin() {
            uni.removeStorageSync('token');
            uni.removeStorageSync('userInfo');
            uni.redirectTo({
                url: '/views/app/login'
            });
        },
        //退出
        exit() {
            uni.showModal({
                title: '提示',
                content: '确定要退出吗？',
                success: (r) => {
                    if (r.confirm) {
                        this.redirectToLogin();
                    }
                }
            });
        },
        //关于版本
        aboutVersion() {
            uni.showToast({
                title: '当前版本：0.0.1(beta)',
                icon: 'none'
            });
        }
    }
};
</script>

<style scoped>
.indextopbg {
    width: 100%;
    height: 446.8599rpx;
    background: url(@/static/app/images/topbg1.png) no-repeat center center;
    background-size: auto;
    background-size: 100% auto;
}
.main {
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    height: 100%;
}
.userbox {
    display: flex;
    align-items: center;
    padding: 120rpx 24.1545rpx 0;
}

.userbox.myuserbox {
    padding: 135rpx 30rpx 0;
}

.userlogo {
    width: 119.4444rpx;
    height: 119.4444rpx;
    display: inline-block;
}

.hello {
    font-size: 24.9999rpx;
    color: #fff;
    margin-top: 15rpx;
}
.gx-work {
    height: 165rpx;
    margin: 19.5rpx 33.3333rpx;
    background-color: #fff;
    border-radius: 20.8333rpx;
    margin-top: 82.5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.gx-work > li {
    flex: 1;
    text-align: center;
    padding: 6.0386rpx 0;
}

.gx-work > li + li {
    border-left: solid 1px #ddd;
}

.gx-work > li .deal1 {
    font-size: 29.1666rpx;
    color: #333;
    margin: 0 12.0773rpx;
    height: 69.4444rpx;
    line-height: 69.4444rpx;
    display: inline-block;
    margin-left: 29.1666rpx;
}

.gx-name1 {
    font-size: 41.6667rpx;
    color: #fff;
}

.userbox .rf {
    margin-left: 34.7222rpx;
}

.zj1 {
    width: 61.1111rpx;
    height: 69.4444rpx;
    display: inline-block;
    margin-left: 60rpx;
}

.zjwrap {
    display: flex;
    align-items: center;
}

.bsic {
    width: 65.2777rpx;
    height: 63.1944rpx;
    display: inline-block;
}

.gxmy-mod {
    padding: 23.6111rpx;
    background-color: #fff;
    border-radius: 20.8333rpx;
    margin: 27.7777rpx 33.3333rpx;
}

.mytit1 {
    color: #333;
    font-size: 34.7222rpx;
    padding-left: 34.7222rpx;
    background: url(@/static/app/images/t1.png) no-repeat 0 center;
    background-size: 15.2778rpx auto;
}

.mybsul {
    margin-top: 60rpx;
}

.gx-bsul.mybsul li {
    margin-bottom: 2%;
}

.gx-bsul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.gx-bsul li {
    width: 25%;
    text-align: center;
    margin-bottom: 60rpx;
}

.gx-bsul li > p {
    font-size: 29.1666rpx;
    color: #333;
    margin-top: 22.2222rpx;
}

.passbox {
    height: 363.9536rpx;
    background-color: #fff;
    border-radius: 15.0966rpx;
    padding-top: 22.5rpx;
}

.passtit {
    color: #333;
    font-size: 30.1932rpx;
    padding-left: 69.4444rpx;
    display: inline-block;
    line-height: 120.7729rpx;
}

.eico1 {
    background: url(@/static/app/images/pass1.png) no-repeat 0 center;
    background-size: 48.611rpx auto;
}

.eico2 {
    background: url(@/static/app/images/vers.png) no-repeat 0 center;
    background-size: 48.611rpx auto;
}
.eico3 {
    background: url(@/static/app/images/exit1.png) no-repeat 0 center;
    background-size: 48.611rpx auto;
}

.rgtarr {
    width: 21.5277rpx;
    height: 40.9722rpx;
    display: inline-block;
    background: url(@/static/app/images/arwrt2.png) no-repeat 0 center;
    background-size: 21.5277rpx auto;
}

.editpass1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120rpx;
    border-bottom: solid 1px #eee;
}

.editpass1:last-of-type {
    border: none;
}

.pd-footer {
    background: #fff;
    /* border-top: 1px solid #ddd; */
    /*  height: 98rpx; */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    box-shadow: 2rpx 0 15.9999rpx rgb(0, 0, 0, 0.15);
}

.pd-menu {
    display: flex;
    height: 116.6667rpx;
}

.pd-menu li {
    flex: 1;
}

.pd-menu li i {
    display: block;
    height: 45.8333rpx;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 15.9999rpx auto 12.9999rpx;
}

.pd-menu li p {
    font-size: 20.8333rpx;
    color: #818181;
    text-align: center;
    padding-bottom: 12rpx;
}

.pd-menu li i.muic1 {
    background-image: url(@/static/app/images/muic1.png);
}

.pd-menu li i.muic2 {
    background-image: url(@/static/app/images/muic2.png);
}

.pd-menu li i.muic4 {
    background-image: url(@/static/app/images/muic4.png);
}

.pd-menu li.on i.muic1 {
    background-image: url(@/static/app/images/muic1s.png);
}

.pd-menu li.on i.muic2 {
    background-image: url(@/static/app/images/muic2s.png);
}

.pd-menu li.on i.muic4 {
    background-image: url(@/static/app/images/muic4s.png);
}

.pd-menu li.on p {
    color: #3c88f7;
}
</style>
