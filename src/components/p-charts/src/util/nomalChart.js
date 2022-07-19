/** @format */

// import { FONT_S, FONT_M, FONT_L, COLOR } from '../config/config';
import CONFIG from '../config/config_';
import _merge from 'lodash/merge';
// import imgSrc from '../images/nodata.png';
import util from './util';
// import * as echarts from 'lime-echart/components/lime-echart/echarts.js';

// let echarts = require('echarts/lib/echarts');
// require('echarts-liquidfill');

//修改配置样式
export const setChartConfig = (opt = {}) => {
    _merge(CONFIG, opt);
};

//坐标轴样式
export const AXIS_STYLE = () => {
    return {
        nameTextStyle: {
            color: CONFIG.FONT_COLOR,
            padding: [0, 0, -10, 0],
            fontSize: CONFIG.FONT_S
        },
        axisLabel: {
            color: CONFIG.FONT_COLOR,
            fontSize: CONFIG.FONT_S
        },
        axisTick: {
            lineStyle: {
                color: CONFIG.BORDER_COLOR,
                width: 1
            },
            show: true
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: CONFIG.BORDER_COLOR,
                width: 1
            },
            show: true
        }
    };
};

//图例
export const LEGEND = () => {
    return {
        top: 10,
        itemWidth: 8,
        itemHeight: 8,
        icon: 'circle',
        // borderRadius: 0,
        // symbolKeepAspect: false,
        left: CONFIG.SHOW_TOOLBOX ? '10%' : 'center',
        padding: CONFIG.SHOW_TOOLBOX ? [0, 50, 0, 0] : 0,
        textStyle: {
            color: CONFIG.FONT_COLOR,
            fontSize: CONFIG.FONT_S,
            padding: [2, 0, 0, 0]
        }
    };
};
//获取颜色
const getColor = color => {
    if (!color || color === 'normalColor') {
        //返回图表常规配色
        return CONFIG.COLOR;
    } else if (typeof color === 'string' && CONFIG[color]) {
        //返回指定配色
        return CONFIG[color];
    } else {
        return color;
    }
};

//十六进制颜色转为rgb颜色
const getColorRgb = (color = '#fff') => {
    let pattern = /^#([0-9|a-f]{3}|[0-9|a-f]{6})$/;
    color = color.toLowerCase();
    if (pattern.test(color)) {
        if (color.length === 4) {
            // 将三位转换为六位
            color =
                '#' +
                color[1] +
                color[1] +
                color[2] +
                color[2] +
                color[3] +
                color[3];
        }
        //处理六位的颜色值
        let colorNew = [];
        for (let i = 1; i < 7; i += 2) {
            colorNew.push(parseInt('0x' + color.slice(i, i + 2)));
        }
        return colorNew;
        //return 'RGB(' + colorNew.join(',') + ')';
    } else if (color.indexOf('rgb') > -1) {
        color = color.replace(/[rgba()]/g, '');
        return color.split(',').slice(0, 3);
    }
    return [];
};

//无数据时的配置项
export const getNoDataOption = () => {
    return {
        //backgroundColor: 'rgba(0, 0, 0, .2)',
        graphic: [
            {
                type: 'image',
                id: 'logo',
                right: 'center',
                top: 'center',
                z: -10,
                bounding: 'raw',
                origin: [CONFIG.IMG_NONE_W/2, CONFIG.IMG_NONE_H/2],
                style: {
                    image:  CONFIG.IMG_NONE,
                    width: CONFIG.IMG_NONE_W,
                    height: CONFIG.IMG_NONE_H,
                    //opacity: 0.8
                }
            }
        ]
    };
};

/**
 * 标准线
 *
 * @param {[]} data  标准线相关数据
 * @param {Object} [data[i].name] 标准线名称
 * @param {String} [data[i].value]    标准线对应数值
 * @param {Boolean} [data[i].color]    标准线对应颜色
 * @return {Object} [option] 标准线配置项
 */
const getMarkLine = data => {
    let lines = [];
    data.forEach(v => {
        lines.push({
            name: v.name,
            yAxis: v.value,
            itemStyle: {
                normal: {
                    color: v.color || '#f00'
                }
            }
        });
    });
    let markLine = {
        animation: false,
        symbolSize: 0,
        linStyle: {
            type: 'dotted',
            width: 2
        },
        data: lines,
        label: {
            normal: {
                show: true,
                formatter: '{b}'
            }
        }
    };
    return markLine;
};

/**
 * 饼图
 *
 * @param {[]} data   标题的series数据
 * @param {Object} configObj
 * @param {Object} [configObj.el] 图表绑定的dom元素，不传时返回option配置项
 * @param {String} [configObj.color]    颜色
 * @param {Boolean} [configObj.showLegend=false]    是否显示图例
 * @param {Boolean} [configObj.showLabel=true]    是否显示线条文字
 * @param {String} [configObj.title]    中间的标题
 * @param {String} [configObj.showNullLabel]    是否显示无数据项的连线标签 默认 false
 * @param {String} [configObj.subtext]    标题 一般放数值
 * @param {String} [configObj.type='circle']     半径  实心圆circle， 圆环ring  玫瑰图rose
 * @param {Object} [opt]   自定义图表option中的属性
 * @return {Object} [option] option配置项
 */
