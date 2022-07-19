<!-- @format -->

<!-- 实时空气质量 -->
<template>
    <div class="pm-air-current-quality">
        <div class="pm-air-current-quality-title">
            <slot name="title"></slot>
            <p class="p2">更新时间：{{ time }}</p>
        </div>
        <!-- echarts 图 -->
        <div class="pm-air-current-quality-echarts">
            <div :style="{ background: colorBg }">
                <div class="airEcharts">
                    <l-echart ref="airEcharts"></l-echart>
                    <!-- <div id="airEcharts" class="airEcharts"></div> -->
                </div>
                <p class="shouyao">首要污染物：{{ pollutant }}</p>
            </div>
        </div>

        <!-- 各污染物浓度指数 -->
        <div class="pm-air-current-quality-content">
            <div class="pm-air-current-quality-tips">{{ mData.tips }}</div>

            <!-- 污染物展示方法 false 是 单位统一写一个地方 -->
            <div v-if="!mConfig.showFlag">
                <div class="pm-air-current-quality-main">
                    <div v-for="(item, index) in pollData" :key="index">
                        {{ item.name }}
                        <i :style="{ color: item.color }">{{ item.value }}</i>
                    </div>
                </div>
                <div class="pm-air-current-quality-unit">
                    <span>单位：μg/m³(CO:mg/m³）</span>
                </div>
            </div>

            <!-- 污染物展示方法 true是每个都带单位-->
            <div v-if="mConfig.showFlag" class="air-factor">
                <div
                    class="factor"
                    v-for="(item, index) in pollData"
                    :key="index"
                >
                    <em>{{ item.value }}</em>
                    <i>{{ item.name === 'CO' ? 'mg/m³' : 'μg/m³' }}</i>
                    <p>
                        <b
                            :style="{
                                width: item.height,
                                background: item.color
                            }"
                        ></b>
                    </p>
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pollutantUtils from '../../utils/pollutant_utils.js';
import { replacePltName } from '../../utils/utils.js';
import * as echarts from 'lime-echart/components/lime-echart/echarts';
export default {
    name: 'pm-air-current-quality',
    data() {
        return {
            pollutantList: ['PM25', 'PM10', 'O3', 'NO2', 'SO2', 'CO'], //污染物数组
            colorLevel: [
                '#24bd5d',
                '#d8bc37',
                '#f87c12',
                '#f60000',
                '#94004b',
                '#6f001f'
            ], //污染物浓度色值
            colorBg: '', //echarts 图的背景色
            pollutant: '', //首要污染物(转换下标后的值)
            pollData: [], //各污染物浓度
            // dataAQI: 0, // aqi污染指数
            time: '', // 更新时间
            pollutantObj: {}
        };
    },
    props: {
        data: {
            type: Object,
            // required:true,

            default: () => {
                return {
                    tips: '健康提示：极少数异常敏感人群应减少户外活动。', // 提示
                    pollutantData: [] // 污染物指数
                };
            }
        },
        config: {
            type: Object,
            default: () => {
                return {
                    // 污染物展示方法 true是每个都带单位，false 是 单位统一写一个地方
                    showFlag: false
                };
            }
        }
    },
    computed: {
        mData() {
            return Object.assign(
                {
                    tips: '健康提示：极少数异常敏感人群应减少户外活动。',
                    pollutantData: []
                },
                this.data
            );
        },
        mConfig() {
            return Object.assign(
                {
                    showFlag: false
                },
                this.config
            );
        }
    },
    watch: {
        data: {
            handler: function () {
                this.init();
                this.handlePollutant();
            },
            deep: true
        }
    },
    mounted() {
        if (this.mData.pollutantData.length !== 0) {
            this.init();
            this.handlePollutant();
        }
    },
    methods: {
        init() {
            // 转换下标
            this.pollutant = replacePltName(this.mData.pollutantData.maxItem);
            this.time = this.mData.pollutantData[0].monitorDate;

            this.pollutantObj = {};
            this.mData.pollutantData.forEach((item) => {
                /* 把所有键转大写 */
                let obj = item;
                let tempKey, currentValue, upperCase;

                for (let i in obj) {
                    currentValue = obj[i];
                    upperCase = i.toUpperCase();
                    tempKey = upperCase;
                    this.pollutantObj[tempKey] = currentValue;
                }
            });

            // echarts
            let data = this.pollutantObj.AQI;
            let max = 500 - Number(data);
            let level = pollutantUtils.getWrwLevel('AQI', data);
            this.colorBg = this.colorLevel[level.level - 1];

            let option = {
                title: [
                    {
                        text: '-AQI-',
                        top: '20%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        }
                    },
                    {
                        text: pollutantUtils.level[level.level],
                        bottom: '20%',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        }
                    }
                ],
                color: [
                    '#fff',
                    'rgba(255,255,255,0.5)',
                    'rgba(255,255,255,0.2)'
                ],
                series: [
                    {
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['76%', '80%'],
                        hoverAnimation: false,
                        data: [
                            {
                                name: '',
                                value: max,
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(255,255,255,0.2)'
                                    }
                                },
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false,
                                    emphasis: {
                                        show: false
                                    }
                                }
                            },
                            {
                                name: '',
                                value: data,
                                itemStyle: {
                                    normal: {
                                        color: '#fff'
                                    }
                                },
                                startAngle: 0,
                                label: {
                                    show: true,
                                    position: 'center',
                                    color: '#fff',
                                    fontSize: 38,
                                    fontWeight: 'bold',
                                    formatter: function (o) {
                                        return data;
                                    }
                                },
                                labelLine: {
                                    show: false,
                                    emphasis: {
                                        show: false
                                    }
                                }
                            }
                        ]
                    }
                ]
            };

            this.$refs.airEcharts.init((config) => {
                const { canvas } = config;
                const chart = echarts.init(canvas, null, config);
                chart.setOption(option);
                return chart;
            });

            // let myChart = echarts.init(document.getElementById('airEcharts'));

            // option && myChart.setOption(option);
        },

        // 污染物数据
        handlePollutant() {
            this.pollData = this.pollutantList.map((item) => {
                let pData = {};
                pData.name = replacePltName(item);
                pData.value = this.pollutantObj[item];
                pData.level = pollutantUtils.getWrwLevel('AQI', pData.value);
                pData.color = this.colorLevel[pData.level.level - 1];
                pData.height = (pData.level.level / 6) * 100 + '%';
                return pData;
            });
        }
    }
};
</script>

