<!-- @format -->

<!-- 空气质量预报 -->
<template>
    <div class="p-air-quality-forecast">
        <!-- <div class="p-air-quality-forecast-title">
            <p class="til">{{ mData.qualityTitle }}</p>
        </div> -->
        <div class="p-air-quality-forecast-content">
            <!-- 表格排列样式 -->
            <div class="table-wrap" v-if="!config.airArrange">
                <div>
                    <u-table class="table-box" :border-color="'transparent'">
                        <u-tr class="u-thead">
                            <u-th>日期</u-th>
                            <u-th>AQI</u-th>
                            <u-th>首要污染物</u-th>
                        </u-tr>
                    </u-table>
                </div>
                <div v-if="airQualityData.length !== 0">
                    <u-table class="table-box" :border-color="'transparent'">
                        <u-tr
                            v-for="(item, index) in airQualityData"
                            :key="index"
                            class="u-tbody"
                        >
                            <u-td>{{ item.calcMonitorDate }}</u-td>
                            <u-td>
                                <view class="u-tbody-box">
                                    <i
                                        class="u-tbody-view"
                                        :style="{ color: item.startColor }"
                                        >{{ item.aqiMin }}</i
                                    >
                                    <em class="u-tbody-view">~</em>
                                    <i
                                        class="u-tbody-view"
                                        :style="{ color: item.endColor }"
                                        >{{ item.aqiMax }}</i
                                    >
                                </view>
                            </u-td>
                            <u-td>
                                <view class="u-tbody-box">
                                    <i class="u-tbody-view">{{
                                        item.maxItem
                                    }}</i>
                                    <!-- <i
                                        class="u-tbody-view"
                                        v-for="(polls,
                                        _index) in item.maxItem"
                                        :key="_index"
                                        >{{ polls
                                        }}{{
                                            _index === item.maxItem.length - 1
                                                ? ''
                                                : '、'
                                        }}</i
                                    > -->
                                </view>
                            </u-td>
                        </u-tr>
                    </u-table>
                </div>

                <!-- 无数据显示 -->
                <div v-else class="empty">
                    <pm-stateless-no-message
                        :data="dataImg"
                    ></pm-stateless-no-message>
                    <!-- <img src="../../images/empty.png" /> -->
                </div>
            </div>

            <!-- 展示3天的优良率 -->
            <div class="quality-box" id="quality-box" v-if="config.airArrange">
                <div v-if="airQualityData.length !== 0" class="quality-box-all">
                    <div
                        class="quality-index"
                        v-for="(item, index) in airQualityData"
                        :key="index"
                    >
                        <div class="quality-index-date">
                            {{ item.calcMonitorDate }}
                        </div>
                        <div class="quality-index-num">
                            {{ item.aqiMin }}
                            <em>~</em>
                            {{ item.aqiMax }}
                        </div>
                        <div class="quality-index-radio">
                            <div
                                v-if="
                                    item.startLevel.levelName ===
                                    item.endLevel.levelName
                                "
                            >
                                <i :style="{ background: item.startColor }">{{
                                    item.startLevel.levelName
                                }}</i>
                            </div>
                            <div v-else>
                                <i :style="{ background: item.startColor }">{{
                                    item.startLevel.levelName
                                }}</i>
                                <em>~</em>
                                <i :style="{ background: item.endColor }">{{
                                    item.endLevel.levelName
                                }}</i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 无数据显示 -->
                <div v-else class="empty">
                    <p-mui-stateless-no-message
                        :data="dataImg"
                    ></p-mui-stateless-no-message>
                    <!-- <img src="../../images/empty.png" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pollutantUtils from '../../utils/pollutant_utils.js';