export const renderPie = (data, configObj, opt) => {
    if (!data || data.length === 0) {
        return getNoDataOption();
    }

    configObj.showLabel = configObj.showLabel !== false;

    //半径
    if (configObj.type === 'ring') {
        configObj.radius = configObj.showLabel
            ? ['35%', '60%']
            : ['50%', '70%'];
    } else {
        configObj.radius = configObj.showLabel ? '60%' : '70%';
    }

    //无数据的部分不显示label和连线
    data.forEach((v, i) => {
        if (v && (!v.value || isNaN(v.value))) {
            data[i].value = 0;
            if(!configObj.showNullLabel){
                data[i].label = {
                    show: false
                };
                data[i].labelLine = {
                    show: false
                };
            }

        }
    });
    let option = {
        textStyle: {
            color: null //避免全局字体颜色覆盖饼图颜色
        },
        legend: {
            show: configObj.showLegend,
            ...LEGEND()
        },
        title: {
            left: 'center',
            top: 'center',
            text: configObj.title,
            subtext: configObj.subtext,
            textStyle: {
                lineHeight: CONFIG.FONT_L,
                color: CONFIG.FONT_COLOR,
                fontWeight: 400
            },
            subtextStyle: {
                fontSize: CONFIG.FONT_L
            }
        },
        color: getColor(configObj.color),
        tooltip: {
            formatter: function(v) {
                return v.name + '：' + v.value + '%';
            }
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: configObj.radius,
                roseType: configObj.type === 'rose',
                center: ['50%', '50%'],
                label: {
                    show: configObj.showLabel
                },
                itemStyle: {
                    normal: {
                        //shadowColor: 'rgba(0,0,0,0.4)',
                        shadowBlur: 0
                    }
                },
                labelLine: {
                    show: configObj.showLabel
                },
                data: data
            }
        ]
    };
    if (configObj.showLabel) {
        option.series[0].label = {
            show: true,
            formatter: function(params) {
                return params.name + ':' + params.value + '%';
            }
        };
    }
    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 堆叠图
 * @param {Object} data 图表数据 必须,
 * @param {[]} data.xAxis x轴
 * @param {[]} data.yAxis y轴(与data.xAxis二选一)
 * @param {[]} data.series 必须
 * @param {Object} configObj 配置项 可选
 * @param configObj.el 图表绑定的dom元素 可选
 * @param configObj.color 颜色 可选
 * @param {String} configObj.unit  数值单位 可选 默认%
 * @param {Object}  opt 自定义图表option中的属性 可选
 * @return {Object} 图表配置项
 * */
export const renderStackBar = (data, configObj, opt) => {
    if (!data || !data.series || data.series.length === 0) {
        return getNoDataOption();
    }

    let unit = configObj.unit === undefined ? '%' : configObj.unit;
    let legend = [];
    data.series.map(v => {
        legend.push(v.name);
        v.stack = 'one';
        v.type = 'bar';
        v.barWidth = '60%';
        v.barMaxWidth = 20;
    });

    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            }
        },
        grid: {
            containLabel: true
        },
        color: getColor(configObj.color),
        legend: LEGEND(),
        yAxis: {
            ...AXIS_STYLE(),
            type: data.yAxis ? 'category' : 'value',
            data: data.yAxis || null,
            name: data.yAxis ? '' : unit,
            axisLabel: {
                textStyle: {
                    fontSize: CONFIG.FONT_S
                },
                interval: data.yAxis ? 0 : null
            }
        },
        xAxis: {
            ...AXIS_STYLE(),
            type: data.xAxis ? 'category' : 'value',
            data: data.xAxis || null,
            name: data.xAxis ? '' : unit,
            axisLabel: {
                textStyle: {
                    fontSize: CONFIG.FONT_S
                },
                interval: data.xAxis ? 0 : null
            }
        },
        series: data.series
    };

    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 条纹图
 * data  Array  图表数据 必须,
 * configObj  Object
 *   属性如下：
 *   el 图表绑定的dom元素 可选 不传时返回option配置项
 *   color  Array  颜色 可选
 *   unit   String  数值单位 可选
 *   barWidth Number 柱宽 可选
 * opt Object  自定义图表option中的属性
 * */
