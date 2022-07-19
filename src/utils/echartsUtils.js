/**
 * /*
 *
 * @format
 * @Author: Caijw
 * @LastEditors: Caijw
 * @Description: echarts数据转换工具类
 * @Date: 2019-02-12 08:53:24
 * @LastEditTime: 2019-02-12 08:53:24
 */

export default new class echartsUtils {
    // 创建线形图，柱状图，堆叠图，热力图数据转换工具
    // data = [[{year: '2019',month:'1', yll: 81, dbl: 61},{year: '2019',month:'2', yll: 70, dbl: 72},],[{year: '2018',month:'1', yll: 80, dbl: 71},{year: '2018',month:'2', yll: 80, dbl: 71}]]
    // createLineBarOption(data, {
    //     x: 'month',  // x（y）轴的字段
    //     name: 'year',  // legend标题字段
    //     data: 'yll'  // x（y）轴对应的数据字段
    // })
    createLineBarOption(data, opt) {
        // 如果有数据的话，取第一个，然后转换为数组，否则为空数组，也可以传一个回调函数进来
        let xAxis = []
        if (typeof opt.x == 'string') {
            xAxis = data.length > 0 ? data[0].map(d => d[opt.x]) : [];
        } else if (typeof opt.x == 'function') {
            xAxis = data.length > 0 ? data[0].map(d => opt.x(d)) : [];
        }
        let series = data.map(datum => {
            return {
                name: datum[0][opt.name],
                data: datum.map(i => i[opt.data])
            };
        });
        return {
            xAxis: xAxis,
            series: series
        }
    }


    // 创建饼图数据转换工具
    createPieOption(data, opt) {
        let res = data.map(item => {
            return {
                name: item[opt.name],
                value: item[opt.data]
            }
        })
        return res
    }


    // 雷达图数据转换工具
    createRadarOption(data, opt) {
        let res = this.createLineBarOption(data, opt);
        return {
            indicator: res.xAxis,
            series: res.series.map(datum => {
                return {
                    name: datum.name,
                    value: datum.data
                };
            })
        }
    }

    // 创建圆柱型数据转换工具
    createCircularOption(data, opt) {
        return {
            xAxis: data.map(datum => datum[opt.x]),
            data: data.map(datum => datum[opt.data])
        }
    }


    // 条纹图显示序号
    createPieRankOption(data, opt) {
        let res = data.map(item => {
            return {
                name: item[opt.name],
                value: item[opt.data],
                rank: item[opt.rank]
            }
        })
        return res
    }


}();
