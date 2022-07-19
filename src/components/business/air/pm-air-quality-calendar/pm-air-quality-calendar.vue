<!-- @format -->

<!-- 空气质量日历 -->
<template>
    <div class="p-air-quality-calendar">
        <div class="you-fixtabs">
            <div class="sel-group">
                <div class="you-select">
                    <timeSelector showType="yearToMonth" @btnConfirm="setDate">
                        <p>{{ date }}</p>
                    </timeSelector>
                </div>
                <div class="you-select">
                    <picker
                        @change="pltChange"
                        :value="pltIdx"
                        :range="pltOpts"
                        range-key="label"
                    >
                        <p v-html="replaceName(plt.value)"></p>
                    </picker>
                </div>
            </div>
        </div>
        <div class="main-box">
            <div class="inner">
                <div>
                    <pmAirCalender
                        :dataArr="mData.aqiDate"
                        :pollutionId="plt.value"
                        :initDate="date"
                        @dateChange="updateDetailData"
                        ref="timeCal"
                    ></pmAirCalender>
                </div>
                <div class="tuli">
                    <img :src="pollutantSrc" alt="" />
                </div>
                <div class="info">
                    <div
                        class="lp"
                        :style="{ backgroundColor: curData.color || '#ccc' }"
                        :class="{ 'is-light': curData.aqi <= 100 }"
                    >
                        <p class="p1">-AQI-</p>
                        <p class="p2">{{ curData.aqi }}</p>
                        <p class="p3">{{ curData.itemObj.aqiLevel || '-' }}</p>
                    </div>
                    <div class="rp">
                        <div class="line1">
                            <div class="local">{{ mData.city }}</div>
                            <div class="date">
                                {{ curData.itemObj.monitorDate }}
                            </div>
                        </div>
                        <div class="line2">
                            首要污染物：
                            <span
                                v-html="replaceName(curData.itemObj.maxItem)"
                            ></span>
                        </div>
                        <div class="line3">
                            <div
                                class="box"
                                v-for="(item, index) in pltOpts.slice(1)"
                                :key="index"
                            >
                                <span
                                    class="s1"
                                    v-html="replaceName(item.value)"
                                ></span>
                                {{
                                    curData.itemObj[item.value.toLowerCase()] ||
                                    ''
                                }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tip">{{ countStr }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import pmAirCalender from './pm-air-calendar.vue';
import timeSelector from '../../../wing-time-selector.vue';
import calenderUtils from '../../utils/calendar_utils';
export default {
    name: 'pm-air-quality-calendar',
    components: {
        pmAirCalender,
        timeSelector
    },
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    city: '', //城市名
                    aqiDate: []
                };
            }
        }
    },

    data() {
        return {
            replaceName: calenderUtils.replacePltLabel,
            curData: {
                itemObj: {}
            },
            date: '',
            year: '',
            pltIdx: 0,
            pltOpts: [
                {
                    label: 'AQI',
                    value: 'AQI'
                },
                {
                    label: 'PM₂.₅',
                    value: 'PM25'
                },
                {
                    label: 'PM₁₀',
                    value: 'PM10'
                },
                {
                    label: 'O₃',
                    value: 'O3'
                },
                {
                    label: 'SO₂',
                    value: 'SO2'
                },
                {
                    label: 'NO₂',
                    value: 'NO2'
                },
                {
                    label: 'CO',
                    value: 'CO'
                }
            ],
            pollutantSrc: ''
        };
    },

    computed: {
        mData() {
            return Object.assign(
                {
                    city: '', //城市名
                    aqiDate: []
                },
                this.data
            );
        },
        plt() {
            switch (this.pltIdx) {
                case 0:
                    this.pollutantSrc = require('./image/aircalendar-aqi.png');
                    break;
                case 1:
                    this.pollutantSrc = require('./image/aircalendar-pm25.png');
                    break;
                case 2:
                    this.pollutantSrc = require('./image/aircalendar-pm10.png');
                    break;
                case 3:
                    this.pollutantSrc = require('./image/aircalendar-o3.png');
                    break;
                case 4:
                    this.pollutantSrc = require('./image/aircalendar-so2.png');
                    break;
                case 5:
                    this.pollutantSrc = require('./image/aircalendar-no2.png');
                    break;
                case 6:
                    this.pollutantSrc = require('./image/aircalendar-co.png');
                    break;
            }
            return this.pltOpts[this.pltIdx];
        },
        countStr() {
            let date = this.curData.itemObj.monitorDate;
            let pltKey = this.plt.value.toLowerCase();
            let pltLabel = this.plt.label;
            if (!date || this.mData.aqiDate.length === 0) {
                return '-';
            }
            let key = pltKey === 'aqi' ? pltKey : pltKey + 'Iaqi';
            let total = 0;
            let goodTotal = 0; //优良
            let lightPlt = 0; //轻度及以上
            let QDWR = 0; //轻度污染
            let MDWR = 0; //中度污染
            let ZDWR = 0; //重度污染
            let YZWR = 0; //严重污染
            for (let i = 0; i < this.mData.aqiDate.length; i++) {
                let item = this.mData.aqiDate[i];
                let val = item[key];
                if (val <= 100) {
                    goodTotal += 1;
                } else if (val <= 150) {
                    QDWR += 1;
                    lightPlt += 1;
                } else if (val <= 200) {
                    MDWR += 1;
                    lightPlt += 1;
                } else if (val <= 300) {
                    ZDWR += 1;
                    lightPlt += 1;
                } else if (val > 300) {
                    YZWR += 1;
                    lightPlt += 1;
                }
                if (item.monitorDate === date) {
                    total = i + 1;
                    break;
                }
            }
            let dateStr = this.$dayjs(date).format('YYYY年M月D日');
            let goodRate = ((100 * goodTotal) / total).toFixed(1);
            let str = `${dateStr.slice(0, 5)}截至${dateStr.slice(5)}${
                this.data.city
            }`;
            if (pltKey === 'aqi') {
                str += `优良天数占比${goodRate}%，轻度污染以上${lightPlt}天`;
            } else {
                str += `${pltLabel}轻度污染${QDWR}天，中度污染${MDWR}天，重度污染${ZDWR}天，严重污染${YZWR}天`;
            }

            return str;
        }
    },
    watch: {
        // year: 'getData',
    },
    mounted() {
        this.date = this.$dayjs().format('YYYY-MM');
        this.year = this.date.slice(0, 4);

        this.$emit('pollutantChange', this.pltOpts[0]);
        this.$emit('dateChange', this.date);
    },
    methods: {
        //  日历单个点击
        updateDetailData(obj) {
            this.curData = obj;
        },

        // 污染物切换
        pltChange(e) {
            this.pltIdx = e.target.value;

            this.$emit('pollutantChange', this.pltOpts[this.pltIdx]);
        },

        // 日期切换
        setDate(obj) {
            this.date = obj.key;
            this.year = this.date.slice(0, 4);

            this.$emit('dateChange', this.date);
        }
    }
};
</script>