export const renderStripeBar = (data, configObj, opt) => {
    if (!data || data.length === 0) {
        return getNoDataOption();
    }

    let seriesData = [];
    let unit = configObj.unit || '';
    let max = 0;
    let yAxis = [];
    let barWidth = configObj.barWidth || 10;
    let color = configObj.color || [
		{
		    type: 'linear',
		    x: 0,
		    y: 0,
		    x2: 1,
		    y2: 0,
		    colorStops: [{
		        offset: 0, color: '#459ded' // 0% 处的颜色
		    }, {
		        offset: 1, color: '#20dbe7' // 100% 处的颜色
		    }]
		},
        /* new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
                offset: 0,
                color: '#459ded'
            },
            {
                offset: 1,
                color: '#20dbe7'
            }
        ]), */
        '#eee'
    ];
    data.forEach(v => {
        if (v.rank !== undefined) {
            let rank = v.rank;
            yAxis.push(rank + '   ' + v.name);
            seriesData.push(v.value);
        } else {
            yAxis.push(v.name);
            seriesData.push(v.value || 0);
        }
    });
    max = Math.max(...seriesData);
    max = max && !isNaN(max) ? max : 100;

    let option = {
        grid: {
            containLabel: true,
            top: 40,
            right: 80,
            left: 10,
            bottom: 10
        },
        tooltip: {},
        yAxis: {
            type: 'category',
            data: yAxis,
            inverse: true,
            axisLabel: {
                textStyle: {
                    fontSize: CONFIG.FONT_S
                },
                interval: 0
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        xAxis: {
            show: false,
            max: max
        },
        series: [
            {
                type: 'bar',
                barWidth: barWidth,
                barGap: '-100%',
                data: seriesData.map(() => max), //每个值都取最大值
                itemStyle: {
                    normal: {
                        barBorderRadius: barWidth / 2,
                        //borderColor: color[1],
                        color: color[1]
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    color: CONFIG.FONT_COLOR,
                    padding: [0, 10],
                    formatter: function(o) {
                        let n = seriesData[o.dataIndex];
                        n = isNaN(n + '') ? '-' : n;
                        return n + unit;
                    }
                },
                silent: true
            },
            {
                type: 'bar',
                barGap: '-100%',
                barWidth: barWidth,
                data: seriesData,
                itemStyle: {
                    normal: {
                        barBorderRadius: 8,
                        color: color[0],
                        shadowBlur: 0,
                        shadowColor: '#000'
                    }
                }
            }
        ]
    };

    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 圆柱图
 * data  Object  图表数据 必须,
 *   xAxis 必须
 *   data 必须
 * configObj  Object
 *   属性如下：
 *   el 图表绑定的dom元素 可选 不传时返回option配置项
 *   color  Array  颜色 可选
 *   unit   String  数值单位 可选
 *   barWidth Number 柱宽 可选
 * opt Object  自定义图表option中的属性
 * */
export const renderCylinderBar = (data, configObj, opt) => {
    if (!data || !data.data || data.data.length === 0) {
        return getNoDataOption();
    }

    let barWidth = configObj.barWidth || 30;
    let color = getColor(configObj.color);
    let seriesData = [];
    if (configObj.color) {
        data.data.forEach((v, i) => {
            seriesData.push({
                value: v,
                itemStyle: {
                    color: color[i] || color[0]
                }
            });
        });
    } else {
        seriesData = data.data;
    }
    let option = {
        color: color.slice(0, 1),
        grid: {
            containLabel: true,
            left: 0
        },
        xAxis: {
            type: 'category',
            data: data.xAxis,
            offset: 5,
            axisLabel: {
                interval: 0,
                textStyle: {
                    fontSize: CONFIG.FONT_S
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
                symbolSize: [barWidth, 10],
                symbolOffset: [0, -5],
                symbolPosition: 'end',
                z: 12,
                label: {
                    normal: {
                        textStyle: {
                            color: CONFIG.FONT_COLOR
                        },
                        show: true,
                        position: 'top',
                        formatter: '{c}' + (configObj.unit || '')
                    }
                },
                silent: true,
                data: seriesData
            },
            {
                name: '',
                type: 'pictorialBar',
                symbolSize: [barWidth, 10],
                symbolOffset: [0, 5],
                z: 12,
                data: seriesData,
                silent: true
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        //shadowColor: 'rgba(0,0,0,.5)',
                        //shadowBlur: 0,
                        //shadowOffsetX: 10,
                        opacity: 0.8
                    }
                },
                barWidth: barWidth,
                silent: true,
                data: seriesData
            }
        ]
    };

    if (opt) {
        _merge(option, opt);
    }

    return option;
};

/**
 * 彩虹图
 * configObj  Object
 *   属性如下：
 *   data  Object  图表数据 必须,
 *       包含xAxis或yAxis二选一
 *       series 必须
 *   el 图表绑定的dom元素 可选 不传时返回option配置项
 *   color  Arrway  颜色 可选
 *   unit   String  数值单位 可选 默认%
 * opt Object  自定义图表option中的属性
 * */

export const rainbowchart = (configObj, opt) => {
    let seriesd = [];
    let legend = [];
    let test_data = configObj.data;
    let maxData = Number(test_data[0].value);
    for (let i = 1; i < test_data.length; i++) {
        maxData =
            maxData < Number(test_data[i].value) ? test_data[i].value : maxData;
    }
    for (let j in test_data) {
        if (legend.indexOf(test_data[j]['name'] == -1)) {
            legend.push({
                icon: 'rect',
                name: test_data[j]['name']
            });
        }
        let ra = test_data.length - 1 - j;
        seriesd.push({
            name: test_data[j]['name'],
            type: 'pie',
            radius: [ra * 20 + 52 + '%', 43 + ra * 20 + '%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    }
                }
            },
            hoverAnimation: false,
            startAngle: 180,
            center: ['50%', '75%'],
            data: [
                {
                    value: test_data[j]['value'],
                    name: test_data[j]['name'],
                    label: {
                        normal: {
                            postion: 'center'
                        }
                    }
                },
                {
                    value: maxData - test_data[j]['value'],
                    itemStyle: {
                        normal: {
                            color: 'rgba(203,203,203,0.5)',
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        emphasis: {
                            color: 'rgba(203,203,203,1)'
                        }
                    },
                    name: 'showtip_' + test_data[j]['value']
                },
                {
                    value: maxData,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                            label: {
                                show: true
                            },
                            labelLine: {
                                show: true
                            }
                        },
                        emphasis: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    name: 'hide'
                }
            ]
        });
    }

    let option = {
        //legend: {},
        maxnum: maxData,
        tooltip: {
            show: true,
            formatter: function(params) {
                if (params.name === 'hide') {
                    return null;
                } else {
                    if (params.name.indexOf('showtip_') != -1) {
                        var num = Number(params.name.split('_')[1]);
                    } else {
                        num = params.value;
                    }
                    if (Number(num) === 0)
                        return params.seriesName + ':' + Number(num) + '';
                    return (
                        params.seriesName +
                        ':' +
                        parseFloat((num * 100) / maxData).toFixed(2) +
                        '%'
                    );
                }
            }
        },

        grid: {
            top: 0,
            height: 0,
            left: '10%',
            right: '10%'
        },
        series: seriesd,
        color: getColor(configObj.color)
    };

    if (opt) {
        _merge(option, opt);
    }

    return option;
};

/**
 * 圆环图
 * configObj  Object
 *   属性如下：
 *   data  Object  图表数据 必须,
 *       包含xAxis或yAxis二选一
 *       series 必须
 *   el 图表绑定的dom元素 可选 不传时返回option配置项
 *   color  Arrway  颜色 可选
 *   unit   String  数值单位 可选 默认%
 * opt Object  自定义图表option中的属性
 * */

export const ringchart = (configObj, opt) => {
    let text = configObj.data.name;
    let val = configObj.data.value;
    let dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 0,
            shadowColor: 'rgba(40, 40, 40, 0.1)'
        }
    };
    let placeHolderStyle = {
        normal: {
            color: configObj.color ? getColor(configObj.color[0]) : '#78b4ff', // 未完成的圆环的颜色
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: configObj.color ? getColor(configObj.color[0]) : '#78b4ff' // 未完成的圆环的颜色
        }
    };

    let option = {
        title: {
            text: text,
            x: 'center',
            y: 'center',
            subtext: val,
            textStyle: {
                fontWeight: 'normal',
                color: configObj.color
                    ? getColor(configObj.color[0])
                    : '#78b4ff',
                fontSize: 18
            },
            subtextStyle: {
                color: configObj.color
                    ? getColor(configObj.color[0])
                    : '#78b4ff', // 副标题文字颜色
                fontSize: '25',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            show: false
        },
        series: [
            {
                name: 'Pie2',
                type: 'pie',
                clockWise: false,
                radius: ['80%', '90%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                center: ['50%', '50%'],
                data: [
                    {
                        value: 100 - Number(val),
                        itemStyle: {
                            normal: {
                                color: configObj.color
                                    ? getColor(configObj.color[1])
                                    : '#eee',
                                shadowBlur: 0
                            }
                        }
                    },
                    {
                        value: val,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }
                ]
            }
        ]
    };

    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 热力图
 * configObj  Object
 *   属性如下：
 *   data  Object  图表数据 必须,
 *       xAxis 必须
 *       series 必须
 *   el 图表绑定的dom元素 可选 不传时返回option配置项
 *   type 类型 连续continuous 或分段piecewise 默认连续
 *       连续型：
 *           max 图例最大值 可选 默认数值中的最大值
 *           min 图例最小值 可选 默认数值中的最小值
 *       分段型：
 *           categories Array 各分段名称
 *   color  Arrway  颜色 可选
 *   unit   String  数值单位 可选
 *   showLabel Boolean 是否显示文字 默认显示
 * opt Object  自定义图表option中的属性
 * */
export const renderHeatmap = (data, configObj, opt) => {
    if (!data || !data.series || data.series.length === 0) {
        return getNoDataOption();
    }

    let xAxis = data.xAxis;
    let yAxis = [];
    let seriesData = [];
    let series = [...data.series].reverse();
    let nums = [];
    let visualMap = [];

    for (let i = 0; i < xAxis.length; i++) {
        for (let j = 0; j < series.length; j++) {
            let n = series[j].data[i];
            let arrItem = [i, j, n];
            seriesData.push(arrItem);
            if (i === 0) {
                yAxis.push(series[j].name);
            }
            if (!isNaN(n)) {
                nums.push(Number(n));
            }
        }
    }

    if (configObj.type === 'piecewise' && configObj.categories) {
        let colors = getColor(configObj.color);
        let pieces = [];
        configObj.categories.forEach((v, i) => {
            pieces.push({
                label: v,
                value: i + 1,
                color: colors[i],
                symbol: 'circle'
            });
        });

        visualMap = [
            {
                type: 'piecewise',
                pieces: pieces,
                calculable: false,
                orient: 'horizontal',
                left: 'center',
                top: 20,
                itemWidth: 8,
                itemHeight: 8,
                //itemSymbol: 'circle',
                textStyle: {
                    color: CONFIG.COLOR,
                    fontSize: CONFIG.FONT_S
                }
            }
        ];
    } else {
        let max = configObj.max;
        let min = configObj.min;
        let unit = configObj.unit || '';
        configObj.color = configObj.color || ['#C7021D', '#79E73C'];
        if (min === undefined) {
            min = Math.min(...nums);
        }
        if (max === undefined) {
            max = Math.max(...nums);
        }
        visualMap = [
            {
                min: min,
                max: max,
                calculable: false,
                orient: 'horizontal',
                left: 'center',
                top: 20,
                color: configObj.color,
                text: ['高' + '      ' + unit, '低'],
                textStyle: {
                    color: CONFIG.FONT_COLOR,
                    fontSize: CONFIG.FONT_S
                }
            }
        ];
    }

    let option = {
        /*textStyle: {
            color: null
        },*/
        tooltip: {
            formatter: function(v) {
                let val = v.value[2];
                if (configObj.categories) {
                    return configObj.categories[val - 1] || '-';
                }
                return val;
            }
        },
        grid: {
            containLabel: true
        },
        xAxis: {
            ...AXIS_STYLE(),
            type: 'category',
            data: xAxis,
            axisLabel: {
                interval: 0,
                textStyle: {
                    fontSize: CONFIG.FONT_S
                }
            },
            splitLine: {
                show: false
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(200,200,200,0.3)', 'rgba(200,200,200,0.2)']
                }
            }
        },
        yAxis: {
            ...AXIS_STYLE(),
            type: 'category',
            data: yAxis,
            axisLabel: {
                interval: 0,
                textStyle: {
                    fontSize: CONFIG.FONT_S
                }
            }
        },
        visualMap: visualMap,
        series: [
            {
                type: 'heatmap',
                data: seriesData,
                label: {
                    normal: {
                        show: configObj.showLabel !== false,
                        color: '#fff',
                        formatter: function(v) {
                            let val = v.value[2];
                            if (configObj.categories) {
                                return configObj.categories[val - 1] || '-';
                            }
                            return val;
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(255, 255, 255, 0.5)'
                    },
                    emphasis: {
                        shadowBlur: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            }
        ]
    };
    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 仪表盘
 * configObj  Object
 *   属性如下：
 *   data  Object  图表数据 必须,
 *       包含xAxis或yAxis二选一
 *       series 必须
 *   el 图表绑定的dom元素 可选 不传时返回option配置项
 *   color  Arrway  颜色 可选
 *   unit   String  数值单位 可选 默认%
 *   max: Number 最大刻度
 *   min: Number 最小刻度
 * opt Object  自定义图表option中的属性
 *
 * config中配置color 色值为字体色值
 * */
export const dashboardchart = (configObj, opt) => {
    let fontColor = '#27e4ae';
    if (configObj.color) {
        fontColor = configObj.color;
    }
    if (configObj.max === undefined || isNaN(configObj.max)) {
        configObj.max = 100;
    }

    if (configObj.min === undefined || isNaN(configObj.min)) {
        configObj.min = 0;
    }
    configObj.unit = configObj.unit || '%';

    let option = {
        //backgroundColor:'#fff',
        title: {
            show: false
        },
        series: [
            {
                type: 'gauge',
                min: configObj.min,
                max: configObj.max,
                radius: '90%',
                center: ['50%', '50%'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 8,
                        shadowBlur: 0,
                        color: [
                            [0.33, '#e54261'],
                            [0.66, '#4876e5'],
                            [1, '#27e4ae']
                        ]
                    }
                },
                axisTick: {
                    show: true,
                    length: 20,
                    lineStyle: {
                        width: 2,
                        color: 'auto'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        color: fontColor
                    }
                },
                splitLine: {
                    show: true,
                    length: 30, //调刻度高度
                    lineStyle: {
                        width: 2,
                        color: 'auto'
                    }
                },
                pointer: {
                    show: true,
                    width: '5',
                    length: '70%'
                },
                detail: {
                    formatter: '{value}' + configObj.unit,
                    offsetCenter: ['0', '50%'],
                    textStyle: {
                        fontSize: 24,
                        color: fontColor
                    }
                },
                itemStyle: {
                    color: '#27e4ae',
                    borderColor: '#27e4ae',
                    borderWidth: 5
                },
                data: [{ value: configObj.data.value }]
            },
            {
                //指针外环
                type: 'pie',
                hoverAnimation: false,
                legendHoverLink: false,
                radius: ['5%', '8%'],
                z: 10,
                label: {
                    normal: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: 100,
                        itemStyle: {
                            normal: {
                                color: '#67b3ef'
                            }
                        }
                    }
                ]
            },
            {
                //指针内环
                type: 'pie',
                hoverAnimation: false,
                legendHoverLink: false,
                radius: ['0%', '5%'],
                z: 10,
                label: {
                    normal: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: 100,
                        itemStyle: {
                            normal: {
                                color: '#12214c'
                            }
                        }
                    }
                ]
            }
        ]
    };
    if (opt) {
        _merge(option, opt);
    }

    return option;
};

/**
 * 仪表盘
 * configObj  Object
 *   属性如下：
 *   data  Object  图表数据 必须,
 *       包含xAxis或yAxis二选一
 *       series 必须
 *   el 图表绑定的dom元素 可选 不传时返回option配置项
 *   color  Arrway  颜色 可选
 *   unit   String  数值单位 可选 默认%
 * opt Object  自定义图表option中的属性
 *
 * */
export const airwrwchart = (configObj, opt) => {
    let data = configObj.data;
    let rel = util.getLevelPollution('AQI', data.value);
    let max = 500;
    let bgColor = '#aaa';
    if (configObj.backgroundColor) {
        bgColor = configObj.backgroundColor;
    }
    let option = {
        min: 0,
        max: max,
        backgroundColor: bgColor,
        series: [
            {
                name: 'AQI',
                type: 'gauge',
                radius: '90%',
                startAngle: 245,
                endAngle: -65,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 20,
                        color: [
                            [data.value / max, rel.color],
                            [1, '#eee']
                        ]
                    }
                },
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLabel: { show: false },
                pointer: { show: false },
                itemStyle: {
                    borderWidth: 30,
                    color: '#0f0'
                },
                title: {
                    offsetCenter: [0, '-20%'],
                    color: '#FFFFFF',
                    fontSize: 23,
                    fontWeight: 700
                },
                detail: {
                    formatter: function() {
                        return rel.txt;
                    },
                    color: '#fff',
                    offsetCenter: [0, '30%'],
                    backgroundColor: rel.color,
                    borderRadius: 5,
                    fontSize: 20,
                    padding: [8, 8],
                    lineHeight: 25
                },
                data: [{ value: data.value, name: 'AQI\n\n' + data.value }]
            }
        ]
    };

    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 水球图
 * configObj  Object
 *   属性如下：
 *   data  Object  图表数据 必须,
 *       包含xAxis或yAxis二选一
 *       series 必须
 *   el 图表绑定的dom元素 可选 不传时返回option配置项
 *   color  Arrway  颜色 可选
 *   unit   String  数值单位 可选 默认%
 * opt Object  自定义图表option中的属性
 *
 * */
export const waterPolochart = (configObj, opt) => {
    let option = {
        backgroundColor: configObj.background
            ? configObj.background
            : 'rgba(0,0,0,0)',
        series: [
            {
                type: 'liquidFill',
                itemStyle: {
                    color: getColor(configObj.color),
                    shadowColor: getColor(configObj.color)
                },
                radius: '80%',
                color: getColor(configObj.color),
                data: [configObj.data.value],
				shape: 'circle',
				silent: true,
                outline: {
                    show: false
                },
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: getColor(configObj.color),
                    color: 'transparent'
                },
                label: {
                    normal: {
                        //formatter: (value * 100).toFixed(2) + '%',
                        textStyle: {
                            fontSize: 30
                        }
                    }
                }
            }
        ]
    };
    if (opt) {
        _merge(option, opt);
    }


    return option;

};

/**
 * 折线图
 * @param {Object} data 图表数据 必须,
 * @param {[]} data.xAxis x轴
 * @param {[]} data.yAxis y轴(与data.xAxis二选一)
 * @param {[]} data.series 必须
 * @param {Object} configObj 配置项 可选
 * @param configObj.el 图表绑定的dom元素 可选
 * @param configObj.color 颜色 可选
 * @param {Boolean} configObj.showLabel  是否显示数值 默认不显示
 * @param {Boolean} configObj.showFillArea 是否填充颜色
 * @param {String} configObj.unit  数值单位 可选 默认不显示
 * @param {Object}  opt 自定义图表option中的属性 可选
 * @return {Object} 图表配置项
 * */
export const renderLine = (data, configObj, opt) => {
    if (!data || !data.series || data.series.length === 0) {
        return getNoDataOption();
    }
    data = _merge({}, data);
    let hasBar = false; //是否混合有柱型图
    let color = getColor(configObj.color);
    data.series.map((v, i) => {
        v.type = v.type || 'line';
        v.symbol = 'circle';
        if (v.type === 'bar') {
            hasBar = true;
            v.barMaxWidth = 20;
        }
        v.smooth = true;
        if (configObj.showLabel) {
            v.label = {
                show: true,
                position: 'top'
            };
        }

        if (configObj.showFillArea) {
            let fillColor = getColorRgb(color[i]).concat(0.5);
            let fillColor_ = getColorRgb(color[i]).concat(0);
            v.areaStyle = {
                //区域填充样式
                normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0, color: `rgba(${fillColor.join(',')})` // 0% 处的颜色
						}, {
							offset: 1, color: `rgba(${fillColor_.join(',')})` // 100% 处的颜色
						}]
					},
                    /* color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: `rgba(${fillColor.join(',')})`
                        },
                        {
                            offset: 1,
                            color: `rgba(${fillColor_.join(',')})`
                        }
                    ]), */
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 0
                }
            };
        }
    });
    let option = {
        legend: {
            ...LEGEND()
            //itemWidth: hasBar ? 10 : 20
        },
        color: getColor(configObj.color),
        grid: {
            containLabel: true
        },
        xAxis: {
            ...AXIS_STYLE(),
            data: data.xAxis,
            type: 'category',
            boundaryGap: hasBar
        },
        yAxis: {
            ...AXIS_STYLE(),
            name: configObj.unit || ''
        },
        series: data.series,
        tooltip: {
            trigger: 'axis'
        }
    };

    if (configObj.markLine) {
        let markLine = getMarkLine(configObj.markLine);
        option.series[0].markLine = markLine;
    }
    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 柱状图
 * @param {Object} data 图表数据 必须,
 * @param {[]} data.xAxis x轴
 * @param {[]} data.series 必须
 * @param {Object} configObj 配置项 可选
 * @param configObj.el 图表绑定的dom元素 可选
 * @param configObj.color 颜色 可选
 * @param {Boolean} configObj.showLabel  是否显示数值 默认不显示
 * @param {String} configObj.unit  数值单位 可选
 * @param {Object}  opt 自定义图表option中的属性 可选
 * @return {Object} 图表配置项
 * */
