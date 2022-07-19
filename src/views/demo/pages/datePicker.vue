<!-- @format -->

<template>
    <view class="main">
        <p>选择年</p>
        <p-mui-date-picker @confirm="yearConfirm" dateType="YEAR">
            <input
                type="text"
                v-model="year"
                placeholder="请选择时间"
                class="date-ipt"
                readonly
            />
        </p-mui-date-picker>

        <p>选择月</p>
        <p-mui-date-picker @confirm="monthConfirm" dateType="MONTH">
            <input
                type="text"
                v-model="month"
                placeholder="请选择时间"
                class="date-ipt"
                readonly
            />
        </p-mui-date-picker>

        <p>选择日期</p>
        <p-mui-date-picker @confirm="dateConfirm" dateType="DAY">
            <input
                type="text"
                v-model="date"
                placeholder="请选择时间"
                class="date-ipt"
                readonly
            />
        </p-mui-date-picker>

        <p>选择年月日小时</p>
        <p-mui-date-picker @confirm="hourConfirm" dateType="HOUR">
            <input
                type="text"
                v-model="hour"
                placeholder="请选择时间"
                class="date-ipt"
                readonly
            />
        </p-mui-date-picker>

        <p>选择年月日小时分</p>
        <p-mui-date-picker @confirm="minConfirm" dateType="MIN">
            <input
                type="text"
                v-model="min"
                placeholder="请选择时间"
                class="date-ipt"
                disabled
            />
        </p-mui-date-picker>

        <p>选择年月日小时分秒</p>
        <p-mui-date-picker @confirm="sdConfirm" dateType="SECOND">
            <input
                type="text"
                v-model="sd"
                placeholder="请选择时间"
                class="date-ipt"
                disabled
            />
        </p-mui-date-picker>

        <p>自定义格式化</p>
        <p-mui-date-picker
            @confirm="timeConfirm"
            dateType="SECOND"
            format="YYYY年MM月DD日 HH时mm分ss秒"
        >
            <input
                type="text"
                v-model="time"
                placeholder="请选择时间"
                class="date-ipt"
                disabled
            />
        </p-mui-date-picker>

        <p>选择季度</p>
        <p-mui-date-picker @confirm="seasonConfirm" dateType="SEASON">
            <input
                type="text"
                v-model="season"
                placeholder="请选择时间"
                class="date-ipt"
                disabled
            />
        </p-mui-date-picker>
    </view>
</template>

<script>
export default {
    data() {
        return {
            date: '',
            year: '',
            month: '',
            hour: '',
            min: '',
            sd: '',
            time: '',
            season: ''
        };
    },
    methods: {
        dateConfirm(obj) {
            this.date = obj.time;
        },
        yearConfirm(obj) {
            this.year = obj.time;
        },
        monthConfirm(obj) {
            this.month = obj.time;
        },
        hourConfirm(obj) {
            this.hour = obj.time;
        },
        minConfirm(obj) {
            this.min = obj.time;
        },
        sdConfirm(obj) {
            this.sd = obj.time;
        },
        timeConfirm(obj) {
            this.time = obj.time;
        },
        seasonConfirm(obj) {
            this.season = obj.time;
        }
    }
};
</script>

<style lang="scss">
.date-ipt {
    height: 54rpx;
    border: 1px solid #227cfa;
    background: #fff;
    border-radius: 4rpx;
    line-height: 54rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #2c323f;
    text-indent: 0.281804rem;
    margin-bottom: 20rpx;
}
.main {
    background-color: #fff;
    padding: 20rpx;

    & > p {
        line-height: 54rpx;
    }
}
</style>
