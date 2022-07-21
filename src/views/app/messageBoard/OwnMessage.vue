<!-- @format -->

<template>
    <div class="list-card">
        <div class="message-btn-group">
            <div class="message-btn-refresh" @click="getData">刷新</div>
            <div class="message-btn-create" @click="createMessage">创建</div>
        </div>
        <scroll-view
            scroll-y
            :style="{ height: 'calc(100vh - 90rpx)' }"
            class="main"
            @scrolltolower="loadMore"
        >
            <div class="total">
                共有 <i>{{ commentList.length }}</i
                >条留言
            </div>

            <p-mui-card v-for="(item, idx) in commentList" :key="idx">
                <div slot="title" class="list-title">
                    用户：{{ item.netName }}
                    <!-- <i
                        :class="{
                            valid: item.status === '有效',
                            invalid: item.status === '无效',
                            wait: item.status === '待确认',
                            back: item.status === '退回'
                        }"
                    ></i> -->
                    <div class="card-btn">
                        <!-- <div class="card-btn-item" @click="editMessage(item)">
                            编辑
                        </div> -->
                        <div
                            class="card-btn-item del"
                            @click="deleteMessage(item)"
                        >
                            删除
                        </div>
                    </div>
                </div>
                <div slot="body">
                    <ul class="pd-ullst3">
                        <li>内容：{{ item.content }}</li>
                    </ul>
                    <ul class="body-time">
                        <li>{{ item.update_time }}</li>
                    </ul>
                </div>
            </p-mui-card>
        </scroll-view>
    </div>
</template>

<script>
import { getCommentList, deleteMessage } from '@/api/api';
export default {
    name: 'ownMessage',
    data() {
        return {
            commentList: [],
            pageIndex: 1,
            total: 0
        };
    },
    onShow() {
        this.getData();
    },
    methods: {
        //编辑
        editMessage(item) {
            uni.navigateTo({
                url: `/views/app/messageBoard/EditMessage?id=${item._id}`
            });
        },
        //删除
        deleteMessage(item) {
            uni.showModal({
                title: '提示',
                content: '确定要删除吗？',
                showCancel: true,
                success: (r) => {
                    if (r.confirm) {
                        deleteMessage({
                            id: item._id
                        }).then((res) => {
                            uni.showModal({
                                title: '提示',
                                content: '删除成功',
                                showCancel: false,
                                success: (r) => {
                                    if (r.confirm) {
                                        this.getData();
                                    }
                                }
                            });
                        });
                    }
                }
            });
        },
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
                filterType: 2
            }).then((res) => {
                this.commentList = [];
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
.card-btn {
    float: right;
    display: flex;
    margin-top: 20rpx;
    height: 50rpx;
}
.card-btn-item {
    background-color: #eee;
    width: 110rpx;
    height: 50rpx;
    line-height: 50rpx;
    border-radius: 10rpx;
    color: #999;
    text-align: center;
    margin: 0 10rpx;
    font-size: 28rpx;
}
.card-btn-item:active {
    background-color: rgb(218, 216, 216);
}
.card-btn-item.del {
    background-color: #e94747;
    color: #fff;
}
.card-btn-item.del:active {
    background-color: #d14242;
}

.body-time {
    font-size: 24rpx;
    height: 60rpx;
    color: #646c7f;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