export const renderBar = (data, configObj, opt) => {
    if (!data || !data.series || data.series.length === 0) {
        return getNoDataOption();
    }
    data = _merge({}, data);
    data.series.map(v => {
        v.type = v.type || 'bar';
        if (v.type === 'line') {
            v.smooth = true;
            v.symbol = 'circle';
        }
        v.barMaxWidth = '20';
        if (configObj.showLabel) {
            v.label = {
                show: true,
                position: 'top'
            };
        }
    });
    let option = {
        legend: LEGEND(),
        color: getColor(configObj.color),
        grid: {
            containLabel: true
        },
        xAxis: {
            ...AXIS_STYLE(),
            data: data.xAxis,
            type: 'category'
        },
        yAxis: {
            ...AXIS_STYLE(),
            name: configObj.unit || ''
        },
        series: data.series,
        tooltip: {
            trigger: 'axis'
        }
    };
    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 雷达图
 * @param {Object} data 图表数据 必须,
 * @param {[]} data.xAxis x轴
 * @param {[]} data.series 必须
 * @param {Object} configObj 配置项 可选
 * @param configObj.el 图表绑定的dom元素 可选
 * @param configObj.color 颜色 可选
 * @param {Boolean} configObj.areaColor  分隔区域颜色 可选
 * @param {Object}  opt 自定义图表option中的属性 可选
 * @return {Object} 图表配置项
 * */
export const renderRadar = (data, configObj, opt) => {
    if (!data || !data.series || data.series.length === 0 || !data.indicator) {
        return getNoDataOption();
    }
    let indicator = [];
    let max = 100;
    let vals = [];
    let color = getColor(configObj.color);
    configObj.areaColor = configObj.areaColor || [
        'rgba(0, 0, 0, .1)',
        'rgba(0, 0, 0, 0)'
    ];
    data.series.forEach((v, i) => {
        let fillColor = getColorRgb(color[i]).concat(0.3);
        v.areaStyle = {
            normal: {
                color: `rgba(${fillColor.join(',')})`
            }
        };
        v.value.forEach(num => {
            if (!isNaN(num)) {
                vals.push(Number(num));
            }
        });
    });
    max = Math.max(...vals);
    data.indicator.forEach(v => {
        if (typeof v === 'object') {
            v.max = v.max === undefined ? max : max;
            indicator.push(v);
        } else if (typeof v === 'string') {
            indicator.push({
                name: v,
                max: max
            });
        }
    });

    let option = {
        color: getColor(configObj.color),
        tooltip: {},
        radar: {
            radius: '60%',
            splitArea: {
                areaStyle: {
                    color: configObj.areaColor
                }
            },
            indicator: indicator,
            name: {
                textStyle: {
                    color: CONFIG.FONT_COLOR
                }
            }
        },
        series: [
            {
                type: 'radar',
                data: data.series,
                symbol: 'circle',
                symbolSize: 5
            }
        ]
    };
    if (opt) {
        _merge(option, opt);
    }

    return option;
};

/**
 * 桑基图 只支持两侧数据
 * @param {[]} data 图表数据 必须,
 * @param {String} data[i].name,
 * @param {[]} data[i].items ,
 * @param {String} data[i].items[i].name 右侧项对应的,
 * @param {Number} data[i].items[i].value ,
 * @param {Object} configObj 配置项 可选
 * @param configObj.el 图表绑定的dom元素 可选
 * @param {[]} configObj.leftColor 左侧颜色 可选
 * @param {[]} configObj.rightColor 右侧颜色 可选
 * @param {Object}  opt 自定义图表option中的属性 可选
 * @return {Object} 图表配置项
 * */
export const renderSanKey = (data, configObj, opt) => {
    let rightItems = []; //右侧项
    let leftItems = []; //左侧项
    let links = [];
    let itemName = [];
    let leftColor = configObj.leftColor || ['#055165', '#076983'];
    let rightColor = configObj.rightColor || [
        'rgb(113, 127, 231)',
        'rgb(99, 144, 235)',
        'rgb(71, 120, 217)',
        'rgb(45, 97, 201)',
        'rgb(42, 137, 218)',
        'rgb(30, 157, 216)',
        'rgb(25, 136, 187)',
        'rgb(31, 165, 185)',
        'rgb(18, 131, 148)',
        'rgb(21, 175, 170)',
        'rgb(15, 149, 138)',
        'rgb(12, 149, 118)',
        'rgb(15, 140, 88)',
        'rgb(13, 136, 42)',
        'rgb(107, 183, 57)',
        'rgb(133, 184, 34)',
        'rgb(173, 182, 31)',
        'rgb(209, 189, 57)',
        'rgb(224, 167, 68)',
        'rgb(205, 131, 51)',
        'rgb(210, 106, 54)'
    ];
    data.forEach((v, i) => {
        if (v.items && v.items.length > 0) {
            rightItems.push({
                name: v.name,
                itemStyle: {
                    color: rightColor[i % rightColor.length]
                }
            });
        }

        v.items.forEach(val => {
            let name = val.name;

            if (itemName.indexOf(name) === -1) {
                let len = leftItems.length;
                itemName.push(name);
                leftItems.push({
                    name: name,
                    itemStyle: {
                        color: leftColor[len % leftColor.length]
                    }
                });
            }
            links.push({
                target: v.name,
                source: name,
                value: val.value || 1,
                value_: val.value,
                lineStyle: {
                    //color: val.rate ? sankeyCityColors[i] : 'rgba(0,0,0,0)'
                    color: rightColor[i % rightColor.length]
                }
            });
        });
    });

    let option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: function(o) {
                let str = '';
                if (o.dataType === 'edge') {
                    //线条的提示文字
                    return (
                        o.data.target +
                        ' - ' +
                        o.data.source +
                        '：' +
                        o.data.value_ +
                        '%'
                    );
                }
                if (o.dataType === 'node') {
                    let name = o.name;
                    str = name + ' \n';
                    if (itemName.indexOf(name) === -1) {
                        //左侧的提示文字
                        data.forEach(v => {
                            if (v.name === name) {
                                v.items.forEach(val => {
                                    str +=
                                        val.name + '：' + val.value + '%\n';
                                });
                                return false;
                            }
                        });
                        return str;
                    } else {
                        //右侧上的提示文字
                        data.forEach(v => {
                            v.items.forEach(val => {
                                if (val.name === name) {
                                    str += v.name + '：' + val.value + '%\n';
                                    return false;
                                }
                            });
                        });
                        return str;
                    }
                }
            }
        },
        series: [
            {
                type: 'sankey',
                data: rightItems.concat(leftItems),
                links: links,
                right: 5,
                left: 5,
                bottom: 20,
                top: 25,
                nodeWidth: 90,
                nodeGap: 0,
                layoutIterations: 0,
                focusNodeAdjacency: 'allEdges',
                draggable: false,
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        borderColor: '#fff',
                        opacity: 1
                    }
                },
                label: {
                    align: 'center',
                    normal: {
                        align: 'center',
                        padding: [0, 0, 0, -90],
                        color: '#fff',
                        fontSize: CONFIG.FONT_S
                    }
                },
                lineStyle: {
                    normal: {
                        curveness: 0.5,
                        opacity: 0.5,
                        color: 'rgb(18, 180, 129)'
                    }
                }
            }
        ]
    };

    if (opt) {
        _merge(option, opt);
    }

    return option;
};

