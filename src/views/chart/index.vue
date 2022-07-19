<!-- @format -->

<template>
    <view style="padding: 20rpx">
        折线
        <p-line
            style="display: block; height: 500rpx"
            :data="data"
            @click="handleClick"
        ></p-line>
        柱状图
        <p-bar
            style="display: block; height: 400rpx"
            :data="data"
            @click="handleClick"
        ></p-bar>

        水球图
        <p-water-polo
            style="display: block; height: 300rpx"
            :data="{ value: 0.56 }"
            :config="{
                color: '#68cffe'
            }"
        ></p-water-polo>

        饼图
        <p-pie :data="pieData" style="display: block; height: 400rpx"></p-pie>

        热力图
        <p-heatmap
            :data="data2"
            :config="{
                type: 'piecewise',
                categories: ['Ⅰ类', 'Ⅱ类', 'Ⅲ类', 'Ⅳ类', 'Ⅴ类', '劣Ⅴ类'],
                color: 'waterGradesColor'
            }"
            style="display: block; height: 800rpx"
        ></p-heatmap>

        仪表盘
        <p-dash-board
            style="display: block; height: 400rpx"
            :data="{ value: 80 }"
            :config="{
                color: '#27e4ae'
            }"
        ></p-dash-board>
        圆柱图
        <p-cylinder-bar
            :data="{
                xAxis: ['氨氮', '总磷', '总氮', '生化需氧量', '高锰酸钾指数'],
                data: [26, 22, 15, 8, 5]
            }"
            :config="{
                color: 'normalColor',
                barWidth: 30,
                unit: '%'
            }"
            style="display: block; height: 400rpx"
        ></p-cylinder-bar>
        雷达图
        <p-radar
            :data="{
                indicator: [
                    '东',
                    '东南',
                    '南',
                    '西南',
                    '西',
                    '西北',
                    '北',
                    '东北'
                ],
                series: [
                    { name: '类A', value: [28, 20, 36, 25, 12, 8, 19, 15] },
                    { name: '类B', value: [21, 22, 33, 22, 10, 5, 12, 11] }
                ]
            }"
            :config="{
                color: ['#d8cf3a', '#20cb44'],
                areaColor: ['rgba(14, 158, 112, .5)', 'rgba(14, 158, 112, .2)']
            }"
            style="display: block; height: 500rpx"
        ></p-radar>
        彩虹图
        <p-rainbow
            style="display: block; height: 300rpx"
            :data="[
                { name: '优良率', value: 92.6 },
                { name: '达标率', value: 98.6 }
            ]"
        ></p-rainbow>
        圆环图
        <p-ring
            style="display: block; height: 300rpx"
            :data="{ name: 'AQI', value: 60 }"
            :config="{
                color: ['#78b4ff', '#eee']
            }"
        ></p-ring>
        桑基图
        <p-sankey
            :data="data3"
            style="display: block; height: 800rpx"
        ></p-sankey>
        堆叠图
        <p-stack-bar
            style="display: block; height: 500rpx"
            :data="{
                xAxis: ['2015年', '2016年', '2017年'],
                series: [
                    { name: '优', data: [20, 25, 30] },
                    { name: '良', data: [20, 25, 30] },
                    { name: '轻度污染', data: [60, 50, 40] }
                ]
            }"
            :config="{
                color: 'airGradesColor'
            }"
        ></p-stack-bar>
        条纹图
        <p-stripe-bar
            :data="data4"
            style="display: block; height: 500rpx"
        ></p-stripe-bar>
        变化排名条纹图
        <p-variety-bar
            :data="data5"
            :config="{
                color: ['#d8cf3a', '#20cb44', '#ddd'],
                barWidth: 10,
                unit: '%'
            }"
            style="display: block; height: 500rpx"
        ></p-variety-bar>
        空气质量
        <p-air-db
            style="display: block; height: 400rpx"
            :data="{ value: 100 }"
        ></p-air-db>
        资产建设
        <p-assets-bar
            :data="data1"
            style="display: block; height: 400px"
        ></p-assets-bar>

        自定义
        <p-chart
            :option="{
                tooltip: {},
                series: [
                    {
                        type: 'pie',
                        data: [
                            {
                                name: 'test1',
                                value: 80
                            },
                            {
                                name: 'test2',
                                value: 20
                            }
                        ]
                    }
                ]
            }"
            style="display: block; height: 400rpx"
        ></p-chart>
    </view>
