<!-- @format -->

<template>
    <div class="list-card">
        <div class="top-head">
            <div class="top-logo">
                <image src="@/static/logos/logo1-a0.png" alt="" class="bsic" />
            </div>
            <div class="message-btn-group">
                <div class="message-btn-refresh" @click="getData">刷新</div>
                <div class="message-btn-create" @click="createMessage">
                    创建
                </div>
            </div>
        </div>
        <scroll-view
            scroll-y
            :style="{ height: 'calc(100vh - 190rpx)' }"
            class="main"
            @scrolltolower="loadMore"
        >
            <div class="total">
                共有 <i>{{ commentList.length }}</i
                >条留言
            </div>

            <p-mui-card v-for="(item, idx) in commentList" :key="idx">
                <div slot="title" class="list-title">
                    用户：
                    <div class="inline-avatar">
                        <u-avatar
                            :src="BASE_URL + item.avatarUrl[0]"
                            size="50"
                        ></u-avatar>
                    </div>
                    {{ item.netName }}
                    <!-- <i
                        :class="{
                            valid: item.status === '有效',
                            invalid: item.status === '无效',
                            wait: item.status === '待确认',
                            back: item.status === '退回'
                        }"
                    ></i> -->
                </div>
                <div slot="body">
                    <ul class="pd-ullst3">
                        <li>内容：{{ item.content }}</li>
                    </ul>
                    <u-gap
                        v-if="item.pics.length"
                        height="30"
                        bgColor="#fff"
                    ></u-gap>
                    <uAlbum :urls="item.pics"></uAlbum>
                    <ul class="body-time">
                        <li>{{ item.update_time }}</li>
                    </ul>
                </div>
            </p-mui-card>
        </scroll-view>
    </div>
</template>

<script>
import { getCommentList, getUserInfo, BASE_URL } from '@/api/api';
import uAlbum from '../components/u-album/u-album.vue';

export default {
    components: {
        uAlbum
    },
    name: 'listCard',
    data() {
        return {
            BASE_URL,
            commentList: [],
            pageIndex: 1,
            total: 0
        };
    },
    onShow() {
        this.getData();
    },
    methods: {
        loadMore() {
            //获取更多
            if (this.commentList.length >= this.total) {
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none'
                });
                return;
            }
            this.pageIndex++;
            this.getData();
        },
        getData() {
            getCommentList({
                filterType: 1
            }).then((res) => {
                if (res.data.length) {
                    this.commentList = res.data;
                }
            });
        },
        createMessage() {
            uni.navigateTo({
                url: '/views/app/messageBoard/CreateMessage'
            });
        }
    }
};
</script>

<style lang="less" scoped>
.main {
    padding-bottom: 20rpx;
}
.list-card {
    height: 100%;
    .total {
        margin: 0 18rpx 18rpx;
        i {
            color: #ff5c36;
        }
    }

    .list-title {
        i {
            float: right;
            width: 110rpx;
            height: 44rpx;
            margin-top: 22rpx;
            &.valid {
                background: url(../../../static/images/youxiao.png) 0 0
                    no-repeat;
                background-size: 110rpx 44rpx;
            }
            &.invalid {
                background: url(../../../static/images/wuxiao.png) 0 0 no-repeat;
                background-size: 110rpx 44rpx;
            }
            &.wait {
                background: url(../../../static/images/daiqueren.png) 0 0
                    no-repeat;
                background-size: 110rpx 44rpx;
            }
            &.back {
                background: url(../../../static/images/tuihui.png) 0 0 no-repeat;
                background-size: 110rpx 44rpx;
            }
        }
    }
}
.pd-ullst3 li {
    font-size: 30rpx;
    color: #646c7f;
    /* line-height: 1.8; */
    margin-bottom: 28rpx;
}
.pd-ullst3 li:last-child {
    margin-bottom: 0;
}
.body-time {
    font-size: 24rpx;
    height: 60rpx;
    color: #646c7f;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.message-btn-group {
    display: flex;
    width: 100%;
    height: 90rpx;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
}
.message-btn-group div {
    width: 110rpx;
    height: 50rpx;
    border-radius: 25rpx;
    background-color: #3580ff;
    color: #fff;
    text-align: center;
    margin: 0 10rpx;
    font-size: 28rpx;
}
.message-btn-group div:active {
    background-color: #2d6ddb;
}
.message-btn-refresh {
}
.message-btn-create {
}
.inline-avatar {
    display: inline-block;
    position: relative;
    top: 14rpx;
    margin: 0 10rpx;
}
.top-head {
    width: 100%;
    height: 90rpx;
    display: flex;
    justify-content: space-between;
}
.top-logo {
    width: 50%;
    height: 90rpx;
    background-color: #fff;
}
.top-logo image {
    width: 100%;
    height: 100%;
}
</style>