<style lang="less" scoped>
.p-air-quality-calendar {
    .you-fixtabs {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;

        .sel-group {
            display: flex;
            background-color: #fff;
            .you-select {
                flex: 1;
                background: none;
                height: 72.4635rpx;
                display: flex;
                justify-content: center;
                p {
                    border: none;
                    line-height: 72.4635rpx;
                    display: inline-block;
                    padding: 0 28.3815rpx;
                    background: url(./image/ic-arrow-down.png) right center
                        no-repeat;
                    background-size: 16.3042rpx;
                    font-size: 32rpx;
                    color: #333333;
                }
                ul {
                    li {
                        text-align: center;
                        padding: 0;
                    }
                }
            }
        }
    }

    .main-box {
        /*  #ifdef  APP-PLUS || H5   */
        /* 仅在app平台显示 */
        height: calc(100vh - 90rpx);
        /*  #endif  */

        /*  #ifdef  MP-WEIXIN  */
        /* 仅在微信显示 */
        height: calc(100vh);
        /*  #endif  */

        overflow: auto;
        .inner {
            padding-top: 90rpx;
            // padding-top: 0;
            padding-bottom: 0;
            .tuli {
                margin: 30rpx 0;
                img {
                    width: 100%;
                    height: 100rpx;
                }
            }

            .info {
                display: flex;
                height: 232.4872rpx;
                .lp {
                    flex: 1;
                    height: 100%;
                    background-color: #24bd5d;
                    .p1 {
                        line-height: 68.2364rpx;
                        font-size: 24.1545rpx;
                        color: #fff;
                        text-align: center;
                        padding-top: 8.454rpx;
                    }
                    .p2 {
                        line-height: 79.7099rpx;
                        font-size: 60.3862rpx;
                        color: #fff;
                        text-align: center;
                    }
                    .p3 {
                        width: 67.6327rpx;
                        //   height: 31.4002rpx;
                        border-radius: 15.6997rpx;
                        background-color: rgba(255, 255, 255, 0.5);
                        font-size: 22.9462rpx;
                        color: #fff;
                        text-align: center;
                        margin: 0 auto;
                    }
                }
                .rp {
                    flex: 3;
                    height: 100%;
                    background-color: #fff;
                    .line1 {
                        padding-top: 13.8885rpx;
                        height: 51.9322rpx;
                        .local {
                            padding-left: 52.536rpx;
                            line-height: 51.9322rpx;
                            font-size: 28.9852rpx;
                            color: #333333;
                            font-weight: 700;
                            background: url(./image/local2.png) 18.7192rpx
                                center no-repeat;
                            background-size: 18.7192rpx;
                            float: left;
                        }
                        .date {
                            float: right;
                            font-size: 24.1545rpx;
                            color: #999;
                            padding-right: 19.3229rpx;
                            line-height: 51.9322rpx;
                        }
                    }
                    .line2 {
                        height: 48.309rpx;
                        line-height: 48.309rpx;
                        font-size: 26.5695rpx;
                        color: #666;
                        padding-left: 50.1202rpx;
                        margin-bottom: 13.8885rpx;
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                    }
                    .line3 {
                        padding-left: 50.1202rpx;
                        .box {
                            width: 33%;
                            height: 43.4782rpx;
                            float: left;
                            color: #333;
                            font-size: 25.362rpx;
                            line-height: 43.4782rpx;
                            span {
                                em {
                                    font-size: 21.7387rpx;
                                    vertical-align: center;
                                }
                            }
                            .s1 {
                                float: left;
                                width: 82.125rpx;
                                font-size: 25.362rpx;
                                color: #999;
                                line-height: 43.4782rpx;
                            }
                            .s2 {
                                float: left;
                                width: 65.217rpx;
                                font-size: 25.362rpx;
                                color: #999;
                                line-height: 43.4782rpx;
                            }
                        }
                        .box1 {
                            width: 187.1977rpx;
                        }
                        .box2 {
                            width: 197.4637rpx;
                        }
                    }
                }
            }

            .tip {
                font-size: 26.57rpx;
                color: #666;
                line-height: 42.2705rpx;
                padding: 24.1545rpx 48.3091rpx;
                padding-right: 24.1545rpx;
                background-color: #fff;
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    width: 10.8696rpx;
                    height: 10.8696rpx;
                    background-color: #178cfb;
                    border-radius: 50%;
                    top: 39.855rpx;
                    left: 24.1545rpx;
                }
            }
        }
    }

    /deep/ sub {
        font-size: 16rpx;
        vertical-align: sub !important;
        display: inline-block;
        transform: scale(0.8);
    }
}
</style>
