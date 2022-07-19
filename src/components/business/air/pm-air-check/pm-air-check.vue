<!-- @format -->

<!-- 考核 -->
<template>
    <div class="pm-air-check">
        <div
            class="pm-air-check-box"
            v-for="(item, index) in mData.title"
            :key="index"
        >
            <div class="pm-air-check-title">
                <div class="til">
                    <div class="til-title">
                        <i>{{ item.name }}</i>
                        <i class="unit" v-if="item.show">（单位：μg/m³）</i>
                    </div>
                    <span>截至{{ item.show ? air.pmTime : air.rateTime }}</span>
                </div>
            </div>

            <div
                v-if="
                    item.value !== undefined &&
                    item.value !== null &&
                    item.value.length > 0
                "
            >
                <div class="chart-content">
                    <div class="air-chart">
                        <l-echart
                            ref="barEcharts"
                            style="width: 100%; height: 100%"
                        ></l-echart>
                        <!-- <div :id="'barEcharts' + index" style="width: 100%; height: 100%"></div> -->
                    </div>
                </div>
            </div>

            <!-- 无数据显示 -->
            <div v-else class="empty">
                <p-mui-stateless-no-message
                    :data="dataImg"
                ></p-mui-stateless-no-message>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'lime-echart/components/lime-echart/echarts';
