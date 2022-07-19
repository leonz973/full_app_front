<!-- @format -->

<!-- 断面水质类别 -->
<template>
    <div class="pm-water-fracture-surface">
        <div class="echarts-box" v-if="data.surfaceData.length !== 0">
            <l-echart
                ref="fractureSurfaceEcharts"
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
    name: 'pm-water-fracture-surface',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    surfaceData: [] //断面水质类别数据
                };
            }
        }
    },
    data() {
        return {
            // 水质类别颜色
            color: [
                '#44c5fd',
                '#73bb31',
                '#eebd15',
                '#f88e17',
                '#ee3b5b',
                '#34C5CB'
            ],
            realColor: [], //当前水质类别颜色
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
            if (this.data.surfaceData.length == 0) {
                return;
            }

            let seriesData = [];
            let legendData = [];
            let obj = {};
            let ydata = [];
            let bgColor = '';
            let goodData = {
                data: []
            };

            this.data.surfaceData.forEach((item, index) => {
                ydata.push(item.basinName);

                switch (item.level) {
                    case '优':
                        bgColor = this.color[0];
                        break;
                    case '良好':
                        bgColor = this.color[1];
                        break;
                    case '轻度':
                        bgColor = this.color[2];
                        break;
                    case '重度':
                        bgColor = this.color[3];
                        break;
                    case '严重':
                        bgColor = this.color[4];
                        break;
                }

                goodData.data.push({
                    value: item.level,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        width: 30,
                        height: 20,
                        align: 'center',
                        backgroundColor: bgColor
                    }
                });

                if (index === 0) {
                    if (
                        (item.oneRate !== '' && item.oneRate !== '-') ||
                        (item.twoRate !== '' && item.twoRate !== '-')
                    ) {
                        legendData.push('Ⅰ~Ⅱ类');
                        this.realColor.push(this.color[0]);
                    }
                    if (item.threeRate !== '' && item.threeRate !== '-') {
                        console.log(item.threeRate !== '');
                        legendData.push('Ⅲ类');
                        this.realColor.push(this.color[1]);
                    }
                    if (item.fourRate !== '' && item.fourRate !== '-') {
                        legendData.push('Ⅳ类');
                        this.realColor.push(this.color[2]);
                    }
                    if (item.fiveRate !== '' && item.fiveRate !== '-') {
                        legendData.push('Ⅴ类');
                        this.realColor.push(this.color[3]);
                    }
                    if (item.badFiveRate !== '' && item.badFiveRate !== '-') {
                        legendData.push('劣Ⅴ类');
                        this.realColor.push(this.color[4]);
                    }
                }
            });

            legendData.forEach((item) => {
                obj = {};
                obj.data = [];
                this.data.surfaceData.forEach((sur) => {
                    (obj.type = 'bar'),
                        (obj.barMaxWidth = 15),
                        (obj.xAxisIndex = 1);

                    switch (item) {
                        case 'Ⅰ~Ⅱ类':
                            obj.data.push(
                                Number(sur.oneRate) + Number(sur.twoRate)
                            );
                            break;
                        case 'Ⅲ类':
                            obj.data.push(sur.threeRate);
                            break;
                        case 'Ⅳ类':
                            obj.data.push(sur.fourRate);
                            break;
                        case 'Ⅴ类':
                            obj.data.push(sur.fiveRate);
                            break;
                        case '劣Ⅴ类':
                            obj.data.push(sur.badFiveRate);
                            break;
                    }
                });

                obj.name = item;
                seriesData.push(obj);
            });

            let option = {
                color: this.realColor,
                legend: {
                    bottom: 20,
                    itemWidth: 13,
                    itemHeight: 13,
                    data: legendData
                },
                grid: {
                    top: '20%',
                    left: '20%',
                    right: '15%',
                    bottom: '25%'
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
                        type: 'value',
                        name: '',
                        axisLabel: {
                            show: false,
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
                    {
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
                            show: true,
                            lineStyle: {
                                color: '#F1F1F1',
                                type: 'dashed'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        name: '断面比例',
                        nameLocation: 'end',
                        nameTextStyle: {
                            color: '#999999',
                            fontSize: 14,
                            align: 'right',
                            verticalAlign: 'middle',
                            padding: [0, 15, 0, 0]
                        },
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
                    },
                    {
                        type: 'category',
                        ...goodData,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            margin: 25
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#DDDDDD'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: seriesData
            };

            this.$nextTick(() => {
                this.$refs.fractureSurfaceEcharts.init((config) => {
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
.pm-water-fracture-surface {
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
