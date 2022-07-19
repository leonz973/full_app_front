<!-- @format -->

<template>
    <scroll-view
        scroll-y
        style="height: 100%"
        class="main"
        @scrolltolower="getMore"
    >
        <p-mui-card>
            <view slot="title"> 标题内容 </view>
            <view slot="body"> 主体内容 </view>
        </p-mui-card>

        <p-mui-card v-for="(item, idx) in list" :key="idx">
            <view slot="title">
                {{ item.title }}
                <u-icon
                    class="p-mui-card-title-icon"
                    name="arrow-right"
                    @click="jump"
                ></u-icon>
            </view>
            <view slot="body">
                <ul class="pd-ullst3">
                    <li>预警时间：{{ item.date }}</li>
                    <li>预警等级：{{ item.level }}</li>
                </ul>
            </view>
        </p-mui-card>
    </scroll-view>
</template>

<script>
export default {
    data() {
        return {
            total: 20,
            pageIndex: 1,
            list: [
                {
                    title: 'xxxx',
                    date: '2020-08-31 08: 00:00',
                    level: '二级预警'
                },
                {
                    title: 'xxxx',
                    date: '2020-08-31 08: 00:00',
                    level: '二级预警'
                },
                {
                    title: 'xxxx',
                    date: '2020-08-31 08: 00:00',
                    level: '二级预警'
                },
                {
                    title: 'xxxx',
                    date: '2020-08-31 08: 00:00',
                    level: '二级预警'
                },
                {
                    title: 'xxxx',
                    date: '2020-08-31 08: 00:00',
                    level: '二级预警'
                }
            ]
        };
    },
    methods: {
        jump() {
            //跳转详情
        },
        getMore() {
            //获取更多
            if (this.list.length >= this.total) {
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none'
                });
                return;
            }
            uni.showLoading();
            this.pageIndex++;
            setTimeout(() => {
                uni.hideLoading();
                this.list = this.list.concat([
                    {
                        title: 'xxxx',
                        date: '2020-08-31 08: 00:00',
                        level: '二级预警'
                    },
                    {
                        title: 'xxxx',
                        date: '2020-08-31 08: 00:00',
                        level: '二级预警'
                    },
                    {
                        title: 'xxxx',
                        date: '2020-08-31 08: 00:00',
                        level: '二级预警'
                    },
                    {
                        title: 'xxxx',
                        date: '2020-08-31 08: 00:00',
                        level: '二级预警'
                    },
                    {
                        title: 'xxxx',
                        date: '2020-08-31 08: 00:00',
                        level: '二级预警'
                    }
                ]);
            }, 500);
        }
    }
};
</script>

<style>
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