export default {
    name: 'pm-air-check',
    props: {
        data: {
            checkData: { goodData: [], pm25Data: [] }, //考核数据

            title: [
                //标题
                { name: '优良天数占比考核', show: false }, //show表示单位的显示
                { name: 'PM2.5考核', show: true } //show表示单位的显示
            ]
        }
    },
    data() {
        return {
            air: {
                rateTime: '', //优良率时间
                rate_data: [21, 22, 15, 8], //优良率数据
                rateStrand: '',
                pm_data: [21, 22, 15, 8], //pm25数据
                pmTime: '', ////pm25时间
                pmStrand: '',
                color: ['#57C2F4', '#52D68E', '#F0CB5B', '#F8807F']
            },
            dataImg: {
                imgSrc: require('../../images/empty.png')
            }
        };
    },
    watch: {
        data: {
            handler: function () {
                this.init();
            },
            deep: true
        }
    },
    computed: {
        mData() {
            return Object.assign(
                {
                    checkData: { goodData: [], pm25Data: [] }, //考核数据
                    title: [
                        { name: '优良天数占比考核', show: false },
                        { name: 'PM2.5考核', show: true }
                    ]
                },
                this.data
            );
        }
    },
    mounted() {
        if (JSON.stringify(this.mData.checkData) !== '{}') {
            this.init();
        }
    },
    methods: {
        init() {
            // 获取数据
            let goodMsg = this.mData.checkData.goodData;
            let pmMsg = this.mData.checkData.pm25Data;

            this.mData.title[0] = Object.assign(this.mData.title[0], {
                value: goodMsg
            });
            this.mData.title[1] = Object.assign(this.mData.title[1], {
                value: pmMsg
            });

            // 优良天数
            if (
                goodMsg !== undefined &&
                goodMsg !== null &&
                goodMsg.length > 0
            ) {
                this.air.rateTime = goodMsg[0].endDate;
                this.air.rateStrand = goodMsg[0].goodRateUpStandard;
                goodMsg.forEach((item) => {
                    this.air.rate_data = [
                        item.goodRate,
                        item.goodRateMBZ,
                        item.goodRateTB,
                        item.overDays
                    ];
                });

                this.handlerEcharts(
                    this.air.rate_data,
                    0,
                    false,
                    this.air.rateStrand
                );
            }

            // PM2.5考核
            if (pmMsg !== undefined && pmMsg !== null && pmMsg.length > 0) {
                // 获取截止时间
                this.air.pmTime = pmMsg[0].endDate;

                // 获取是否达标
                this.air.pmStrand = pmMsg[0].pm25UpStandard;

                // 获取data数据
                pmMsg.forEach((item) => {
                    this.air.pm_data = [
                        item.pm25,
                        item.pm25MBZ,
                        item.pm25TB,
                        item.overDays
                    ];
                });

                // echarts
                // 如果优良率没有数据 则index为0，反之为1
                let index = 1;
                if (!goodMsg.length > 0) {
                    index = 0;
                }
                this.handlerEcharts(
                    this.air.pm_data,
                    index,
                    true,
                    this.air.pmStrand
                );
            }
        },

        handlerEcharts(data, index, flag, stand) {
            let color = this.air.color;
            let xdata = [];
            let normal = {};
            //   let mark = {}

            // 优良率
            if (!flag) {
                xdata = ['累计值', '目标值', '去年同期', '污染控制天数'];
                normal = {
                    textStyle: {
                        color: '#666'
                    },
                    show: true,
                    position: 'top',
                    offset: [0, -15],
                    formatter: function (item) {
                        if (item.value == '-') {
                            return '未设定';
                        }

                        if (item.name == '污染控制天数') {
                            return item.value + '天';
                        } else {
                            return item.value + '%';
                        }
                    }
                };
            } else {
                //pm25

                xdata = ['累计值', '目标值', '去年同期', '控制值'];
                normal = {
                    textStyle: {
                        color: '#666'
                    },
                    show: true,
                    position: 'top',
                    offset: [0, -15],
                    // distance:20,
                    formatter: '{c}'
                };
            }
            let sData = [
                {
                    value: data[0],
                    itemStyle: {
                        color: color[0]
                    }
                },
                {
                    value: data[1],
                    itemStyle: {
                        color: color[1]
                    }
                },
                {
                    value: data[2],
                    itemStyle: {
                        color: color[2]
                    }
                },
                {
                    value: data[3] < 0 ? 0 : data[3],
                    itemStyle: {
                        color: color[3]
                    }
                }
            ];

            let option = {
                textStyle: {
                    color: '#666',
                    fontSize: 13
                },
                color: '#DBDBDB',
                toolbox: {
                    show: false
                },
                grid: {
                    containLabel: true,
                    left: 0,
                    bottom: 20
                },
                xAxis: {
                    type: 'category',
                    data: xdata,
                    offset: 5,
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            fontSize: 13
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    show: false
                },
                series: [
                    {
                        type: 'pictorialBar',
                        symbolSize: [30, 10],
                        symbolOffset: [0, -5],
                        symbolPosition: 'end',
                        z: 12,
                        label: {
                            normal: normal
                        },
                        silent: true,
                        data: sData
                    },
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [30, 10],
                        symbolOffset: [0, 5],
                        z: 12,
                        data: sData,
                        silent: true
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                opacity: 0.9
                            }
                        },
                        barWidth: 30,
                        silent: true,
                        data: sData,
                        markPoint: {
                            symbol: 'roundRect',
                            symbolSize: [0],
                            // symbolOffset: [0, -15],
                            data: [
                                {
                                    name: '是否达标',
                                    value: stand,
                                    // 优良率
                                    //   value: data[0] < data[1] ? '超标' : (data[0] > data[1]
                                    //       ? '未达标'
                                    //       : '达标'),
                                    // pm25
                                    //   value:
                                    //     data[0] > data[1]
                                    //       ? '超标'
                                    //       : (data[0] < data[1]
                                    //       ? '未达标'
                                    //       : '达标'),
                                    xAxis: 0,
                                    yAxis: data[0]
                                }
                            ],
                            itemStyle: {
                                color: 'transparent'
                            },
                            label: {
                                color: '#fff',
                                height: 20,
                                fontSize: 12,
                                offset: [0, -15],
                                backgroundColor:
                                    stand == '达标' ? '#21CA51' : '#EE4D4D',
                                borderRadius: 10,
                                padding: [0, 2]
                                // borderRadius:30
                            }
                        }
                    }
                ]
            };

            this.$nextTick(() => {
                this.$refs.barEcharts[index].init((config) => {
                    const { canvas } = config;
                    const chart = echarts.init(canvas, null, config);
                    chart.setOption(option);
                    return chart;
                });
            });
            // let myChart = echarts.init(document.getElementById(id));

            // option && myChart.setOption(option);
        }
    }
};
</script>

<style lang="scss" scoped>
.pm-air-check {
    .pm-air-check-box {
        // background-color: #fff;
        margin-bottom: 18rpx;

        .pm-air-check-title {
            display: flex;
            justify-content: space-between;
            padding: 0 18rpx;
            align-items: center;
            border-bottom: 0.5px solid #f1f1f1;
            .til {
                padding-left: 21rpx;
                font-size: 28rpx;
                color: #333;
                line-height: 72rpx;
                background-size: 6rpx;
                width: 100%;
                .til-title {
                    display: inline-block;
                    view {
                        display: inline-block;
                    }
                    .unit {
                        color: #999;
                    }
                }
                span {
                    float: right;
                    color: #999999;
                }
            }
        }

        .chart-content {
            border: none;

            .air-chart {
                width: 100%;
                height: 400rpx;
            }
        }
    }
}
</style>
