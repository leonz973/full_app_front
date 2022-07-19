<!-- @format -->

<!-- 城市河流水质及优良率对比 -->
<template>
    <div class="pm-water-river-quality-good">
        <div class="echarts-box" v-if="data.riverQuality.length !== 0">
            <l-echart
                ref="waterEcharts"
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
    name: 'pm-water-river-quality-good',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    riverQuality: [] //河流水质及优良率数据
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
            if (this.data.riverQuality.length == 0) {
                return;
            }

            let seriesData = [];
            let legendData = ['Ⅰ~Ⅱ类', 'Ⅲ类', 'Ⅳ类', 'Ⅴ类', '劣Ⅴ类', '优良率'];
            let obj = {};
            let xdata = this.data.riverQuality.map((item) => {
                return item.areaName;
            });

            legendData.forEach((leg, index) => {
                obj = {};
                obj.data = [];
                this.data.riverQuality.forEach((item) => {
                    if (leg !== '优良率') {
                        obj.stack = 'total';
                        obj.type = 'bar';
                        obj.barMaxWidth = 15;
                    } else {
                        obj.type = 'line';
                        obj.symbol = 'none';
                        obj.symbolSize = 5;
                        obj.symbol = 'emptyCircle';
                    }
                    switch (index) {
                        case 0:
                            obj.data.push(
                                Number(item.oneRate) + Number(item.twoRate)
                            );
                            break;
                        case 1:
                            obj.data.push(item.threeRate);
                            break;
                        case 2:
                            obj.data.push(item.fourRate);
                            break;
                        case 3:
                            obj.data.push(item.fiveRate);
                            break;
                        case 4:
                            obj.data.push(item.badFiveRate);
                            break;
                        case 5:
                            obj.data.push(
                                Number(item.oneRate) +
                                    Number(item.twoRate) +
                                    Number(item.threeRate)
                            );
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
                    //   bottom:'30%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xdata,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            color: '#2C3240',
                            fontSize: 14
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#F8F8F8'
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#E1E1E1'
                            }
                        }
                    }
                ],
                yAxis: {
                    type: 'value',
                    name: '',
                    axisLabel: {
                        formatter: '{value}%',
                        color: '#646C80',
                        fontSize: 14
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#F1F1F1',
                            type: 'dashed'
                        }
                    }
                },
                series: seriesData
            };

            this.$nextTick(() => {
                this.$refs.waterEcharts.init((config) => {
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
.pm-water-river-quality-good {
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