/**
 * 变化排名图
 * @param {[]} data 图表数据 必须
 * @param {Number} data[i].rank 排名 可选
 * @param {Number} data[i].name 名称，显示在y轴 必须
 * @param {Number} data[i].value 数值， 必须
 * @param {Object} configObj 配置项 可选
 * @param configObj.el 图表绑定的dom元素 可选
 * @param {[]} configObj.color 颜色 可选
 * @param {String} configObj.unit 数值单位 可选
 * @param {Number} configObj.barWidth 条纹宽度 可选 默认20
 * @param {Object}  opt 自定义图表option中的属性 可选
 * @return {Object} 图表配置项
 * */
export const renderVarietyBar = (data, configObj, opt) => {
    if (!data || data.length === 0) {
        return getNoDataOption();
    }
    configObj.color = configObj.color || ['#ef3a3a', '#1bb543', '#01799a'];
    configObj.unit = configObj.unit || '';
    configObj.barWidth = configObj.barWidth || 20;

    let data1 = [];
    let data2 = [];
    let data3 = [];
    let yAxis = [];

    let itemStyleUp = {
        normal: {
            barBorderRadius: [
                0,
                configObj.barWidth / 2,
                configObj.barWidth / 2,
                0
            ],
            color: configObj.color[0]
        }
    };
    let itemStyleDn = {
        normal: {
            barBorderRadius: [
                configObj.barWidth / 2,
                0,
                0,
                configObj.barWidth / 2
            ],
            color: configObj.color[1]
        }
    };
    let series = [];
    data.forEach(v => {
        let rank = v.rank || '';
        rank = v.rank > 9 ? v.rank : v.rank + '  ';
        yAxis.push(rank + '    ' + v.name);
        data1.push(v.value);
        series.push({
            value: v.value,
            itemStyle: v.value > 0 ? itemStyleUp : itemStyleDn
        });
    });

    let max = Math.max(...data1) + 1;
    let min = Math.min(...data1) - 1;
    max = Math.max(max, -min) * 1.4;
    data.forEach(() => {
        data2.push(max);
        data3.push(-max);
    });
    let option = {
        grid: {
            top: 20,
            left: 80,
            right: 0,
            bottom: 0
        },
        tooltip: {},
        yAxis: [
            {
                type: 'category',
                data: yAxis,
                inverse: true,
                offset: 60,
                axisLabel: {
                    interval: 0,
                    align: 'left',
                    padding: [0, 30, 0, 0],
                    textStyle: {
                        fontSize: CONFIG.FONT_S
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            {
                data: yAxis,
                inverse: true,
                axisLabel: { show: false }
            }
        ],
        xAxis: {
            axisLabel: { show: false },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                type: 'bar',
                barWidth: configObj.barWidth,
                barGap: '-100%',
                yAxisIndex: 1,
                data: data3,
                itemStyle: {
                    normal: {
                        barBorderRadius: [
                            configObj.barWidth / 2,
                            0,
                            0,
                            configObj.barWidth / 2
                        ],
                        borderColor: configObj.color[2],
                        borderWidth: 1,
                        color: 'rgba(0,0,0,0)'
                    }
                },
                silent: true
            },
            {
                type: 'bar',
                barWidth: configObj.barWidth,
                barGap: '-100%',
                data: data2,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: [
                            0,
                            configObj.barWidth / 2,
                            configObj.barWidth / 2,
                            0
                        ],
                        borderColor: configObj.color[2],
                        borderWidth: 1,
                        color: 'rgba(0,0,0,0)'
                    }
                },
                label: {
                    show: true,
                    position: 'insideRight',
                    color: CONFIG.FONT_COLOR,
                    padding: [0, 2, 0, 0],
                    formatter: function(o) {
                        let v = series[o.dataIndex].value;
                        let s = v + configObj.unit;
                        s = v > 0 ? '+' + s : s;
                        return s;
                    }
                },
                silent: true
            },
            {
                type: 'bar',
                barGap: '-100%',
                barWidth: configObj.barWidth,
                data: series
            }
        ]
    };
    if (opt) {
        _merge(option, opt);
    }


    return option;
};