<style lang="scss">
.pm-air-current-quality {
    // background-color: #fff;
    .pm-air-current-quality-title {
        padding: 12rpx 0;
        text-align: center;
        position: relative;

        ::v-deep .p1 {
            font-size: 29rpx;
            line-height: 50rpx;
            color: #333;
        }

        .p2 {
            font-size: 24rpx;
            line-height: 45rpx;
            color: #999999;
        }
    }

    .pm-air-current-quality-echarts {
        & > div {
            margin: 0 18rpx;
            padding-bottom: 18rpx;
            border-radius: 12rpx;
            position: relative;
            border-radius: 12rpx;

            .airEcharts {
                width: 100%;
                height: 320rpx;
            }
        }

        ::v-deep .shouyao {
            font-size: 28rpx;
            line-height: 48rpx;
            color: #fff;
            text-align: center;
        }
    }

    .pm-air-current-quality-content {
        // background: #fff;
        padding: 18rpx 0;
        .pm-air-current-quality-tips {
            background: url(./image/lmpic1.png) no-repeat 0.289855rem center;
            background-size: 24rpx 24rpx;
            color: #333333;
            padding-left: 58rpx;
            font-size: 24rpx;
        }

        // 污染物浓度指数 单位统一放一处的样式
        .pm-air-current-quality-main {
            display: flex;
            flex-wrap: wrap;
            & > div {
                width: 33.33%;
                overflow: hidden;
                padding: 18rpx 36rpx;
                box-sizing: border-box;
                position: relative;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 1px;
                    height: 0.322061rem;
                    transform: translateY(-50%);
                    background: #ddd;
                }
                &:nth-child(3n + 1) {
                    padding-left: 21rpx;
                }
                &:nth-child(3n + 1):before {
                    content: '';
                    display: none;
                }

                i {
                    font-size: 27rpx;
                    color: #2c323f;
                    float: right;
                }
            }
        }
        .pm-air-current-quality-unit {
            display: flex;
            justify-content: flex-end;
            padding-right: 18rpx;
        }

        // 污染物浓度指数 每个都带单位的样式
        .air-factor {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 9rpx 0;
            .factor {
                width: 20%;
                margin: 0 5%;
                padding: 12rpx 0;
                em {
                    font-size: 28rpx;
                    color: #121212;
                    float: left;
                }

                i {
                    font-size: 22rpx;
                    color: #999;
                    float: right;
                }

                p {
                    height: 6rpx;
                    border-radius: 300px;
                    background: #f2f2f2;
                    position: relative;
                    clear: both;
                    overflow: hidden;
                    b {
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                    }
                }

                span {
                    font-size: 26rpx;
                    color: #121212;
                }
            }
        }
    }
}
</style>