import { replacePltName } from '../../utils/utils.js';
export default {
    name: 'pm-air-quality-forecast',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    // qualityTitle: '空气质量预报', // 空气质量预报标题
                    qualityData: [] // 空气质量数据
                };
            }
        },

        config: {
            type: Object,
            default: () => {
                // 空气质量展示:false 表格排列样式 , true 展示3天的优良率
                return {
                    airArrange: false
                };
            }
        }
    },
    data() {
        return {
            airQualityData: [], //空气质量数据
            dataImg: {
                imgSrc: require('../../images/empty.png')
            } //无数据图片路径
        };
    },

    computed: {
        mData() {
            return Object.assign(
                {
                    // qualityTitle: '空气质量预报', // 空气质量预报标题
                    qualityData: [] // 空气质量数据
                },
                this.data
            );
        },
        mConfig() {
            return Object.assign(
                {
                    airArrange: false
                },
                this.config
            );
        }
    },

    watch: {
        'data.qualityData': {
            handler: function () {
                this.init();
            }
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.airQualityData = [];
            this.airQualityData = this.mData.qualityData.map((item) => {
                // 给数组加上颜色
                item.startLevel = pollutantUtils.getWrwLevel(
                    'AQI',
                    item.aqiMin
                );
                item.endLevel = pollutantUtils.getWrwLevel('AQI', item.aqiMax);
                item.startColor = item.startLevel.color;
                item.endColor = item.endLevel.color;

                // 给污染物转下标
                item.maxItem = replacePltName(item.maxItem);
                // item.maxItem = item.maxItem.map(poll => {
                //     return replacePltName(poll);
                // });

                return item;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.p-air-quality-forecast {
    margin-bottom: 18rpx;
    padding-bottom: 18rpx;
    // .p-air-quality-forecast-title {
    //     // background-color: #fff;
    //     display: flex;
    //     justify-content: space-between;
    //     height: 90rpx;
    //     padding: 0 24rpx;
    //     border-bottom: 1px solid #e1e1e1;
    //     p {
    //         color: #333;
    //         font-size: 30rpx;
    //         line-height: 90rpx;
    //     }
    // }

    .p-air-quality-forecast-content {
        // 表格排列样式
        .table-wrap {
            // background-color: #fff;

            /*  #ifdef  MP-WEIXIN  */
            /* 仅在微信显示 */
            & > view:first-child {
                padding-bottom: 0;
            }

            & > view {
                padding: 0 24rpx 40rpx;
            }
            /*  #endif  */

            /*  #ifdef  APP-PLUS || H5   */
            /* 仅在app平台显示 */
            & > div:last-child .table-box {
                padding-bottom: 40rpx;
            }
            /*  #endif  */

            .table-box {
                width: 100%;

                .u-th {
                    font-size: 28rpx;
                    color: #333;
                    font-weight: 700;
                    background-color: #fff !important;
                }

                .u-td {
                    color: #333;
                    text-align: center;
                    display: flex;
                    .u-tbody-box .u-tbody-view {
                        display: inline-block;
                    }
                    em {
                        margin: 0 6rpx;
                    }
                }
                .u-tr {
                    margin: 0 24rpx;
                    &:nth-of-type(2n-1) {
                        background-color: #f7f7f7;
                    }
                }
            }
        }

        //  展示3天的优良率样式
        .quality-box > .quality-box-all {
            // background-color: #fff;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 10rpx 24rpx 20rpx;
            .quality-index {
                width: 30%;
                // margin: 0 5%;
                padding: 12rpx 0;
                text-align: center;
                .quality-index-date {
                    color: #333;
                    font-size: 30rpx;
                }
                .quality-index-num {
                    font-size: 26rpx;
                    color: #666;
                    line-height: 50rpx;
                    display: flex;
                    justify-content: center;
                }
                .quality-index-radio {
                    color: #666;
                    & > div {
                        display: flex;
                        justify-content: center;
                    }
                    i {
                        color: #fff;
                        display: inline-block;
                        padding: 8rpx 12rpx;
                        border-radius: 6rpx;
                    }
                    em {
                        margin: 0 6rpx;
                    }
                }
            }
        }
    }
}
</style>
<style>
.u-tbody-box .u-tbody-view {
    display: inline-block;
}

/*
.table-box u-tr.u-thead u-th .u-th {
    background-color: #fff !important;
} */

.table-box u-tr.u-tbody:nth-of-type(2n-1) u-td {
    background-color: #f7f7f7 !important;
}

.empty {
    background-color: #f4f5f6;
}
</style>