</template>
<script>
export default {
    data() {
        return {
            pieData: [
                { name: 'Ⅰ类', value: 5 },
                { name: 'Ⅱ类', value: 5 },
                { name: 'Ⅲ类', value: 30 },
                { name: 'Ⅳ类', value: 20 },
                { name: 'Ⅴ类', value: 10 },
                { name: '劣Ⅴ类', value: 2 }
            ],
            data1: [
                { name: '广州', time1: 2012, time2: 2018 },
                { name: '广州', time1: 2013, time2: 2016 },
                { name: '广州', time1: 2014, time2: 2015 },
                { name: '广州', time1: 2012, time2: 2015 },
                { name: '广州', time1: 2015, time2: 2014 },
                { name: '广州', time1: 2012, time2: 2018 },
                { name: '广州', time1: 2012, time2: 2018 },
                { name: '广州', time1: 2012, time2: 2018 },
                { name: '广州', time1: 2012, time2: 2018 },
                { name: '广州', time1: 2012, time2: 2018 }
            ],
            data2: {
                xAxis: ['2015年', '2016年', '2017年', '2018年', '2019年'],
                series: [
                    { name: '广州市', data: [1, 2, 3, 4, 5] },
                    { name: '深圳市', data: [1, 2, 3, 4, 5] },
                    { name: '东莞市', data: [1, 6, 3, 4, 5] },
                    { name: '广州市', data: [1, 2, 3, 4, 5] },
                    { name: '广州市', data: [3, 2, 3, 4, 5] },
                    { name: '广州市', data: [3, 2, 3, 4, 5] },
                    { name: '广州市', data: [1, 2, 3, 4, 5] },
                    { name: '广州市', data: [1, 2, 3, 4, 5] },
                    { name: '广州市', data: [1, 2, 3, 4, 5] },
                    { name: '中山市', data: [6, 2, 3, 4, 5] }
                ]
            },
            data3: [
                {
                    name: '广州',
                    items: [
                        { name: '氨氮', value: '15' },
                        { name: 'COD', value: '25' },
                        { name: 'BOD', value: '5' }
                    ]
                },
                {
                    name: '深圳',
                    items: [
                        { name: '氨氮', value: '15' },
                        { name: 'COD', value: '25' },
                        { name: 'BOD', value: '5' }
                    ]
                },
                {
                    name: '东莞',
                    items: [
                        { name: '氨氮', value: '15' },
                        { name: 'COD', value: '25' },
                        { name: 'BOD', value: '5' }
                    ]
                },
                {
                    name: '佛山',
                    items: [
                        { name: '氨氮', value: '15' },
                        { name: 'COD', value: '25' },
                        { name: 'BOD', value: '5' }
                    ]
                },
                {
                    name: '中山',
                    items: [
                        { name: '氨氮', value: '15' },
                        { name: 'COD', value: '25' },
                        { name: 'BOD', value: '5' }
                    ]
                },
                {
                    name: '清远',
                    items: [
                        { name: '氨氮', value: '5' },
                        { name: 'COD', value: '25' },
                        { name: 'BOD', value: '5' }
                    ]
                }
            ],
            data4: [
                { name: '广州', value: 2.5 },
                { name: '广州', value: 2.8 },
                { name: '广州', value: 2.9 },
                { name: '广州', value: 3.1 },
                { name: '广州', value: 3.5 },
                { name: '广州', value: 3.8 },
                { name: '广州', value: 4.5 },
                { name: '广州', value: 4.8 },
                { name: '广州', value: 5.6 },
                { name: '广州', value: 5.8 }
            ],
            data5: [
                { name: '广州', rank: 1, value: -2.5 },
                { name: '广州', rank: 2, value: -2.8 },
                { name: '广州', rank: 3, value: 2.9 },
                { name: '广州', rank: 4, value: 3.1 },
                { name: '广州', rank: 5, value: 3.5 },
                { name: '广州', rank: 6, value: 3.8 },
                { name: '广州', rank: 7, value: 4.5 },
                { name: '广州', rank: 8, value: 4.8 },
                { name: '广州', rank: 9, value: 5.6 },
                { name: '广州', rank: 10, value: 5.8 },
                { name: '广州', rank: 11, value: 5.8 },
                { name: '广州', rank: 12, value: 6.2 }
            ],
            data: {
                xAxis: [1, 2, 3, 4, 5, 6],
                series: [
                    {
                        name: '优良率',
                        data: [99, 98, 96, 97, 100, 96]
                    }
                ]
            }
        };
    },
    mounted() {
        // this.getData();
    },
    methods: {
        getNum(max = 100) {
            return (Math.random() * max).toFixed(2);
        },
        getData() {
            setInterval(() => {
                this.data.series = [
                    {
                        name: '优良率',
                        data: [
                            this.getNum(),
                            this.getNum(),
                            this.getNum(),
                            this.getNum(),
                            this.getNum(),
                            this.getNum()
                        ]
                    }
                ];
            }, 2000);
        },
        handleClick(e) {
            console.log(e);
        }
    }
};
</script>
<style scoped>
p-chart-pie {
    display: block;
}
p-chart-* {
    display: block;
}
</style>
