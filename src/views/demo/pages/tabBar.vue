<!-- @format -->

<template>
    <view>
        <view class="u-page">
            <!-- 所有内容的容器 -->
        </view>
        <u-tabbar v-model="current" :list="list"></u-tabbar>
    </view>
</template>

<script>
import menuIcon3 from '../../../static/demo/images/muic3.png';
import menuIcon3s from '../../../static/demo/images/muic3s.png';
export default {
    data() {
        return {
            list: [
                {
                    iconPath: 'home',
                    selectedIconPath: 'home-fill',
                    text: '首页'
                },
                {
                    iconPath: 'photo',
                    selectedIconPath: 'photo-fill',
                    text: '表格',
                    pagePath: '/views/demo/table'
                },
                {
                    iconPath: menuIcon3,
                    selectedIconPath: menuIcon3s,
                    text: '水环境'
                },
                {
                    iconPath: 'account',
                    selectedIconPath: 'account-fill',
                    text: '我的',
                    count: 23
                },
                {
                    iconPath: 'account',
                    selectedIconPath: 'account-fill',
                    text: '我的',
                    isDot: true
                }
            ],
            current: 0
        };
    }
};
</script>

<style></style>
