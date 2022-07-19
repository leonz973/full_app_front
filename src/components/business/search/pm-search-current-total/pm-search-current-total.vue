<!-- @format -->

<!-- 当期、累计搜索 -->
<template>
    <div class="pm-search-current-total">
        <div class="select">
            <div class="date-ipt" readonly @click="visible = true">
                {{ timeData }}
            </div>
            <div class="button-box">
                <div
                    class="buttons"
                    :class="{ on: type == 'DQ' }"
                    @click="handleType('DQ')"
                >
                    当期
                </div>
                <div
                    class="buttons"
                    :class="{ on: type == 'LJ' }"
                    @click="handleType('LJ')"
                >
                    累计
                </div>
            </div>
        </div>
        <div class="uni-picker-container" v-show="visible">
            <div class="uni-mask"></div>
            <div class="uni-picker uni-picker-toggle">
                <div class="uni-picker-header">
                    <div
                        @click="cancel"
                        class="uni-picker-action uni-picker-action-cancel"
                    >
                        取消
                    </div>
                    <div
                        @click="confirm"
                        class="uni-picker-action uni-picker-action-confirm"
                    >
                        确定
                    </div>
                </div>
                <div class="uni-picker-content">
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
                        <picker-view-column>
                            <view
                                class="p-mui-date-picker-item"
                                v-for="(item, index) in months"
                                :key="index"
                                >{{ item }}月</view
                            >
                        </picker-view-column>
                    </picker-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pm-search-current-total',
    data() {
        const date = new Date();
        const years = [];
        const year = date.getFullYear();
        const months = [];
        const month = date.getMonth() + 1;

        for (let i = 1990; i <= date.getFullYear(); i++) {
            years.push(i);
        }
        for (let i = 1; i <= 12; i++) {
            months.push(i);
        }

        return {
            timeData: '',
            visible: false,
            type: 'DQ', //当期、累计
            indicatorStyle: `height: 50px;`,
            years,
            year,
            months,
            month,
            value: [year, month - 1]
        };
    },

    mounted() {
        this.confirm();
        this.handleType('DQ');
    },

    methods: {
        bindChange: function (e) {
            const val = e.detail.value;
            this.year = this.years[val[0]];
            this.month = this.months[val[1]];
        },

        confirm() {
            this.visible = false;
            let t = new Date(this.year, this.month - 1);
            let format = 'YYYY-MM-DD';
            let dateStr = this.$dayjs(t).format(format);

            this.timeData = this.year + '年' + this.month + '月';

            this.$emit('confirm', {
                time: dateStr,
                year: this.year,
                month: this.month
            });
        },

        cancel() {
            this.visible = false;
            this.$emit('cancel');
        },

        // 日期转为时间戳
        getMillisecond(date) {
            return new Date(date).getTime();
        },

        // 当期和累计
        handleType(val) {
            this.type = val;
            this.$emit('typeChange', this.type);
        }
    }
};
</script>

<style lang="scss" scoped>
.pm-search-current-total {
    background-color: #fff;
    padding: 12rpx 30rpx;
    border-bottom: 1px solid #dedede;
    .select {
        overflow: hidden;
        .date-ipt {
            position: relative;
            display: inline-block;
            color: #333;
            font-size: 32rpx;
            line-height: 60rpx;
            &::before {
                content: '';
                position: absolute;
                right: -30rpx;
                top: 20rpx;
                width: 0;
                height: 0;
                border-left: 14rpx solid transparent;
                border-right: 14rpx solid transparent;
                border-top: 14rpx solid #bebebe;
            }
        }
        .button-box {
            float: right;
            display: flex;
            .buttons {
                padding: 10rpx 40rpx;
                border: 1px solid #dddddd;
                border-radius: 50rpx;
                color: #666666;
                &:first-child {
                    margin-right: 18rpx;
                }
                &.on {
                    border-color: #167cf1;
                    background-color: #167cf1;
                    color: #fff;
                }
            }
        }
    }

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
