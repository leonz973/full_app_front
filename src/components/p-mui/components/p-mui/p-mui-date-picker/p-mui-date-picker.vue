<!-- @format -->

<template>
    <view class="p-mui-date-picker">
        <view @click="visible = true">
            <slot></slot>
        </view>

        <view class="uni-picker-container" v-show="visible">
            <view class="uni-mask"></view>
            <view class="uni-picker uni-picker-toggle">
                <view class="uni-picker-header">
                    <view
                        @click="cancel"
                        class="uni-picker-action uni-picker-action-cancel"
                    >
                        取消
                    </view>
                    <view
                        @click="confirm"
                        class="uni-picker-action uni-picker-action-confirm"
                    >
                        确定
                    </view>
                </view>
                <view class="uni-picker-content">
                    <picker-view
                        :indicator-style="indicatorStyle"
                        :value="value"
                        @change="bindChange"
                        class="picker-view"
                    >
                        <picker-view-column>
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(item, index) in years"
                                :key="index"
                                >{{ item }}年</view
                            >
                        </picker-view-column>
                        <picker-view-column
                            v-show="
                                dateType !== 'YEAR' && dateType !== 'SEASON'
                            "
                        >
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(item, index) in months"
                                :key="index"
                                >{{ item }}月</view
                            >
                        </picker-view-column>
                        <picker-view-column
                            v-show="
                                dateType === 'DAY' ||
                                dateType === 'HOUR' ||
                                dateType === 'MIN' ||
                                dateType === 'SECOND'
                            "
                        >
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(n, idx) in daysNum"
                                :key="idx"
                                >{{ idx + 1 }}日</view
                            >
                        </picker-view-column>
                        <picker-view-column
                            v-show="
                                dateType === 'HOUR' ||
                                dateType === 'MIN' ||
                                dateType === 'SECOND'
                            "
                        >
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(h, idx) in 24"
                                :key="idx"
                                >{{ idx }}时</view
                            >
                        </picker-view-column>
                        <picker-view-column
                            v-show="dateType === 'MIN' || dateType === 'SECOND'"
                        >
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(m, idx) in 60"
                                :key="idx"
                                >{{ idx }}分</view
                            >
                        </picker-view-column>
                        <picker-view-column v-show="dateType === 'SECOND'">
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(s, idx) in 60"
                                :key="idx"
                                >{{ idx }}秒</view
                            >
                        </picker-view-column>
                        <picker-view-column v-show="dateType === 'SEASON'">
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(j, idx) in 4"
                                :key="idx"
                                >{{ idx + 1 }}季度</view
                            >
                        </picker-view-column>
                    </picker-view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        dateType: {
            type: String,
            default: 'DAY'
        },
        format: {
            type: String,
            default: ''
        }
    },
    data: function () {
        const date = new Date();
        const years = [];
        const year = date.getFullYear();
        const months = [];
        const month = date.getMonth() + 1;
        const days = [];
        const day = date.getDate();
        for (let i = 1990; i <= date.getFullYear(); i++) {
            years.push(i);
        }
        for (let i = 1; i <= 12; i++) {
            months.push(i);
        }
        for (let i = 1; i <= 31; i++) {
            days.push(i);
        }

        return {
            visible: false,
            title: 'picker-view',
            years,
            year,
            months,
            month,
            days,
            day,
            hour: 0,
            min: 0,
            sd: 0,
            season: 1,
            value: [year, month - 1, 0, 0, 0, 0, 0],
            indicatorStyle: `height: 50px;`,
            formatObj: {
                YEAR: 'YYYY',
                MONTH: 'YYYY-MM',
                DAY: 'YYYY-MM-DD',
                HOUR: 'YYYY-MM-DD HH',
                MIN: 'YYYY-MM-DD HH:mm',
                SECOND: 'YYYY-MM-DD HH:mm:ss'
            }
        };
    },
    computed: {
        daysNum() {
            let t = new Date(this.year, this.month - 1);
            return this.$dayjs(t).daysInMonth();
        }
    },
    mounted() {
        this.$set(this.value, 2, this.day - 1);
    },
    methods: {
        bindChange: function (e) {
            const val = e.detail.value;
            this.year = this.years[val[0]];
            this.month = this.months[val[1]];
            this.day = this.days[val[2]];
            this.hour = val[3];
            this.min = val[4];
            this.sd = val[5];
            this.season = val[6] + 1;
        },
        confirm() {
            this.visible = false;
            if (this.dateType === 'SEASON') {
                let format = this.format || 'YYYY-J';
                let dateStr = this.year + '年' + this.season + '季度';
                this.$emit('confirm', {
                    time: dateStr,
                    year: this.year,
                    season: this.season
                });
            } else {
                let t = new Date(
                    this.year,
                    this.month - 1,
                    this.day,
                    this.hour,
                    this.min,
                    this.sd
                );
                let format =
                    this.format ||
                    this.formatObj[this.dateType] ||
                    'YYYY-MM-DD';
                let dateStr = this.$dayjs(t).format(format);
                this.$emit('confirm', {
                    time: dateStr,
                    year: this.year,
                    month: this.month,
                    day: this.day,
                    hour: this.hour,
                    min: this.min,
                    second: this.sd
                });
            }
        },
        cancel() {
            this.visible = false;
            this.$emit('cancel');
        }
    }
};
</script>

<style lang="scss">
.p-mui-date-picker {
    .uni-picker-container {
        display: block;
        &[hidden] {
            display: none;
        }
        .uni-mask {
            z-index: 9;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.1);
        }

        .uni-picker-header {
            display: block;
            position: relative;
            text-align: center;
            width: 100%;
            height: 90rpx;
            background-color: #fff;
            border-bottom: 1px solid #e5e5e5;
        }
        .uni-picker-action {
            display: block;
            max-width: 50%;
            top: 0;
            height: 100%;
            box-sizing: border-box;
            padding: 0 28rpx;
            font-size: 34rpx;
            line-height: 90rpx;
            overflow: hidden;
            cursor: pointer;
        }
        .uni-picker-action-cancel {
            float: left;
            color: #888;
        }
        .uni-picker-action-confirm {
            float: right;
            color: #007aff;
        }

        .uni-picker {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 99;
            background: #fff;
        }

        .picker-view {
            width: 750rpx;
            height: 600rpx;
            margin-top: 20rpx;

            .p-mui-date-picker-item {
                align-items: center;
                justify-content: center;
                text-align: center;
                display: flex;
            }
        }
    }
}
</style>
