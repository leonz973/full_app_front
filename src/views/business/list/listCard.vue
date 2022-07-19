<!-- @format -->

<template>
    <div class="list-card">
        <scroll-view
            scroll-y
            style="height: 100%"
            class="main"
            @scrolltolower="getData"
        >
            <div class="total">
                共有 <i>{{ total }}</i
                >条记录
            </div>

            <p-mui-card v-for="(item, idx) in dataList" :key="idx">
                <div slot="title" class="list-title">
                    {{ item.title }}
                    <i
                        :class="{
                            valid: item.status === '有效',
                            invalid: item.status === '无效',
                            wait: item.status === '待确认',
                            back: item.status === '退回'
                        }"
                    ></i>
                </div>
                <div slot="body">
                    <ul class="pd-ullst3">
                        <li>委托企业：{{ item.wtqy }}</li>
                        <li>被委托企业：{{ item.bwtqy }}</li>
                        <li>委托期限：{{ item.time }}</li>
                    </ul>
                </div>
            </p-mui-card>
        </scroll-view>
    </div>
</template>

<script>
export default {
    name: 'listCard',
    data() {
        return {
            dataList: [],
            pageIndex: 1,
            total: 20
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            //获取更多
            if (this.dataList.length >= this.total) {
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none'
                });
                return;
            }
            this.pageIndex++;
            this.dataList = this.dataList.concat([
                {
                    title: '企业待申报委托书',
                    wtqy: '广州大众汽车4S维修店',
                    bwtqy: '广州绿能环保回收公司',
                    time: '2018-10至2019-09',
                    status: '有效'
                },
                {
                    title: '企业待申报委托书',
                    wtqy: '广州大众汽车4S维修店',
                    bwtqy: '广州绿能环保回收公司',
                    time: '2018-10至2019-09',
                    status: '无效'
                },
                {
                    title: '企业待申报委托书',
                    wtqy: '广州大众汽车4S维修店',
                    bwtqy: '广州绿能环保回收公司',
                    time: '2018-10至2019-09',
                    status: '待确认'
                },
                {
                    title: '企业待申报委托书',
                    wtqy: '广州大众汽车4S维修店',
                    bwtqy: '广州绿能环保回收公司',
                    time: '2018-10至2019-09',
                    status: '退回'
                }
            ]);
        }
    }
};
</script>

<style lang="less" scoped>
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
</style>
