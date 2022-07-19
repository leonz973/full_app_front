<!-- @format -->

<!-- 城市河流水质 -->
<template>
    <div class="pm-water-city-river-quality">
        <div class="echarts-box" v-if="data.cityRiverQuality.length !== 0">
            <l-echart
                ref="cityWaterEcharts"
                style="width: 100%; height: 100%"
            ></l-echart>
        </div>

        <!-- 无数据显示 -->
        <div v-else class="empty">
            <p-mui-stateless-no-message
                :data="dataImg"
            ></p-mui-stateless-no-message>
        </div>
    </div>
</template>

<script>
import * as echarts from 'lime-echart/components/lime-echart/echarts';
export default {
    name: 'pm-water-city-river-quality',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    cityRiverQuality: [] //城市河流水质
                };
            }
        }
    },
    data() {
        return {
            color: [
                '#44c5fd',
                '#73bb31',
                '#eebd15',
                '#f88e17',
                '#ee3b5b',
                '#34C5CB'
            ],
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
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.data.cityRiverQuality.length == 0) {
                return;
            }
            let seriesData = [];
            let legendData = ['Ⅰ~Ⅱ类', 'Ⅲ类', 'Ⅳ类', 'Ⅴ类', '劣Ⅴ类'];
            let obj = {};
            let ydata = this.data.cityRiverQuality.map((item) => {
                return item.areaName;
            });

            legendData.forEach((leg, index) => {
                obj = {};
                obj.data = [];
                this.data.cityRiverQuality.forEach((item) => {
                    obj.stack = 'total';
                    obj.type = 'bar';
                    obj.barMaxWidth = 15;

                    switch (leg) {
                        case 'Ⅰ~Ⅱ类':
                            obj.data.push(
                                Number(item.oneRate) + Number(item.twoRate)
                            );
                            break;
                        case 'Ⅲ类':
                            obj.data.push(item.threeRate);
                            break;
                        case 'Ⅳ类':
                            obj.data.push(item.fourRate);
                            break;
                        case 'Ⅴ类':
                            obj.data.push(item.fiveRate);
                            break;
                        case '劣Ⅴ类':
                            obj.data.push(item.badFiveRate);
                            break;
                    }
                });
                obj.name = leg;
                seriesData.push(obj);
            });
            let option = {
                color: this.color,
                legend: {
                    bottom: 5,
                    itemWidth: 13,
                    itemHeight: 13,
                    data: legendData
                },
                grid: {
                    top: '10%',
                    left: '15%'
                    // bottom:'25%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'value',
                    name: '',
                    axisLabel: {
                        formatter: '{value}%',
                        color: '#333',
                        fontSize: 14
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#DDDDDD'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#F1F1F1',
                            type: 'dashed'
                        }
                    }
                },
                yAxis: [
                    {
                        type: 'category',
                        data: ydata,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            color: '#333',
                            fontSize: 14
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#DDDDDD'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#E1E1E1'
                            }
                        }
                    }
                ],
                series: seriesData
            };

            this.$nextTick(() => {
                this.$refs.cityWaterEcharts.init((config) => {
                    const { canvas } = config;
                    const chart = echarts.init(canvas, null, config);
                    chart.setOption(option);
                    return chart;
                });
            });
        }
    }
};
</script>

<style lang="less" scoped>
.pm-water-city-river-quality {
    // background: #fff;
    .echarts-box {
        width: 100%;
        height: 600rpx;
    }
}

.empty {
    background-color: #f4f5f6;
}
</style>