/**
 * 资产建设图
 * @param {[]} data 图表数据 必须
 * @param {Number} data[i].name 项目名称，显示在y轴 必须
 * @param {Number} data[i].time1 数值，统计项目1的年份时间 必须
 * @param {Number} data[i].time2 数值，统计项目2的年份时间 必须
 * @param {Object} configObj 配置项 可选
 * @param configObj.el 图表绑定的dom元素 可选
 * @param {Number} configObj.label1 数值，统计项目1名称 默认值"建设时间"
 * @param {Number} configObj.label2 数值，统计项目2名称 默认值"数据上传时间"
 * @param {[]} configObj.color 颜色 可选
 * @param {Number} configObj.barWidth 条纹宽度 可选 默认20
 * @param {Object}  opt 自定义图表option中的属性 可选
 * @return {Object} 图表配置项
 * */
export const renderAssetsBar = (data, configObj, opt) => {
    configObj.barWidth = configObj.barWidth || 20;
    configObj.color = configObj.color || ['#04556b', '#1cc4d8'];
    let data1 = [];
    let data2 = [];
    let yAxis = [];
    let max = new Date().getFullYear() + 1;
    data.forEach(v => {
        yAxis.push(v.name);
        if (v.time1 && !isNaN(v.time1)) {
            data1.push(max - v.time1);
        } else {
            data1.push('');
        }

        if (v.time2 && !isNaN(v.time2)) {
            data2.push(max - v.time2);
        } else {
            data2.push('');
        }
    });
    //let n = Math.max(...data1, ...data2);
    //n = n > 5 ? n : 5;
    let option = {
        legend: LEGEND(),
        grid: {
            containLabel: true,
            left: '10%'
        },
        tooltip: {
            formatter: function(v) {
                return `${v.seriesName}：${max - v.value}年`;
            }
        },
        yAxis: {
            type: 'category',
            data: yAxis,
            inverse: true,
            offset: 50,
            axisLabel: {
                textStyle: {
                    fontSize: CONFIG.FONT_S,
                    color: CONFIG.FONT_COLOR
                },
                interval: 0,
                align: 'left'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        xAxis: {
            min: 0,
            //max: n,
            inverse: true,
            axisLabel: {
                textStyle: {
                    fontSize: CONFIG.FONT_S
                },
                //interval: 0,
                formatter: function(v) {
                    if (v === 0) {
                        return '';
                    }
                    return max - v;
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: configObj.label1 || '建设时间',
                type: 'bar',
                barWidth: configObj.barWidth,
                barGap: '-100%',
                data: data1,
                itemStyle: {
                    normal: {
                        barBorderRadius: [
                            configObj.barWidth / 2,
                            0,
                            0,
                            configObj.barWidth / 2
                        ],
                        color: configObj.color[0]
                    }
                },
                z: 5
            },
            {
                name: configObj.label2 || '数据上传时间',
                type: 'bar',
                barWidth: configObj.barWidth,
                data: data2,
                itemStyle: {
                    normal: {
                        barBorderRadius: [
                            configObj.barWidth / 2,
                            0,
                            0,
                            configObj.barWidth / 2
                        ],
                        color: configObj.color[1]
                    }
                },
                z: 10
            }
        ]
    };

    if (opt) {
        _merge(option, opt);
    }


    return option;
};
