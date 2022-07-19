<!-- @format -->

<!-- 过去24小时变化 -->
<template>
    <div class="p-air-last-hours-change">
        <div class="p-air-last-hours-change-bar">
            <!-- <div class="title">
                <p class="til">{{ mData.title }}</p>
            </div> -->
            <div class="pollutant-list">
                <div
                    :class="item.isCheck ? 'on' : 'not'"
                    v-for="(item, index) in pollutantArr"
                    v-bind:index="index"
                    :key="index"
                    @click="changePollutant(item)"
                >
                    <div v-html="item.html"></div>
                    <p v-if="item.value === currentPollutant.value">
                        {{ item.unit }}
                    </p>
                </div>
            </div>
            <div class="echarts-box" v-if="mData.pollutantData.length !== 0">
                <!-- 柱状图 -->
                <l-echart
                    v-if="!mConfig.showEcharts"
                    ref="barEcharts"
                    style="width: 100%; height: 100%"
                ></l-echart>
                <!-- <div v-if="!mConfig.showEcharts" id="barEcharts" ></div> -->
                <!-- 折线图 -->
                <l-echart
                    v-if="mConfig.showEcharts"
                    ref="lineEcharts"
                    style="width: 100%; height: 100%"
                ></l-echart>
                <!-- <div v-if="mConfig.showEcharts" id="lineEcharts" style="width: 100%;height:100%"></div> -->
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
import pollutantUtils from '../../utils/pollutant_utils.js';
import { getArrmarkLine } from '../../utils/pollutant_index.js';
import { replacePltName } from '../../utils/utils.js';
import * as echarts from 'lime-echart/components/lime-echart/echarts';
export default {
    name: 'pm-air-last-hours-change',
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    pollutantData: [] // 各污染物浓度指数
                    // title: '过去24小时变化' // 标题
                };
            }
        },
        config: {
            type: Object,
            default: () => {
                return {
                    // echarts图样式 false 柱状图，true 折线图
                    showEcharts: false
                };
            }
        }
    },
    data() {
        return {
            pollutantArr: [
                {
                    name: 'AQI',
                    value: 'AQI',
                    isCheck: true,
                    html: 'AQI',
                    unit: pollutantUtils.wrwObj.AQI.unit
                },
                {
                    name: 'PM<sub>2.5</sub>',
                    value: 'PM25',
                    isCheck: false,
                    html: 'PM<sub>2.5</sub>',
                    unit: pollutantUtils.wrwObj.PM25.unit
                },
                {
                    name: 'PM<sub>10</sub>',
                    value: 'PM10',
                    isCheck: false,
                    html: 'PM<sub>10</sub>',
                    unit: pollutantUtils.wrwObj.PM10.unit
                },
                {
                    name: 'O<sub>3</sub>',
                    value: 'O3',
                    isCheck: false,
                    html: 'O<sub>3</sub>',
                    unit: pollutantUtils.wrwObj.O3.unit
                },
                {
                    name: 'NO<sub>2</sub>',
                    value: 'NO2',
                    isCheck: false,
                    html: 'NO<sub>2</sub>',
                    unit: pollutantUtils.wrwObj.NO2.unit
                },
                {
                    name: 'SO<sub>2</sub>',
                    value: 'SO2',
                    isCheck: false,
                    html: 'SO<sub>2</sub>',
                    unit: pollutantUtils.wrwObj.SO2.unit
                },
                {
                    name: 'CO',
                    value: 'CO',
                    isCheck: false,
                    html: 'CO',
                    unit: pollutantUtils.wrwObj.CO.unit
                }
            ],
            currentPollutant: {}, //当前选中污染物
            dataImg: {
                imgSrc: require('../../images/empty.png')
            } //无数据图片路径
        };
    },

    computed: {
        mData() {
            return Object.assign(
                {
                    pollutantData: [] // 各污染物浓度指数
                    // title: '过去24小时变化' // 标题
                },
                this.data
            );
        },
        mConfig() {
            return Object.assign(
                {
                    showEcharts: false
                },
                this.config
            );
        }
    },

    watch: {
        'data.pollutantData': {
            handler: function () {
                this.getEcharts();
            }
        }
    },
    mounted() {
        // 默认选中第一个
        this.changePollutant(this.pollutantArr[0]);
        this.getEcharts();
    },

    methods: {
        // 污染物选中
        changePollutant: function (poll) {
            this.currentPollutant = poll;
            poll.isCheck = true;
            this.pollutantArr.forEach((item) => {
                if (item.value != poll.value) {
                    item.isCheck = false;
                }
            });

            // 把当前污染物传给父组件
            this.$emit('pollutantChange', this.currentPollutant);
        },

        // echarts图
        getEcharts() {
            let pData = this.mData.pollutantData;
            let timeArr = [];
            let seresData = [];

            pData.forEach((item, index) => {
                let wrwType = this.currentPollutant.value;
                // let value = this.currentWrw.value;

                /* 把所有键转大写 */
                let obj = item;
                let newObj = {};
                let tempKey, currentValue, upperCase;
                for (let i in obj) {
                    currentValue = obj[i];
                    upperCase = i.toUpperCase();
                    tempKey = upperCase;
                    newObj[tempKey] = currentValue;
                }

                // 赋值
                let value = newObj[this.currentPollutant.value];
                let level = pollutantUtils.getWrwLevel(wrwType, value);
                let sObj = {
                    value: value,
                    itemStyle: {
                        normal: {
                            color: level.color || 'ddd'
                        }
                    }
                };

                timeArr.push(newObj.MONITORDATE);
                seresData.push(sObj);
            });

            // 当有数据才执行
            if (this.mData.pollutantData.length !== 0) {
                if (!this.mConfig.showEcharts) {
                    // 柱状图
                    this.$nextTick(() => {
                        this.getBarEcharts(timeArr, seresData);
                    });
                } else {
                    // 折线图
                    this.$nextTick(() => {
                        this.getLineEcharts(timeArr, seresData);
                    });
                }
            }
        },

        getBarEcharts(timeArr, seresData) {
            // 当前污染物名称
            let unitName = replacePltName(this.currentPollutant.value);

            // 获取当前污染物单位
            let unit = this.currentPollutant.unit;

            let option = {
                grid: {
                    containLabel: true,
                    top: 30,
                    bottom: 40,
                    right: 10,
                    left: 10
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let str = '';
                        str += params[0].name + '\n';
                        str += unitName + ': ' + params[0].data.value + unit;

                        return str;
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: timeArr,
                        axisTick: {
                            //刻度值线
                            show: false
                        },
                        // data: timeArr,
                        splitLine: {
                            //网格线
                            show: false
                        },
                        axisLine: {
                            //刻度线样式
                            show: false,
                            lineStyle: {
                                color: '#0099FF'
                            }
                        },
                        axisLabel: {
                            formatter: function (v, idx) {
                                let arr = v.split(' ');
                                // return arr[1] + ':00';
                                const data = arr[1] + ':00';

                                let ret = ''; //拼接加\n返回的类目项
                                let maxLength = 5; //每项显示文字个数
                                let valLength = data.length; //X轴类目项的文字个数
                                let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                                if (rowN > 1) {
                                    //如果类目项的文字大于3,
                                    for (let i = 0; i < rowN; i++) {
                                        let temp = ''; //每次截取的字符串
                                        let start = i * maxLength; //开始截取的位置
                                        let end = start + maxLength; //结束截取的位置
                                        //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                        temp =
                                            data.substring(start, end) + '\n';
                                        ret += temp; //凭借最终的字符串
                                    }
                                    return ret;
                                } else {
                                    return data;
                                }
                            },
                            textStyle: {
                                //刻度标签的样式
                                color: '#666'
                            },
                            verticalAlign: 'top'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#666'
                            }
                        },
                        axisLabel: {
                            splitLine: {
                                show: false
                            },
                            textStyle: {
                                color: '#666'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#ddd'
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                barBorderRadius: [3, 3, 0, 0]
                            }
                        },
                        barWidth: '5',
                        data: seresData
                    }
                ]
            };

            this.$refs.barEcharts.init((config) => {
                const { canvas } = config;
                const chart = echarts.init(canvas, null, config);
                chart.setOption(option);
                return chart;
            });

            // let myChart = echarts.init(document.getElementById('barEcharts'));

            // option && myChart.setOption(option);
        },

        // 折线图
        getLineEcharts(timeArr, seresData) {
            // 当前污染物名称
            let unitName = replacePltName(this.currentPollutant.value);

            // 获取当前污染物单位
            let unit = this.currentPollutant.unit;

            let mark = [];
            // 获取当前污染物的污染物指标
            let pollData = getArrmarkLine(this.currentPollutant.value, 'hour');
            pollData.forEach((item) => {
                mark.push({
                    name: item.name,
                    yAxis: item.value,
                    itemStyle: {
                        normal: {
                            color: item.color
                        }
                    },
                    label: {
                        position: 'end',
                        normal: {
                            formatter: (val) => {
                                // return val.data.name + '：' + val.data.value;
                                return val.data.name;
                            }
                        }
                    }
                });
            });

            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            show: false,
                            backgroundColor: '#6a7985'
                        }
                    },
                    formatter: function (params) {
                        let str = '';
                        str += params[0].name + '\n';
                        str += unitName + ': ' + params[0].data.value + unit;

                        return str;
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        //刻度值线
                        show: false
                    },
                    // data: timeArr,
                    splitLine: {
                        //网格线
                        show: false
                    },
                    axisLine: {
                        //刻度线样式
                        show: true,
                        lineStyle: {
                            color: '#DBDEE0'
                        }
                    },
                    axisLabel: {
                        formatter: function (v, idx) {
                            let arr = v.split(' ');
                            const data = arr[1] + ':00';

                            let ret = ''; //拼接加\n返回的类目项
                            let maxLength = 5; //每项显示文字个数
                            let valLength = data.length; //X轴类目项的文字个数
                            let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                            if (rowN > 1) {
                                //如果类目项的文字大于3,
                                for (let i = 0; i < rowN; i++) {
                                    let temp = ''; //每次截取的字符串
                                    let start = i * maxLength; //开始截取的位置
                                    let end = start + maxLength; //结束截取的位置
                                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                    temp = data.substring(start, end) + '\n';
                                    ret += temp; //凭借最终的字符串
                                }
                                return ret;
                            } else {
                                return data;
                            }
                        },
                        textStyle: {
                            //刻度标签的样式
                            color: '#666'
                        },
                        verticalAlign: 'top'
                    },
                    data: timeArr
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        //刻度值线
                        show: false
                    },
                    // data: timeArr,
                    splitLine: {
                        //网格线
                        show: false
                    },
                    axisLine: {
                        //刻度线样式
                        show: false,
                        lineStyle: {
                            color: '#0099FF'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            //刻度标签的样式
                            color: '#666'
                        }
                    }
                },
                series: [
                    {
                        data: seresData,
                        type: 'line',
                        lineStyle: {
                            color: '#91CDFF'
                        },
                        itemStyle: {
                            color: '#fff',
                            borderColor: '#91CDFF'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#91CDFF' // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#F4FAFF' // 100% 处的颜色
                                    }
                                ]
                            }
                        },
                        markLine: {
                            animation: false,
                            symbolSize: 0,
                            linStyle: {
                                type: 'dotted',
                                width: 2
                            },
                            data: mark
                        }
                    }
                ]
            };

            this.$refs.lineEcharts.init((config) => {
                const { canvas } = config;
                const chart = echarts.init(canvas, null, config);
                chart.setOption(option);
                return chart;
            });
            // let myChart = echarts.init(document.getElementById('lineEcharts'));

            // option && myChart.setOption(option);
        }
    }
};
</script>

<style lang="scss" scoped>
.p-air-last-hours-change {
    // background-color: #fff;
    margin-bottom: 18rpx;
    .title {
        display: flex;
        justify-content: space-between;
        height: 90rpx;
        padding: 0 24rpx;
        border-bottom: 1px solid #e1e1e1;

        .til {
            font-size: 28rpx;
            color: #333;
            line-height: 90rpx;
            background-size: 6rpx;
        }
    }

    .pollutant-list {
        display: flex;
        align-items: center;
        padding-top: 20rpx;
        & > div {
            flex: 1;
            font-size: 29rpx;
            color: #2c323f;
            text-align: center;
            min-height: 70rpx;
            ::v-deep sub {
                font-size: 24rpx;
            }

            p {
                font-size: 20rpx;
                line-height: 1;
            }

            &.on {
                color: #178cfb;
            }
        }
    }

    .echarts-box {
        height: 730rpx;
        width: 100%;
    }
}
</style>

<style>
.empty {
    background-color: #f4f5f6;
}
</style>
